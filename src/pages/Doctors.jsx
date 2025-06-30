import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { AppointmentContext } from "../context/AppointmentContext";
import axios from "axios";
import { assets } from "../assets/assets_frontend/assets";
import Title from "../components/Title";
import { toast } from "react-toastify";
const Doctors = () => {
  const { doctorid } = useParams();
  const { currency } = useContext(AppointmentContext);
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const [doctorFind, setDoctorFind] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [doctors, SetDoctors] = useState([]);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const dayOfWeek = ["SUN", "MON", "TUS", "WEN", "THE", "FRI", "SAT"];
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/doctors")
      .then((res) => {
        const foundDoctor = res.data.find((d) => d.id === doctorid);

        setDoctorFind(foundDoctor);
        SetDoctors(res.data);
      })
      .catch((err) => console.log(err));
  }, [doctorid]);
  useEffect(() => {
    setRelatedDoctors(
      doctors.filter(
        (d) =>
          d.speciality === doctorFind?.speciality && d.id !== doctorFind?.id
      )
    );
  }, [doctorFind, doctorid]);
  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    // التحقق من الوقت، إذا بعد 9 مساءً، نبدأ من الغد
    if (today.getHours() >= 21) {
      today.setDate(today.getDate() + 1);
      today.setHours(0, 0, 0, 0); // نعيد تعيين الوقت لمنتصف الليل
    }

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };
  useEffect(() => {
    getAvailableSlots();
  }, [doctorFind]);
  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);
  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/users")
      .then((res) => {
        const foundUser = res.data.find((u) => u._id === userid);
        setUser(foundUser);
      });
  }, [userid]);
  const BookAppointment = async (e) => {
    e.preventDefault();

    if (!slotTime || !user) {
      toast.info("Please select a slot");
      return;
    }

    const selectedDate = docSlots[slotIndex][0].datetime.toLocaleDateString();

    // تحقق إذا الموعد محجوز عند نفس الدكتور
    const isSlotTaken = doctorFind.appointments?.some(
      (a) => a.date === selectedDate && a.time === slotTime
    );
    if (isSlotTaken) {
      toast.warn("This slot is already booked by another user!");
      return;
    }

    // تحقق من وجود موعد مسبق مع نفس الدكتور
    const existingAppointmentWithDoctor = (user.appointments || []).find(
      (a) => a.doctorId === doctorFind.id
    );
    if (existingAppointmentWithDoctor) {
      toast.warn(
        `You already have an appointment with this doctor at ${existingAppointmentWithDoctor.time}.`
      );
      return;
    }

    // تحقق من وجود موعد في نفس اليوم مع أي دكتور
    const hasAppointmentSameDay = (user.appointments || []).some(
      (a) => a.date === selectedDate
    );
    if (hasAppointmentSameDay) {
      toast.error(
        "You already have an appointment on this day. Please choose another day."
      );
      return;
    }
    const appointmentData = {
      userId: user.id,
      userName: user.name,
      doctorId: doctorFind.id,
      doctorName: doctorFind.name,
      date: selectedDate,
      time: slotTime,
    };

    const updatedUser = {
      ...user,
      appointments: [...(user.appointments || []), appointmentData],
    };

    const updatedDoctor = {
      ...doctorFind,
      appointments: [...(doctorFind.appointments || []), appointmentData],
    };

    try {
      await axios.patch(
        `https://prescripto-json-production.up.railway.app/users/${user.id}`,
        updatedUser
      );
      await axios.patch(
        `https://prescripto-json-production.up.railway.app/doctors/${doctorFind.id}`,
        updatedDoctor
      );

      toast.success("Appointment booked successfully!");
      navigate(`/${userid}/Appointments`, {
        state: { updatedUser, updatedDoctor },
      }); // إعادة تحميل البيانات لضمان تحديث الحالة
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("doctor", JSON.stringify(updatedDoctor));
      const userRes = await axios.get(
        `https://prescripto-json-production.up.railway.app/users/${user.id}`
      );
      setUser(userRes.data);

      const doctorRes = await axios.get(
        `https://prescripto-json-production.up.railway.app/doctors/${doctorFind.id}`
      );
      setDoctorFind(doctorRes.data);
    } catch (err) {
      console.error("Error booking appointment:", err);
      toast.error("Failed to book appointment. Please try again.");
    }
  };
  return (
    <div className="container">
      <Navbar />
      <div className="ipad:block lg:flex justify-between mt-10 items-center gap-10">
        <div className="ipad:w-full lg:w-1/4 ">
          <img
            src={assets[`${doctorFind?.image}`]}
            alt=""
            className="bg-[#5f6fff]  rounded-xl ipad:mx-auto ipad:block"
          />
        </div>
        <div className="flex flex-col gap-5 border py-16 p-10 rounded-xl lg:w-3/4 ipad:mt-10 ipad:w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{doctorFind?.name}</h1>
            <img src={assets.verified_icon} alt="" />
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-1 text-gray-400 font-semibold">
              <h1>{doctorFind?.degree} - </h1>
              <h1>{doctorFind?.speciality}</h1>
            </div>
            <div className="flex items-center gap-1 text-gray-400 font-semibold">
              <h1 className=" border p-3 rounded-full">
                {doctorFind?.experience}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-gray-500 font-bold">About</h1>
            <img src={assets.info_icon} alt="" />
          </div>
          <div>
            <p className="text-gray-400 font-semibold">{doctorFind?.about}</p>
          </div>
          <div className="flex items-center gap-2 font-semibold ">
            <h1 className="text-gray-400">Appointment fee: </h1>
            <h1 className="text-gray-700">
              {doctorFind?.fees}
              {currency}
            </h1>
          </div>
        </div>
      </div>
      {/* Booking slot  */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 ">
        <p className="font-bold text-gray-400">Booking Slots</p>
        <div className="flex justify-start items-center gap-10 mt-20 ipad:overflow-x-scroll">
          {docSlots.length &&
            docSlots.map((i, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={` py-6 min-w-16 cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "text-gray-500 border border-gray-200"
                } p-3 rounded-full text-center  font-semibold`}
              >
                <p>{i[0] && dayOfWeek[i[0].datetime.getDay()]}</p>
                <p>{i[0] && i[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex justify-start items-center gap-10 mt-20  overflow-x-scroll">
          {docSlots.length &&
            docSlots[slotIndex].map((i, index) => (
              <div
                onClick={() => setSlotTime(i.time)}
                key={index}
                className={`border py-2 px-5 rounded-full flex text-sm f flex-shrink-0 cursor-pointer ${
                  i.time === slotTime
                    ? " bg-primary text-white font-bold"
                    : " text-gray-400 font-light "
                }`}
              >
                <p>{i.time.toLowerCase()}</p>
              </div>
            ))}
        </div>
        <button
          onClick={(e) => BookAppointment(e)}
          className=" border block bg-primary px-10 py-3 text-sm rounded-full text-white font-ligth mt-10 ipad:mx-auto"
        >
          Book an appointment
        </button>
      </div>
      {/* related  */}
      <div>
        <Title
          text1={"Related"}
          text2={"Doctors"}
          center={true}
          size={"text-3xl"}
        />
        <h1 className="text-gray-400 font-semibold text-center -mt-16">
          Simply browse through our extensive list of trusted doctors.
        </h1>
        <div className="grid max-sm:grid-cols-1 ipad:grid-cols-3 lg:grid-cols-4 mt-10">
          {relatedDoctors?.map((i, index) => (
            <div
              key={index}
              className="border  rounded-lg mx-5 mb-5 hover:scale-105 transition-all duration-300 hover:border-2 hover:border-[#5F6FFF]"
            >
              <Link to={`/${userid}/${i.id}`} key={index}>
                <div className="bg-[#EAEFFF]">
                  <img src={assets[i.image]} alt="" />
                </div>
                <div className="p-2">
                  <h1 className="text-green-500 font-bold">
                    <span className="text-4xl mr-2">.</span>Available
                  </h1>
                  <h1 className="text-xl font-semibold text-gray-700">
                    {i.name}
                  </h1>
                  <p className="font-semibold text-gray-400">{i.speciality}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Doctors;
