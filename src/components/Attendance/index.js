import React from "react";
import { StyledAttendance } from "./style";
import Card from "../Card";
import { useNavigate } from "react-router";
import axios from "axios";


const Attendance = () => {
  const navigate = useNavigate();

  const handleMarkAttendance = () => {
    navigate("/markAttendance"); // Navigate to /markAttendance
  };

  const handleViewAttendance = () => {
    navigate("/ViewAttendance"); // Navigate to /ViewAttendance
  };
  const handleCheckOut = async () => {
    try {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      if (!username || !password) {
        alert("Please login first.");
        window.location.href = "/login"; // Redirect to login if not logged in
        return;
      }

      // Send a request to the backend to mark check-out
      const response = await axios.post("http://localhost:5000/api/check-out", {
        username,
        password,
      });

      if (response.status === 200) {
        alert("You have been checked out. See you next time!");
      } else {
        alert("Failed to check out. Please try again.");
      }
    } catch (error) {
      console.error("Error during check-out:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <StyledAttendance>
      <div className="card-container">
        <Card name="Check-in" onClick={handleMarkAttendance} />
        <Card name="Check-out" onClick={handleCheckOut} />
        <Card name="View my attendance" onClick={handleViewAttendance} />
      </div>
    </StyledAttendance>
  );
};

export default Attendance;
