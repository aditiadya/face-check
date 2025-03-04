import styled from "styled-components";

export const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:60vw;
  
  .container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
  }

  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }

  label {
    display: block;
    font-weight: 600;
    color: #666;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s;
  }

  input:focus {
    outline: none;
    border-color: #007bff;
  }

  button {
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  .error {
    color: #e74c3c;
    margin-top: 10px;
  }

  .signup-link {
    margin-top: 15px;
    color: #007bff;
    font-size: 0.9rem;
  }

  .signup-link a {
    color: #007bff;
    text-decoration: none;
  }

  .signup-link a:hover {
    text-decoration: underline;
  }
`;
