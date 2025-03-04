import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { markAttendance } from "../../api/faceRecogonitionAPI";
import { Link } from "react-router-dom";
import { StyledMarkAttendance } from "./Style"; // Assuming you're using styled-components

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [previousDatesTimes, setPreviousDatesTimes] = useState([]); // State for previous dates and times

  // Capture image from webcam
  const captureImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      return new File([blob], "capture.jpg", { type: "image/jpeg" });
    }
    return null;
  };

  // Mark attendance for the user
  const handleMarkAttendance = () => {
    setIsWebcamActive(true);
    setError(null);
    setResult(null);
  };

  const submitAttendance = async () => {
    setLoading(true);
    const imageFile = await captureImage();
    if (imageFile) {
      const result = await markAttendance(imageFile);
      if (result.error) {
        setError(result.error);
      } else {
        setResult(result);
        setPreviousDatesTimes(result.previous_dates_times || []); // Update previous dates and times
      }
    }
    setLoading(false);
    setIsWebcamActive(false);
  };

  return (
    <StyledMarkAttendance>
      <h2>Mark Attendance</h2>

      <button onClick={handleMarkAttendance} disabled={isWebcamActive}>
        Open Webcam
      </button>

      {isWebcamActive && (
        <div className="webcam-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
          <button onClick={submitAttendance} disabled={loading}>
            {loading ? "Marking Attendance..." : "Capture & Mark Attendance"}
          </button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="result">
          <h3>Attendance Marked</h3>
          <p>{`Name: ${result.attendance.name}`}</p>
          <p>{`Roll No: ${result.attendance.rollNo}`}</p>
          <p>{`Time: ${result.attendance.time}`}</p>
          <p>{`Date: ${result.attendance.date}`}</p>

          {previousDatesTimes.length > 0 && (
            <div className="previous-records">
              <h4>Previous Attendance Records</h4>
              <ul>
                {previousDatesTimes.map((record, index) => (
                  <li key={index}>{`Date: ${record.date}, Time: ${record.time}`}</li>
                ))}
              </ul>
            </div>
          )}
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

export default MarkAttendance;
