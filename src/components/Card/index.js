import React from "react";
import { StyledCard } from "./style";

const Card = ({ name, onClick, labelColor, backgroundColor }) => {
  return (
    <StyledCard>
      <button
        className="btn"
        onClick={onClick}
        style={{ color: labelColor, backgroundColor }}
      >
        {name}
      </button>
    </StyledCard>
  );
};

export default Card;
