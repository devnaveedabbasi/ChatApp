import { create } from 'zustand';
import { axiosIntance } from '../lib/axios.js'; 
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isVerifying:false,
  isResending:false,
  isForgetting:false,
  isReseting:false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosIntance.get("/auth/check-auth");  
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log("Error in checkAuth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },


  
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
        const res = await axiosIntance.post("/auth/register", data);
        toast.success("Account created successfully");
        return res.data; 
    } catch (error) {
        toast.error(error?.response?.data?.message || "Signup failed");
        throw error;  
    }
    finally {
      set({ isSigningUp: false });
    }
}
,
  
  

verifyOtp: async (data) => {
  set({ isVerifying: true });
  try {
    const res = await axiosIntance.post("/auth/verify-otp", data);

    set({ authUser: res.data });
    toast.success("User verified successfully");
    return { success: true };
  } catch (error) {
    toast.error(error?.response?.data?.message || "OTP verification failed");
    return { success: false };
  } finally {
    set({ isVerifying: false });
  }
}

,

resendOtp: async (userId) => {
  set({ isResending: true });
  try {
    const res = await axiosIntance.post(`/auth/resend-otp/${userId}`);
    toast.success("OTP sent successfully");
    return { success: true }; // ✅ consistent return
  } catch (error) {
    toast.error(error?.response?.data?.message || "OTP resend failed");
    return { success: false };
  } finally {
    set({ isResending: false });
  }
}

,


login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosIntance.post(`/auth/login`,data);
    toast.success("login successfully");
    return { success: true };
  } catch (error) {
    toast.error(error?.response?.data?.message || "login failed");
    return { success: false };
  } finally {
    set({ isLoggingIn: false });
  }
}

,
forgotPassword: async (data) => {
  set({ isForgetting: true });
  try {
    const res = await axiosIntance.post(`/auth/forget-Password`,data);
    toast.success("Reset link sent to your email");
    return { success: true };
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return { success: false };
  } finally {
    set({ isForgetting: false });
  }
},

resetPassword: async (data, token) => {
  set({ isReseting: true });
  try {
    const res = await axiosIntance.post(
      `/auth/reset-password/${encodeURIComponent(token)}`, // Encode token in URL
      data
    );
    toast.success("Password reset successfully");
    return res.data; // Return the full response
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  } finally {
    set({ isReseting: false });
  }
}


}));
