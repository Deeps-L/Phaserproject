// Login.js
import React, { useState } from "react";
import "./Login.css"
import {  useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const staticUserId = "admin123@gmail.com";
    const staticPasword = "admin123";

    if (email === staticUserId && password === staticPasword) {
      // const userEmail = staticUserId;
      alert("Login Successfully");
      navigate("/PhaserGame"); // Pass userEmail as a parameter in the route
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login Form</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="useremail">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userpwd">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
