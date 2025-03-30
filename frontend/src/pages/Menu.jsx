import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  // Categories for filtering
  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Desserts", "Drinks"];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/food");
        setMenuItems(response.data);
        setFilteredItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError("Failed to load menu items. Please try again later.");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    // Filter items based on active category and search term
    let result = menuItems;
    
    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter(item => item.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredItems(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeCategory, searchTerm, menuItems]);

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleAddToCart = (item) => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first to add items to cart");
      navigate("/login");
    } else {
      alert(`${item.name} has been added to your cart!`);
      // Add your cart functionality here
    }
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔄</div>
        <div className="empty-state-message">{error}</div>
        <button onClick={() => window.location.reload()} className="empty-state-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
        <p className="menu-description">
          Explore our wide range of delicious meals prepared with fresh ingredients. 
          From breakfast to dinner, we've got you covered.
        </p>
      </div>

      <div className="category-nav">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search for food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select className="filter-dropdown">
          <option value="recommended">Recommended</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {currentItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🍽️</div>
          <div className="empty-state-message">No menu items found.</div>
          <button 
            onClick={() => {
              setActiveCategory("All");
              setSearchTerm("");
            }} 
            className="empty-state-button"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="menu-grid">
            {currentItems.map((item) => (
              <div key={item._id} className="menu-item">
                <div className="item-image">
                  {/* Replace with actual image when available */}
                  <img src={`/images/food/${item.category.toLowerCase()}.jpg`} alt={item.name} />
                  {item.isNew && <span className="item-tag">New</span>}
                </div>
                <div className="item-content">
                  <h3 className="item-title">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-meta">
                    <div className="item-price">${item.price.toFixed(2)}</div>
                    <div className="item-rating">
                      <span className="star-icon">★</span>
                      {item.rating ? item.rating.toFixed(1) : "4.5"}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="add-to-cart"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className={`favorite-btn ${favorites.includes(item._id) ? "active" : ""}`}
                      onClick={() => toggleFavorite(item._id)}
                    >
                      ♥
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="prev-button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </button>
              
              {[...Array(totalPages).keys()].map(number => (
                <button
                  key={number + 1}
                  className={`page-button ${currentPage === number + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </button>
              ))}
              
              <button 
                className="next-button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;