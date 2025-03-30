import axios from "axios";

// Base URL for API
const API_URL = "http://localhost:5000/api";

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || "Registration failed" 
    };
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || "Login failed" 
    };
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Get auth token
export const getToken = () => {
  return localStorage.getItem("token");
};
