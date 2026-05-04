import customFetch from "@/lib/customFetch";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore =create((set) => ({
    chats: [],
    messages: [],
    activeTab: 'chats',
    selectedUser: null,
    isUserLoading: null,
    isMessagesLoading: null,

    setActiveTab: (tab) =>  set({ activeTab: tab }) ,
    setSelectedUser: (selectedUser) => { set({ selectedUser }) },
    
    getChartPartners: async () => {
        set({ isUserLoading: true })
        try {
            const res = await customFetch.get('/conversations');
            set({chats:res.data})
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            set({isUserLoading:false})
        }
    }
}))
