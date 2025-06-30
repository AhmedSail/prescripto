import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Link, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Home3 = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [data, setData] = useState([]);
  const { userid } = useParams();
  const TopDoctors = data.slice(0, 10);
  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/doctors")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-32">
        Top Doctors to Book
      </h1>
      <p className="text-center text-gray-500 font-semibold mb-10">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div>
        <Carousel responsive={responsive}>
          {TopDoctors.map((i, index) => (
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
        </Carousel>
      </div>
      <Link to={`/${userid}/AllDoctors`}>
        <button className="uppercase bg-gray-300 rounded-full px-20 p-3 text-gray-700 font-bold block mt-10 mx-auto mb-20 hover:bg-gray-500 hover:text-white transition-all duration-300">
          More
        </button>
      </Link>
    </div>
  );
};

export default Home3;
