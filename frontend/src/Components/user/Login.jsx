import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "../../CSS/Auth.css";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      navigate("/userDashboard");
    }
  }, [navigate, setUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser(formData);
      if (response.success) {
        setSuccessMessage("Login successful! Redirecting to dashboard...");
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        setUser(response.user);
        navigate("/userDashboard", { replace: true });
      } else {
        setError(response.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-form">
          <h2>User Login</h2>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-alternate">
            Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
          </div>

          <div className="back-button-container">
            <Link to="/" className="back-button">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
