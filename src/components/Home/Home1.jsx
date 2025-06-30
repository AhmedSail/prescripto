import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Link, useParams } from "react-router-dom";

const Home1 = () => {
  const { userid } = useParams();
  return (
    <div className="grid ipad:grid-cols-1 grid-cols-1 lg:grid-cols-2 bg-[#5f6fff] px-10 items-center rounded-lg mt-5 pt-16 ipad:space-x-0 lg:space-x-60">
      <div className="flex flex-col gap-10">
        <h1 className="text-white font-bold sm:text-2xl ipad:text-2xl lg:text-5xl ipad:text-center text-center lg:text-left">
          Book Appointment With Trusted Doctors
        </h1>
        <div className="lg:flex justify-between items-center gap-2 text-white mx-auto lg:mx-0 ipad:flex-col">
          <img
            src={assets.group_profiles}
            alt=""
            className="mx-auto max-sm:w-72 max-lg:w-1/4"
          />
          <p className="text-center lg:text-left mt-5 lg:mt-0 ipad:text-xl text-xl  ipad:text-center ipad:mt-5">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
        <Link
          to={`/${userid}/AllDoctors`}
          className="bg-white p-5 rounded-full flex justify-between items-center gap-3 font-semibold max-sm:w-2/3 ipad:mx-auto exact-1024:w-2/3 hover:border hover:text-[#5F6FFF] hover:shadow-md hover:border-[#000] transition-all duration-300"
        >
          <span>Book appointment</span>
          <img src={assets.arrow_icon} alt="" />
        </Link>
      </div>
      <div>
        <img
          src={assets.header_img}
          alt=""
          className="w-full ipad:mt-10 mt-10 block ipad:mx-auto mx-auto lg:mx-0"
        />
      </div>
    </div>
  );
};

export default Home1;
