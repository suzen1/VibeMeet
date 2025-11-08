// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import PageLoder from "./PageLoder";

export default function ProtectedRoute({ children }) {
  const { isLoading, authUser } = useAuthUser();
  const location = useLocation();

  // 1) Still fetching user -> show loading UI (prevent redirect)
  if (isLoading) {
    return <PageLoder />;
  }

  // 2) Done loading but no user -> redirect to login
  if (!authUser) {
    // preserve attempted location in state so login can redirect back after success
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3) Have user -> show protected content
  return <>{children}</>;
}
