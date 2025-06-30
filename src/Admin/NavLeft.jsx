import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { GrHomeRounded } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";
import { CgUserList } from "react-icons/cg";

const NavLeft = ({ adminid }) => {
  const location = useLocation();
  const Menu = [
    {
      id: 1,
      i: <GrHomeRounded />,
      name: "Dashboard",
      Link: `/${adminid}/home`,
    },
    {
      id: 2,
      i: <MdDateRange />,
      name: "Appointments",
      Link: `/${adminid}/home/adminAppointments`,
    },
    {
      id: 3,
      i: <VscDiffAdded />,
      name: "Add Doctor",
      Link: `/${adminid}/home/addDoctor`,
    },
    {
      id: 4,
      i: <CgUserList />,
      name: "Doctor List",
      Link: `/${adminid}/home/doctorList`,
    },
  ];
  return (
    <div className="lg:block lg:min-h-screen lg:w-1/6">
      <div className="flex flex-col gap-5 py-10 ipad:mx-auto ipad:text-center  ipad:border-0 lg:border-r ">
        {Menu.map((i) => (
          <div key={i.id}>
            <Link
              to={i.Link}
              className={`flex items-center justify-center  gap-3 ipad:text-center px-6 text-lg text-gray-700 py-3 ${
                location.pathname === i.Link
                  ? "bg-gray-100 border-r-4 border-primary"
                  : ""
              }`}
            >
              <i>{i.i}</i>
              <span>{i.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavLeft;
