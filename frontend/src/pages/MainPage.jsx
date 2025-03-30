import React from "react";
import { Link } from "react-router-dom";
import "../CSS/MainPage.css";

const MainPage = () => {
  return (
    <div className="main-container">
      <div className="logo">
        <div className="logo-icon">F</div>
        <div className="logo-text">Feast<span>Fast</span></div>
      </div>
      
      <h1>Delicious Food at Your Doorstep</h1>
      <p className="tagline">Order from your favorite restaurants and get quick deliveries!</p>

      <div className="main-links">
        <div className="user-section">
          <h2>User Access</h2>
          <Link to="/login" className="main-button">User Login</Link>
          <Link to="/signup" className="main-button">Create User Account</Link>
        </div>

        <div className="admin-section">
          <h2>Admin Access</h2>
          <Link to="/adminLogin" className="main-button admin">Admin Login</Link>
          <Link to="/admin/create-admin" className="main-button admin">Create Admin Account</Link>
        </div>
      </div>

      <div className="home-link">
        <Link to="/home" className="home-button">Browse Restaurants</Link>
      </div>
      
      <div className="features">
        <div className="feature">
          <div className="feature-icon">🍔</div>
          <h3>Fast Delivery</h3>
          <p>Get your favorite meals delivered within 30 minutes</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🥗</div>
          <h3>Wide Selection</h3>
          <p>Choose from thousands of restaurants near you</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🎁</div>
          <h3>Special Offers</h3>
          <p>Enjoy exclusive deals and discounts every day</p>
        </div>
      </div>

      <footer>
        &copy; {new Date().getFullYear()} FeastFast. All rights reserved.
      </footer>
    </div>
  );
};

export default MainPage;