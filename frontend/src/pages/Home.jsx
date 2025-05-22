import ChatListSidebar from '../components/ChatListSidebar';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-1">
      <ChatListSidebar />
      <Outlet />
    </div>
  );
};

export default HomePage;
