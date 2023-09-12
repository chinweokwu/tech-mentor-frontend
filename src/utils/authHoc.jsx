import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const RequiredAuth = ({children}) => {
  const token = useSelector((state) => state.auth.user)
  const isAuthenticated = !!token;
  
  if(!isAuthenticated){
    return <Navigate to="/login" />
  }
  return children
}
