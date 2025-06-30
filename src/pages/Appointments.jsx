import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { Link, useLocation, useParams } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const Appointments = () => {
  const { userid } = useParams();
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("user");
    return (
      location.state?.updatedUser ||
      (localUser && JSON.parse(localUser)) ||
      null
    );
  });

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `https://prescripto-json-production.up.railway.app/users/${user.id}`
      );
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/doctors")
      .then((res) => setDoctors(res.data));
  }, []);

  useEffect(() => {
    if (doctors.length && user?.appointments?.length) {
      const matched = user.appointments
        .map((appt) => {
          const doc = doctors.find((d) => d.id === appt.doctorId);
          return doc ? { ...doc, date: appt.date, time: appt.time } : null;
        })
        .filter(Boolean);
      setDoctorAppointments(matched);
    } else {
      setDoctorAppointments([]);
    }
  }, [doctors, user]);
  const handleCancel = async (doctorId, date, time) => {
    const updateAppointmentUser = user.appointments.filter(
      (a) => !(a.doctorId === doctorId && a.date === date && a.time === time)
    );
    const updateUser = { ...user, appointments: updateAppointmentUser };
    await axios.patch(
      `https://prescripto-json-production.up.railway.app/users/${user.id}`,
      updateUser
    );
    await fetchUser(); // 👈 تحديث المستخدم من السيرفر
    localStorage.setItem("user", JSON.stringify(updateUser));
    setUser(updateUser);
    const doctor = doctors.find((d) => d.id === doctorId);
    const updateAppointmentDoctor = doctor.appointments.filter(
      (d) => !(d.userId === user.id && d.date === date && d.time === time)
    );
    const updateDoctor = { ...doctor, appointments: updateAppointmentDoctor };
    await axios.patch(
      `https://prescripto-json-production.up.railway.app/doctors/${doctorId}`,
      updateDoctor
    );
    localStorage.setItem("doctor", JSON.stringify(updateDoctor));

    // تحميل البيانات الجديدة لكل الدكاترة
    const refreshedDoctors = await axios.get(
      "https://prescripto-json-production.up.railway.app/doctors"
    );
    setDoctors(refreshedDoctors.data);
    // تحديث الواجهة
    const matched = updateAppointmentUser
      .map((appt) => {
        const doc = refreshedDoctors.data.find((d) => d.id === appt.doctorId);
        return doc ? { ...doc, date: appt.date, time: appt.time } : null;
      })
      .filter(Boolean);

    setDoctorAppointments(matched);
  };
  return (
    <div className="container">
      <Navbar />
      <div className="px-4 sm:px-8">
        <Title text1="My" text2="Appointments" center={true} size="text-3xl" />
        <div>
          <div>
            {doctorAppointments.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <img
                  src={assets.takeCare}
                  alt="No appointments"
                  className="mx-auto w-96 mb-4 opacity-60"
                />
                <Link
                  to={`/${userid}/AllDoctors`}
                  className="bg-[#FFECAE] px-10 py-3 rounded-lg text-gray-500 font-bold mb-10"
                >
                  Go To Book An Appointment
                </Link>
                <p className="text-2xl font-semibold mt-10">
                  You don't have any appointments.
                </p>
              </div>
            ) : (
              doctorAppointments.map((doc, i) => (
                <div
                  className="lg:flex justify-between items-center border-y ipad:flex-col ipad:p-5"
                  key={i}
                >
                  <div
                    key={i}
                    className=" rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row items-center "
                  >
                    <img
                      src={assets[doc.image]}
                      alt={doc.name}
                      className="w-52  rounded-full mr-4"
                    />
                    <div className="mt-4 sm:mt-0 flex flex-col gap-2">
                      <div>
                        <h2 className="text-2xl text-gray-700 font-bold">
                          {doc.name}
                        </h2>
                        <p className="text-sm font-semibold text-gray-400">
                          {doc.speciality}
                        </p>
                      </div>
                      <h1 className="text-gray-700 font-bold">Address</h1>
                      <div className="text-sm font-semibold text-gray-400">
                        <h1>{user.address1}</h1>
                        <h1>{user.address2}</h1>
                      </div>
                      <div className="text-md font-semibold text-gray-400 flex justify-center items-center gap-2">
                        <span className="text-lg font-semibold text-gray-700">
                          Date & Time:
                        </span>
                        <span>
                          {doc.date} | {doc.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <button className="bg-primary px-10 py-2 text-white font-bold rounded-md hover:bg-gray-300 transition-all duration-200 hover:text-gray-700">
                      Pay Online
                    </button>
                    <button
                      className="border border-gray-300 rounded-md px-10 py-2 text-gray-700 font-bold hover:bg-red-600 transition-all duration-200 hover:text-white"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, cancel it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleCancel(doc.id, doc.date, doc.time);
                            Swal.fire({
                              title: "Canceled!",
                              text: "Your appointment has been canceled.",
                              icon: "success",
                            });
                          }
                        });
                      }}
                    >
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Appointments;
