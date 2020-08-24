import React from "react";

const Square = (props) => {
  return (
    <div
      className="square"
      style={{ top: `${props.y}px`, left: `${props.x}px` }}
      onMouseDown={props.onMouseDown}
    ></div>
  );
};

export default Square;
