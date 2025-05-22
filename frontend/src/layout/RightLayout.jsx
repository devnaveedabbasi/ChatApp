import { Outlet } from "react-router-dom";

const RightLayout = () => {
  return (
    <div className="flex">
      
      <div className="flex-1 bg-gray-50">
        <Outlet /> 
      </div>
    </div>
  );
};

export default RightLayout;
