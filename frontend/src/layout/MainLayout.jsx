import IconSidebar from "../components/IconSidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {

  return (
    <div className="flex h-screen">
      {/* Left Icon Sidebar */}
      <div className="md:flex hidden">
        <IconSidebar />
      </div>

    
      {/* Middle + Right Combined */}
      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
