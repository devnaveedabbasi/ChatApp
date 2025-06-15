// routes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import MiddleSidebarLayout from "../layout/MiddleSidebarLayout";

import ChatListSidebar from "../components/ChatListSidebar";
import ChatContainer from "../components/ChatContainer";

import SignUpPage from "../pages/SignUp";
import LoginPage from "../pages/Login";
import OtpPage from "../pages/VerifyOtp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import { useAuthStore } from "../store/useAuthStore";
import React from "react";
import FirendList from "../components/freindList";
import SuggestFreinds from "../pages/SuggestFreinds";
import Profile from "../components/Profile";
import UpdateProfile from "../pages/UpdateProfile";

const PrivateRoute = ({ children }) => {
  const { authUser } = useAuthStore();

  if (!authUser) {
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
        path: "/",
        element: <MiddleSidebarLayout sidebar={<ChatListSidebar />} />,
        children: [
          {
            index: true,
            element: <ChatContainer />,
          },
        ],
      },
      {
        path: "friends",
        element: <MiddleSidebarLayout sidebar={<FirendList />} />,
        children: [
          {
            index: true,
            element: <SuggestFreinds />,
          },
        ],
      },
      {
        path: "profile",
        element: <MiddleSidebarLayout sidebar={<Profile />} />,
        children: [
          {
            index: true,
            element: <UpdateProfile />,
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
