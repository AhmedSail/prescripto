import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import { AppointmentContext } from "../context/AppointmentContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";
const Profile = () => {
  //   const { users } = useContext(AppointmentContext);
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);
  const validateUser = async () => {
    if (!user.name || user.name.trim() === "") {
      toast.error("Name is required");
      return false;
    }

    if (!user.email || user.email.trim() === "") {
      toast.error("Email is required");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      toast.error("Invalid email format");
      return false;
    }

    // Check if the email already exists
    const res = await axios.get(
      "https://prescripto-json-production.up.railway.app/users"
    );
    const exists = res.data.find(
      (u) => u.email === user.email && u._id !== user._id
    );
    if (exists) {
      toast.error("This email is already in use");
      return false;
    }

    if (!user.age || isNaN(user.age) || Number(user.age) <= 0) {
      toast.error("Age must be a positive number");
      return false;
    }

    if (!user.phone || user.phone.trim() === "") {
      toast.error("Phone number is required");
      return false;
    }

    if (!["Male", "Female"].includes(user.gender)) {
      toast.error("Please select a gender");
      return false;
    }

    return true; // ✅ All validations passed
  };
  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/users")
      .then((res) => {
        const foundUser = res.data.find((u) => u._id === userid);
        setUser(foundUser);
      });
  }, [userid]);

  return (
    <div className="container">
      <Navbar />
      <div>
        <Title text1={"My"} text2={"Profile"} center={true} size={"text-3xl"} />
        <div className="lg:w-1/3">
          <div className="relative group">
            <img
              src={user?.images}
              alt=""
              className="border rounded-2xl w-96 mb-10 "
            />
          </div>
          <h1 className="font-bold text-3xl my-5">{user?.name}</h1>
          <hr />
          <div>
            <h1 className="underline text-gray-400 text-sm mb-10">
              CONTACT INFORMATION
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">Email:</p>
                <p className="text-blue-400">{user?.email}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">Phone:</p>
                <p className="text-blue-400">{user?.phone}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">Address:</p>
                <div>
                  <p className="text-gray-400 font-semibold">
                    {user?.address1}
                  </p>
                  <p className="text-gray-400 font-semibold">
                    {user?.address2}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="underline text-gray-400 text-sm my-10">
              BASIC INFORMATION
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">Gender:</p>
                <p className="text-gray-400 font-semibold">{user?.gender}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">Age:</p>
                <p className="text-gray-400 font-semibold">{user?.age}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setOriginalUser(user); // 🧠 حفظ البيانات الأصلية
              setIsEditing(true);
            }}
            className="border hover:bg-blue-500 hover:text-white font-bold transition-all duration-200 border-blue-500 text-blue-500  px-10 py-2 rounded-full  my-4"
          >
            Edit Profile
          </button>
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                  Edit Profile
                </h2>

                <div className="space-y-4">
                  <div className="flex flex-col items-center mb-6">
                    <ImageUploading
                      value={[{ data_url: user?.images }]}
                      onChange={(imageList) => {
                        const base64 = imageList[0]?.data_url;
                        if (base64) {
                          setUser((prev) => ({ ...prev, images: base64 }));
                        }
                      }}
                      dataURLKey="data_url"
                      acceptType={["jpg", "jpeg", "png"]}
                    >
                      {({ imageList, onImageUpload }) => (
                        <div className="relative group w-32 h-32">
                          <img
                            src={imageList[0]?.data_url || user?.images}
                            alt="profile"
                            className="w-32 h-32 object-cover rounded-full border shadow-md opacity-70 group-hover:opacity-100 transition duration-300"
                          />
                          <div
                            onClick={onImageUpload}
                            className="absolute inset-0 flex justify-center items-center cursor-pointer rounded-full group-hover:bg-black group-hover:bg-opacity-25 transition-all duration-300"
                          >
                            <span className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">
                              +
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 font-semibold mt-2 text-center">
                            Current Profile Image
                          </p>
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Name</label>
                    <input
                      className="border px-4 py-2 rounded"
                      value={user?.name}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Email</label>
                    <input
                      className="border px-4 py-2 rounded"
                      value={user?.email}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Phone</label>
                    <input
                      className="border px-4 py-2 rounded"
                      value={user?.phone}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, phone: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Address 1</label>
                    <input
                      className="border px-4 py-2 rounded"
                      value={user?.address1}
                      onChange={(e) =>
                        setUser((prev) => ({
                          ...prev,
                          address1: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Address 2</label>
                    <input
                      className="border px-4 py-2 rounded"
                      value={user?.address2}
                      onChange={(e) =>
                        setUser((prev) => ({
                          ...prev,
                          address2: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Gender</label>
                    <select
                      className="border px-4 py-2 rounded"
                      value={user?.gender}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, gender: e.target.value }))
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Age</label>
                    <input
                      className="border px-4 py-2 rounded"
                      value={user?.age}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, age: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setUser(originalUser); // 👈 ترجع البيانات الأصلية
                      setIsEditing(false);
                      toast.info("Edit canceled!");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={async () => {
                      const isValid = await validateUser();
                      if (!isValid) return;

                      axios
                        .patch(
                          `https://prescripto-json-production.up.railway.app/users/${user.id}`,
                          user
                        )
                        .then(() => {
                          toast.success("Edit Successfully!");
                          setIsEditing(false);
                          window.location.reload();
                        })
                        .catch(() => {
                          toast.error("Failed to save Editing");
                        });
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
