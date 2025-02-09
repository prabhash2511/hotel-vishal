import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Reuse navbar styles
import logo from "../assets/logo.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/hotel");
    } catch (error) {
      setError(error.message);
    }
  };

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

        {/* Home button on the right */}
        <div className="auth-buttons">
          <button onClick={() => navigate("/")}>Home</button>
        </div>
      </div>

      {/* Login Form */}
      <div style={styles.formContainer}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </div>
    </div>
  );
};

// Inline CSS for Login Page
const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default Login;