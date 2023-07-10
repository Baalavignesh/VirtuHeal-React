import RootApi from "./ApiRoute";

async function RegisterStudent(registerInput) {
    const response = await fetch(RootApi + "/Auth/registerstudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInput),
    });
  
    return response;
  }


  async function RegisterPsychiatrist(registerInput) {
    const response = await fetch(RootApi + "/Auth/registerpsychiatrist", {
      method:"POST",
      headers: {
        "Content-Type":"application/json",
      },
      body:JSON.stringify(registerInput),
    });
  }
  export {RegisterStudent, RegisterPsychiatrist};
