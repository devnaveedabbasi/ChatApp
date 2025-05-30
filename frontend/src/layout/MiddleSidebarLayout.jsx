import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLayoutStore } from "../store/useLayout";
import { useChatStore } from "../store/useChatStore";
import Welcome from "../components/Welcome";
import ChatPage from "../pages/ChatPage";

const MiddleSidebarLayout = ({ sidebar }) => {
  const { isIconSidebarHide } = useLayoutStore();
  const { selectedUser } = useChatStore();

  return (
    <div className="flex flex-1 relative ">
      <AnimatePresence mode="wait">
        {/* When sidebar is fully visible */}
        {!isIconSidebarHide && (
          <motion.div
            key="sidebar-open"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1"
          >
            {/* Sidebar */}
            <div className={` w-full md:w-[320px] border-r border-gray-200`}>
              {sidebar}
            </div>

            {/* Main content (hidden on small screens) */}
            <div className="hidden flex-2/3 md:flex flex-row-reverse">
              <Outlet/>
              {/* {selectedUser ? <Outlet /> : <Welcome />} */}
            </div>
          </motion.div>
        )}

        {/* When sidebar is minimized (icon-only) */}
        {isIconSidebarHide && (
          <motion.div
            key="sidebar-closed"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1"
          >
            {/* Sidebar (full width on mobile, fixed on desktop) */}
            <div
              className={`${
                selectedUser ? "md:inline-block hidden" : "block"
              }  w-full md:w-[320px] border-r border-gray-200`}
            >
              {sidebar}
            </div>

            {/* Main content (hidden on small screens) */}
            <div className="hidden flex-2/3 md:flex flex-row-reverse">
              <Outlet/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiddleSidebarLayout;
