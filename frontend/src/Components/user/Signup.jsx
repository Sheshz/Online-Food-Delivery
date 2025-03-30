import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../../CSS/Auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await registerUser(formData);
      if (response.success) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Error occurred during registration. Please try again.");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create an Account</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
        <div className="auth-alternate">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="auth-link">
            Login
          </span>
        </div>
        <div className="back-button-container">
          <button onClick={handleBackToHome} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
