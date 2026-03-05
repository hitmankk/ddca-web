import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // For custom styling
import TextPressure from "../components/TextPressure";

// import SideBarNav from "./../components/SideBar";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section1">
        <div className="hero-content">
          <TextPressure
            text="Welcome to DDCA Cricket Institute"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={56}
          />
          {/* <h1>Welcome to DDCA Cricket Institute</h1> */}
          <p>Train like a pro, play like a champion!</p>
          <Link to="/admission" className="cta-button">
            Join Now
          </Link>
        </div>
      </section>
      {/* Personal Dashboard Section */}
      <section className="dashboard-section">
        <h2>Your Personal Dashboard</h2>
        <p>
          Log in to access your courses, manage payments, and check your
          schedule.
        </p>
        <Link to="/dashboard" className="dashboard-button">
          Access Dashboard
        </Link>
      </section>
      {/* Upcoming Events Section */}
      <section className="events-section">
        <h2>Upcoming Events & Camps</h2>
        <div className="events-list">
          <div className="event-card">
            <h3>Summer Cricket Camp at DDCA</h3>
            <p>Starts: 15th Jan, 2025</p>
            <Link to="/event/1" className="register-button">
              Register Now
            </Link>
          </div>
          <div className="event-card">
            <h3>Advanced Bowling Techniques</h3>
            <p>Starts: 1st Feb, 2025</p>
            <Link to="/event/2" className="register-button">
              Register Now
            </Link>
          </div>
        </div>
      </section>
      {/* Achievements Gallery */}
      <section className="achievements-section">
        <h2>Our Achievements</h2>
        <div className="gallery">
          <img src="/media/Logo.png" alt="Trophy 1" />
          <img src="/media/Logo.png" alt="Trophy 2" />
          <img src="/media/Logo.png" alt="Trophy 3" />
        </div>
      </section>
      {/* Trainers Section */}
      <section className="trainers-section">
        <h2>Meet Our Trainers</h2>
        <div className="trainers-list">
          <div className="trainer-card">
            <img src="/media/Logo.png" alt="Trainer 1" />
            <h3>Coach John Doe</h3>
            <p>Specialist in Batting</p>
          </div>
          <div className="trainer-card">
            <img src="/media/Logo.png" alt="Trainer 2" />
            <h3>Coach Jane Smith</h3>
            <p>Specialist in Bowling</p>
          </div>
        </div>
      </section>
      {/* Schedule & Notifications */}
      <section className="schedule-section">
        <h2>Weekly Schedule</h2>
        <ul>
          <li>Monday: Fitness Training - 6 AM</li>
          <li>Tuesday: Batting Practice - 6 AM</li>
          <li>Wednesday: Bowling Practice - 6 AM</li>
        </ul>
        <p>Get updates on your Email and WhatsApp!</p>
        <Link to="/notifications" className="notifications-button">
          Enable Notifications
        </Link>
      </section>
      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Players Say</h2>
        <div className="testimonial-card">
          <p>"The best cricket training experience I've ever had!"</p>
          <h3>- Rahul Sharma</h3>
        </div>
        <div className="testimonial-card">
          <p>"Improved my game significantly with personal training."</p>
          <h3>- Priya Singh</h3>
        </div>
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
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
