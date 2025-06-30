import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  const AboutData = [
    {
      id: 1,
      name: "Efficiency:",
      text: "Streamlined appointment scheduling that fits into your busy lifestyle.",
    },
    {
      id: 2,
      name: "Convenience:",
      text: "Access to a network of trusted healthcare professionals in your area.",
    },
    {
      id: 3,
      name: "Personalization:",
      text: "Tailored recommendations and reminders to help you stay on top of your health.",
    },
  ];
  return (
    <div className="container">
      <Navbar />
      <div>
        <Title text1={"About"} text2={"Us"} center={true} size={"text-3xl"} />
        <div className="grid grid-cols-1 lg:grid-cols-2  place-items-start ipad:text-center ">
          <img src={assets.about_image} alt="" />
          <div className="flex flex-col gap-24 ipad:mt-10">
            <p className="text-gray-400 font-semibold">
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records
            </p>
            <p className="text-gray-400 font-semibold">
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, Prescripto is here to support you every
              step of the way.
            </p>
            <h1 className="font-bold text-gray-600">Our Vision</h1>
            <p className="text-gray-400 font-semibold">
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Title
          text1={"Why"}
          text2={"Contact Us"}
          center={false}
          size={"text-xl"}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {AboutData.map((i) => (
            <div
              key={i.id}
              className="flex flex-col gap-10 p-10 border ipad:text-center"
            >
              <h1 className="font-bold">{i.name}</h1>
              <p className="text-gray-400 font-semibold">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
