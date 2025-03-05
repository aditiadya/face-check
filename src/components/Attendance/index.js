import React from "react";
import { StyledAttendance } from "./style";
import Card from "../Card";
import { useNavigate } from "react-router";

const Attendance = () => {
  const navigate = useNavigate();

  const handleMarkAttendance = () => {
    navigate("/markAttendance"); // Navigate to /markAttendance
  };

  const handleViewAttendance = () => {
    navigate("/ViewAttendance"); // Navigate to /ViewAttendance
  };

  return (
    <StyledAttendance>
      <div className="card-container">
        <Card name="Check-in" onClick={handleMarkAttendance} />
        <Card name="Check-out" onClick={handleViewAttendance} />
        <Card name="View my attendance" onClick={handleViewAttendance} />
      </div>
    </StyledAttendance>
  );
};

export default Attendance;
