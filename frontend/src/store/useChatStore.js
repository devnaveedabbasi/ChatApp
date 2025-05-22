import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosIntance } from "../lib/axios";
import { io } from "socket.io-client";

const socket = io('http://localhost:4000', {
  withCredentials: false
});

export const useChatStore = create((set, get) => ({
  message: [],
  users: [],
  selectedUser: null,
  isMessagesLoading: false,
  isUsersLoading: false,
  isSendMessageLoading: false,

  // setter for selected user
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  // setter for messages (for socket new message)
  setMessages: (fn) => {
    set((state) => ({
      message: fn(state.message),
    }));
  },

  // get all users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosIntance.get("/message/get-users");
      set({ users: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // get all messages for a user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosIntance.get(`/message/${userId}`);
      set({ message: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // send message (image/text)
  sendMessages: async (messageData) => {
    const { selectedUser, message } = get();
    set({ isSendMessageLoading: true });

    try {
      const res = await axiosIntance.post(
        `/message/send/${selectedUser?._id}`,
        messageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set({ message: [...message, res.data.data] }); // res.data.data = newMessage
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSendMessageLoading: false });
    }
  },
}));

socket.on("newMessage", (msg) => {
  const { setMessages } = useChatStore.getState();
  setMessages((prev) => [...prev, msg]);
});


