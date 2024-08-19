import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import About from "./pages/About/About";
import ManageBooks from "./pages/ManageBooks/ManageBooks";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageAuthors from "./pages/ManageAuthors/ManageAuthors";
import ManageCategories from "./pages/ManageCategories/ManageCategories";
import SearchResults from "./pages/SearchResults/SearchResults";
import MyBooks from "./pages/MyBooks/MyBooks";
import Categories from "./pages/Categories/CategoriesPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import AuthorsPage from "./pages/Authors/AutorsPage";

// const AppRoutes: React.FC = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/books" element={<Books />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/dashboard" element={<AdminDashboard />} />
//       {/* Add other routes here */}
//     </Routes>
//   );
// };

// export default AppRoutes;

interface AppRoutesProps {
  isAdmin: boolean;
}

function AppRoutes({ isAdmin }: AppRoutesProps) {
  return (
    <Routes>
      {isAdmin ? (
        <>
          <Route path="/admin/manage-books" element={<ManageBooks />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-authors" element={<ManageAuthors />} />
          <Route
            path="/admin/manage-categories"
            element={<ManageCategories />}
          />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/users/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/signout" element={<Signout/>} /> */}
          <Route path="/search" element={<SearchResults />} />
          <Route path="/myBooks" element={<MyBooks />} />
          <Route path="/users/categories" element={<CategoriesPage />} />
          <Route path="/users/Authors" element={<AuthorsPage />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
