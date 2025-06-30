import React, { createContext, useEffect, useState } from "react";
export const AppointmentContext = createContext();
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AppointmentContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [specialityData, setSpecialityData] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [fromSocial, setFromSocial] = useState(false);
  const currency = "$";
  const navigate = useNavigate();
  //axios to get data from json
  useEffect(() => {
    axios
      .get("https://prescripto-json-production.up.railway.app/doctors")
      .then((res) => setDoctors(res.data));
    axios
      .get("https://prescripto-json-production.up.railway.app/specialityData")
      .then((res) => setSpecialityData(res.data));
    axios
      .get("https://prescripto-json-production.up.railway.app/users")
      .then((res) => setUsers(res.data));
    axios
      .get("https://prescripto-json-production.up.railway.app/admins")
      .then((res) => setAdmins(res.data));
  }, []);
  const addUser = (newUser) => {
    axios
      .post("https://prescripto-json-production.up.railway.app/users", newUser)
      .then((res) => {
        setUsers((prevUsers) => [...prevUsers, res.data]); // تحديث القائمة
      })
      .catch((err) => {
        console.error("Error adding user:", err);
      });
  };

  const value = {
    doctors,
    specialityData,
    setDoctors,
    setSpecialityData,
    users,
    setUsers,
    addUser,
    navigate,
    currency,
    fromSocial,
    setFromSocial,
    admins,
    setAdmins,
  };
  return (
    <AppointmentContext.Provider value={value}>
      {props.children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContextProvider;
