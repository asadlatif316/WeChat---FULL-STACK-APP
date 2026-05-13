import customFetch from '@/lib/customFetch';
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { useChatStore } from './useChatStore';
export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await customFetch.get('/auth/check');
      set({ user: res.data });
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
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await customFetch.post('/auth/login', data);
      set({ user: res.data });
      toast.success('logged in successfully');
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
