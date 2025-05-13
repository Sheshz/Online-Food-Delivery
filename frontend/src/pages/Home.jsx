import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Home.css";

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/food");
        setFoodItems(response.data);

        // Set some items as popular (in a real app, this would come from the backend)
        if (response.data.length > 0) {
          setPopularItems(response.data.slice(0, 4));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching food items:", error);
        setError("Failed to load food items. Please try again later.");
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const handleOrderNow = (item) => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first to order food");
      navigate("/login");
    } else {
      navigate("/userDashboard");
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-slideshow">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="hero-content">
          <h1>Delicious Food Delivered To Your Door</h1>
          <p>Fresh ingredients, amazing taste, fast delivery!</p>
          <button className="order-now-btn" onClick={() => navigate("/menu")}>
            View Our Menu
          </button>
        </div>
      </div>

      {/* Popular Items Section */}
      <section className="popular-section">
        <h2 className="section-title">Most Popular Dishes</h2>
        <div className="popular-grid">
          {!loading && popularItems.length > 0 ? (
            popularItems.map((item) => (
              <div key={item._id} className="food-card">
                <div className="food-card-img">
                  {/* Replace with actual images when available */}
                  <div className="placeholder-img"></div>
                </div>
                <div className="food-card-content">
                  <h3>{item.name}</h3>
                  <p className="description">{item.description}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                  <button
                    className="order-btn"
                    onClick={() => handleOrderNow(item)}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))
          ) : !loading && popularItems.length === 0 ? (
            <p>No popular items available.</p>
          ) : (
            <p className="loading">Loading popular dishes...</p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍲</div>
            <h3>Fresh Ingredients</h3>
            <p>We use only the freshest ingredients for all our dishes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick delivery to your doorstep within 30 minutes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Affordable prices without compromising on quality</p>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="menu-preview-section">
        <h2 className="section-title">Explore Our Menu</h2>
        {loading && <p className="loading">Loading menu items...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="menu-preview-grid">
          {!loading && foodItems.length > 0 ? (
            foodItems.slice(0, 8).map((item) => (
              <div key={item._id} className="menu-item-card">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">${item.price.toFixed(2)}</p>
                <button
                  className="order-btn"
                  onClick={() => handleOrderNow(item)}
                >
                  Order Now
                </button>
              </div>
            ))
          ) : !loading && foodItems.length === 0 ? (
            <p>No menu items available.</p>
          ) : null}
        </div>

        <div className="view-all-menu">
          <button onClick={() => navigate("/menu")} className="view-all-btn">
            View Full Menu
          </button>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "The food arrived hot and fresh. Absolutely delicious!"
            </p>
            <p className="customer-name">- Sarah M.</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "Best online food delivery service I've ever used. Very punctual."
            </p>
            <p className="customer-name">- John D.</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★☆</div>
            <p className="testimonial-text">
              "Great variety of food options and excellent customer service."
            </p>
            <p className="customer-name">- Priya K.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to order delicious food?</h2>
          <p>
            Create an account and start ordering your favorite dishes today!
          </p>
          <button onClick={() => navigate("/signup")} className="cta-button">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;