import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../components/HomePage";
import Employee from "../components/Employee";
import Attendance from "../components/Attendance";
import WorkingRemotely from "../components/WorkingRemotely";
import LoginPage from "../components/Login";
import SignupPage from "../components/Signup";
import ViewAttendance from "../components/ViewAttendance";
import Error from "./Error";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRoute2 from "./ProtectedRoute2";
import MarkAttendance from "../components/MarkAttendance";
import BadRequest from "../components/about";
import RolePage from "../components/rolepage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (

        <App />

    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path:"/role",
        element:<RolePage/>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/employee",

        element: (
          <ProtectedRoute2>        <Employee /></ProtectedRoute2>

       
      ),
      },
      {     
        path: "/Attendance",
        element: (<Attendance />


        ),
      },
      {
        path: "/ViewAttendance",

        element: <ProtectedRoute><ViewAttendance /> </ProtectedRoute>,
      },
      {
        path: "/markattendance",
        element:<MarkAttendance/>,
      },
      {
        path:"/about",
        element:<BadRequest/>,
      },
      {
        path: "/workingRemotely",
        element: <WorkingRemotely />,
      },
    ],
    errorElement: <Error />,
  },
]);
export default appRouter;
