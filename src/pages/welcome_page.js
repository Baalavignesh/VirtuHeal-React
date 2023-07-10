import React from "react";
import { ReactComponent as WelcomeImg } from "../assets/welcome-page.svg";
import { ReactComponent as Student } from "../assets/student.svg";
import { ReactComponent as Professional } from "../assets/pro.svg";
import { useNavigate } from "react-router-dom";


function WelcomePage() {

  const naviagte = useNavigate();

  return (
    <div className="h-screen m-auto grid grid-rows-2">
      <div className="grid grid-cols-3  m-auto gap-2  h-96 w-10/12">
        <div className="w-full col-span-2 h-96 flex flex-col justify-center">
          <h1 className="p-5 text-center">Welcome to VirtuHeal</h1>
          <h4 className="text-center">
            Welcome to our website for virtual wellness sessions! Connect with
            expert practitioners, engage in live chats, and enjoy video calls to
            enhance your overall mobility, fitness, and recovery. Experience
            personalized care and guidance from certified professionals, all
            from the convenience of your own space. Embrace the power of our
            innovative platform to prioritize your well-being and unlock your
            full potential.
          </h4>
        </div>
        <div className="col-start-3">
          <WelcomeImg className="w-96 h-96" />
        </div>
      </div>
     
      <div className=" w-full h-full flex justify-center items-center gap-24 m-auto bg-[#146C94]">
        <div className="w-96 h-96 mt-8 rounded-xl border-4 border-transparent hover:border-x-sky-500 hover:border-4 duration-500 hover:scale-105 ease-in-out bg-white" onClick={() => naviagte('/signup', { state: { role: "student" } })}>
          <div className="flex flex-col justify-between h-full bg-transparent p-2 overflow-hidden ">
            <h3 className="m-2 text-center">I'm here to heal</h3>
            <Student className="w-full h-48 hover:scale-110 transition-transform ease-in-out duration-500" />
            <h2 className="m-2 text-center">Student</h2>
          </div>
        </div>
        <div className="w-96 h-96  mt-8 rounded-xl border-4 border-transparent hover:border-x-sky-500 hover:border-4 duration-500 ease-in-out hover:scale-105 bg-white" onClick={() => naviagte('/signup', { state: { role: "psychiatrist" } })}>
          <div className="flex flex-col justify-between h-full bg-transparent p-2 overflow-hidden">
            <h3 className="m-2 text-center">I'm your healer</h3>
            <Professional className="w-full h-48 hover:scale-110 transition-transform ease-in-out duration-500" />
            <h2 className="m-2 text-center">Professional</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
