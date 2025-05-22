import React from 'react'
import { Logo } from '../assets'

export default function Welcome() {
  return (
         <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
          <img src={Logo} alt=""  className='w-12 h-12'/>
        <h2 className="text-xl font-semibold text-gray-700 mt-1">Chatzy Web</h2>
        <p className="text-gray-500 text-center max-w-md px-4">
          Select a chat to start messaging or create a new conversation
        </p>
      </div>
  )
}
