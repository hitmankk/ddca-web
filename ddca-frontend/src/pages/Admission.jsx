import React, { useState } from "react";
import "./Admission.css";
import axios from "axios";

const Admission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    skillLevel: "Beginner",
    playingRole: "Batsman",
    experience: "",
    fatherName: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.post("api/v1/register", formData, config);
      console.log(response);
      console.log("Form Submitted:", formData);
      alert("Registration Successful!");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
      alert(
        "Registration Failed: " +
          (error.response ? error.response.data.message : "Server error")
      );
    }
  };

  return (
    <div className="container1">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1>Cricket Registration</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father Name"
          value={formData.fatherName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="skillLevel"
          value={formData.skillLevel}
          onChange={handleChange}
          required
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select
          name="playingRole"
          value={formData.playingRole}
          onChange={handleChange}
          required
        >
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-Rounder">All-Rounder</option>
          <option value="Wicket-Keeper">Wicket-Keeper</option>
        </select>

        <textarea
          name="experience"
          placeholder="Briefly describe your experience..."
          value={formData.experience}
          onChange={handleChange}
        ></textarea>

        <button className="submit-btn" type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Admission;
