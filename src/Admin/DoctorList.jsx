import React, { useContext } from "react";

import { Link, useLocation, useParams } from "react-router-dom";
import { AppointmentContext } from "../context/AppointmentContext";
import { useState } from "react";
import { useMemo } from "react";
import { assets } from "../assets/assets_frontend/assets";
const AllDoctors = () => {
  const { doctors } = useContext(AppointmentContext);
  const location = useLocation();
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
      <div>
        <div className=" lg:flex justify-center gap-20 ipad:flex-col">
          <div className="grid max-sm:grid-cols-1 ipad:mx-auto  ipad:grid-cols-2 grid-cols-4 ">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((i, index) => (
                <div
                  key={index}
                  className="border  rounded-lg mx-5 mb-5 hover:scale-105 transition-all duration-300 hover:border-2 hover:border-[#5F6FFF]"
                >
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
    </div>
  );
};

export default AllDoctors;
