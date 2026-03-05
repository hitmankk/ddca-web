import React from "react";
import { Link } from "react-router-dom";
import "./PersonalTraining.css"; // Custom styling

const PersonalTraining = () => {
  return (
    <div className="personal-training-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content" style={{ marginRight: "auto" }}>
          <h1>Personal Cricket Training</h1>
          <p>Enhance your skills with one-on-one coaching</p>
          <Link to="/admission" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>

      {/* Why Choose Personal Training */}
      <section className="why-training">
        <h2>Why Choose Personal Training?</h2>
        <p>
          Our personal training programs focus on **skill development, strength,
          and mental preparation** to help you reach your full potential.
        </p>
        <ul>
          <li>🏏 Individualized Training Plans</li>
          <li>💪 Strength & Conditioning</li>
          <li>🧠 Mental Toughness Coaching</li>
          <li>🎯 Tactical Game Awareness</li>
        </ul>
      </section>

      {/* Training Programs */}
      <section className="training-programs">
        <h2>Our Training Programs</h2>
        <div className="programs-list">
          <div className="program-card">
            <h3>Batting Mastery</h3>
            <p>Refine your technique with expert coaching.</p>
          </div>
          <div className="program-card">
            <h3>Bowling Excellence</h3>
            <p>Improve speed, accuracy, and variations.</p>
          </div>
          <div className="program-card">
            <h3>Fielding & Fitness</h3>
            <p>Enhance agility, reflexes, and endurance.</p>
          </div>
        </div>
      </section>

      {/* Meet Your Trainers */}
      <section className="trainers-section">
        <h2>Meet Your Trainers</h2>
        <div className="trainers-list">
          <div className="trainer-card">
            <img src="/media/trainer1.png" alt="Trainer 1" />
            <h3>Coach Rahul Kumar</h3>
            <p>Specialist in Batting Techniques</p>
          </div>
          <div className="trainer-card">
            <img src="/media/trainer2.png" alt="Trainer 2" />
            <h3>Coach Anjali Sharma</h3>
            <p>Strength & Conditioning Expert</p>
          </div>
        </div>
      </section>

      {/* Schedule a Free Consultation */}
      <section className="consultation-section">
        <h2>Book a Free Consultation</h2>
        <p>
          Talk to our experts and customize your training plan to fit your
          needs.
        </p>
        <Link to="/contact" className="consultation-button">
          Schedule Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="contact-details">
          <h3>Contact Us</h3>
          <p>Email: contact@ddca.com</p>
          <p>Phone: +91-9876543210</p>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
        </div>
      </footer>
    </div>
  );
};

export default PersonalTraining;
