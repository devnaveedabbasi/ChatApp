import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useLayoutStore } from "../store/useLayout";
import { AnimatePresence, motion } from "framer-motion";
import { useFriendStore } from "../store/useFriendStore";
import { Toaster } from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";
import SidebarHeader from "./sidebarHeader";

export default function FriendList() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setSelectedUser } = useChatStore();
  const navigate = useNavigate();
  const {
    isAllFriends,
    isAllFriendsLoading,
    allFriends,
    getRequest,
    isGetRequest,
    isGetRequestLoading,
    acceptFriend,
    removeReqeust,
    isUnfriendloading,
    unfriend,
    removeFriend,
    getSentRequest,
    IsSentRequestLoading,
    isSentRequest,
    cancelRequest,
    isCancelRequestLoading,
    removeSentRequest,
    sendRequest,
    allSuggestedFriends,
    requestSentCount,
  } = useFriendStore();
  const [activeTab, setActiveTab] = useState("Friends");

  useEffect(() => {
    allFriends();
    getRequest();
    getSentRequest();
  }, [requestSentCount]);

  console.log(isAllFriends, "all frindds");
  console.log(isGetRequest);

  const handleConfirm = async (user) => {
    try {
      const res = await acceptFriend({ requestId: user });
      if (res.success) {
        removeReqeust(user);
        allFriends();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfriend = async (user) => {
    try {
      const res = await unfriend({ friendId: user });
      if (res.success) {
        removeFriend(user);
      }
    } catch (error) {}
  };

  const handleCancel = async (requestId) => {
    try {
      const res = await cancelRequest({ receiverId: requestId });
      console.log(res);
      if (res.success) {
        removeSentRequest(requestId);
        getSentRequest();
        allSuggestedFriends();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Toaster />

      <SidebarHeader title="Friends" />

      {/* Header */}
      <div className="p-3 border-b border-gray-300 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Friends</h2>
        <div className="flex space-x-2 items-center">
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            onKeyDown={(e) => e.key === "Escape" && setIsSearchOpen(false)}
          >
            <Icon icon="ic:sharp-search" width={20} height={20} />
          </button>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "150px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                autoFocus
                placeholder="Search..."
                className="border border-gray-300 px-2 py-1 rounded-md text-sm outline-none"
              />
            )}
          </AnimatePresence>

          {/* <button className="p-1 rounded-full hover:bg-gray-100">
      <Icon icon="tdesign:more" width={20} height={20} />
    </button> */}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 my-4">
        {["Friends", "Requests", "Pending"].map((tab) => (
          <button
            key={tab}
            className={`rounded-full text-[15px] px-4 py-2  ${
              activeTab === tab
                ? "bg-[#52AB86] text-white"
                : "bg-[#f3f3f3] text-[#212121]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "Friends" && (
          <>
            {isAllFriendsLoading ? (
              <div>Loading...</div>
            ) : isAllFriends && isAllFriends.length > 0 ? (
              isAllFriends.map((user) => (
                <div
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                    navigate("/");
                  }}
                  className="flex items-center justify-between p-4 border-b border-gray-300"
                >
                  <div className="flex items-center gap-1">
                    <img
                      src={user.profilePic}
                      alt="avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-md">{user.fullName}</p>
                      <p className="text-[10px] text-gray-500 -mt-1 overflow-x-auto !w-[130px]">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnfriend(user._id)}
                      className="bg-[#52ab86] text-white px-2 ml-3 text-sm p-1 rounded-full"
                    >
                      {isUnfriendloading ? "Loading" : "Unfriend"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">No friends</div>
            )}
          </>
        )}

        {activeTab === "Requests" && (
          <>
            {isGetRequestLoading ? (
              <div>Loading...</div>
            ) : isGetRequest && isGetRequest.length > 0 ? (
              isGetRequest.map((request) => {
                const user = request.sender;
                return (
                  <div
                    key={request._id}
                    className="flex items-center justify-between p-4 border-b border-gray-300"
                  >
                    <div className="flex items-center gap-1">
                      <img
                        src={user.profilePic}
                        alt="avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-md">{user.fullName}</p>
                        <p className="text-[10px] text-gray-500 -mt-1 overflow-x-auto !w-[130px]">
                          {user.email}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {/* Pass request._id here */}
                        <button
                          onClick={() => handleConfirm(request._id)}
                          className="border-[#52ab86] border text-[#212121] hover:bg-[#5a5a5a] hover:text-white cursor-pointer p-2 rounded-full"
                        >
                          <Icon icon="ri:check-fill" width={20} />
                        </button>
                        <button className="border-[#52ab86] border text-[#212121] hover:bg-[#52ab86] cursor-pointer p-2 rounded-full">
                          <Icon icon="ri:close-line" width={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">No friend requests</div>
            )}
          </>
        )}

        {activeTab === "Pending" && (
          <>
            {IsSentRequestLoading ? (
              <div>Loading...</div>
            ) : isSentRequest && isSentRequest.length > 0 ? (
              isSentRequest.map((request) => {
                const user = request.receiver;
                return (
                  <div
                    key={request._id}
                    className="flex items-center justify-between p-4 border-b border-gray-300"
                  >
                    <div className="flex items-center gap-1">
                      <img
                        src={user.profilePic}
                        alt="avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-md">{user.fullName}</p>
                        <p className="text-[10px] text-gray-500 -mt-1 overflow-x-auto !w-[130px]">
                          {user.email}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {/* Pass request._id here */}
                        <button
                          onClick={() => handleCancel(user._id)}
                          className="bg-[#52ab86] text-white px-2 ml-3 text-sm p-1 rounded-full"
                        >
                          {isCancelRequestLoading ? "Loading" : "Cancel"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">No friend requests</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
