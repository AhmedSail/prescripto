import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link, useParams } from "react-router-dom";

const Footer = () => {
  const { userid } = useParams();
  const FooterMenu = [
    { id: 1, name: "Home", Link: `/${userid}/` },
    { id: 2, name: "All Doctors", Link: `/${userid}/AllDoctors` },
    { id: 3, name: "About", Link: `/${userid}/About` },
    { id: 4, name: "Contact", Link: `/${userid}/Contact` },
  ];

  return (
    <div className="px-6 sm:px-10 mt-32">
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div className="text-center lg:text-left space-y-6">
          <img
            src={assets.logo}
            alt="Logo"
            className="mx-auto lg:mx-0 mb-4 w-52"
          />
          <p className="text-gray-400 font-semibold text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            nostrum assumenda unde quasi tempore porro consequatur eaque amet
            dicta non.
          </p>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <h1 className="uppercase font-bold text-2xl text-gray-600 mb-6">
            Company
          </h1>
          <div className="flex flex-col items-center gap-2 text-gray-400 font-semibold">
            {FooterMenu.map((i) => (
              <Link
                key={i.id}
                to={i.Link}
                className="hover:text-gray-500 transition-all duration-200"
              >
                {i.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center lg:text-right space-y-2">
          <h1 className="uppercase font-bold text-2xl text-gray-600 mb-6">
            Get in Touch
          </h1>
          <p className="text-gray-400 font-semibold">+972 592 855 602</p>
          <p className="text-gray-400 font-semibold break-words">
            sdew2sdew0592855602@gmail.com
          </p>
        </div>
      </div>

      <hr className="my-10 border-gray-300" />

      <div className="text-center font-semibold text-gray-500 text-sm">
        © 2024 Prescripto — All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
