import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AdminLayout from "./components/layout/admin/AdminLayout";
import UserLayout from "./components/layout/user/UserLayout";
import React from 'react';
import axios from "axios";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
const App: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  console.log(`${import.meta.env.VITE_API_URL}`);

  return (
    <div className="flex flex-col min-h-screen">
      {isAdmin ? (
        <AdminLayout>
          <AppRoutes isAdmin={true} />
        </AdminLayout>
      ) : (
        <UserLayout>
          <AppRoutes isAdmin={false} />
        </UserLayout>
      )}
    </div>
  );
};

const WrappedApp: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
