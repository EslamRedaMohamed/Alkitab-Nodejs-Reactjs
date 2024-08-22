import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import SearchResults from "./pages/SearchResults/SearchResults";
import LoginForm from "./pages/LoginForm/LoginForm.tsx";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import ProfilePage from "./pages/ProfilePage/Profile";
import MyBooks from "./pages/MyBooks/MyBooks";
import AuthorsPage from "./pages/AdminSidePages/AuthorsPage.tsx";
import BooksPage from "./pages/AdminSidePages/BooksPage.tsx";
import CategoriesPage from "./pages/AdminSidePages/CateogriesPage.tsx";
import BookPage from "./pages/BookPage/BookPage.tsx";
import Categories from "./pages/Categories/CategoriesPage";
import Authors from "./pages/Authors/AuthorsPage.tsx";
import AuthorPage from "./pages/AuthorPage/AuthorPage.tsx";
import CategoryPage from "./pages/CategoryPage/CategoryPage.tsx";

interface AppRoutesProps {
  isAdmin: boolean;
}

function AppRoutes({ isAdmin }: AppRoutesProps) {
  return (
    <Routes>
      {isAdmin ? (
        <>
          <Route path="admin/login" element={<LoginForm />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
          <Route path="/admin/manage-books" element={<BooksPage />} />
          <Route path="/admin/manage-authors" element={<AuthorsPage />} />
          <Route path="/admin/manage-categories" element={<CategoriesPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/users/books" element={<Books />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/myBooks" element={<MyBooks />} />
          <Route path="/Books/:bookId" element={<BookPage />} />
          <Route path="/users/categories" element={<Categories />} />
          <Route path="/users/Authors" element={<Authors />} />
          <Route path="/AuthorPage/:categoryId" element={<AuthorPage />} />
          <Route path="/CategoryPage/:authorId" element={<CategoryPage />} />
          <Route path="authors/:authorId" element={<AuthorPage />} />
          <Route path="categories/:categoryId" element={<CategoryPage />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
