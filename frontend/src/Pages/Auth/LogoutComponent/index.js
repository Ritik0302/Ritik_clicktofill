import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LogoutComponent = () => {
  const navigate = useNavigate();

  const clearCredentials = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("tokenCreationTime");
  };

  useEffect(() => {
    clearCredentials();
    navigate("/login"); // Redirect to login or another appropriate page
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default LogoutComponent;
