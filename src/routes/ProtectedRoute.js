import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const username = localStorage.getItem("username"); // Check if user is authenticated

  if (!username) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
