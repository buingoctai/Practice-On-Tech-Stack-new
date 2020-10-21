import React from "react";
import useLinearInterpolation from "./useLinearInterpolation";
import "./style.css";

const DragDropLinearInterpolation = () => {
  useLinearInterpolation();
  return (
    <div className="container">
      <div style={{ top: "100px", left: "100px" }} className="box"></div>
      <div style={{ top: "200px", left: "200px" }} className="box"></div>
      <div style={{ top: "300px", left: "300px" }} className="box"></div>
      <div style={{ top: "400px", left: "400px" }} className="box"></div>
    </div>
  );
};

export default DragDropLinearInterpolation;

// the event propagation(sự lan truyền sự kiện)
/*
 sự lan truyền gôm 3 phase
 + capture phase: listen ở  window->document-> tổ tiên của target 
 + target phase: listen ở target element
 + bubble phase: ngược lại với capture phase

*/
