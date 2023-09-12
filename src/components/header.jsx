import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {logOut } from '../features/auth/authSlice'
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const isAuthenticated = !!token;
  const handleLogout = () => {

    dispatch(logOut());
    // Debugging: Add console.log statements
    console.log("Logging out...");
    
    // Clear the token from localStorage
    localStorage.removeItem("token");
    
    // Debugging: Check if the token was removed
    console.log("Token removed from localStorage");
    console.log(    localStorage.getItem("token")    )
    // Redirect to the login page
    navigate("/login");
  };
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          ALX
        </Link>
        <ul className="flex space-x-4">
          {isAuthenticated ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-200">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-200">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
