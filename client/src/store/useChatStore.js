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

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => {
    set({ selectedUser, selectedConversation: null });
  },
  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation, selectedUser: null });
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
    console.log(selectedUser);
    console.log(selectedConversation);
    
    let conversation;
    if (selectedConversation) {
      conversation = selectedConversation;
    } else{
      conversation = chats.find((chat) =>
        chat.participants.some((p) => p._id === selectedUser?._id),
      );
      
    }
    console.log(conversation);
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
  subscribeToMessage: () => {
    const { selectedConversation, selectedUser } = get();
    if (!selectedConversation) return;
    const socket = useAuthStore.getState().socket;

    socket.on('showTyping', (senderId) => {
      set({ isTyping: true });
    });
    socket.on('stopTyping', (senderId) => {
      console.log('stop');

      set({ isTyping: false });
    });

    socket.on('newMessage', (newMessage) => {
      if (selectedConversation._id !== newMessage.conversationId) return;
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });
    });
  },

  unSubscribeToMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off('newMessage');
    socket?.off('showTyping');
    socket?.off('stopTyping');
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
}));
