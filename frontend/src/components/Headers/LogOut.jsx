import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";
import { logout } from "../../store/authSlice";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout =() => {
    authService.logout().then(()=>dispatch(logout()))
  };
  return <div  onClick={handleLogout}>Logout</div>;
};

export default LogOut;
