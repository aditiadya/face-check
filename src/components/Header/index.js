// import React from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { StyledHeader } from "./style";

// import { logoutUser } from "../../api/faceRecogonitionAPI";
// import face_recognition from "./fc.png"

// const Header = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Retrieve the username from localStorage
//   const username = localStorage.getItem("username");

//   const handleAttendance = () => {
//     navigate("/attendance");
//   };

//   // Function to handle logout
//   const handleLogout = async () => {
//     const result = await logoutUser(); // Call the logout API

//     if (!result.error) {
//       // Clear user-related data from localStorage
//       localStorage.removeItem("username");

//       // Redirect to the home page after logging out
//       navigate("/");
//     } else {
//       console.error("Logout error:", result.error);
//     }
//   };

//   // Function to render conditional links based on login status
//   const renderConditionalLinks = () => {
//     if (username) {
//       return (
//         <>
//           <button className="li-item logout-btn" onClick={handleAttendance}>
//             Attendance
//           </button>

//           <li className="li-item">Hi, {username}</li>
//           <li>
//             <button onClick={handleLogout} className="li-item logout-btn">
//               Logout
//             </button>
//           </li>
//         </>
//       );
//     } else {
//       return (
//         <>
//           <li>
//             <NavLink to="/login" className="li-item">
//               Login
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/signup" className="li-item">
//               Signup
//             </NavLink>
//           </li>
//         </>
//       );
//     }
//   };

//   return (
//     <StyledHeader>
//       <div className="logo-container">
//         <img src={face_recognition} alt="Logo" className="logo" />
//         <h2 className="li-item">Web Attend</h2>
//       </div>
//       <div className="nav-items">
//         <ul className="nav-items-list">
//           <li>
//             <NavLink to="/" className="li-item">
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/about" className="li-item">
//               About
//             </NavLink>
//           </li>
//           {renderConditionalLinks()} {/* Display Welcome or Login/Signup */}
//         </ul>
//       </div>
//     </StyledHeader>
//   );
// };

// export default Header;


import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { StyledHeader } from "./style";
import { logoutUser } from "../../api/faceRecogonitionAPI";
import face_recognition from "./fc.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const username = localStorage.getItem("username");

  const handleAttendance = () => {
    navigate("/attendance");
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    const result = await logoutUser();
    if (!result.error) {
      localStorage.removeItem("username");
      navigate("/");
    } else {
      console.error("Logout error:", result.error);
    }
    setIsMenuOpen(false);
  };

  const renderConditionalLinks = () => {
    if (username) {
      return (
        <>
          <li className="nav-item">
            <button onClick={handleAttendance} className="li-item">
              Attendance
            </button>
          </li>
          <li className="nav-item">
            <span className="username-display">Hi, {username}</span>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink 
              to="/login" 
              className="li-item"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/signup" 
              className="li-item"
              onClick={() => setIsMenuOpen(false)}
            >
              Signup
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <StyledHeader isMenuOpen={isMenuOpen}>
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src={face_recognition} alt="Logo" className="logo" />
        <h2 className="li-item">Face Check</h2>
      </div>

      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <nav className="nav-items">
        <ul className="nav-items-list">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={`li-item ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/about" 
              className={`li-item ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
          </li>
          {renderConditionalLinks()}
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;