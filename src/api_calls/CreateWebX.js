import axios from "axios";

function CreateMeeting(appointment_time) {
  console.log(appointment_time);
  
  const timestamp = new Date(appointment_time);

  timestamp.setHours(timestamp.getHours() + 1);
  console.log(timestamp);
  axios
    .post(
      "https://webexapis.com/v1/meetings",
      {
        title: "VirtuHeal - HealTime",
        start:appointment_time,
        end: timestamp
      },
      {
        headers: {
          Authorization: "Bearer OWVjZGFhMjItNWJmMy00Yjg2LTgyODYtMmMxYmY3MTQ3NjRiOWYwYmZkOTgtODVh_P0A1_617f6431-ce10-4d03-833e-f52763a855e6",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const accessToken = response.data;
      console.log(accessToken);
      // Call the function to create a meeting using the access token
    })
    .catch((error) => {
      console.error("Error obtaining access token:", error);
    });
}

export { CreateMeeting };
