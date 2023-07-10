import RootApi from "./ApiRoute";

async function GetMyInfo(psychiatristId) {
    const response = await fetch(RootApi + `/Psychiatrist/GetMyInfo?psychiatrist_id=${psychiatristId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    return responseData;
  }

  async function GetMyStudents(psychiatristId) {
    const response = await fetch(RootApi + `/Psychiatrist/GetMyStudents?pyschiatrist_id=${psychiatristId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    return responseData;

  }



export {GetMyInfo, GetMyStudents}