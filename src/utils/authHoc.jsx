/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
export const RequiredAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
