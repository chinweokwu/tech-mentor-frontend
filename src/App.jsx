import {
  BrowserRouter as Router,
  useNavigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home/home";
import MainPage from "./pages/Dashboard/MainPage";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const isAuthenticated = !!token;
  console.log(isAuthenticated);
  const navigate = useNavigate();


  const PrivateWrapper = ({ children }) => {
    return isAuthenticated ? children : navigate("/login");
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
              <PrivateWrapper>
                <Outlet />
              </PrivateWrapper>
            }
          >
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <MainPage /> : navigate("/login")
              }
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
