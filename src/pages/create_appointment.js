import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { CreateAppointment } from "../api_calls/AppointmentApi";
// Update the import path

function CreateAppointmnet() {
  let [senderId, setSenderId] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    let data = location.state?.to;
    console.log(data);

    setSenderId(data);

    // if(data === undefined) {
    //   navigate("/app");
    // }
    // setSenderId(data);
  }, []);

  let handleCreateAppointment = async (e) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    let appointmentEntries = Object.fromEntries(formEntries);

    let userInfo = reactLocalStorage.getObject("userInfo");
    // {
    //   "appointmentId": 0,
    //   "studentId": 0,
    //   "psychiatristId": 0,
    //   "initiatedBy": "string",
    //   "status": "string",
    //   "time": "2023-07-09T06:22:46.125Z"
    // }
    if (userInfo.role === "student") {
      appointmentEntries = {
        ...appointmentEntries,
        studentId: userInfo.myId,
        psychiatristId: senderId,
        initiatedBy: (userInfo.myId).toString(),
        status: "pending",
      };
    } else {
      appointmentEntries = {
        ...appointmentEntries,
        studentId: senderId,
        psychiatristId: userInfo.myId,
        initiatedBy: (userInfo.myId).toString(),
        status: "pending",
      };
    }
    console.log(userInfo);
    console.log(appointmentEntries);

    let response = await CreateAppointment(appointmentEntries);
    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData.data);
      navigate("/app");
    } else {
      const responseData = await response.json();

      console.log(responseData.error);
      // setErrorMessage(responseData.error);
    }
  };

  const [appointmentTime, setAppointmentTime] = useState(
    new Date().toISOString().split(".")[0]
  );

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };
  return (
    <div className="container m-auto min-h-screen">
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <h2 className="pb-6">Create an Appointment</h2>
        <form
          onSubmit={handleCreateAppointment}
          className="flex flex-col items-center"
        >
          <div className="m-4">
            <label>Appointment Date and Time</label>

            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
              color="secondary"
              name="time"
              placeholder="Time"
              type="datetime-local"
              id="appointmenttime"
              // min={new Date().toISOString().slice(0, -8)}              
              value={appointmentTime} // Use the value prop to set the input value
              onChange={handleTimeChange} // Update the state when the input value changes
            />
          </div>
          <div className="m-4">
            <label>
              {reactLocalStorage.getObject("userInfo").role === "student"
                ? "To (Healer ID)"
                : "To (Student ID)"}{" "}
            </label>
            <input
              className="mt-1 px-3 py-2 bg-blue-gray-50 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72"
              color="secondary"
              type="text"
              name="InitiatedBy"
              disabled
              value={senderId}
              placeholder="Healer ID"
            />
          </div>

          <button className="p-2 w-40 bg-white rounded-lg m-4 text-lg border-[#19A7CE] border-2 hover:cursor-pointer hover:bg-[#146C94] hover:text-white ease-in-out duration-500">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreateAppointmnet;
