import RootApi from "./ApiRoute";

async function GetColleges() {
    const response = await fetch(RootApi + "/Fetch/GetAllCollege", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      return response;
}

export {GetColleges};