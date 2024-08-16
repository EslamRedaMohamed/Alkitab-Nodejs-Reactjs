import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/admin/AdminLayout";
import UserLayout from "./components/layout/user/UserLayout";

// CRUD Pages
import CategoriesPage from './pages/CategoriesPage';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';

const App: React.FC = () => {
  // const { role } = useContext(AppContext);
  let role = "user";
  // let role = "admin";

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F5F7F8]">
        {role === "admin" ? (
          <AdminLayout>
            <Routes>
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/books" element={<BooksPage />} />
            </Routes>
          </AdminLayout>
        ) : (
          <UserLayout>
            <Routes>
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/books" element={<BooksPage />} />
            </Routes>
          </UserLayout>
        )}
      </div>
    </Router>
  );
};

export default App;
