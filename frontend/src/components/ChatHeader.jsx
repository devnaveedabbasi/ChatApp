import { Icon } from "@iconify/react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="!w-full  p-3 border-b border-gray-200 bg-[#f2feff] flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-100 mr-3">
          <img
            src={selectedUser.profilePic}
            alt=""
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>

        <div>
          <h3 className="font-medium">{selectedUser.fullName}</h3>
          <p className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="p-1 rounded-full hover:bg-gray-100"
      >
        <Icon icon="ic:sharp-close" width={25} height={25} />
      </button>
    </div>
  );
};
export default ChatHeader;
