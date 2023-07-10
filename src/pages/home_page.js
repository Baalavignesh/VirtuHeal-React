import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { reactLocalStorage } from "reactjs-localstorage";
import MyButton from "../components/button";
import motivationalQuotes from "../assets/quotes";
import {
  GetMyInfo as GetMyInfoStudent,
  GetMyPsychiatrist,
} from "../api_calls/StudentApi";

import {
  GetMyInfo as GetMyInfoPsychiatrist,
  GetMyStudents,
} from "../api_calls/PsychiatristApi";
import { GetMyAppointment } from "../api_calls/AppointmentApi";
import { useNavigate } from "react-router-dom";

function HomePage() {
  let [userInfo, setUserInfo] = useState(null);
  let [localInfo, setLocalStorage] = useState();
  let [myPsychiatrist, setMyPsychiatrist] = useState(null);
  let [myStudents, setMyStudents] = useState([]);
  let [myAppointments, setMyAppointments] = useState([]);
  let [myQuote, setMyQuote] = useState([]);
  let [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  let getStudentInformation = async (localInfo) => {
    // Student Information
    let userInfo = await GetMyInfoStudent(localInfo.myId);
    setUserInfo(userInfo);
    setUserInfo({ ...userInfo, role: localInfo.role });

    // MyPsychiatrist Information
    if (userInfo.my_psychiatrist !== 0) {
      let myPsychiatrist = await GetMyPsychiatrist(userInfo.my_psychiatrist);
      setMyPsychiatrist(myPsychiatrist.data);
    } else {
      setMyPsychiatrist(null);
    }

    // My Appointments
    let myAppointmentsData = await GetMyAppointment(
      localInfo.myId,
      localInfo.role
    );
    setMyAppointments(myAppointmentsData.data);

    setInterval(() => {
      setLoading(false);
    }, 2000);
  };

  let getPsychiatristInformation = async (localInfo) => {
    // Psychiatrist Information
    let userInfo = await GetMyInfoPsychiatrist(localInfo.myId);
    console.log(userInfo);
    setUserInfo(userInfo);
    setUserInfo({ ...userInfo, role: localInfo.role });

    let myStudents = await GetMyStudents(userInfo.psychiatrist_id);
    console.log(myStudents);
    setMyStudents(myStudents);

    // My Appointments
    let myAppointmentsData = await GetMyAppointment(
      localInfo.myId,
      localInfo.role
    );
    console.log(myAppointmentsData);
    setMyAppointments(myAppointmentsData.data);

    setLoading(false);
  };

  function splitDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    const date = dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const time = dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const now = new Date();
    const timeUntilAppointment = dateTime - now;

    // Convert timeUntilAppointment to hours and minutes
    const hoursUntilAppointment = Math.floor(
      timeUntilAppointment / (1000 * 60 * 60)
    );
    const minutesUntilAppointment = Math.floor(
      (timeUntilAppointment % (1000 * 60 * 60)) / (1000 * 60)
    );

    return {
      date,
      time,
      hoursUntilAppointment,
      minutesUntilAppointment,
    };
  }

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setMyQuote(motivationalQuotes.at(randomNum));
    let localInfo = reactLocalStorage.getObject("userInfo");
    setLocalStorage(localInfo);

    if (localInfo.role === "student") {
      getStudentInformation(localInfo);
    } else {
      getPsychiatristInformation(localInfo);
    }
  }, []);
  return (
    <div>
      {loading ? (
        <div className="h-screen flex justify-center bg-white">
          <iframe
            title="loading"
            src="https://embed.lottiefiles.com/animation/148627"
            className="w-full -scale-50 transform rotate-180"
          ></iframe>
        </div>
      ) : (
        <>
          <Navbar />

          <div className="container m-auto">
            <h1 className="pt-10 pb-10">Welcome {userInfo.name}</h1>
            <div className="grid grid-cols-3 gap-6 h-96 mb-6">
              <div className="col-span-2 bg-white rounded-lg">
                {userInfo.role === "student" ? (
                  <div className="pl-6 mt-4">
                    <h3>My Healer</h3>
                    {myPsychiatrist === null ? (
                      <div>No healer assigned yet</div>
                    ) : (
                      <div>Healer Info</div>
                    )}
                  </div>
                ) : (
                  <div className="pl-6 mt-4 pr-6">
                    <h3 className="mb-4 border-b-2">My Students</h3>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Age
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Gender
                            </th>
                            <th scope="col" className="px-6 py-3">
                              View Profile
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {myStudents.map((student, index) => {
                          return (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {student.name}
                            </th>
                            <td className="px-6 py-4">{student.age}</td>
                            <td className="px-6 py-4">{student.gender}</td>
                            <td className="px-6 py-4"><a onClick={() => {navigate(`viewstudentprofile`)}} className="underline text-light-blue-800 cursor-pointer"> View Profile</a> </td>
                          </tr>
                          );
                        })}
                          
                        </tbody>
                      </table>
                    </div>
                    ​
                    {myStudents.length > 0 ? (
                      <>
                       
                      </>
                    ) : (
                      <div>No students assigned yet</div>
                    )}
                  </div>
                )}
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3>{myQuote[0]}</h3>
                <h4 className="mt-2">- {myQuote[1]}</h4>
              </div>
            </div>

            <div className="col-auto bg-white w-full p-5 rounded-lg">
              <h3 className="pb-4">Appointments</h3>
              {myAppointments.length > 0 ? (
                <div>
                  {myAppointments.map((val, index) => {
                    let datetime = splitDateTime(val.time);
                    return (
                      <div
                        className="grid grid-cols-2 bg-gray-50 p-4 rounded-md"
                        key={index}
                      >
                        <div>
                          <h4>Date : {datetime.date} </h4>
                          <h4>Appointment Time : {datetime.time}</h4>
                          <h4>
                            Time Left : &nbsp;
                            {datetime.hoursUntilAppointment}hrs &nbsp;
                            {datetime.minutesUntilAppointment}min left
                          </h4>
                        </div>

                        <div>
                          <h4> Status : {val.status}</h4>
                          {val.initiatedBy === localInfo.myId && (
                            <div>button to accept and reject</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <h5 className="mt-4 pb-6">No Appointments for now</h5>
                  {reactLocalStorage.getObject("userInfo").role ===
                    "student" && (
                    <MyButton
                      name="Book an Appointment"
                      onClick={() =>
                        navigate("/create-appointment", {
                          state: { to: myPsychiatrist },
                        })
                      }
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
