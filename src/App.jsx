import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home/home";
import MainPage from "./pages/Dashboard/MainPage";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logOut } from "./features/auth/authSlice";

const App = () => {
  const token = useSelector((state) => state.auth.user)
  const isAuthenticated = !!token;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logOut());
    }
  }, [isAuthenticated, dispatch]);
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
                <Navigate to="/login" /> // Redirect to login if not authenticated
              )
            }
          >
            <Route
              path="/dashboard"
              element={isAuthenticated ? <MainPage /> : null} // Render MainPage only if authenticated
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
