import React from "react";
import "./About.css";
import avatar from "../../assets/images/Avatar__about.png";

function About() {
  return (
    <section className="about">
      <img src={avatar} alt="about" className="about__img" />
      <div className="about__container">
        <h4>About The Author</h4>
        <p className="about__p">
          {" "}
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>

        <p className="about__p">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
