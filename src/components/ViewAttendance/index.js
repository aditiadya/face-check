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

      if (response.status === 200) {
        const attendance = response.data.attendance || [];
        setAttendanceRecords(attendance);
        setTotalEntries(attendance.length); // Set total entries to the number of records
      } else {
        setError("No attendance records found.");
      }
    } catch (err) {
      setError("Error fetching attendance");
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
                {Object.keys(attendanceRecords[0]).map((key) => (
                  <th key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  {Object.values(record).map((value, i) => (
                    <td key={i}>{value || "Data not available"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>

      {/* Mark Attendance Button */}
      <div className="mark-attendanc">
        <Link to="/markAttendance">
          <button className="mark-attendance">Mark Attendance</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewAttendance;
