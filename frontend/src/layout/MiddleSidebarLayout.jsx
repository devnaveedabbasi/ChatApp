import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLayoutStore } from "../store/useLayout";
import { useChatStore } from "../store/useChatStore";

const MiddleSidebarLayout = ({ sidebar }) => {
  const { isIconSidebarHide } = useLayoutStore();
const {selectedUser}=useChatStore()
  return (
    <div className="flex flex-1 relative md:w-80 w-full bg-red-200">
      <AnimatePresence mode="wait">
        {!isIconSidebarHide && (
          <motion.div
            key="sidebar-open"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1"
          >
            <div className="border-r border-gray-200 !w-full">{sidebar}</div>
            <div className="md:flex hidden   bg-gray-500">
              <Outlet />
            </div>
          </motion.div>
        )}

        {isIconSidebarHide && (
          <motion.div
            key="sidebar-closed"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1"
          >
            <div className={`border-r md:w-80 ${selectedUser ?'hidden' :'w-full'} border-gray-200 bg-white`}>{sidebar}</div>
            <div className={`md:flex ${selectedUser?'flex':"hidden"} flex-1 bg-gray-50`}>
              <Outlet />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiddleSidebarLayout;
