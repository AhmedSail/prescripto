import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets_frontend/assets";
import { Link, useParams } from "react-router-dom";

const Home2 = () => {
  const { userid } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://prescriptojson.netlify.app/specialityData")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="text-center font-bold text-3xl mt-20">
          Find by Speciality
        </h1>
        <p className="text-center text-gray-500 font-semibold mt-4 lg:w-1/3 mx-auto">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
        <div className="sm:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-10 place-items-center ">
          {data.map((i, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <Link to={`/${userid}/AllDoctors?speciality=${i.speciality}`}>
                <img
                  src={assets[i.image]}
                  alt={i.speciality}
                  className="w-32  sm:w-28 md:w-32 lg:w-32  aspect-square object-contain  group-hover:border-blue-500 group-hover:rounded-full group-hover:border-2 transition-all duration-200"
                />
                <h1 className="text-gray-500 font-semibold mt-3">
                  {i.speciality}
                </h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home2;
