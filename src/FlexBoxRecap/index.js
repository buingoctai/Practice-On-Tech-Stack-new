import React from "react";

const FlexBoxRecap = () => {
  return (
    // Flexbox gaps
    // <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    //   <div style={{ backgroundColor: "magenta", color: "white" }}>mot</div>
    //   <div style={{ backgroundColor: "green", color: "white" }}>hai</div>
    //   <div style={{ backgroundColor: "orange", color: "white" }}>ba</div>
    //   <div style={{ backgroundColor: "blue", color: "white" }}>bon</div>
    //   <div style={{ backgroundColor: "brown", color: "white" }}>nam</div>
    // </div>

    // Tables as flex items
    <div style={{ display: "flex", width: "100px", backgroundColor: "red" }}>
      <div
        style={{
          display: "table",
          width: "10px",
          maxWidth: "10px",
          height: "100px",
          backgroundColor: "green",
        }}
      >
        <div
          style={{ width: "100px", height: "10px", backgroundColor: "green" }}
        ></div>
      </div>
    </div>
  );
};

export default FlexBoxRecap;
