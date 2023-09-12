/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const RequiredAuth = ({children}) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.user)
  const isAuthenticated = !!token;
  
  if(!isAuthenticated){
    return navigate("/login")
  }
  return children
}
