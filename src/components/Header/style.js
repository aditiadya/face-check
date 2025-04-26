// import styled from "styled-components";

// export const StyledHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid #bfeaf5;
//   padding: 0 20px; /* Add padding to avoid content touching edges */
//   box-sizing: border-box; /* Ensure padding is included in width */
//   background-color: black;

//   .logo {
//     width: 60px;
//     margin: 16px;
//     box-sizing: border-box;
//   }

//   .nav-items {
//     display: flex;
//     align-items: center; /* Center nav items vertically */
//     justify-content: flex-start; /* Align items to the left */
//     padding: 0;
//     margin: 0;
//     box-sizing: border-box; /* Ensure padding is included in width */
//     width: auto; /* Remove 100% width to prevent full-width span */
//   }

//   .nav-items-list {
//     display: flex;
//     list-style-type: none;
//     padding: 0;
//     margin: 0;
//   }

//   .nav-items-list > li {
//     padding: 15px;
//     margin: 0; /* Remove margin to avoid unwanted space */
//     font-size: 24px;
//     font-weight: 600;
//   }

//   .li-item {
//     text-decoration: none;
//     color: white;
//     transition: color 0.3s; /* Smooth color transition on hover */
//   }

//   .li-item:hover {
//     color: #007bff; /* Optional: change color on hover */
//   }

//   .logout-btn {
//     text-decoration: none;
//     background-color: black;
//     color: white;
//     border: none;
//     font-size: 24px;
//     font-weight: 600;
//     cursor: pointer;
//   }

//   .logout-btn:hover {
//     background-color: black;
//     color: #007bff;
//   }
//   .lir-item{

// color:white
//   }
// .logo-container {
//   display: flex;
//   align-items: center;
// }

// .logo {
//   width: 50px; /* Adjust width as needed */
//   margin-right: 10px; /* Space between logo and text */
// }

// .li-item {
//   font-size: 1.5rem; /* Adjust font size as needed */
//    /* Adjust color as needed */
// }

// `;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: #1a1a2e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 80px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  .logo {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 50%;
    border: 2px solid #ffffff;
  }

  .nav-items {
    display: flex;
    height: 100%;
  }

  .nav-items-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-item {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .li-item {
    color: #ffffff;
    background-color: #1a1a2e;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: #ffffff;
      background-color: rgba(76, 201, 240, 0.1);
    }

    &.active {
      color: #ffffff;
      font-weight: 600;
    }
  }

  .logout-btn {
    background: linear-gradient(135deg, #f72585, #b5179e);
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      background: linear-gradient(135deg, #f72585, #7209b7);
    }
  }

  .username-display {
    color: #ffffff;
    font-weight: 600;
    padding: 0.5rem 1rem;
    background-color: rgba(76, 201, 240, 0.1);
    border-radius: 20px;
    font-size: 1rem;
  }

  /* Underline animation for nav items */
  .nav-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    background-color: #ffffff;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  .nav-item:hover::after {
    width: 80%;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 70px;

    .nav-items {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      background-color: #1a1a2e;
      flex-direction: column;
      align-items: center;
      padding: 1rem 0;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transform: ${({ isMenuOpen }) => isMenuOpen ? 'translateY(0)' : 'translateY(-150%)'};
      transition: transform 0.3s ease;
      z-index: 999;
    }

    .nav-items-list {
      flex-direction: column;
      width: 100%;
      gap: 0;
    }

    .nav-item {
      width: 100%;
      padding: 0;
      height: auto;
    }

    .li-item {
      padding: 1rem;
      width: 100%;
      justify-content: center;
    }

    .mobile-menu-toggle {
      display: block;
      background: none;
      border: none;
      font-size: 1.8rem;
      color: white;
      cursor: pointer;
    }
  }

  @media (min-width: 769px) {
    .mobile-menu-toggle {
      display: none;
    }
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;