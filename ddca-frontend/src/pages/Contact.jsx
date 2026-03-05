import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css"; // Importing CSS file

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Header Section */}
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Get in touch with DDCA Cricket Institute for any queries or
          admissions.
        </p>
      </header>

      {/* Contact Information */}
      <section className="contact-info">
        <div className="info-card">
          <h2>Our Location</h2>
          <p>
            Kailash Nagar, Choti Rukanpura, Nala Par, Lohiya Path, Jagdeo Path,
            Patna, Bihar 800014
          </p>
        </div>
        <div className="info-card">
          <h2>Call Us</h2>
          <p>+91 98765 43210</p>
        </div>
        <div className="info-card">
          <h2>Email</h2>
          <p>info@ddcacricket.com</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <p>
          Fill out the form below, and we’ll get back to you as soon as
          possible.
        </p>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit" className="cta-button">
            Send Message
          </button>
        </form>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Find Us Here</h2>
        <iframe
          title="DDCA Cricket Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.162736807721!2d85.06903747539502!3d25.599508077454182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57002484f7e5%3A0x865f723ae39086b!2sDEEN%20DAYAL%20CRICKET%20ACADEMY%20-%20Cricket%20Coaching%20in%20Patna!5e0!3m2!1sen!2sin!4v1740311024903!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      {/* Footer */}
      <footer className="contact-footer">
        <p>© 2025 DDCA Cricket Institute | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Contact;
