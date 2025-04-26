import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from '../Card';
import "./style.css";

const Attendance = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleMarkAttendance = () => {
    navigate("/markAttendance");
  };

  const handleViewAttendance = () => {
    navigate("/ViewAttendance");
  };

  const fetchAttendanceStats = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/attendance-stats", {
        username,
        password
      });
      // You can use the stats data if needed
      console.log("Attendance stats:", response.data);
    } catch (err) {
      console.error("Error fetching attendance stats:", err);
      setError("Failed to load attendance statistics");
    }
  };

  const handleCheckOut = async () => {
    try {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      if (!username || !password) {
        setError("Please login first");
        navigate("/login");
        return;
      }

      // First fetch the current stats
      await fetchAttendanceStats(username, password);

      // Then proceed with check-out
      const response = await axios.post("http://localhost:5000/api/check-out", {
        username,
        password
      });

      if (response.status === 200) {
        alert("You have been checked out successfully!");
        // Refresh stats after check-out
        await fetchAttendanceStats(username, password);
      } else {
        setError(response.data.error || "Failed to check out");
      }
    } catch (err) {
      console.error("Check-out error:", err);
      setError(err.response?.data?.error || "Error during check-out");
    }
  };

  return (
    <div className="attendance-container">
      
      {error && <div className="error-message">{error}</div>}

      <div className="card-container">
        <Card name="Check-in" onClick={handleMarkAttendance} />
        <Card name="Check-out" onClick={handleCheckOut} />
        <Card name="View Attendance" onClick={handleViewAttendance} />
      </div>
    </div>
  );
};

export default Attendance;