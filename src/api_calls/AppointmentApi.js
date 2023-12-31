import { json } from "react-router-dom";
import RootApi from "./ApiRoute";

async function GetMyAppointment(userId, role) {
    const response = await fetch(RootApi + `/Appointment/GetAppointment?user_id=${userId}&role=${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    return responseData;
  }

  async function CreateAppointment(appointmentInfo) {
    const response = await fetch(RootApi + `/Appointment/NewAppointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentInfo),
    });
    return response;
  }

  async function UpdateAppointmnt(appointmentInfo) {
    const response = await fetch(RootApi + `/Appointment/UpdateAppointment?appointment_id=${appointmentInfo.appointment_id}&new_status=${appointmentInfo.new_status}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentInfo),
    });
    return response;
  }

  export {GetMyAppointment, CreateAppointment, UpdateAppointmnt};