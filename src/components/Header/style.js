import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bfeaf5;
  padding: 0 20px; /* Add padding to avoid content touching edges */
  box-sizing: border-box; /* Ensure padding is included in width */
  background-color: black;

  .logo {
    width: 60px;
    margin: 16px;
    box-sizing: border-box;
  }

  .nav-items {
    display: flex;
    align-items: center; /* Center nav items vertically */
    justify-content: flex-start; /* Align items to the left */
    padding: 0;
    margin: 0;
    box-sizing: border-box; /* Ensure padding is included in width */
    width: auto; /* Remove 100% width to prevent full-width span */
  }

  .nav-items-list {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .nav-items-list > li {
    padding: 15px;
    margin: 0; /* Remove margin to avoid unwanted space */
    font-size: 24px;
    font-weight: 600;
  }

  .li-item {
    text-decoration: none;
    color: white;
    transition: color 0.3s; /* Smooth color transition on hover */
  }

  .li-item:hover {
    color: #007bff; /* Optional: change color on hover */
  }

  .logout-btn {
    text-decoration: none;
    background-color: black;
    color: white;
    border: none;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
  }

  .logout-btn:hover {
    background-color: black;
    color: #007bff;
  }
  .lir-item{

color:white
  }
.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px; /* Adjust width as needed */
  margin-right: 10px; /* Space between logo and text */
}

.li-item {
  font-size: 1.5rem; /* Adjust font size as needed */
   /* Adjust color as needed */
}

`;
