import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatListItem = ({ chat }) => {
  const { selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
console.log(onlineUsers)

  if (isUsersLoading) return 
  <div className="!bg-red-700 h-screen w-full">
<h1>Loading...</h1>;
  </div>

  return (
    <div
      key={chat._id}
    //   onClick={() => setSelectedUser(chat)}
      onClick={() => {
  console.log("Selected chat:", chat);
  setSelectedUser(chat);
}}

      className={`p-3 ${
        selectedUser?._id === chat._id ? "bg-gray-200" : "bg-white"
      } border-b border-gray-100 cursor-pointer flex items-center hover:bg-gray-50 relative`}
    >
      <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden relative">
        <img
          src={chat?.profilePic}
          alt="User"
          className="w-full h-full object-cover"
        />
        {onlineUsers.includes(chat._id) && (
          <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{chat.fullName}</h3>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {chat.lastMessage || "No recent message"}
        </p>
      </div>

      {chat.unread > 0 && (
        <div className="ml-2 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
          {chat.unread}
        </div>
      )}
    </div>
  );
};

export default ChatListItem;
