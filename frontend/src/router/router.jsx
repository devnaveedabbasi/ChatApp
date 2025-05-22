// routes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from '../layout/MainLayout';
import MiddleSidebarLayout from '../layout/MiddleSidebarLayout';

import ChatListSidebar from '../components/ChatListSidebar';
import ChatContainer from '../components/ChatContainer';

import SignUpPage from '../pages/SignUp';
import LoginPage from '../pages/Login';
import ProfilePage from '../pages/Profile';
import OtpPage from '../pages/VerifyOtp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import { useAuthStore } from '../store/useAuthStore';
import React from "react";
import { useChatStore } from "../store/useChatStore";

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const authUser = useAuthStore(state => state.authUser);  // Use hook here to get latest authUser
  const {selectedUser}=useChatStore()
  if (!authUser) {
    // agar logged in nahi hai to login page par bhej do
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/verify-otp/:userId",
    element: <OtpPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/*",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
  path: "chats",
  element: <MiddleSidebarLayout sidebar={<ChatListSidebar />} />,
  children: [
    {
      index: true,
      element: <ChatContainer />,
    },
  ],
}
,
      {
        path: "status",
        element: <MiddleSidebarLayout sidebar={<h1>Status</h1>} />,
        children: [
          {
            index: true,
            element: (
              <h1 className="text-center mt-10 text-gray-500">📷 Select a status to view</h1>
            ),
          },
          {
            path: ":statusId",
            element: <h1>StatusDetails</h1>,
          },
        ],
      },
    ],
  },
  // agar koi aur route match nahi karta to login par bhej do
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
