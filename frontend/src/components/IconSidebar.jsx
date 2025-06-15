import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { Logo2 } from "../assets";
import { useLayoutStore } from "../store/useLayout";
import { motion, AnimatePresence } from "framer-motion";

const IconSidebar = () => {
  const { isIconSidebarHide } = useLayoutStore();

  const topLinks = [
    { path: "/", icon: "ic:round-message" },
    { path: "/friends", icon: "ic:round-people" },
    { path: "/profile", icon: "iconoir:profile-circle" },
  ];

  const bottomLinks = [
    { path: "/setting", icon: "material-symbols:settings" },
    { path: "/more", icon: "tdesign:more" },
  ];

  return (
    <AnimatePresence>
      {isIconSidebarHide && (
        <motion.div
          initial={{ x: -100 }} // Start hidden off-screen
          animate={{ x: 0 }} // Slide in to 0 position (fully visible)
          exit={{ x: -100 }} // Slide out to the left
          transition={{ duration: 0.3 }} // Set duration of transition
          className=" w-16 bg-[#52AB86] text-white flex flex-col items-center py-2 h-full"
        >
          {/* Sidebar content here */}
          {/* Logo */}
          <div className="mb-2 p-3">
            <img src={Logo2} alt="Logo" />
          </div>

          <span className="w-full block h-[2px] bg-white mb-8"></span>

          {/* Top icons */}
          {topLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `p-2 mb-4 rounded-lg cursor-pointer ${
                  isActive
                    ? "bg-white text-[#52AB86]"
                    : "hover:bg-white hover:text-[#52AB86]"
                }`
              }
            >
              <Icon icon={item.icon} width={24} height={24} />
            </NavLink>
          ))}

          {/* Bottom icons */}
          <div className="mt-auto flex flex-col items-center gap-3">
            {bottomLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `p-2 rounded-lg cursor-pointer ${
                    isActive
                      ? "bg-white text-[#52AB86]"
                      : "hover:bg-white hover:text-[#52AB86]"
                  }`
                }
              >
                <Icon icon={item.icon} width={24} height={24} />
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IconSidebar;

{
  /* <div className={`${isIconSidebarHide ? 'flex' : 'hidden'} w-16 bg-[#52AB86] text-white flex-col items-center py-2`}>

</div> */
}
