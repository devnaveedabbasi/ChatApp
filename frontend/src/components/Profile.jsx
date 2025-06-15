import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import SidebarHeader from "./sidebarHeader";
import { useAuthStore } from "../store/useAuthStore";

export default function Profile() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, []);
  return (
    <div>
      <Toaster />
      <SidebarHeader title="Profile" />

      <div>
        <div className="p-4">
          <h2 className="text-gray-800 font-semibold text-lg">User Profile</h2>
          <p className="text-gray-600 mt-2">
            This is where user profile details will be displayed.
          </p>
        </div>
        <div>
          {isCheckingAuth ? (
            <div className="flex justify-center items-center h-[70vh]">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="p-4 border-t border-gray-300">
              <img
                src={authUser?.profilePic}
                alt="Profile"
                className="w-52 h-52 rounded-full mx-auto mb-4  shadow-md object-cover"
              />
              <div className="mx-auto text-center">
                <h1 className="text-gray-800 font-medium text-[20px] leading-[22px]">
                  {authUser?.fullName}
                </h1>

                <h6 className="text-gray-600">{authUser?.email}</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
