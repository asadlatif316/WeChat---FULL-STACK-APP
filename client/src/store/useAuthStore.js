import customFetch from '@/lib/customFetch';
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { useChatStore } from './useChatStore';
import {io} from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:4200' : '/'

export const useAuthStore = create((set,get) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [] ,
  checkAuth: async () => {
    try {
      const res = await customFetch.get('/user/get-user');
      set({ user: res.data.user });
    } catch (error) {
      console.log('Error in checking Auth', error);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: null });
    }
  },

  logout: async () => {
    try {
      await customFetch.post('/auth/logout');
      set({
        user: null,
      });
      useChatStore.getState().resetChat();
      toast.success('User logged out successfully');
      get().socketDisconnect()
    } catch (error) {
      toast.error('Error in Logging out');
      console.log('Logged out error: ', error);
    }
  },
  
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await customFetch.post('/auth/register', data);
      set({ user: res.data });
      toast.success('Account created successfully');
      get().socketConnection();
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isSigningUp: false });
    }
  },
  
  login: async (data) => {
    set({ isLoggingIn: true });
    useChatStore.getState().resetChat();
    try {
      const res = await customFetch.post('/auth/login', data);
      set({ user: res.data });
      toast.success('logged in successfully');
      get().socketConnection()
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  socketConnection: async () => {
    console.log('connectSocket called')
    const { user } = get()
    if (!user || get().socket?.connected) return
    const socket = io(BASE_URL, {
      withCredentials:true
    })
    set({ socket })
    
    socket.on('getOnlineUser', (usersId) => {
      set({onlineUser:usersId})
    })
  },

  socketDisconnect: () => {
    const { socket } = get()
    if (socket?.connected) socket.disconnect()
  }
}));
