import React, { useState, useContext, useEffect } from "react";
import { AppointmentContext } from "../context/AppointmentContext";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom"; // ✅ للتوجيه بعد التحديث
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";

const PageAfterGoogleRegister = () => {
  const { users, setUsers } = useContext(AppointmentContext);
  const { userid } = useParams();
  useEffect(() => {
    console.log("id" + userid);
  }, []);
  const user = users.find((user) => user._id === userid);

  const navigate = useNavigate(); // 🔄 للتحويل بعد الإكمال
  const [formData, setFormData] = useState({
    age: 0,
    country: "",
    city: "",
    address1: "",
    address2: "",
    gender: "Gender", // القيمة الافتراضية
    phone: "",
  });

  if (!user) {
    return <p>User not found</p>; // ✅ إذا لم يتم العثور على المستخدم
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.age ||
      !formData.country ||
      !formData.city ||
      !formData.address1 ||
      !formData.phone
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // تحديث بيانات المستخدم في الـ JSON Server
    axios
      .patch(`https://prescriptojson.netlify.app/users/${user.id}`, formData)
      .then(() => {
        // تحديث `users` في `Context`
        const updatedUsers = users.map((user) =>
          user.id === userid ? { ...user, ...formData } : user
        );
        setUsers(updatedUsers);

        toast.success("Profile updated successfully!");
        navigate(`/${userid}/`);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="grid mt-[10%] grid-cols-1 lg:grid-cols-2 justify-center items-center gap-16 max-w-[1400px] px-6 py-10 mx-auto container">
      <div className="flex justify-center">
        <img
          src={assets.logo}
          alt="logo"
          className="w-[700px] max-lg:w-[500px]"
        />
      </div>

      <div className="bg-white shadow-2xl border w-full max-w-3xl mx-auto p-6 sm:p-10 rounded-lg space-y-5">
        <div className="space-y-3">
          <h1 className="font-bold text-gray-700 text-3xl">
            Complete Your Profile
          </h1>
          <p className="text-md text-gray-600 text-sm sm:text-base">
            Please complete your profile to book appointment
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full h-10 border outline-0 px-4 rounded-lg"
                value={user.name}
                disabled={user.type === "Google" || user.type === "Facebook"}
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full h-10 border outline-0 px-4 rounded-lg"
                value={user.email}
                disabled={user.type === "Google" || user.type === "Facebook"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Age */}
            <div>
              <label className="block mb-2">Age</label>
              <input
                type="number"
                name="age"
                className="w-full h-10 border outline-0 px-4 rounded-lg"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </div>
            {/* gender */}
            <div>
              <label className="block mb-2">Gender</label>
              <select
                name="gender"
                className="w-full p-2 rounded-lg outline-0 border"
                value={formData.gender}
                onChange={(e) => {
                  const selectedGender = e.target.value;
                  setFormData({
                    ...formData,
                    gender: selectedGender,
                  });
                }}
              >
                <option value="Gender" disabled>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Country & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2">Country</label>
              <input
                type="text"
                name="country"
                className="w-full h-10 border outline-0 px-4 rounded-lg"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-2">City</label>
              <input
                type="text"
                name="city"
                className="w-full h-10 border outline-0 px-4 rounded-lg"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2">Address</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="address1"
                placeholder="Address 1"
                className="w-full h-10 border outline-0 px-4 rounded-lg"
                value={formData.address1}
                onChange={(e) =>
                  setFormData({ ...formData, address1: e.target.value })
                }
              />
              <input
                type="text"
                name="address2"
                placeholder="Address 2"
                className="w-full h-10 border outline-0 px-4 rounded-lg"
                value={formData.address2}
                onChange={(e) =>
                  setFormData({ ...formData, address2: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Phone</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full h-10 border outline-0 px-4 rounded-lg"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#5f6fff] w-full h-12 text-white font-bold rounded-lg hover:bg-white hover:shadow-md hover:text-[#5f6fff] border hover:border-[#5f6fff] transition-all duration-200"
          >
            Update Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default PageAfterGoogleRegister;
