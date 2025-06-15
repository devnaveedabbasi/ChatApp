import { Icon } from "@iconify/react";
import ChatListItem from "./ChatListItem";
// import { chats } from "../constant/data";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useLayoutStore } from "../store/useLayout";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatListSidebar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getUsers, users, isUsersLoading } = useChatStore();

  const { authUser } = useAuthStore();
  const { isIconSidebarHide, IconSidebarToggle } = useLayoutStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className={`w-12  rounded-full`}>
            <img
              src={
                authUser?.profilePic ||
                "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              }
              alt="Logo"
              className="rounded-full w-full h-12 object-cover border-2 border-[#52AB86] shadow-md"
            />
          </div>
          <div>
            <h1 className="text-gray-800 font-medium text-[19px] leading-[22px]">
              {authUser?.fullName}
            </h1>
            <h6 className="text-gray-500 font-medium text-[10px]">
              {authUser?.email}
            </h6>
          </div>
        </div>

        <div
          onClick={IconSidebarToggle}
          className="cursor-pointer p-2 md:flex hidden"
        >
          <Icon
            icon={
              isIconSidebarHide ? "ic:sharp-arrow-right" : "ic:sharp-arrow-left"
            }
            width={30}
            height={30}
            className="text-[#52AB86] transition-transform duration-300"
          />
        </div>
      </div>
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Chats</h2>
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
      {isUsersLoading ? (
        <div className="flex justify-center items-center">loading</div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((chat) => <ChatListItem key={chat._id} chat={chat} />)
          ) : (
            <div className="text-center text-gray-500 mt-10">No chat yet</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatListSidebar;
