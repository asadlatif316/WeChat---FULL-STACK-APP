import customFetch from '@/lib/customFetch'
import {create} from 'zustand'
import toast from 'react-hot-toast'
export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await customFetch.post('/register',data)
            set({ user: res.data })
            toast.success('Account created successfully')
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            set({isSigningUp: false})
        }
    }



}))