import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StyledMarkAttendance } from "./Style"; // Use the same styled component
import axios from "axios";

const CheckOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Function to handle the Check-out process
  const handleCheckOut = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      if (!username || !password) {
        setError("Please login first.");
        return;
      }

      // Send a request to the backend to mark check-out
      const response = await axios.post("http://localhost:5000/api/check-out", {
        username,
        password,
      });

      if (response.status === 200) {
        setResult(response.data.message);
        alert("You have been checked out. See you next time!");
      } else {
        setError("Failed to check out. Please try again.");
      }
    } catch (error) {
      console.error("Error during check-out:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically trigger check-out when the page loads
  useEffect(() => {
    handleCheckOut();
  }, []);

  return (
    <StyledMarkAttendance>
      <h2>Check Out</h2>

      {loading && <p>Processing check-out...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="result">
          <h3>Check-out Successful</h3>
          <p>{result}</p>
        </div>
      )}

      {/* Button to View Attendance */}
      <div className="view-attendance">
        <Link to="/ViewAttendance">
          <button>View Attendance</button>
        </Link>
      </div>
    </StyledMarkAttendance>
  );
};

export default CheckOut;