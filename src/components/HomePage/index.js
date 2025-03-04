import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import faceIdImage from "./img.png"; // Update with actual path

const StyledHomePage = styled.div`
  display: flex;
  align-items: center;
 .left-side {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right-side {
    flex: 1;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 50px;
    font-weight:bold;
  }

  .typewriter {
    border-right: 3px solid #333;
    white-space: nowrap;
    overflow: hidden;
    font-weight: bold;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight:bold;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const words = [" Smile :).", " Face ."];
  const typingSpeed = 200; // Speed for typing
  const erasingSpeed = 200; // Speed for erasing
  const pauseTime = 500; // Pause time at the end of each word

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    const typeEffect = () => {
      if (isTyping) {
        setText(words[wordIndex].slice(0, charIndex + 1));
        charIndex++;

        // When the word is completely typed out
        if (charIndex === words[wordIndex].length) {
          isTyping = false;
          setTimeout(() => {
            isTyping = false;
          }, pauseTime); // Pause before starting to erase
        }
      } else {
        setText(words[wordIndex].slice(0, charIndex - 1));
        charIndex--;

        // When the word is completely erased
        if (charIndex === 0) {
          isTyping = true;
          wordIndex = (wordIndex + 1) % words.length; // Move to the next word
        }
      }
    };

    const interval = setInterval(typeEffect, isTyping ? typingSpeed : erasingSpeed);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = () => {
    // Check if both username and password are stored in localStorage
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
  
    if (username && password) {
      // If both are found, navigate to /attendance
      navigate("/role");
    } else {
      // If either is missing, navigate to /login
      navigate("/login");
    }
  };
  
  

  return (
    <StyledHomePage>
      <div className="left-side">
        <img src={faceIdImage} alt="Face ID Illustration" />
      </div>
      <div className="right-side">
        <h1>
          Smart Attendance Made Simple with Just Your     {" "}
          <span className="typewriter">{text}</span>
        </h1><br></br>
        <button onClick={handleNavigate}>Let's Mark</button>
      </div>
    </StyledHomePage>
  );
};

export default HomePage;