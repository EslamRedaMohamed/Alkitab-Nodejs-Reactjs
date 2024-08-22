import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/common/UserTable";
import "./MyBooks.css";

const MyBooks = () => {
  const navigate = useNavigate();

  // Get user data from localStorage
  const userData = localStorage.getItem('user');

  useEffect(() => {
    if (!userData) {
      // If no user is signed in, navigate to the login page
      navigate('/login');
    }
  }, [navigate]);

  if (userData) {
    const { id } = JSON.parse(userData);
    return (
      <div>
        <UserTable userId={id} />
      </div>
    );
  } else {
    return <h1>Redirecting to login...</h1>;
  }
};

export default MyBooks;
