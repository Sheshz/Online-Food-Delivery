import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <div className="logo">
        <Link to="/">
        <div className="logo">
        <div className="logo-icon">F</div>
        <div className="logo-text">Feast<span>Fast</span></div>
      </div>
        </Link>
      </div>
      
      <div className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
      
      <div className="auth-links">
        {user ? (
          <>
            <span className="welcome-text">Hello, {user.name}</span>
            <Link to={user.role === "admin" ? "/adminDashboard" : "/userDashboard"} className="nav-link dashboard-link">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link login-btn">Login</Link>
            <Link to="/signup" className="auth-link signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;