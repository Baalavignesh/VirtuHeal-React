import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import NonPrivateRoute from "./routes/NonPrivateRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import HomePage from "./pages/home_page";
import CreateAppointmnet from "./pages/create_appointment";
import ViewAppointment from "./pages/view_appointments";
import SignUpPage from "./pages/signup_page";
import RegisterStudentPage from "./pages/register_student";
import RegisterPsyphiatristPage from "./pages/register_psychiatrist";
import LoginPage from "./pages/login_page";
import WelcomePage from "./pages/welcome_page";
import ViewStudentProfile from "./pages/student_profile";
import ChatPage from "./pages/chat_page";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/app" element={<HomePage />}></Route>
        <Route path="/create-appointment" element={<CreateAppointmnet />}>
        </Route>
        <Route path="/view-appointment" element={<ViewAppointment />}>
        </Route>
        <Route path="/chat" element={<ChatPage />}></Route>

        {/* <Route
          path="/viewstudentprofile"
          element={<ViewStudentProfile />}
          loader={({ params }) => {
            return params.studentId;
          }}
          action={({ params }) => {
            return params.studentId; 
          }}
        >
        </Route> */}
      </Route>
      <Route
        path="/signup"
        element={
          <NonPrivateRoute>
            <SignUpPage />
          </NonPrivateRoute>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <NonPrivateRoute>
            <LoginPage />
          </NonPrivateRoute>
        }
      ></Route>
      <Route
        path="/register-student"
        element={
          <NonPrivateRoute>
            <RegisterStudentPage />
          </NonPrivateRoute>
        }
      ></Route>

      <Route
        path="/register-psychiatrist"
        element={
          <NonPrivateRoute>
            <RegisterPsyphiatristPage />
          </NonPrivateRoute>
        }
      ></Route>

      <Route
        path="/"
        element={
          <NonPrivateRoute>
            <WelcomePage />
          </NonPrivateRoute>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}

export default App;
