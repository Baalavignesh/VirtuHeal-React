import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

function Navbar() {


let navigate = useNavigate();
let [userData, setUserData] = useState();
useEffect(() => {
  let data = reactLocalStorage.getObject("userInfo");
  console.log(data);
  setUserData(data);
}, [])

  return (
    <div className="grid grid-cols-4 h-24 text-white bg-[#146C94] w-screen">
      <div className="col-span-2 self-center ml-12">
        <h2 className="cursor-pointer">VirtuHeal</h2>
      </div>
      <div className="flex justify-evenly items-center col-span-2">
      <h4 className="cursor-pointer">{userData?.role === "student" ? "My Healer" : "My Students"}</h4>

      <h4 className="cursor-pointer">My Appointments</h4>
      <h4 className="cursor-pointer" onClick={() => {localStorage.clear(); navigate("/login")}}>Logout</h4>
      </div>
    </div>
  );
}
export default Navbar;
