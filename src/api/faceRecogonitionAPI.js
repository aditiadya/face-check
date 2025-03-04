import axios from "axios";

const API_URL = "http://localhost:5000/api";

// api/faceRecognitionAPI.js

// Register face
export const registerFace = async (
  imageFile,
  name,
  rollNo,
  role,
  username,
  password
) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("name", name);
  formData.append("rollNo", rollNo);
  formData.append("role", role);
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    // Check if registration was successful
    if (response.ok && !result.error) {
      // Store the username in localStorage instead of sessionStorage
      localStorage.setItem("username", username); // Updated to localStorage
      return result;
    } else {
      console.error("Registration failed:", result.error);
      return { error: result.error || "Registration failed" };
    }
  } catch (error) {
    console.error("Error in registration:", error);
    return { error: "Registration failed due to server error" };
  }
};

// Recognize face for attendance
export const recognizeFace = async (imageFile, username, password) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("username", username);
  formData.append("password", password); // Pass username and password for authentication

  try {
    const response = await fetch("http://localhost:5000/api/recognize", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error in recognition:", error);
    return { error: "Recognition failed" };
  }
};
// Mark attendance
export const markAttendance = async (imageFile) => {
  const username = localStorage.getItem("username"); // Get logged-in user

  if (!username) {
    return { error: "User not logged in. Please log in first." };
  }

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("username", username); // Send logged-in username

  try {
    const response = await fetch("http://localhost:5000/api/mark-attendance", {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error("Error in marking attendance:", error);
    return { error: "Attendance marking failed" };
  }
};


export const getAttendanceReport = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/attendance-report?name=${name}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    return { error: "Failed to retrieve attendance report" };
  }
};

// api/faceRecogonitionAPI.js

export const logoutUser = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    // Return the result from the backend
    return result;
  } catch (error) {
    console.error("Logout failed:", error);
    return { error: "An error occurred during logout" };
  }
};