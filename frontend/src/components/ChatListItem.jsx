import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatListItem = ({ chat }) => {
  const { selectedUser, setSelectedUser } =useChatStore();
  const { onlineUsers } = useAuthStore();

 
  return (
    <>
    
<div
      key={chat._id}
      //   onClick={() => setSelectedUser(chat)}
      onClick={() => {
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
          className="w-full h-full object-cover "
        />
      </div>
      {onlineUsers.includes(chat._id) && (
        <span className="absolute top-4  left-10  size-3 bg-green-500 rounded-full ring-2 ring-white" />
      )}

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{chat.fullName}</h3>
        </div>
        {chat?.messageType === "sent" ? (
          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
        ) : (
          <p className="text-sm text-green-400 truncate">{chat.lastMessage}</p>
        )}
      </div>

      {chat.unread > 0 && (
        <div className="ml-2 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
          {chat.unread}
        </div>
      )}
    </div>
    
    </>

  );
};

export default ChatListItem;
