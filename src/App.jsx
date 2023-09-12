import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home/home";
import MainPage from "./pages/Dashboard/MainPage";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const App = () => {
  const token = useSelector((state) => state.auth.user);
  const isAuthenticated = !!token;
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle redirection to login when not authenticated
  const redirectToLogin = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={
              isAuthenticated ? (
                <Outlet />
              ) : (
                <Navigate to="/login" replace /> // Redirect to login if not authenticated
              )
            }
          >
            <Route
              path="/dashboard"
              element={
                <MainPage />
              }
              beforeEnter={redirectToLogin} // Apply the redirection function
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;