import styled from "styled-components";

export const StyledSignup = styled.div`
  body {
    font-family: Arial, sans-serif;
    background: #94c498;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    overflow: hidden;
  }

  .container {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    width: 24vw;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  h2 {
    text-align: center;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #218838;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* Dull background */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: black;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 1);
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center the content vertically */
    align-items: center; /* Center the content horizontally */
    width: 780px; /* Fixed width for modal */
    height: 720px; /* Fixed height for modal */
  }

  .modal button {
    margin-top: 20px; /* Space between button and webcam */
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .modal button:hover {
    background-color: #218838;
  }

  .webcam-container {
    display: flex;
    border-radius:4px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px; /* Space between webcam and button */
  }
  .webcam{
    border-radius:8px;
  }
`;
