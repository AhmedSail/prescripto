import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets_frontend/assets";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/users")
      .then((res) => setUsers(res.data));
    axios
      .get("https://prescripto-json-production.up.railway.app/doctors")
      .then((res) => {
        setDoctors(res.data);

        const allAppointments = res.data.flatMap((doctor) =>
          (doctor.appointments || []).map((appt, i) => ({
            ...appt,
            doctorId: doctor.id,
            doctorName: doctor.name,
            doctorPrice: doctor.price,
          }))
        );

        setAppointments(allAppointments);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">
        📅 All Appointments
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Patient</th>
              <th className="py-3 px-4 border-b">Doctor</th>
              <th className="py-3 px-4 border-b">Date & Time</th>
              <th className="py-3 px-4 border-b">Age</th>
              <th className="py-3 px-4 border-b">Fees</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, idx) => {
              const user = users.find((u) => u.id === appt.userId);
              const doctor = doctors.find((d) => d.id === appt.doctorId);

              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{idx + 1}</td>
                  <td className="py-2 px-4 border-b flex items-center gap-2">
                    <img
                      src={user?.images || assets.defaultUser}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{user?.name || "غير معروف"}</span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span>{appt.doctorName || "غير معروف"}</span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {appt.date} at {appt.time}
                  </td>
                  <td className="py-2 px-4 border-b">{user?.age || "—"}</td>
                  <td className="py-2 px-4 border-b">{doctor?.fees} $</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
