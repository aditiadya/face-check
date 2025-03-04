import React from "react";
import { StyledHomePage } from "./style";
import Card from "../Card";
import { useNavigate } from "react-router";

const RolePage = () => {
  const navigate = useNavigate();

  const handleRemoteWork = () => {
    navigate("/WorkingRemotely");
  };

  const handlephysical = () => {
    navigate("/Attendance");
  };

  return (
    <StyledHomePage>
      <div className="card-container">
        <Card name="Working Remotely" onClick={handleRemoteWork} />
        <Card name="Physical Attendance" onClick={handlephysical} />
      </div>
    </StyledHomePage>
  );
};

export default RolePage;
