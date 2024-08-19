import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AdminLayout from "./components/layout/admin/AdminLayout";
import UserLayout from "./components/layout/user/UserLayout";
import CategoriesPage from './pages/CateogriesPage';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';

function App() {
  // const { role } = useContext(AppContext);
  let role = "user";
  // let role = "admin";

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {role === "admin" ? (
          <AdminLayout>
            <Routes>
              {/* Admin-specific routes can go here if needed */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/books" element={<BooksPage />} />
              {/* Add other admin-specific routes here */}
              <Route path="*" element={<AppRoutes isAdmin={true} />} />
            </Routes>
          </AdminLayout>
        ) : (
          <UserLayout>
            <Routes>
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/books" element={<BooksPage />} />
              {/* Add other user-specific routes here */}
              <Route path="*" element={<AppRoutes isAdmin={false} />} />
            </Routes>
          </UserLayout>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
