import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoginUsingSocial from "../components/LoginUsingSocial";
import { assets } from "../assets/assets_frontend/assets";
import { AppointmentContext } from "../context/AppointmentContext";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { users, navigate } = useContext(AppointmentContext);
  const defaultMaleImage = assets.maleProfile;
  const defaultFemaleImage = assets.femaleProfile;
  const [show, setShow] = useState(false);
  const { loginUser } = useAuth();

  const toggleShow = () => {
    setShow(!show);
  };
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
  const register = async (formData) => {
    const {
      name,
      email,
      password,
      age,
      country,
      city,
      phone,
      address1,
      gender,
    } = formData;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !name ||
      !email ||
      !password ||
      !age ||
      !country ||
      !city ||
      !phone ||
      !address1 ||
      gender === "Gender"
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!emailPattern.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    try {
      const res = await axios.get(
        "https://prescripto-json-production.up.railway.app/users"
      );
      const exists = res.data.some((user) => user.email === email);

      if (exists) {
        toast.error("This email is already registered.");
        return;
      }

      const newUser = {
        ...formData,
        _id: uuidv4(),
        role: "user", // افتراضيًا مستخدم عادي
      };

      await axios.post(
        "https://prescripto-json-production.up.railway.app/users",
        newUser
      );
      loginUser(newUser, "demo-token");
      toast.success("The account has been created successfully.");
      navigate(`/${newUser._id}/Myprofile`); // هذا يبدو صحيحًا للمستخدمين
    } catch (err) {
      toast.error("An error occurred during registration.");
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-16 max-w-[1400px] px-6 py-10 mx-auto container">
      <div className="flex justify-center">
        <img
          src={assets.logo}
          alt="logo"
          className="w-[700px] max-lg:w-[500px]"
        />
      </div>

      <div className="bg-white shadow-2xl border w-full max-w-3xl mx-auto p-6 sm:p-10 rounded-lg space-y-5">
        <div className="space-y-3">
          <h1 className="font-bold text-gray-700 text-3xl">Create Account</h1>
          <p className="text-md text-gray-600 text-sm sm:text-base">
            Please sign up to book appointment
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            register(formData); // ✅ هذا هو اللي فيه التحقق
          }}
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative w-full group">
              <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                id="name"
                placeholder=" "
                className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
              />
              <label
                htmlFor="name"
                className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
              >
                Full Name
              </label>
            </div>

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
          </div>

          {/* Password */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Age */}
            <div className="relative w-full group">
              <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
              <input
                type="number"
                name="age"
                id="age"
                placeholder=" "
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
              />
              <label
                htmlFor="age"
                className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
              >
                Age
              </label>
            </div>
            {/* gender */}
            <div className="relative w-full group">
              <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={(e) => {
                  const selectedGender = e.target.value;
                  setFormData({
                    ...formData,
                    gender: selectedGender,
                    images:
                      selectedGender === "Male"
                        ? defaultMaleImage
                        : defaultFemaleImage,
                  });
                }}
                className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200"
              >
                <option value="Gender" disabled>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
              >
                Gender
              </label>
            </div>
          </div>

          {/* Country & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative w-full group">
              <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
              <input
                type="text"
                name="country"
                id="country"
                placeholder=" "
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
              />
              <label
                htmlFor="country"
                className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
              >
                Country
              </label>
            </div>

            <div className="relative w-full group">
              <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
              <input
                type="text"
                name="city"
                id="city"
                placeholder=" "
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
              />
              <label
                htmlFor="city"
                className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
              >
                City
              </label>
            </div>
          </div>
          {/* Phone */}
          <div className="relative w-full group">
            <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder=" "
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
            />
            <label
              htmlFor="phone"
              className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
            >
              Phone
            </label>
          </div>
          {/* Address */}
          <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Address 1 */}
              <div className="relative w-full group">
                <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
                <input
                  type="text"
                  name="address1"
                  id="address1"
                  placeholder=" "
                  value={formData.address1}
                  onChange={(e) =>
                    setFormData({ ...formData, address1: e.target.value })
                  }
                  className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
                />
                <label
                  htmlFor="address1"
                  className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
                >
                  Address 1
                </label>
              </div>

              {/* Address 2 */}
              <div className="relative w-full group">
                <span className="absolute -left-0 top-2 bottom-2 w-1.5 rounded bg-primary opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
                <input
                  type="text"
                  name="address2"
                  id="address2"
                  placeholder=" "
                  value={formData.address2}
                  onChange={(e) =>
                    setFormData({ ...formData, address2: e.target.value })
                  }
                  className="peer w-full pl-6 pr-4 pt-10 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
                />
                <label
                  htmlFor="address2"
                  className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold cursor-text"
                >
                  Address 2
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#5f6fff] w-full h-12 text-white font-bold rounded-lg hover:bg-white hover:shadow-md hover:text-[#5f6fff] border hover:border-[#5f6fff] transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        <hr className="my-5" />

        <div className="flex justify-start items-center">
          <div>
            Already have an account?
            <Link to="/" className="text-[#5f6fff] font-semibold">
              Login Here!
            </Link>
          </div>
        </div>

        <LoginUsingSocial formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default Register;
