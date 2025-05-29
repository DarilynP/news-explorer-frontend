import React from "react";
import "./About.css";
import avatar from "../../assets/images/Avatar__about.png";

function About() {
  return (
    <section className="About">
      <img src={avatar} alt="about" className="About__img" />
      <div className="About__Container">
        <h2>About The Author</h2>
        <p className="About__p">
          {" "}
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>

        <p className="About__p">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>

    // how to implement avatar

    // {currentUser ? (
    //   <Link to="/profile" className="header__link">
    //     <div className="header__profile">
    //       <div className="header__username">{currentUser.name}</div>
    //       <img src={currentUser.avatar} alt="user avatar" className="header__avatar" />
    //     </div>
    //   </Link>
    // ) : (
  );
}

export default About;
