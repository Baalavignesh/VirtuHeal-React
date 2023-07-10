import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../api_calls/UserAuth";
import { reactLocalStorage } from "reactjs-localstorage";

function LoginPage() {

  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("Login Page");
  }, []);

  let navigate = useNavigate();

  let handleLogin = async (e) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const loginInput = Object.fromEntries(formEntries);
    let response = await LoginUser(loginInput);

    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData.data);
      reactLocalStorage.setObject("userInfo", responseData.data);
      reactLocalStorage.set("authToken", responseData.jwt);

      // dispatch(setValue(responseData.data));

      navigate("/app");
    } else {
      console.log(response);
      await response.json().then((data) => {
        console.log(data.error);
        if (data.error === "Wrong Password") {
          setErrorMessage(data.error);
          // setPasswordErrorMessage(data.error);
        } else {
          setErrorMessage(data.error);
        }
      });
    }
  };



  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="text-center mb-6">
      <h1 className="">VirtuHeal</h1>
        <h4>Welcome Back!</h4>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-2 text-red-400">{errorMessage}</p>
        <form onSubmit={handleLogin} className="flex flex-col items-center">
  

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
            Login
          </button>
        </form>
        <div className="border-t-2 w-60 border-slate-300"></div>
        <p className="mt-4"> New here?</p>
        <button
          className="p-2 w-40 bg-white rounded-lg m-4 mt-2 text-base border-[#19A7CE] border-2 hover:cursor-pointe ease-in-out duration-500"
          type="submit"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
