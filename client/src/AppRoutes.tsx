import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
// import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import About from "./pages/About/About";
// import ManageBooks from "./pages/ManageBooks/ManageBooks";
// import ManageUsers from "./pages/ManageUsers/ManageUsers";
// import ManageAuthors from "./pages/ManageAuthors/ManageAuthors";
import ManageCategories from "./pages/ManageCategories/ManageCategories";
import SearchResults from "./pages/SearchResults/SearchResults";
import LoginForm from "./pages/LoginForm/LoginForm.tsx";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import ProfilePage from "./pages/ProfilePage/Profile";
import MyBooks from "./pages/MyBooks/MyBooks";
import AuthorsPage from "./pages/AdminSidePages/AuthorsPage.tsx";
import BooksPage from "./pages/AdminSidePages/BooksPage.tsx";
import CategoriesPage from "./pages/AdminSidePages/CateogriesPage.tsx";
import BookPage from "./pages/BookPage/BookPage.tsx";

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
          <Route path="admin/login" element={<LoginForm />} />
          <Route path="/admin/manage-books" element={<BooksPage />} />
          <Route path="/admin/manage-authors" element={<AuthorsPage />} />
          <Route path="/admin/manage-categories" element={<CategoriesPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/myBooks" element={<MyBooks />} />
          <Route path="/Books/:bookId" element={<BookPage />} />
          
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
