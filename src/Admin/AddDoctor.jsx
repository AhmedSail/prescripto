import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ImageUploading from "react-images-uploading";

const AddDoctor = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    price: "",
    image: "",
    address1: "",
    address2: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      price,
    } = form;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !price
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newDoctor = {
      id: Math.random().toString(36).substr(2, 5),
      name: form.name,
      email: form.email,
      password: form.password,
      image: [form.image],
      speciality: form.speciality,
      degree: form.degree,
      experience: form.experience,
      about: form.about,
      fees: Number(form.price),
      appointments: [],
      address: {
        line1: form.address1,
        line2: form.address2,
      },
    };

    try {
      await axios.post("https://prescriptojson.netlify.app/doctors", newDoctor);
      toast.success("Doctor added successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        speciality: "",
        degree: "",
        experience: "",
        about: "",
        price: "",
        image: "",
        address1: "",
        address2: "",
      });
    } catch (err) {
      console.error("Error adding doctor:", err);
      toast.error("❌ Failed to add doctor");
    }
  };

  return (
    <div className="max-w-2xl  mt-10   p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-10">
        <ImageUploading
          value={[{ data_url: form.image }]}
          onChange={(imageList) => {
            const base64 = imageList[0]?.data_url;
            if (base64) {
              setForm((prev) => ({ ...prev, image: base64 }));
            }
          }}
          dataURLKey="data_url"
          acceptType={["jpg", "jpeg", "png"]}
        >
          {({ imageList, onImageUpload }) => (
            <div className="relative group w-28 h-28">
              <img
                src={imageList[0]?.data_url || form.image}
                alt="doctor"
                className="w-28 h-28 object-cover rounded-full border shadow-md opacity-70 group-hover:opacity-100 transition "
              />
              <div
                onClick={onImageUpload}
                className="absolute inset-0 flex justify-center items-center cursor-pointer rounded-full group-hover:bg-black group-hover:bg-opacity-30 transition"
              >
                <span className="text-white text-2xl font-bold opacity-0 group-hover:opacity-100">
                  +
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Upload Profile Image
              </p>
            </div>
          )}
        </ImageUploading>
        <input
          type="text"
          placeholder="Doctor's Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <select
          value={form.speciality}
          onChange={(e) => setForm({ ...form, speciality: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="" selected disabled>
            Select Speciality
          </option>
          <option value="General physician">General physician</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatricians">Pediatricians</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Gastroenterologist">Gastroenterologist</option>
        </select>
        <input
          type="text"
          placeholder="Degree"
          value={form.degree}
          onChange={(e) => setForm({ ...form, degree: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Experience (e.g., 5 years)"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="About the doctor"
          rows={3}
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Consultation Fee ($)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Address - Line 1"
          value={form.address1}
          onChange={(e) => setForm({ ...form, address1: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Address - Line 2"
          value={form.address2}
          onChange={(e) => setForm({ ...form, address2: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-primary font-semibold text-white py-2 rounded hover:bg-opacity-90 transition"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
