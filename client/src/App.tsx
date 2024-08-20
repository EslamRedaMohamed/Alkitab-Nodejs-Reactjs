import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AdminLayout from "./components/layout/admin/AdminLayout";
import UserLayout from "./components/layout/user/UserLayout";

const App: React.FC = () => {
  // const { role } = useContext(AppContext);
  // let role = "user";
  let role = "admin";
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {role === "admin" ? (
          <AdminLayout>
            <AppRoutes isAdmin={true} />
          </AdminLayout>
        ) : (
          <UserLayout>
            <AppRoutes isAdmin={false} />
          </UserLayout>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
