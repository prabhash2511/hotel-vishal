import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Reuse navbar styles
import logo from "../assets/logo.png"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data in Firestore under "users" collection
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      alert("Registration successful!");
      navigate("/login");
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

      {/* Registration Form */}
      <div style={styles.formContainer}>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </div>
    </div>
  );
};

// Inline CSS for Register Page
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

export default Register;