import React from "react";

const Card = ({ children }) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
