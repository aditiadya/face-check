import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { StyledSignup } from "./style";
import { logoutUser, registerFace } from "../../api/faceRecogonitionAPI";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  // Capture image from webcam
  const captureImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      return new File([blob], "capture.jpg", { type: "image/jpeg" });
    }
    return null;
  };

  // Handle registration and face capture
  const handleRegister = async (event) => {
    event.preventDefault();
    if (
      !name ||
      !rollNo ||
      !role ||
      !username ||
      !password ||
      !startTime ||
      !endTime
    ) {
      setError("Please fill in all details.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, rollNo }),
      });
  
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }
  
      setError(null);
      setIsWebcamActive(true); // Activate webcam after validation
    } catch (error) {
      setError("Roll No or Username already taken");
    }
  };

  // Submit registration with captured image
  const submitRegistration = async () => {
    setLoading(true);

    // Capture the image from the webcam
    const imageFile = await captureImage();

    if (imageFile) {
      // Attempt to register the user's face with the provided data
      const result = await registerFace(
        imageFile,
        name,
        rollNo,
        role,
        username,
        password,
        startTime,
        endTime
      );

      if (result.error) {
        setError(result.error);
      } else {
        alert(result.message || "Registration successful!");

        // Store username and password in localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // Redirect based on the selected role
        if (role === "Student") {
          navigate("/attendance");
        } else if (role === "Employee") {
          navigate("/role");
        }
      }
    } else {
      setError("Failed to capture image.");
    }
    

    setLoading(false);
    setIsWebcamActive(false);
  };

  

  return (
    <StyledSignup>
      <div className="container">
        <h2>Signup</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rollNo">Roll No/Employee Id:</label>
            <input
              type="text"
              id="rollNo"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>

          {/* Start Time Field */}
          <div className="time-container">
            <div className="form-group">
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                step="900" // Allows selecting in 15-minute intervals
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time:</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                step="900"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          <button type="submit">Register Face</button>
        </form>

        {isWebcamActive && (
          <div className="overlay">
            <div className="modal">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "user",
                  width: 500,
                  height: 400,
                }}
              />
              <button onClick={submitRegistration} disabled={loading}>
                {loading ? "Registering..." : "Capture & Register"}
              </button>
            </div>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </StyledSignup>
  );
};

export default SignupPage;
