import styled from "styled-components";

export const StyledMarkAttendance = styled.div`
  text-align: center;
  background-color: #f0f0f0;
  padding: 30px;
  border-radius: 8px;
  width: 30vw;
  margin: auto;
  
  h2 {
    color: #333;
    margin-bottom: 20px;
  }

  button {
    background-color: #4a90e2;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    width: 200px;
  }

  button:hover {
    background-color: #218838;
  }

  .webcam-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .webcam {
  margin-top: 20px
    border-radius: 8px;
    margin-bottom: 20px;
    width: 80%;
  }

  .result {
    margin-top: 20px;
  }

  .previous-records {
    margin-top: 20px;
    text-align: left;
    font-size: 14px;
    color: #555;
  }

  .view-attendance {
    margin-top: 30px;
  }
`;
