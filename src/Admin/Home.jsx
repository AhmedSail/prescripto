import React, { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "../context/AppointmentContext";
import axios from "axios";
import { assets } from "../assets/assets_frontend/assets";
import { BiListMinus } from "react-icons/bi";

const Home = () => {
  const [doctorlen, setDoctorlen] = useState(0);
  const [userlen, setUserlen] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/doctors")
      .then((res) => setDoctorlen(res.data.length));
    axios
      .get("https://prescripto-json-production.up.railway.app/users")
      .then((res) => setUserlen(res.data.length));
  }, []);
  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/doctors")
      .then((res) => {
        const allDoctors = res.data;
        setDoctors(allDoctors);
        setDoctorlen(allDoctors.length);

        const allAppointments = allDoctors.flatMap(
          (doctor) => doctor.appointments || []
        );
        setAppointment(allAppointments);
        setTotalAppointments(allAppointments.length);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/users")
      .then((res) => setUsers(res.data));
  }, []);
  console.log("Appointments", appointment);
  console.log("Users", users);

  const cards = [
    {
      id: 1,
      number: doctorlen,
      name: "Total Doctors",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      number: userlen,
      name: "Total Users",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      number: doctorlen + userlen,
      name: "System Accounts",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 4,
      number: totalAppointments,
      name: "All Appointments",
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-lg shadow-md ${item.color} transition-transform transform hover:scale-105`}
          >
            <h2 className="text-4xl font-bold">{item.number}</h2>
            <p className="mt-2 text-lg">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="border my-10">
        <div className="flex justify-start items-center">
          <BiListMinus className="w-20 h-10 text-primary" />
          <h1 className="font-semibold">Latest Appointment</h1>
        </div>
        <hr />
        <div className="space-y-4">
          {appointment
            .slice(-5) // 👈 آخر 5 مواعيد (من النهاية)
            .reverse() // 👈 نعكسهم علشان الأحدث يظهر بالأعلى
            .map((appt, index) => {
              const user = users.find((u) => u.id === appt.userId);
              const doctor = doctors.find((d) => d.id === appt.doctorId);

              return (
                <div key={index} className="p-4 shadow-sm bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={user?.images || assets.defaultUser}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {user?.name || "Unknown User"}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Appointment with:{" "}
                        <span className="font-medium text-primary">
                          {doctor?.name || "Unknown Doctor"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        📅 {appt.date} at 🕒 {appt.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
