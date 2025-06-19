import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth: true,

    checkAuth : async ()=> {
        try {
            const res = await axiosInstance.get('/auth/check');

            set({
                authUser: res.data
            })
        } catch (error) {
            console.log("Error in checking auth:", error);
            set({
                authUser: null
            })
        } finally {
            set({
                isCheckingAuth: false
            })
        }
    } , 

    signup : async (data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post('/auth/signup', formData);
            set({
                authUser: res.data,
                isSigningUp: false
            });
        } catch (error) {
            console.log("Error in signup:", error);
            set({isSigningUp: false});
        }
    },
}))