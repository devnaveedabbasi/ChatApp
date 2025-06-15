import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { chats } from "../constant/data";
import { useChatStore } from "../store/useChatStore";
import { ChatBg, Logo, Logo2 } from "../assets";
import ChatHeader from "./ChatHeader";
import { useEffect } from "react";
import Welcome from "./Welcome";
import MessageInput from "./MessageInput";
import ChatMessages from "./ChatMessages";
import { Toaster } from "react-hot-toast";

const ChatContainer = () => {
  const { selectedUser, message, isMessagesLoading, getMessages } =
    useChatStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto !h-screen">
        <ChatHeader />
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-cover bg-center"
          style={{ backgroundImage: `url(${ChatBg})` }}
        >
          <>
            <div className="flex justify-center items-center text-center ">
              Loading
            </div>
          </>
        </div>
      </div>
    );
  }

  if (!selectedUser) {
    return <Welcome />;
  }

  return (
    <>
          <Toaster position="top-right" reverseOrder={false} />  
    <div
      className={`w-full h-screen flex-1 flex flex-col bg-cover bg-center`}
      style={{ backgroundImage: `url(${ChatBg})` }}
    >
      <ChatHeader />

      <div className="flex-1 p-4 overflow-y-auto ">
        <ChatMessages />
      </div>

      <MessageInput />
    </div>
    </>

  );
};

export default ChatContainer;
