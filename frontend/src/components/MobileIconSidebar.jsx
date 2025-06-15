import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { Logo2 } from "../assets";
import { useLayoutStore } from "../store/useLayout";
import { motion, AnimatePresence } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const MobileIconSidebar = () => {
  const { selectedUser } = useChatStore();

  const { isIconSidebarHide, IconSidebarToggle } = useLayoutStore();
  const { authUser } = useAuthStore();
  const topLinks = [
    { path: "/chats", icon: "ic:round-message", label: "Messages" },
    { path: "/friends", icon: "ic:round-people", label: "Friends" },
    {
      path: "/profile",
      icon: "iconoir:profile-circle",
      label: "profile",
    },
  ];

  const bottomLinks = [
    { path: "/setting", icon: "material-symbols:settings", label: "Settings" },
    { path: "/more", icon: "tdesign:more", label: "More" },
  ];

  return (
    <>
      {!selectedUser && (
        <>
          <AnimatePresence>
            {isIconSidebarHide && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 w-full md:w-[50%] lg:w-[25%] h-screen z-50 bg-white shadow-lg"
              >
                <SimpleBar style={{ maxHeight: "100%" }}>
                  {/* Close Button */}
                  <div className="flex justify-end p-4">
                    <button
                      onClick={IconSidebarToggle}
                      className="text-gray-600"
                    >
                      <Icon icon="akar-icons:cross" width={24} height={24} />
                    </button>
                  </div>
                  {/* Sidebar Content */}
                  <div className="flex flex-col justify-between items-start px-4 h-full z-20">
                    {/* User Info */}
                    <div className="w-full">
                      <div className="flex gap-3 items-center mb-6">
                        <div className="w-12 rounded-full">
                          <img
                            src={
                              authUser?.profilePic ||
                              "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                            }
                            alt="Profile"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="text-gray-800 font-medium text-[19px] leading-[22px]">
                            {authUser?.fullName}
                          </h1>
                          <h6 className="text-gray-500 font-medium text-[10px]">
                            {authUser?.email}
                          </h6>
                        </div>
                      </div>

                      <span className="w-full h-[2px] block bg-gray-300 mb-6"></span>

                      {/* Top Links */}
                      <div className="flex flex-col items-start w-full">
                        {topLinks.map((item, index) => (
                          <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                              `flex flex-row gap-2 items-start justify-start w-full py-3 rounded-lg ${
                                isActive
                                  ? "bg-[#52AB86] text-white"
                                  : "hover:bg-gray-100 text-gray-700"
                              }`
                            }
                          >
                            <Icon icon={item.icon} width={24} height={24} />
                            <span className="text-sm mt-1">{item.label}</span>
                          </NavLink>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-start mt-48 w-full gap-2">
                      {bottomLinks.map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.path}
                          className={({ isActive }) =>
                            `flex flex-row items-start justify-start w-full py-3 rounded-lg gap-2 ${
                              isActive
                                ? "bg-[#52AB86] text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`
                          }
                        >
                          <Icon icon={item.icon} width={24} height={24} />
                          <span className="text-sm mt-1">{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </SimpleBar>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default MobileIconSidebar;
