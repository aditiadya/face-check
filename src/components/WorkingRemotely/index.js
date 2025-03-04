import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { StyledWorkingRemotely } from "./style";
import Header from "../Header";

const WorkingRemotely = () => {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState(""); // To display response messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/license/validatekey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }), // Send the key as JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      
      if (result.success) {
        alert("Key validated successfully"); // Alert on success
        navigate("/attendance"); // Redirect to /attendance
      } else {
        alert(`Error: ${result.message}`); // Alert on error
      }
    } catch (error) {
      alert(`Error: ${error.message}`); // Alert on network or other errors
    }
  };

  return (
    <StyledWorkingRemotely>{/* If you want to use Header */}
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title">Key Verification</h1>
        <label className="form-label">
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter Key Here"
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          Verify
        </button>
      </form>
    </StyledWorkingRemotely>
  );
};

export default WorkingRemotely;
