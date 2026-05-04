import { create } from "zustand";

export const useChatStore =create((set) => ({
    chats: [],
    messages: [],
    activeTab: 'chats',
    selectedUser: null,
    isUserLoading: null,
    isMessagesLoading: null,

    setActiveTab: (tab) =>  set({ activeTab: tab }) ,
    setSelectedUser: (selectedUser) => {set({selectedUser})}
}))
