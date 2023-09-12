/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
export const RequiredAuth = ({children}) => {
  const navigate = useNavigate();
  const token = console.log(localStorage.getItem('token'))
  const isAuthenticated = !!token;
  console.log(isAuthenticated)
  if(!isAuthenticated){
    return navigate("/login")
  }
  return children
}
