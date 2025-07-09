import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import {useAuthStore} from './useAuthStore.js';

export const useChatStore = create((set , get) => ({
    messages : [],
    users : [],
    selectedUser : null ,
    isUsersLoading : false ,
    isMessagesLoading : false,

    getUsers : async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get('/messages/users');
            set({users: res.data.filteredUsers}); // <-- FIXED: use res.data.filteredUsers
        } catch (error) {
            console.log("Error in fetching users in useChatStore:", error);
            toast.error(error.response.data.message || "Something went wrong while fetching users");
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMessages : async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
            console.log(res.data)
        } catch (error) {
            console.log("Error in fetching messages in useChatStore:", error);
            toast.error(error.response.data.message || "Something went wrong while fetching messages");
        } finally {
            set({isMessagesLoading: false});
        }
    },

    sendMessage : async(messageData) => {
        const {selectedUser, messages} = get();
        try {
           const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
           set({messages: [...messages, res.data.newMessage]});
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong while sending message");
            throw error; // <-- Add this line
        }
    },
    subscribeToMessages: () => {
        const {selectedUser} = get();
        if(!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        socket.on('newMessage', (newMessage) => {
            set({
                messages: [...get().messages, newMessage]
            })
        });
    }
    ,
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage');
    },
    setSelectedUser: (userId) => {
        set({selectedUser: userId});
    },
}))
