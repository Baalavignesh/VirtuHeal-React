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
import {
  GetMyAppointment,
  UpdateAppointmnt,
} from "../api_calls/AppointmentApi";
import { useNavigate } from "react-router-dom";
import { CreateAccessToken, CreateMeeting } from "../api_calls/CreateWebX";

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
      setMyPsychiatrist(myPsychiatrist);
    } else {
      setMyPsychiatrist(null);
    }

    // My Appointments
    await appointmentApiCall(localInfo);

    setInterval(() => {
      setLoading(false);
    }, 2000);
  };

  let appointmentApiCall = async (localInfo) => {
    let myAppointmentsData = await GetMyAppointment(
      localInfo.myId,
      localInfo.role
    );
    console.log(myAppointmentsData.data);
    setMyAppointments(myAppointmentsData.data);
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
    await appointmentApiCall(localInfo);

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

  let handleAppointment = async (response, appointment) => {
    console.log(response);
    if (response) {
      // create meeting link
      await UpdateAppointmnt({
        appointment_id: appointment.appointmentId,
        new_status: "accepted",
      });

      CreateMeeting(appointment.time);
    } else {
      // reject appointment
      await UpdateAppointmnt({
        appointment_id: appointment.appointmentId,
        new_status: "denied",
      });
    }

    await appointmentApiCall(localInfo);
  };

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
                  <div className="pl-6 mt-4 pr-6">
                    <h3 className="mb-4 border-b-2">My Healer</h3>
                    {myPsychiatrist === null ? (
                      <div>No healer assigned yet</div>
                    ) : (
                      <div>
                        <h2>{myPsychiatrist.name}</h2>
                        <h4>{myPsychiatrist.qualification}</h4>
                        <div className="flex w-full">
                          <MyButton
                            name="Chat Now"
                            className="mr-4 p-4 mt-12"
                            onClick={() =>
                              navigate("/chat", {
                                state: {
                                  studentId: localInfo.myId,
                                  psychiatristId:
                                    myPsychiatrist.psychiatrist_id,
                                  receiverName: myPsychiatrist.name,
                                  receiverId:myPsychiatrist.userId
                                },
                              })
                            }
                          />
                          <MyButton
                            name="Schedule Call"
                            className="mr-4 p-4 mt-12"
                            onClick={() =>
                              navigate("/create-appointment", {
                                state: { to: myPsychiatrist.psychiatrist_id },
                              })
                            }
                          />
                        </div>
                      </div>
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
                            <th scope="col" className="px-6 py-3">
                              Contact
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {myStudents.map((student, index) => {
                            return (
                              <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {student.name}
                                </th>
                                <td className="px-6 py-4">{student.age}</td>
                                <td className="px-6 py-4">{student.gender}</td>
                                <td className="px-6 py-4">
                                  <a
                                    onClick={() => {
                                      navigate(`viewstudentprofile`);
                                    }}
                                    className="underline text-light-blue-800 cursor-pointer"
                                  >
                                    View Profile
                                  </a>
                                </td>
                                <td className="px-6 py-4 flex">
                                  <a
                                    className="pr-4 underline text-light-blue-800 cursor-pointer"
                                    onClick={() => {
                                      navigate("/chat", {
                                        state: {
                                          studentId: student.student_id,
                                          psychiatristId: localInfo.myId,
                                          receiverName: student.name,
                                          receiverId:student.userId

                                        },
                                      });
                                    }}
                                  >
                                    {" "}
                                    Chat
                                  </a>
                                  <a
                                    className="underline text-light-blue-800 cursor-pointer"
                                    onClick={() =>
                                      navigate("/create-appointment", {
                                        state: {
                                          to: student.student_id,
                                        },
                                      })
                                    }
                                  >
                                    Schedule
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    ​
                    {myStudents.length > 0 ? (
                      <></>
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
                <>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                      <th scope="col" className="px-6 py-3">
                          Initiated By
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {myAppointments.map((appointment, index) => {
                        let datetime = splitDateTime(appointment.time);



                        let initiatedVal = appointment.initiatedBy == localInfo.myId ? "Me": appointment.initiatedBy;
                        console.log(appointment.status)
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                                                      <td className="px-6 py-4">{initiatedVal}</td>

                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {datetime.date}
                            </th>
                            <td className="px-6 py-4">{datetime.time}</td>
                            <td className="px-6 py-4">
                              {appointment.initiatedBy == localInfo.myId &&
                              appointment.status !== "accepted" ? (
                                appointment.status
                              ) : appointment.status === "pending" ? (
                                <div>
                                  <i
                                    className="fa-solid fa-circle-check mr-12 scale-150 cursor-pointer"
                                    style={{ color: "#669c35" }}
                                    onClick={() =>
                                      handleAppointment(true, appointment)
                                    }
                                  ></i>
                                  <i
                                    className="fa-solid fa-circle-xmark scale-150 cursor-pointer"
                                    style={{ color: "#e32400" }}
                                    onClick={() =>
                                      handleAppointment(false, appointment)
                                    }
                                  ></i>
                                </div>
                              ) : appointment.status === "denied" ? (
                                <>denied</>
                              ) : (
                                `${datetime.hoursUntilAppointment} hrs ${datetime.minutesUntilAppointment} min left`
                              )}
                            </td>
                            <td className="px-6 py-4">---</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              ) : (
                <div>
                  <h5 className="mt-4 pb-6">No Appointments for now</h5>
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
