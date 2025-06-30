import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div className="page-container container">
      <Navbar />
      <div className="content">
        <Title text1={"Contact"} text2={"Us"} center={true} size={"text-3xl"} />
        <div className="flex max-sm:flex-col justify-center items-center gap-10">
          <img src={assets.contact_image} alt="" className="w-96" />
          <div className="flex flex-col gap-7 ">
            <h1 className="font-bold text-gray-600">Our OFFICE</h1>
            <div>
              <p className="text-gray-500">54709 Willms Station </p>
              <p className="text-gray-500">Suite 350, Washington, USA</p>
            </div>
            <div>
              <p className="text-gray-500">Tel: +972 592 855 602</p>
              <p className="text-gray-500">
                Email: sdew2sdew0592855602@gmail.com
              </p>
            </div>
            <h1 className="font-bold text-gray-600 uppercase">
              Careers at PRESCRIPTO
            </h1>
            <p className="text-gray-500">
              Learn more about our teams and job openings.
            </p>
            <button className="p-5 border border-black font-semibold">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
