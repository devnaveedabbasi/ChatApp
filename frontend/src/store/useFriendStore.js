import { create } from "zustand";
import { axiosIntance } from "../lib/axios";
import toast from "react-hot-toast";


export const useFriendStore = create((set, get) => ({
    IssendRequestLoading:false,
    isAcceptLoading:false,
    isRejectloading:false,
    isAllFriendsLoading:false,
    isGetRequest:[],
    isGetRequestLoading:false,
    isAllFriends:[],
    isAllSuggestedFirends:[],
    isAllSuggestedFirendsLoading:false,
    isUnfriendloading:false,
    isSentRequest:[],
    IsSentRequestLoading:false,
    isCancelRequestLoading:false,
    sendRequest:async(receiverId)=>{
        set({IssendRequestLoading:true})
       try {
            const res = await axiosIntance.post("/friend/request",receiverId);
                        get().getRequest()
            return res.data
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            set({ IssendRequestLoading: false });
          }
    }

,
     acceptFriend:async(requestId)=>{
                set({isAcceptLoading:true})
       try {
            const res = await axiosIntance.post("/friend/accept",requestId);
            return res.data
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            set({ isAcceptLoading: false });
          }
    },

     unfriend:async(friendId)=>{
                set({isUnfriendloading:true})
       try {
            const res = await axiosIntance.post("/friend/unfriend",friendId);
            return res.data
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            set({ isUnfriendloading: false });
          }
    }
    
,
     rejectFriend:async(requestId)=>{
        set({isRejectloading:true})
       try {
            const res = await axiosIntance.post("/friend/rejected",requestId);
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            set({ isRejectloading: false });
          }
    }
    ,
     cancelRequest:async(receiverId)=>{
        set({isCancelRequestLoading:true})
       try {
            const res = await axiosIntance.post("/friend/cancel-request",receiverId);
            return res.data
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            set({ isCancelRequestLoading: false });
          }
    }

,
 getRequest:async()=>{
    set({isGetRequestLoading:true})
       try {
            const res = await axiosIntance.get("/friend/get-requests",);
            set({isGetRequest:res.data.data})
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            set({ isGetRequestLoading: false });
          }
    }
,
 getSentRequest:async()=>{
    set({IsSentRequestLoading:true})
       try {
            const res = await axiosIntance.get("/friend/get-sent-requests",);
            set({isSentRequest:res.data.data})
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            set({ IsSentRequestLoading: false });
          }
    }
,

 allFriends:async()=>{
    set({isAllFriendsLoading:true})
       try {
            const res = await axiosIntance.get("/friend/all-friend",);
            set({isAllFriends:res.data.data})
            return res.data
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            set({ isAllFriendsLoading: false });
          }
    }
,allSuggestedFriends:async()=>{
    set({isAllSuggestedFirendsLoading:true})
       try {
            const res = await axiosIntance.get("/friend/all-suggested-friends",);
            console.log(res)
            set({isAllSuggestedFirends:res.data.data})
          } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
          } finally {
            set({ isAllSuggestedFirendsLoading: false });
          }
    }
    ,
    removeSuggestedFriend: (id) =>
  set((state) => ({
    isAllSuggestedFirends: state.isAllSuggestedFirends.filter(
      (user) => user._id !== id
    ),
  })),
removeReqeust: (id) =>
  set((state) => ({
    isGetRequest: state.isGetRequest.filter(
      (user) => user._id !== id
    ),
  })),

removeFriend: (id) =>
  set((state) => ({
    isAllFriends: state.isAllFriends.filter(
      (user) => user._id !== id
    ),
  })),
  removeSentRequest: (id) =>
  set((state) => ({
    isSentRequest: state.isSentRequest.filter(
      (user) => user._id !== id
    ),
  })),
}))


