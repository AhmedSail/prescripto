import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link, useLocation, useParams } from "react-router-dom";
import { AppointmentContext } from "../context/AppointmentContext";
import { FaArrowDown } from "react-icons/fa";
import NavMobile from "./NavMobile";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { userid } = useParams();
  const { users } = useContext(AppointmentContext);
  const [showMenu, setShowMenu] = useState(false);
  const { logoutUser } = useAuth();
  const toogleMenu = () => {
    setShowMenu(!showMenu);
  };
  const user = users.find((u) => u._id === userid);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const NavbarMenu = [
    { id: 1, name: "Home", Link: `/${userid}/` },
    { id: 2, name: "All Doctors", Link: `/${userid}/AllDoctors` },
    { id: 3, name: "About", Link: `/${userid}/About` },
    { id: 4, name: "Contact", Link: `/${userid}/Contact` },
  ];
  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to log out?",
      showDenyButton: true,
      confirmButtonText: "Yes, log out",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        Swal.fire("You have been logged out", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Logout cancelled", "", "info");
      }
    });
  };
  const location = useLocation();

  return (
    <div>
      <div className="flex justify-between items-center mt-5 border-b pb-4">
        {/* Logo */}
        <div>
          <img
            src={assets.logo}
            alt="Logo"
            className="w-32 md:w-32 lg:w-40 rounded-full"
          />
        </div>

        {/* Menu */}
        <div className="relative sm:flex flex-col md:flex-row gap-3 md:gap-6 md:text-md hidden ">
          {NavbarMenu.map((i) => (
            <Link
              className="mx-4 uppercase font-semibold text-gray-600 relative md:text-sm exact-1024:text-base"
              to={i.Link}
              key={i.id}
            >
              {i.name}
              <span
                className={`bg-primary h-[2px] w-[50%] absolute left-1/2 transform -translate-x-1/2 top-[110%] transition-all duration-300 delay-150 ${
                  location.pathname === i.Link
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-10 opacity-0 scale-75"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Profile Button */}
        <div className="relative group hidden sm:block ">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={storedUser?.images}
              alt="Profile"
              className="w-8 md:w-12  p-1 rounded-full border"
            />
            <FaArrowDown />
          </div>
          <div className="absolute w-40 md:w-48 bg-white shadow-lg rounded-lg transition-all duration-700 opacity-0 group-hover:opacity-100 -translate-y-96  group-hover:translate-y-0">
            <div className="flex flex-col gap-3 w-full py-3 px-5 text-gray-500 rounded-md">
              <p className="cursor-pointer hover:text-black font-semibold text-sm md:text-base py-2">
                <Link to={`/${userid}/Myprofile`}>My Profile</Link>
              </p>
              <hr />
              <p className="cursor-pointer hover:text-black font-semibold text-sm md:text-base py-2">
                <Link to={`/${userid}/Appointments`}>My Appointments</Link>
              </p>
              <hr />
              <p
                onClick={() => handleLogout()}
                className="cursor-pointer hover:text-black font-semibold text-sm md:text-base py-2"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        {/* MenuBar Mobile  */}
        <div className="sm:hidden z-10">
          <button onClick={toogleMenu} className="flex flex-col gap-2 w-8">
            <span
              className={`rounded-2xl h-[3px] w-1/2 bg-black transition-transform duration-500 origin-right ${
                showMenu
                  ? "rotate-[225deg] -translate-x-[12px] -translate-y-[1px]"
                  : ""
              }`}
            ></span>
            <span
              className={`rounded-2xl h-[3px] w-full bg-black transition-transform duration-500 ${
                showMenu ? "-rotate-45" : ""
              }`}
            ></span>
            <span
              className={`rounded-2xl h-[3px] w-1/2 bg-black transition-transform duration-500 self-end origin-left ${
                showMenu
                  ? "rotate-[225deg] translate-x-[12px] translate-y-[1px]"
                  : ""
              }`}
            ></span>
          </button>
          <NavMobile
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            userid={userid}
            NavbarMenu={NavbarMenu}
            toogleMenu={toogleMenu}
            storedUser={storedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
