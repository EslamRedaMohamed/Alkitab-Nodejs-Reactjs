import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AdminLayout from "./components/layout/admin/AdminLayout";
import UserLayout from "./components/layout/user/UserLayout";
import React from 'react';

const App: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

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
