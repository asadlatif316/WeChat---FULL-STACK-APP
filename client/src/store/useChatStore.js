import customFetch from '@/lib/customFetch';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: 'chats',
  selectedUser: null,
  selectedConversation: null,
  isUserLoading: null,
  isMessagesLoading: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => {
    set({ selectedUser, conversation: null, messages: [] });
  },
  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation, selectedUser: null, messages: [] });
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
    const { selectedConversation } = get();
    set({ isMessagesLoading: true });
    try {
      const res = await customFetch.get(`/message/${selectedConversation._id}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.msg);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    const { selectedUser, messages, selectedConversation } = get();
    let conversationId;
    try {
      if (selectedConversation) {
        conversationId = selectedConversation._id;
      } else if (selectedUser) {
        const res = await customFetch.post(
          `/conversations/${selectedUser._id}`,
        );

        conversationId = res.data._id;
      }

      const res = await customFetch.post(`/message/${conversationId}`, data);
      console.log(res);

      set({ messages: messages.concat(res.data) });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || 'something went wrong');
    }
  },
}));
