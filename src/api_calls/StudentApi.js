import RootApi from "./ApiRoute";

async function GetMyInfo(studentId) {
    const response = await fetch(RootApi + `/Student/GetMyInfo?student_id=${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    return responseData;
  }

  async function GetMyPsychiatrist(psychiatrist_id) {
    const response = await fetch(RootApi + `/Student/GetMyPsychiatrist?psychiatrist_id=${psychiatrist_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    console.log(responseData)
    return responseData;
  }



export {GetMyInfo, GetMyPsychiatrist}