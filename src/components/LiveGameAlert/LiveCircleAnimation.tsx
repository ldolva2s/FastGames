import React from "react";
import "./LiveCircleAnimation.css";

const LiveCircleAnimation = () => {
  const style = {
    position: "absolute",
    //   left: 50%;
    //   top: 50%;
    //   transform: translateX(-50%) translateY(-50%);
    //   width: 20px;
    //   height: 20px;
  };
  return (
    <div
      //   style={{
      //     position: "absolute",
      //     left: "50%",
      //     top: "50%",
      //     transform: "translateX(-50%) translateY(-50%)",
      //     width: "20px",
      //     height: "20px",
      //     '&:before' {

      //     }
      //   }}
      className="circle"
    ></div>
  );
};

export default LiveCircleAnimation;
