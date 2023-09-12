import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token");

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return AuthComponent;
};

export default withAuth;