import React, { useState } from 'react';
import axios from 'axios';

const AdminAddFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/food/add',
        { name, description, price, image, category, discount },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } } // Include token for authentication
      );
      alert('Food added successfully!');
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div className="admin-add-food">
      <h2>Add Food</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Food Name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="Food Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="number" placeholder="Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AdminAddFood;
