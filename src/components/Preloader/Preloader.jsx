import React from "react";
import "./Preloader.css";

const Preloader = () => {
  console.log("hey preloader");
  return (
    <div className="preloader">
      <div className="circle__preloader"></div>
        <h1> Searching News...</h1>
      </div>
  
  );
};

export default Preloader;
