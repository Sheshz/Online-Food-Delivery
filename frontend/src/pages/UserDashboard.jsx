import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Dashboard.css";

const UserDashboard = ({ user }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user exists, if not try to get from localStorage
    const checkUser = () => {
      if (!user) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // If user is admin, redirect to admin dashboard
          if (parsedUser.role === "admin") {
            navigate("/adminDashboard");
          }
        } else {
          // No user found in localStorage, redirect to login
          navigate("/login");
        }
      }
    };
    
    checkUser();
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [user, navigate]);

  useEffect(() => {
    // Fetch food items with authentication token
    const fetchFoodItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/food", {
          headers: {
            Authorization: token ? `Bearer ${token}` : ""
          }
        });
        setFoodItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food items:", error);
        setError("Failed to load food items. Please try again later.");
        setLoading(false);
        
        // If unauthorized (401), redirect to login
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchFoodItems();
  }, [navigate]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart functionality
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map(cartItem => 
          cartItem._id === item._id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove from cart functionality
  const removeFromCart = (itemId) => {
    const existingItem = cartItems.find(item => item._id === itemId);
    
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } else {
      setCartItems(
        cartItems.map(item => 
          item._id === itemId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
      );
    }
  };

  // Calculate total cart amount
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page
    alert("Proceeding to checkout...");
    // Here you would typically navigate to a checkout page
    // navigate("/checkout");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // If no user and no stored user, show login message
  const currentUser = user || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  
  if (!currentUser) {
    return <div className="dashboard-container">Please login to view this page.</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard, {currentUser.name}</h1>
        <div className="dashboard-actions">
          <button 
            onClick={() => setShowCart(!showCart)} 
            className="cart-button"
          >
            {showCart ? "Browse Menu" : `View Cart (${cartItems.reduce((total, item) => total + item.quantity, 0)})`}
          </button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        {showCart ? (
          <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty. Add some delicious items!</p>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item._id} className="cart-item">
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p className="item-price">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="cart-item-actions">
                        <button onClick={() => removeFromCart(item._id)} className="remove-button">-</button>
                        <span className="item-quantity">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="add-button">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="cart-total">
                    <h3>Total: ${cartTotal.toFixed(2)}</h3>
                  </div>
                  <button onClick={handleCheckout} className="checkout-button">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <h2>Our Menu</h2>
            {loading && <p className="loading">Loading menu items...</p>}
            {error && <p className="error-message">{error}</p>}
            
            <div className="food-categories">
              <button className="category-btn active">All</button>
              <button className="category-btn">Main Course</button>
              <button className="category-btn">Appetizers</button>
              <button className="category-btn">Desserts</button>
              <button className="category-btn">Beverages</button>
            </div>
            
            <div className="food-grid">
              {!loading && foodItems.length > 0 ? (
                foodItems.map((item) => (
                  <div key={item._id} className="food-card">
                    <div className="food-img">
                      <div className="placeholder-img"></div>
                    </div>
                    <div className="food-details">
                      <h3>{item.name}</h3>
                      <p className="food-description">{item.description}</p>
                      <div className="food-card-footer">
                        <p className="food-price">${item.price.toFixed(2)}</p>
                        <button 
                          className="order-button"
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : !loading && foodItems.length === 0 ? (
                <p>No food items available.</p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;