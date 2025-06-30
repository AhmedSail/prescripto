import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Link, useParams } from "react-router-dom";

const Home4 = () => {
  const { userid } = useParams();
  return (
    <div className="relative overflow-hidden">
      <div className="bg-[#5f6fff] grid grid-cols-1 lg:grid-cols-2 px-6 sm:px-10 pt-20 sm:pt-24  rounded-xl">
        {/* Left Content */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-8">
          <h1 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl ipad:text-2xl  lg:text-6xl">
            Book Appointment
          </h1>
          <h1 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl ipad:text-2xl  lg:text-6xl">
            With 100+ Trusted Doctors
          </h1>
          <Link
            to={`/${userid}/AllDoctors`}
            className="flex items-center justify-between w-2/3 sm:w-1/2 bg-white text-black px-6 py-4 rounded-full mt-6 hover:border hover:border-[#000] transition-all duration-300 hover:text-[#5f6fff]"
          >
            <span className="text-lg font-semibold">GO</span>
            <img src={assets.arrow_icon} alt="arrow" className="w-6 sm:w-8" />
          </Link>
        </div>

        {/* Right Image */}
        <div className="mt-10 lg:mt-0 flex justify-center items-center">
          <img
            src={assets.appointment_img}
            alt="Appointment Illustration"
            className="w-4/5 sm:w-2/3 lg:w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home4;
