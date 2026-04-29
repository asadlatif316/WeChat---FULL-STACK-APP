import customFetch from '@/lib/customFetch';
import { create } from 'zustand';
import toast from 'react-hot-toast';
export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
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
        const res = await customFetch.post('/auth/login',data);
        set({ user: res.data });
        toast.success('logged in successfully');
    } catch (error) {
        toast.error(error.response.data.msg);
    } finally {
        set({isLoggingIn: false})
    }
  },
}));
