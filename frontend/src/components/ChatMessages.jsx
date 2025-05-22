import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { FormatMessageTime } from '../utlis/formatMessageTime'; 
import { useAuthStore } from '../store/useAuthStore'
import { ChatBg } from '../assets';

export default function ChatMessages() {
  const { selectedUser, message, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]);

  return (
<div
  className="flex-1 overflow-y-auto p-4 space-y-4 bg-cover bg-center"
  style={{ backgroundImage: `url(${ChatBg})` }}>

      {Array.isArray(message) && message.length > 0 ? (
        message.map((msg) => {
          const isSender = msg.senderId === authUser._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[70%] ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Profile Picture */}
                <div className="w-10 h-10 rounded-full overflow-hidden border">
                  <img
                    src={isSender ? authUser.profilePic || '' : selectedUser?.profilePic || ''}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Message Content */}
                {msg.text &&(
<div
                  className={`rounded-md px-4 py-3 text-sm break-words ${
                    isSender ? 'bg-[#52AB86] text-white' : 'bg-white text-black'
                  }`}
                >
                 <>
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Attachment"
                          className="max-w-[200px] rounded-md mb-2"
                        />
                      )}
                    </>
                  {msg.text && <p>{msg.text}</p>}
                 
                </div>
                )}
                



                   <div
                  className={`rounded-md px-4 py-3 text-sm break-words`}
                  style={{ display: 'inline-block' }}
                >
                    
                  {(!msg.text || (!msg.text && msg.image)) && (
                    <>
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Attachment"
                          className="max-w-[200px] rounded-md mb-2"
                        />
                      )}
                    </>
                  )}
                </div>

              </div>

              {/* Timestamp */}
              <span className="text-xs mt-1 text-gray-500 ml-2">
                {FormatMessageTime(msg.createdAt)}
              </span>
            </div>
          );
        })
      ) : (
        <p className="text-center text-red-500">No messages yet</p>
      )}

      <div ref={messageEndRef} />
    </div>
  );
}

