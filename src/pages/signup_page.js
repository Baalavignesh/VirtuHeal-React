import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SignUpPage() {
  let [errorMessage, setErrorMessage] = useState(" ");
  let [selectedRole, setSelectedRole] = useState("");

  let navigate = useNavigate();
  let location = useLocation();


  useEffect(() => {
    console.log("Signup Page");

    let role = location.state?.role;
    setSelectedRole(role);
  }, [location]);

  useEffect(() => {
    // localStorage.setItem("authToken", "brr");
    if(!selectedRole) {
      setSelectedRole("student")
    }
  }, [selectedRole]);



  let handleSignup = async (e) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const signupInput = Object.fromEntries(formEntries);
    console.log("form submitting");
    console.log(signupInput);
    if (signupInput.password.length !== 0 && signupInput.username.length !== 0) {
      console.log("user input done");

      if(signupInput.role === "student") {
        navigate("/register-student", { state: { authinput: signupInput } });
      }
      else {
        navigate("/register-psychiatrist", { state: { authinput: signupInput } });

      }

      // let response = await SignUpUser(signupInput);
      // if (response.status === 200) {
      //   navigate("/login");
      // } else {
      //   const responseError = await response.json();
      //   setErrorMessage(responseError);
      //   console.log(errorMessage);
      // }
      // if (response) {
      //   setErrorMessage(response);
      // }
    } else {
      setErrorMessage("Please enter username and password");
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="text-center mb-4">
      <h1 className="pb-4">VirtuHeal</h1>

        <h3>Welcome, It's heal time</h3>
        <p>{selectedRole === "student" ? "Signup and talk with professionals": "Signup and start helping students"} </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-2 text-red-400">{errorMessage}</p>
        <form onSubmit={handleSignup} className="flex flex-col items-center">
        <div className="flex w-full justify-center">
        <div class="flex items-center pl-4 m-1">
            <input
              checked={selectedRole === "student"}
              id="student"
              type="radio"
              value={selectedRole}
              onChange={() => setSelectedRole("student")}
              name="role"
              class="w-4 h-4 text-blue-600  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
            />
            <label
              for="student"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900"
            >
              Student
            </label>
          </div>
          <div class="flex items-center pl-4 m-1">
            <input
              checked={selectedRole === "psychiatrist"}
              id="psychiatrist"
              type="radio"
              value={selectedRole}
              onChange={() => setSelectedRole("psychiatrist")}
              name="role"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="psychiatrist"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Psychiatrist 
            </label>
          </div>
        </div>


          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72 m-4"
            label="Username"
            color="secondary"
            name="username"
            placeholder="Email"
            type="mail"
          />

          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72 m-4"
            label="New Password"
            color="secondary"
            type="password"
            name="password"
            placeholder="Password"
          />

          <button className="p-2 w-40 bg-white rounded-lg m-4 text-lg border-[#19A7CE] border-2 hover:cursor-pointer hover:bg-[#146C94] hover:text-white ease-in-out duration-500">
            Signup
          </button>
        </form>
        <div className="border-t-2 w-60 border-slate-300"></div>
        <p className="mt-4"> Already a member?</p>
        <button
          className="p-2 w-40 bg-white rounded-lg m-4 mt-2 text-base border-[#19A7CE] border-2 hover:cursor-pointe ease-in-out duration-500"
          type="submit"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
