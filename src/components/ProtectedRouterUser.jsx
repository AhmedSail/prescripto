import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRouterUser = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // عرض شاشة تحميل أثناء فحص حالة المصادقة
  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  // إذا لم يكن المستخدم مسجل الدخول، قم بإعادة توجيهه إلى صفحة تسجيل الدخول
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // إذا كان مسجل الدخول، اعرض المحتوى المحمي
  return children;
};

export default ProtectedRouterUser;
