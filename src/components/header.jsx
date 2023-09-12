import { Link, Navigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");

  const isAuthenticated = !!token;
  const handleLogout = () => {
    localStorage.removeItem("token");
    <Navigate to="/login" />;
    window.location.reload();
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
