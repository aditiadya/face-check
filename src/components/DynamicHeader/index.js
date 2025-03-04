import React from "react";
import { StyledDynamicHeader } from "./style";
import { Link } from "react-router-dom";
import face_recognition from "../../assets/face_recognition.png";

const DynamicHeader = ({ headingName }) => {
  return (
    <StyledDynamicHeader>
      <div className="logo-container">
        <img src={face_recognition} alt="" className="logo" />
      </div>
      <div className="nav-items">
        <ul className="nav-items-list">
          <li>
            <Link to="/home" className="li-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="li-item">
              About
            </Link>
          </li>
          <li className="li-item">{headingName}</li>
        </ul>
      </div>
    </StyledDynamicHeader>
  );
};

export default DynamicHeader;
