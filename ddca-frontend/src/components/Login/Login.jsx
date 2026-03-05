import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { response } from "../../../../ddca-backend/App";
const Login = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const { isAuthenticated } = useSelector((state) => state.user);
  const redirect =
    location && location.search ? location.search.split("=")[1] : "/home";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        "/api/v1/login",
        {
          email: email,
          password: password,
        },
        config
      );
      // alert(response.data.message);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      alert("User Logged in");
      if (response) {
        navigate(redirect);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
      alert(
        "Logging Failed: " +
          (error.response ? error.response.data.message : "Server error")
      );
    }
  };
  // useEffect(() => {
  //   if (response) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect]);

  return (
    <div className="container">
      <form id="loginForm" className="home-container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          name="email"
          className="input"
          type="text"
          placeholder="Enter phone or Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button className="submit-btn" type="submit">
          Submit
        </button>

        <div className="register-section">
          <p>Don't have an account?</p>
          <Link to="/register" className="register-link">
            Create a New Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
