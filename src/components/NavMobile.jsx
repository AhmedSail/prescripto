import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const NavMobile = ({
  showMenu,
  setShowMenu,
  storedUser,
  NavbarMenu,
  toogleMenu,
  userid,
}) => {
  const [DropListShow, setDropListShow] = useState(false);
  const dropListShowToogle = () => {
    setDropListShow(!DropListShow);
  };
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
  const { logoutUser } = useAuth();
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-transform duration-300 ${
        showMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-6 p-6">
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
        </div>
        {NavbarMenu.map((i) => (
          <Link
            className="mx-4 uppercase font-semibold text-gray-600 relative md:text-sm exact-1024:text-base"
            to={i.Link}
            key={i.id}
            onClick={toogleMenu} // ✅ يغلق القائمة بعد التنقل
          >
            {i.name}
          </Link>
        ))}
        <div className="relative group block sm:hidden ml-3">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={dropListShowToogle}
          >
            <img
              src={storedUser?.images}
              alt="Profile"
              className="w-8 md:w-12 rounded-full"
            />
            <FaArrowRight />
          </div>
          <div
            className={`border w-full  transition-all duration-700 group-hover:translate-y-0 ${
              DropListShow ? "" : "hidden h-0"
            }`}
          >
            <div className="flex flex-col gap-3 w-full py-3 px-5 text-gray-500 rounded-md">
              <p className="cursor-pointer hover:text-black font-semibold text-sm md:text-base py-2">
                <Link to={`/${userid}/Myprofile`}>My Profile</Link>
              </p>
              <hr />
              <p className="cursor-pointer hover:text-black font-semibold text-sm md:text-base py-2">
                <Link to={`/${userid}/Appointments`} onClick={toogleMenu}>
                  My Appointments
                </Link>
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
      </div>
    </div>
  );
};

export default NavMobile;
