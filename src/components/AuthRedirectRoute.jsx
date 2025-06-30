// AuthRedirectRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppointmentContext } from "../context/AppointmentContext";

const AuthRedirectRoute = ({ children }) => {
  const { isAuthenticated, user, loading, admin } = useAuth();
  const { fromSocial } = useContext(AppointmentContext);

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  // الأولوية للمستخدم العادي
  if (isAuthenticated && user) {
    if (fromSocial) {
      return <Navigate to={`/${user._id}/Info`} replace />;
    }
    return <Navigate to={`/${user._id}/`} replace />;
  }

  // ثم للمسؤول
  if (isAuthenticated && admin) {
    return <Navigate to={`/${admin._id}/home`} replace />;
  }

  // إذا لم يكن مصادقًا عليه، اعرض المحتوى الأصلي (صفحة تسجيل الدخول/التسجيل)
  return children;
};

export default AuthRedirectRoute;
