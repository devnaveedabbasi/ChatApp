import React from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatContainer from '../components/ChatContainer'
import Welcome from '../components/Welcome'

export default function  ChatPage() {
    const {selectedUser}=useChatStore()
  return (
    <div>
     {selectedUser?(
         <ChatContainer/>
     ):(
<Welcome/>
     )}      
    </div>
  )
}
