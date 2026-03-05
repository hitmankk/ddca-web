import React from "react";
import { Link } from "react-router-dom";
import "./About.css"; // Importing CSS file
import academy from "../media/academy.jpg";

const About = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <header className="about-header">
        <h1>About DDCA Cricket Institute</h1>
        <p>
          Shaping the future of cricket with world-class training and guidance.
        </p>
      </header>

      {/* About Us Section */}
      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            DDCA Cricket Institute is one of the leading cricket academies,
            dedicated to nurturing young talent and producing world-class
            cricketers. With state-of-the-art facilities and experienced
            coaches, we provide a professional environment for players to
            develop their skills.
          </p>
        </div>
        <img src={academy} alt="Cricket Academy" className="about-image" />
      </section>

      {/* Our Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide top-tier training and mentorship to aspiring
          cricketers, equipping them with the skills and mindset to excel at the
          highest levels of the game.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <h2>Why Choose Us?</h2>
        <div className="why-choose-list">
          <div className="choose-card">
            <img src="/media/training.jpg" alt="Expert Coaches" />
            <h3>Expert Coaches</h3>
            <p>Learn from former international and first-class cricketers.</p>
          </div>
          <div className="choose-card">
            <img src="/media/facilities.jpg" alt="Top Facilities" />
            <h3>World-Class Facilities</h3>
            <p>
              Train in a professional environment with cutting-edge equipment.
            </p>
          </div>
          <div className="choose-card">
            <img src="/media/match.jpg" alt="Match Practice" />
            <h3>Match Experience</h3>
            <p>Gain real match experience with competitive league games.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Join the DDCA Cricket Institute Today!</h2>
        <p>
          Take your cricketing career to the next level with our expert training
          programs.
        </p>
        <Link to="/admission" className="cta-button">
          Enroll Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>© 2025 DDCA Cricket Institute | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default About;
