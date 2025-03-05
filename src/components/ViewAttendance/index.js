import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./ViewAttendance.css"; // Import a CSS file for styling

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState("");
  const [totalEntries, setTotalEntries] = useState(0); // New state for total number of entries
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve username and password from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Check if both are available, else redirect to login
    if (!storedUsername || !storedPassword) {
      setError("Please login first");
      navigate("/login");
    } else {
      // Fetch attendance data if credentials are available
      handleViewAttendance(storedUsername, storedPassword);
    }
  }, [navigate]);

  // Function to fetch attendance records
  const handleViewAttendance = async (username, password) => {
    try {
      const data = { username, password };
      const response = await axios.post("http://localhost:5000/api/view-attendance", data);
  
      if (response.status === 500 || response.status === 200) {
        const attendance = response.data.attendance || [];
        console.log("Attendance Data:", attendance); // Debugging log
        setAttendanceRecords(attendance);
        setTotalEntries(attendance.length);
      } else {
        setError(response.data.error || "No attendance records found.");
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setError("Error fetching attendance. Check console for details.");
    }
  };
  

  return (
    <div className="dashboard">
      <h2>Attendance Dashboard</h2>

      {error && <p className="error">{error}</p>}

      <div className="attendance-container">
        <h3>Attendance Records</h3>

        {/* Display total number of entries */}
        {attendanceRecords.length > 0 && <p>Total Entries: {totalEntries}</p>}

        {attendanceRecords.length > 0 ? (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In Time</th>
                <th>Marked As</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.date || "N/A"}</td>
                  <td>{record.checkInTime || "N/A"}</td>
                  <td>{record.markedAs || "N/A"}</td>
                  <td>{record.status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>

      {/* Mark Attendance Button */}
      <div>
        <Link to="/markAttendance">
          <button className="mark-attendance">Mark Attendance</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewAttendance;