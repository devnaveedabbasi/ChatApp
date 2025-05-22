import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { useAuthStore } from './store/useAuthStore';
import router from './router/router'; // Import your router here

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;
