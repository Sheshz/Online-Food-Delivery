//check for authentication:
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');  // Assuming JWT token is saved in localStorage
    if (!token) {
      navigate('/login');  // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);  // User is authenticated
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;  // Show loading state while checking
  }

  return <div>Welcome to your Dashboard!</div>;
};

export default DashboardPage;