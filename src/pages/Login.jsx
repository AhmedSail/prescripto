import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LoginUsingSocial from "../components/LoginUsingSocial";
import { assets } from "../assets/assets_frontend/assets";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { AppointmentContext } from "../context/AppointmentContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const [formData, setFormData] = useState({
    _id: uuidv4(),
    name: "",
    email: "",
    password: "",
    age: 0,
    images: "",
    country: "",
    city: "",
    phone: "",
    address1: "",
    address2: "",
    appointments: [],
    gender: "Gender", // القيمة الافتراضية
    type: "Default",
  });
  const [show, setShow] = useState(false);
  const { navigate, users, admins } = useContext(AppointmentContext);
  const { loginUser, loginAdmin } = useAuth(); // ✅ دالة login من السياق

  const toggleShow = () => {
    setShow(!show);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === formData.email);
    const admin = admins.find((u) => u.email === formData.email);

    if (user || admin) {
      if (user && user.type === "Google") {
        toast.error(
          "This account is registered using Google. Please log in using Google."
        );
        return;
      }
      if (user && user.type === "Facebook") {
        toast.error(
          "This account is registered using Facebook. Please log in using Facebook."
        );
        return;
      }

      // Login.jsx
      // ...
      if (user && user.password === formData.password && user.role === "user") {
        loginUser(user, "demo-token");
        toast.success(`Welcome ${user.name}`);
        navigate(`/${user._id}/`); // توجيه المستخدم إلى صفحته
      } else if (
        admin &&
        admin.password === formData.password &&
        admin.role === "admin"
      ) {
        loginAdmin(admin, "demo-token");
        toast.success(`Welcome ${admin.name}`);
        navigate(`/${admin._id}/`); // توجيه المسؤول إلى صفحته
      } else {
        toast.error("Invalid email or password");
      }
    } else {
      toast.error("No account found with this email or you are admin");
    }
  };
  return (
    <div className="lg:flex justify-center items-center container">
      <div>
        <img
          src={assets.logo}
          alt=""
          className="w-[700px] max-lg:w-[500px] mt-[12.5%] mx-auto"
        />
      </div>
      <div className="bg-white shadow-2xl border mx-auto mt-[12.5%] p-10 rounded-lg space-y-5 sm:w-3/4 exact-1024:w-[500px]">
        <div className="space-y-3">
          <h1 className="font-bold text-gray-700 text-3xl">Login</h1>
          <p className="text-md text-gray-600 max-sm:text-sm">
            Please login to book an appointment
          </p>
        </div>
        <form className="space-y-3">
          <div class="relative w-full group">
            <span class="absolute  -left-0.5 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              id="input"
              placeholder=""
              className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200 placeholder-transparent outline-0"
            />
            <label
              for="input"
              className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
            >
              Email
            </label>
          </div>
          <div class="relative w-full group">
            <span class="absolute  -left-0.5 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
            <input
              type={show ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              id="input"
              placeholder=""
              className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200 placeholder-transparent outline-0"
            />
            <div className="absolute top-1/4 mt-1.5 right-5 text-xl">
              {show ? (
                <div>
                  <FaEyeSlash onClick={toggleShow} />
                </div>
              ) : (
                <div>
                  <FaEye onClick={toggleShow} />
                </div>
              )}
            </div>
            <label
              for="input"
              className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
            >
              Password
            </label>
          </div>
          <button
            className="bg-[#5f6fff] w-full h-12 text-white font-bold rounded-lg hover:bg-white hover:shadow-md hover:text-[#5f6fff] border hover:border-[#5f6fff] transition-all duration-200"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </form>
        <hr className="my-5" />
        <div className="flex justify-start items-center gap-1 ">
          <p>Don't have an Account?</p>
          <Link to={"/register"} className="text-[#5f6fff] font-bold">
            Register Here!
          </Link>
        </div>
        <LoginUsingSocial formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default Login;
