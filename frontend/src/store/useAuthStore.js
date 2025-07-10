import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';
import {io} from "socket.io-client"

const BASE_URL =
  import.meta.env.MODE === "development"? "http://localhost:3000/api" : "/";

export const useAuthStore = create((set , get) => ({
    authUser: null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket : null,

    checkAuth : async ()=> {
        try {
            const res = await axiosInstance.get('/auth/check');

            set({
                authUser: res.data
            })

            get().connectSocket()
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
            const res = await axiosInstance.post('/auth/signup', data);
            set({authUser: res.data});
            toast.success("Account created successfully!");

            get().connectSocket()
        } catch (error) {
            console.log("Error in signup in useAuthStore:", error);
            toast.error(error.response.data.message || "Something went wrong during signup");
        } finally{
            set({isSigningUp: false});
        }
    },

    
    logout : async()=>{
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser: null});
            toast.success("Logged out successfully!");

            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong during logout");
            console.log("Error in logout in useAuthStore:", error);
        }
    },


    login : async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({authUser: res.data});
            toast.success("Logged in successfully!");

            get().connectSocket()
        } catch (error) {
            console.log("Error in login in useAuthStore:", error);
            toast.error(error.response.data.message || "Something went wrong during login");
        } finally {
            set({isLoggingIn: false});
        }
    },


    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({authUser: res.data});
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log("Error in updateProfile in useAuthStore:", error);
            toast.error(error.response.data.message || "Something went wrong during profile update");
        } finally {
            set({isUpdatingProfile: false});
        }
    },

    connectSocket:() => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{ query : {
            userId : authUser._id
        }})
        socket.connect()
        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds});
        })
        set({socket : socket})
    },
    disconnectSocket : () => {
        if(get().socket.connected){
            get().socket.disconnect()
        }
    }
}))