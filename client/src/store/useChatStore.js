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
    
    getChatPartners: async () => {
        set({ isUserLoading: true })
        try {
            const res = await customFetch.get('/conversations');
            console.log(res.data);
            
            set({chats:res.data.conversation})
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            set({isUserLoading:false})
        }
    }
}))
