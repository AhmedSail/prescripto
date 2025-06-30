import React, { createContext, useState, useContext, useEffect } from "react";
import { AppointmentContext } from "./AppointmentContext";

// إنشاء السياق
const AuthContext = createContext();

// مزود السياق
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { formSocial, setFromSocial } = useContext(AppointmentContext);

  // فحص حالة المصادقة عند تحميل التطبيق
  useEffect(() => {
    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("userData");
    const storedAdmin = localStorage.getItem("adminData");

    try {
      if (token && storedUser) {
        const userData = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(userData);
      } else if (token && storedAdmin) {
        const adminData = JSON.parse(storedAdmin);
        setIsAuthenticated(true);
        setAdmin(adminData);
      }
    } catch (error) {
      console.error("❌ فشل في قراءة بيانات المصادقة:", error);
      localStorage.removeItem("userData");
      localStorage.removeItem("adminData");
    } finally {
      setLoading(false);
    }
  }, []);

  // تسجيل الدخول كمستخدم
  const loginUser = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.removeItem("adminData"); // تأكد من إزالة بيانات المسؤول
    localStorage.removeItem("adminId"); // تأكد من إزالة adminId
    setFromSocial(false);
    setUser(userData);
    setAdmin(null); // تأكد أن admin هو null
    setIsAuthenticated(true);
  };

  // تسجيل الدخول كأدمن
  const loginAdmin = (adminData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("adminData", JSON.stringify(adminData));
    localStorage.removeItem("userData"); // تأكد من إزالة بيانات المستخدم
    localStorage.removeItem("userId"); // تأكد من إزالة userId
    setAdmin(adminData);
    setUser(null); // تأكد أن user هو null
    setIsAuthenticated(true);
  };

  // تسجيل الخروج
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("userId");
    setUser(null);
    setIsAuthenticated(false);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    localStorage.removeItem("adminId");
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    admin,
    loading,
    loginUser,
    loginAdmin,
    logoutUser,
    logoutAdmin,
    setIsAuthenticated,
    setUser,
    setAdmin,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// هوك مخصص لاستخدام السياق
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
