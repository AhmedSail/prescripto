// AdminLayout.jsx
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import NavLeft from "./NavLeft";

const AdminLayout = () => {
  const { adminid } = useParams();

  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex flex-col lg:flex-row">
        <NavLeft adminid={adminid} className="w-full lg:w-1/5" />
        <div className="w-full lg:flex-grow p-4 sm:p-6 bg-[#f8f9fd]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
