import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRouterUser from "./components/ProtectedRouterUser";
import AuthRedirectRoute from "./components/AuthRedirectRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminHome from "./Admin/Home";
import AdminAppointments from "./Admin/Appointments";
import About from "./pages/About";
import Register from "./pages/Register";
import PageAfterGoogleRegister from "./components/PageAfterGoogleRegister";
import AllDoctors from "./pages/AllDoctors";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import AddDoctor from "./Admin/AddDoctor";
import DoctorList from "./Admin/DoctorList";
import AdminLayout from "./Admin/AdminLayout"; // ضيف هذا السطر

const App = () => {
  return (
    <AuthProvider>
      <div>
        <ToastContainer />

        <Routes>
          {/* مسارات تسجيل الدخول والتسجيل - يتم منع الوصول إليها للمستخدمين المسجلين */}
          <Route
            path="/"
            element={
              <AuthRedirectRoute>
                <Login />
              </AuthRedirectRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRedirectRoute>
                <Register />
              </AuthRedirectRoute>
            }
          />

          {/* مسارات المستخدم المحمية */}
          <Route
            path="/:userid"
            element={
              <ProtectedRouterUser>
                <Home />
              </ProtectedRouterUser>
            }
          />
          <Route
            path="/:userid/:doctorid"
            element={
              <ProtectedRouterUser>
                <Doctors />
              </ProtectedRouterUser>
            }
          />
          <Route
            path="/:userid/:speciality"
            element={
              <ProtectedRouterUser>
                <AllDoctors />
              </ProtectedRouterUser>
            }
          />
          <Route
            path="/:userid/AllDoctors"
            element={
              <ProtectedRouterUser>
                <AllDoctors />
              </ProtectedRouterUser>
            }
          />
          <Route
            path="/:userid/Contact"
            element={
              <ProtectedRouterUser>
                <Contact />
              </ProtectedRouterUser>
            }
          />
          <Route
            path="/:userid/About"
            element={
              <ProtectedRouterUser>
                <About />
              </ProtectedRouterUser>
            }
          />
          <Route
            path="/:userid/Appointments"
            element={
              <ProtectedRouterUser>
                <Appointments />
              </ProtectedRouterUser>
            }
          />
          <Route
            path="/:userid/Info"
            element={
              <ProtectedRouterUser>
                <PageAfterGoogleRegister />
              </ProtectedRouterUser>
            }
          />
          <Route
            path="/:userid/Myprofile"
            element={
              <ProtectedRouterUser>
                <Profile />
              </ProtectedRouterUser>
            }
          />
          <Route
            path="/:adminid/home/"
            element={
              <ProtectedRouterUser>
                <AdminLayout />
              </ProtectedRouterUser>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRouterUser>
                  <AdminHome />
                </ProtectedRouterUser>
              }
            />
            <Route
              path="adminAppointments"
              element={
                <ProtectedRouterUser>
                  <AdminAppointments />
                </ProtectedRouterUser>
              }
            />
            <Route
              path="addDoctor"
              element={
                <ProtectedRouterUser>
                  <AddDoctor />
                </ProtectedRouterUser>
              }
            />
            <Route
              path="doctorList"
              element={
                <ProtectedRouterUser>
                  <DoctorList />
                </ProtectedRouterUser>
              }
            />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
