import React from "react";
import { Link } from "react-router-dom";
import "./Achievement.css"; // Custom styling

const Achievement = () => {
  return (
    <div className="achievements-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Our Achievements</h1>
          <p>Celebrating success & excellence in cricket</p>
          <Link to="/contact" className="cta-button">
            Join Us Today
          </Link>
        </div>
      </section>

      {/* Milestones & Awards */}
      <section className="milestones">
        <h2>Milestones & Awards</h2>
        <p>
          Our cricket academy has nurtured young talent and produced some of the
          finest players in the game.
        </p>
        <ul>
          <li>🏆 Best Cricket Academy Award (2023)</li>
          <li>🎖 50+ Players Selected for State Level</li>
          <li>🥇 10 National-Level Champions</li>
          <li>🌍 International Tournament Participation</li>
        </ul>
      </section>

      {/* Tournament Victories */}
      <section className="tournament-victories">
        <h2>Our Tournament Victories</h2>
        <div className="victories-list">
          <div className="victory-card">
            <h3>Junior Premier League</h3>
            <p>🏅 Champions - 2022</p>
          </div>
          <div className="victory-card">
            <h3>State Championship</h3>
            <p>🏅 Runners-up - 2023</p>
          </div>
          <div className="victory-card">
            <h3>National T20 Cup</h3>
            <p>🏆 Winners - 2021</p>
          </div>
        </div>
      </section>

      {/* Featured Players */}
      <section className="featured-players">
        <h2>Our Star Players</h2>
        <div className="players-list">
          <div className="player-card">
            <img src="/media/player1.png" alt="Player 1" />
            <h3>Rahul Sharma</h3>
            <p>Selected for India U-19 Team</p>
          </div>
          <div className="player-card">
            <img src="/media/player2.png" alt="Player 2" />
            <h3>Arjun Mehta</h3>
            <p>State-Level MVP - 2023</p>
          </div>
        </div>
      </section>

      {/* Join the Academy */}
      <section className="join-section">
        <h2>Be a Part of Our Legacy</h2>
        <p>Train with the best and become a cricket star.</p>
        <Link to="/registration" className="cta-button">
          Register Now
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

export default Achievement;
