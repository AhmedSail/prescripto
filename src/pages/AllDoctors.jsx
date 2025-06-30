import React, { useContext } from "react";
import Navbar from "../components/Navbar";

import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { AppointmentContext } from "../context/AppointmentContext";
import { useState } from "react";
import { useMemo } from "react";
import { assets } from "../assets/assets_frontend/assets";
const AllDoctors = () => {
  const { doctors, specialityData } = useContext(AppointmentContext);
  const location = useLocation();
  const { userid } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const selected = queryParams.get("speciality");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const FilterFun = useMemo(() => {
    return selected
      ? setFilteredDoctors(doctors.filter((d) => d.speciality === selected))
      : setFilteredDoctors(doctors);
  }, [doctors, selected]);

  return (
    <div className="container">
      <Navbar />
      <div>
        <p
          className="text-gray-400 font-semibold mt-20
        mb-10"
        >
          Browse through the doctors specialist.
        </p>
        <div className=" lg:flex justify-center gap-20 ipad:flex-col">
          <div className="lg:w-1/4">
            {specialityData.map((i) => (
              <Link
                to={`/${userid}/AllDoctors?speciality=${i.speciality}`}
                key={i.id}
              >
                <div className="w-full">
                  <h1
                    className={`text-gray-600 font-semibold border rounded-xl py-2 text-center my-2 transition-colors duration-200 sm:text-sm md:text-base lg:px-7 cursor-pointer ${
                      selected === i.speciality
                        ? "bg-[#e2e5ff]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i.speciality}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid max-sm:grid-cols-1 ipad:mx-auto  ipad:grid-cols-2 grid-cols-4 w-3/4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((i, index) => (
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
                      <p className="font-semibold text-gray-400">
                        {i.speciality}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 font-semibold text-xl mt-10">
                No doctors are available at the moment for this specialty.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllDoctors;
