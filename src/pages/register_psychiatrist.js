import { Button, Step, Stepper } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import SearchCollege from "../components/search_college";
import { SignUpUser } from "../api_calls/UserAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterPsychiatrist } from "../api_calls/UserRegister";

const CheckboxGroup = ({ question, options, onChange, type }) => {
  const [radioSelect, setRadioSelect] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (event) => {
    const value = event.target.value;

    if (type === "radio") {
      const value = event.target.value;
      setRadioSelect(value);
      onChange(question, value);
    } else {
      if (selectedOptions.includes(value)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== value)
        );
        onChange(
          question,
          selectedOptions.filter((option) => option !== value)
        );
      } else {
        setSelectedOptions([...selectedOptions, value]);
        onChange(question, [...selectedOptions, value]);
      }
    }
  };

  return (
    <div className="h-[32rem] w-1/2 mt-12 bg-white rounded-xl flex flex-col items-start ">
      <h4 className=" p-5 pl-12 mt-10 mb-5">{question}</h4>
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-4 pl-12 pb-2">
          <input
            id={`option-${index}`}
            type="checkbox"
            value={option}
            checked={
              type === "radio"
                ? radioSelect === option
                : selectedOptions.includes(option)
            }
            onChange={handleOptionChange}
            className="w-6  h-6 mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor={`option-${index}`}
            className="ml-2 text-xl text-gray-900"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

function RegisterPsyphiatristPage() {
  let location = useLocation();
  let navigate = useNavigate();

  let [userAuthInfo, setUserAuthInfo] = useState();

  let [activeStep, setActiveStep] = useState(0);
  let [isLastStep, setIsLastStep] = useState(false);
  let [isFirstStep, setIsFirstStep] = useState(false);

  let questions = {
    "Do you have prior experience?": ["Yes", "No"],
    "Are you planning to work part-time or fulltime": [
      "Part-time",
      "Full-time",
    ],
  };

  let [psychiatristData, setpsychiatristInfo] = useState({
    name: "",
    age: null,
    number: null,
    qualification: "",
    college_id: null,
  });

  let [psychiatristQuestions, setpsychiatristQuestions] = useState({
    question1: "",
    answer1: "",
    question2: "",
    answer2: "",
  });

  let handleInput = (e) => {
    setpsychiatristInfo({ ...psychiatristData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (question, value) => {
    let concatenatedValue = value;
    if (Array.isArray(value)) {
      concatenatedValue = value.join(", ");
    }

    setpsychiatristQuestions((prevpsychiatristQuestions) => ({
      ...prevpsychiatristQuestions,
      [`question${activeStep}`]: question,
      [`answer${activeStep}`]: concatenatedValue,
    }));

    console.log(activeStep, question, concatenatedValue);
  };

  // -----------
  // Final Part
  // -----------
  let handleSubmit = async (e) => {


    console.log(userAuthInfo);
    let response = await SignUpUser(userAuthInfo);
    let responseData = await response.json();
    console.log(responseData);

    let finalData = {
        ...psychiatristData,
        ...psychiatristQuestions,
        user_id: responseData.user_id,
        resume_url:"empty url",
        age:Number(psychiatristData.age),
      };
      console.log(finalData);


    await RegisterPsychiatrist(finalData);
    console.log(psychiatristQuestions);
    navigate("/login");
  };

  useEffect(() => {
    // checkAuthInput();
    let auth_info = location.state?.authinput;
    setUserAuthInfo(auth_info);
    console.log(auth_info);
  }, []);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        className="w-2/5"
      >
        <Step className="h-4 w-4" onClick={() => setActiveStep(0)} />
        <Step className="h-4 w-4" onClick={() => setActiveStep(1)} />
        <Step className="h-4 w-4" onClick={() => setActiveStep(2)} />
        <Step className="h-4 w-4" onClick={() => setActiveStep(3)} />
      </Stepper>

      {activeStep === 0 && (
        <div className="h-[32rem] w-1/2 mt-12 bg-white rounded-xl flex flex-col items-center">
          <h4 className="text-center p-5 mt-10 mb-5">Personal Details</h4>
          <div>
            <input
              id="name"
              value={psychiatristData.name}
              onChange={handleInput}
              name="name"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72 m-4"
              label="Name"
              color="secondary"
              placeholder="Name"
            />
            <input
              id="age"
              value={psychiatristData.age}
              onChange={handleInput}
              name="age"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72 m-4"
              label="Age"
              color="secondary"
              placeholder="Age"
            />
            <select
              id="gender"
              placeholder="Gender"
              name="gender"
              onChange={handleInput}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72 m-4"
            >
              <option value="" disabled selected hidden>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              id="number"
              type="number"
              value={psychiatristData.number}
              onChange={handleInput}
              name="number"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72 m-4"
              label="Number"
              color="secondary"
              placeholder="Mobile Number"
            />
            <SearchCollege
              name="college_id"
              change={(selected) =>
                handleInput({ target: { name: "college_id", value: selected } })
              }
            />

            <input
              id="qualification"
              value={psychiatristData.qualification}
              onChange={handleInput}
              name="qualification"
              className="p-2 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-72 m-4"
              label="qualification"
              color="secondary"
              placeholder="Degree holding"
            />
          </div>
        </div>
      )}
      {activeStep === 1 && (
        <CheckboxGroup
          question="Do you have prior experience?"
          options={questions["Do you have prior experience?"]}
          type="radio"
          onChange={handleOptionChange}
        />
      )}
      {activeStep === 2 && (
        <CheckboxGroup
          question="Are you planning to work part-time or fulltime"
          options={questions["Are you planning to work part-time or fulltime"]}
          type="radio"
          onChange={handleOptionChange}
        />
      )}
      {activeStep === 3 && (
        <div className="h-[32rem] w-1/2 mt-12 bg-white rounded-xl flex flex-col items-start ">
          <h4 className=" p-5 pl-12 mt-10 mb-5">Please upload your resume</h4>
          <label class="block ml-10">
            <input
              type="file"
              class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
            />
          </label>
        </div>
      )}

      <div className="mt-8 flex justify-between w-1/2">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        {!isLastStep ? (
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Finish</Button>
        )}
      </div>
    </div>
  );
}

export default RegisterPsyphiatristPage;
