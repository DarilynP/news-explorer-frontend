import React from "react";
import "./Preloader.css";
import preloader_image from "../../assets/images/preloader_img.png";




const Preloader = () => {
  console.log("hey preloader");
  return (
    <div className="preloader">
      <img src={preloader_image} alt="Loading" className="preloader__img" />
      <div className="circle-preloader"></div>
    </div>
  );
};

export default Preloader;
