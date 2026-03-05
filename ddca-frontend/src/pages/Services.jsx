import React from "react";
import { Link } from "react-router-dom";
import "./Service.css"; // Importing CSS file

const Service = () => {
  return (
    <div className="service-page">
      <header className="service-header">
        <h1>Our Services</h1>
        <p>Top-notch training programs for aspiring cricketers.</p>
      </header>

      {/* Services Section */}
      <section className="services-list">
        <div className="service-card">
          <img src="/media/training.jpg" alt="Cricket Training" />
          <h2>Professional Cricket Training</h2>
          <p>Join our expert-led training sessions to refine your skills.</p>
          <Link to="/admission" className="service-button">
            Enroll Now
          </Link>
        </div>

        <div className="service-card">
          <img src="/media/fitness.jpg" alt="Fitness Programs" />
          <h2>Fitness & Conditioning</h2>
          <p>
            Improve stamina, agility, and strength with our fitness programs.
          </p>
          <Link to="/fitness" className="service-button">
            Learn More
          </Link>
        </div>

        <div className="service-card">
          <img src="/media/match.jpg" alt="Match Practice" />
          <h2>Match Practice Sessions</h2>
          <p>Get real-game experience with our intensive match practice.</p>
          <Link to="/matches" className="service-button">
            Join Matches
          </Link>
        </div>

        <div className="service-card">
          <img src="/media/academy.jpg" alt="Cricket Academy" />
          <h2>Junior Cricket Academy</h2>
          <p>Special coaching for young aspiring cricketers aged 6-16.</p>
          <Link to="/academy" className="service-button">
            Apply Now
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Start Your Cricket Journey?</h2>
        <p>
          Join the DDCA Cricket Institute and take your game to the next level.
        </p>
        <Link to="/contact" className="cta-button">
          Get in Touch
        </Link>
      </section>

      {/* Footer */}
      <footer className="service-footer">
        <p>© 2025 DDCA Cricket Institute | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Service;
