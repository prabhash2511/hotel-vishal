import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Reuse this CSS file for navbar styling
import logo from "../assets/logo.png"
import home from "../assets/home-img.jpg"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navbar">
        {/* Logo on the left */}
        <div className="logo">
          <img
            src={logo} // Replace with your logo image URL
            alt="Logo"
          />
        </div>

        {/* Text in the middle */}
        <div className="middle-text">Welcome to MyApp</div>

        {/* Login and Register buttons on the right */}
        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>

      {/* Full-screen image */}
      <div className="full-screen-image">
        <img
          src={home} // Replace with your image URL
          alt="Full Screen"
        />
      </div>
    </div>
  );
};

export default Home;