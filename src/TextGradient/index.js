import React from "react";

const TextGradient = () => {
  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        backgroundColor: "antiquewhite",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{ backgroundImage: "linear-gradient(45deg, blue, transparent)" }}
      >
        BÙI NGỌC TÀI
      </h1>
    </div>
  );
};

export default TextGradient;

//  A gradient is a continuation of colors with a starting and stopping point and a linear-gradient gradually moves in a straight line to another color.

// cần xem lại transparent(trong suốt) css
