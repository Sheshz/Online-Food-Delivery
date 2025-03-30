import React from 'react';
import PropTypes from 'prop-types';
import "../CSS/MenuItem.css";  // Add your styles here for MenuItem

const MenuItem = ({ name, price, image }) => {
  return (
    <div className="menu-item">
      <img src={image} alt={name} className="menu-item-img" />
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p> {/* Format the price to two decimal places */}
      <button className="btn-add-to-cart">Add to Cart</button>
    </div>
  );
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,  // Name of the dish
  price: PropTypes.number.isRequired,  // Price of the dish
  image: PropTypes.string.isRequired,  // Image URL of the dish
};

export default MenuItem;