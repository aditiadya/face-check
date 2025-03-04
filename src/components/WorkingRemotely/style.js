import styled from "styled-components";

export const StyledWorkingRemotely = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .circle {
    position: absolute;
    z-index: 0;
    border-radius: 50%;
    background: radial-gradient(#91d8e4, #94f5f0);
  }

  .circles {
    position: absolute;
    height: 540px;
    width: 930px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .circle-1 {
    height: 200px;
    width: 200px;
    top: -50px;
    left: -60px;
  }

  .circle-2 {
    height: 360px;
    width: 360px;
    bottom: -90px;
    right: -90px;
    opacity: 0.8;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: relative;
    height: 480px;
    width: 900px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(30px);
    border: 2px solid rgba(255, 255, 255, 0.4);
    overflow: hidden;
    justify-content: space-between; /* Space out elements evenly */
  }
  .title {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
  }

  .form-label {
    font-size: 16px;
    color: black;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
  }

  .form-input {
    padding: 5px 10px;
    font-size: 20px;
    border: none;
    color: rgba(0, 0, 0, 0.651);
    border-radius: 10px;
    min-width: 720px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    font-family: "Roboto", sans-serif;
    font-weight: 500;
  }

  .form-message {
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-weight: 300;
  }

  .form-button {
    padding: 15px 70px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.651);
    background-color: #91d8e4;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
  }

  .form-button:hover {
    background-color: #6fd2e4;
  }
`;
