import customFetch from '@/lib/customFetch';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: 'chats',
  selectedUser: null,
  selectedConversation: null,
  isUserLoading: null,
  isMessagesLoading: null,
  isTyping: false,
  showProfile: false,

  setShowProfile: (value) => set({ showProfile: value }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => {
    set({ selectedUser, selectedConversation: null });
  },
  setSelectedConversation: (selectedConversation) => {
    set((state) => ({
      selectedConversation,
      selectedUser: null,
      chats: state.chats.map((c) =>
        c._id === selectedConversation._id ? { ...c, unread: 0 } : c,
      ),
    }));
  },

  getChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await customFetch.get('/conversations');
      set({ chats: res.data.conversation });
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isUserLoading: false });
    }
  },

  resetChat: () =>
    set({
      chat: [],
      messages: [],
      selectedUser: null,
      selectedConversation: null,
    }),

  getContacts: async () => {
    try {
      const res = await customFetch.get('/user/contacts');
      set({ allContacts: res.data.filteredUsers });
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessagesByUserId: async () => {
    const { selectedConversation, chats, selectedUser } = get();
    let conversation;
    if (selectedConversation) {
      conversation = selectedConversation;
    } else {
      conversation = chats.find((chat) =>
        chat.participants.some((p) => p._id === selectedUser?._id),
      );
    }
    if (!conversation) {
      set({ messages: [] });
      return;
    }

    set({ isMessagesLoading: true });
    try {
      const res = await customFetch.get(`/message/${conversation._id}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.msg);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    const { selectedUser, messages, chats, selectedConversation } = get();
    const { user } = useAuthStore.getState();
    let conversationId;
    console.log('called');
    

    //optimistic message
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      sender: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      conversationId: selectedConversation?._id || selectedUser._id,
      content: data.content,
      status: 'sending',
      createdAt: new Date().toISOString(),
    };
    set({ messages: [...messages, optimisticMessage] });

    try {
      //checks if it conversation ot selectedUser
      if (selectedConversation) {
        conversationId = selectedConversation._id;
      } else if (selectedUser) {
        const res = await customFetch.post(
          `/conversations/${selectedUser._id}`,
        );
        conversationId = res.data._id;
      }

      // send messages
      const res = await customFetch.post(`/message/${conversationId}`, data);
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      console.log(error);
      set({ messages: messages });
      toast.error(error.response?.data?.msg || 'something went wrong');
    }
  },

  updatedConversationList: (conversation, incomingMessage = null) => {
    const { chats, selectedConversation } = get();
    const myId = useAuthStore.getState().user._id;

    const isChatOpen = selectedConversation?._id === conversation._id;
    const isFromMe = incomingMessage?.sender?._id === myId;
    const isChatExist = chats.find((c) => c._id === conversation._id);

    let unread = conversation.unread ?? 0;
    if (incomingMessage && !isFromMe) {
      unread = isChatOpen ? 0 : (isChatExist?.unread ?? 0) + 1;
    } else if (isChatOpen) {
      unread = 0;
    }

    const updatedConversation = { ...conversation, unread };

    if (isChatExist) {
      const filteredConversation = chats.filter(
        (c) => c._id !== conversation._id,
      );
      set({ chats: [updatedConversation, ...filteredConversation] });
    } else {
      set({ chats: [updatedConversation, ...chats] });
    }
  },

  subscribeToMessage: () => {
    const { updatedConversationList } = get();
    const socket = useAuthStore.getState().socket;

    socket.on('showTyping', (senderId) => {
      set({ isTyping: true });
    });
    socket.on('stopTyping', (senderId) => {
      set({ isTyping: false });
    });

    socket.on('newMessage', ({ message, conversation }) => {
      updatedConversationList(conversation, message);
      const { selectedConversation } = get(); // ← fresh, not from top of subscribe
      const myId = useAuthStore.getState().user._id;
      if (message.sender._id === myId) return;
      // chat NOT open → just delivered, do NOT mark read
      if (
        !selectedConversation ||
        selectedConversation._id !== message.conversationId
      ) {
        socket.emit('messageDelivered', {
          messageId: message._id,
          senderId: message.sender._id,
        });
        return;
      }
      // chat IS open → append + delivered + read
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, message] });

      socket.emit('messageDelivered', {
        messageId: message._id,
        senderId: message.sender._id,
      });

      get().emitMessageRead();
    });
    socket.on(
      'messageStatusUpdated',
      ({ messageId, messageStatus, messageIds }) => {
        const ids = (messageIds || [messageId]).flat(Infinity).map(String);
        const currentMessages = get().messages;
        set({
          messages: currentMessages.map((msg) =>
            ids.includes(String(msg._id))
              ? { ...msg, status: messageStatus }
              : msg,
          ),
        });
        console.log(
          'AFTER STATUS SET:',
          get().messages.find((m) => ids.includes(m._id))?.status,
        );
      },
    );

    socket.on('messageReadUpdate', ({ messageIds, messageStatus }) => {
      const currentMessages = get().messages;

      set({
        messages: currentMessages.map((msg) => {
          if (messageIds && messageIds.includes(msg._id)) {
            return { ...msg, status: messageStatus };
          }
          return msg;
        }),
      });
    });

    socket.on('profileUpdated', ({ user }) => {
      const { chats, selectedConversation, allContacts } = get();
      set({
        chats: chats.map((c) => ({
          ...c,
          participants: c.participants.map((p) =>
            p._id === user._id ? user : p,
          ),
        })),
      });
      if (selectedConversation) {
        set({
          selectedConversation: {
            ...selectedConversation,
            participants: selectedConversation.participants.map((p) =>
              p._id === user._id ? user : p,
            ),
          },
        });
      }
      set({
        allContacts: allContacts.map((c) => (c._id === user._id ? user : c)),
      });
    });
  },

  unSubscribeToMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off('newMessage');
    socket?.off('showTyping');
    socket?.off('stopTyping');
    socket?.off('messageStatusUpdate');
    socket?.off('messageReadUpdate');
    console.log('unSubscribeToMessage called');
  },

  showTyping: (receiverId) => {
    const socket = useAuthStore.getState().socket;
    socket?.emit('showTyping', receiverId);
  },

  stopTyping: (receiverId) => {
    const socket = useAuthStore.getState().socket;
    socket?.emit('stopTyping', receiverId);
  },
  emitMessageRead: () => {
    const { selectedConversation } = get();
    if (!selectedConversation) {
      console.log('emitMessageRead: no conversation, return');
      return;
    }

    const socket = useAuthStore.getState().socket;

    const user = useAuthStore.getState().user._id;
    const sender = selectedConversation.participants.find(
      (p) => p._id !== user,
    );
    socket.emit('readMessage', {
      conversationId: selectedConversation._id,
      senderId: sender._id,
    });
  },
}));
