import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useFriendStore } from "../store/useFriendStore";

export default function SuggestFriends() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const {
    isAllSuggestedFirends,
    allSuggestedFriends,
    removeSuggestedFriend,
    IssendRequestLoading,
    sendRequest,
    isAllSuggestedFirendsLoading,
    cancelRequest,
  } = useFriendStore();

  useEffect(() => {
    allSuggestedFriends();
  }, [allSuggestedFriends, cancelRequest]);

  console.log(isAllSuggestedFirends);

  const handleRequest = async (user) => {
    try {
      const res = await sendRequest({ receiverId: user._id });

      if (res.success) {
        removeSuggestedFriend(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (user) => {
    removeSuggestedFriend(user._id);
  };

  return (
    <>
      <div className="flex flex-col w-[100%]">
        <div className="p-[25px] border-b border-gray-300 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Suggested Friend</h2>
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

            <button className="p-1 rounded-full hover:bg-gray-100">
              <Icon icon="tdesign:more" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 mt-2">
          <h2 className="font-semibold text-2xl">Suggested Friend</h2>
          <h6 className="text-md text-md text-gray-500 !-mt-3">All Friends</h6>
        </div>
        {isAllSuggestedFirendsLoading ? (
          <>
            <div className="flex justify-center items-center">loading</div>
          </>
        ) : (
          <>
            <div className=" grid md:grid-cols-4 grid-cols-1 justify-center items-start gap-4 p-6 overflow-y-auto h-screen !w-full">
              {isAllSuggestedFirends?.map((user) => (
                <div
                  key={user.id}
                  className="bg-[#fafafa] shadow-sm text-wrap flex-wrap overflow-hidden rounded-lg p-4 flex flex-col justify-center items-center"
                >
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="w-18 h-18 rounded-full mb-2 object-cover"
                  />
                  <h4 className="font-bold">{user.fullName}</h4>
                  <h6 className="text-gray-600 !text-wrap   text-[10px]">
                    {user.email}
                  </h6>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleRemove(user)}
                      className="mt-2 px-4 py-1 bg-[#f3f3f3] text-[#212121] rounded hover:bg-[#eeeeee] cursor-pointer"
                    >
                      Remove
                    </button>
                    <button
                      className="mt-2 px-4 py-1 bg-[#52ab86] text-white rounded hover:bg-[#ceebdf] cursor-pointer"
                      onClick={() => handleRequest(user)}
                    >
                      {IssendRequestLoading ? "Requesting" : "Request"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
