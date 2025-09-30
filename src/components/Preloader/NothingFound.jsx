import React from "react";
import notFoundImage from "../../assets/images/not-found_v1.png";
import "./NothingFound.css";

function NothingFound() {
  return (
    <section className="nothing__found">
      <div className="nothing__found-container">
        <img
          src={notFoundImage}
          alt="Nothing Found Illustration"
          className="nothing__found-img"
        />
        <div className="nothing__subheading"> Nothing Found</div>
        <p className="nothing__found-text">
          Sorry, but nothing matched <br />
          your search terms.
        </p>
      </div>
    </section>
  );
}

export default NothingFound;
