import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./pages/Navigation";
import Login from "./Components/user/Login";
import Signup from "./Components/user/Signup";
import AdminLogin from "./Components/admin/AdminLogin";
import CreateAdmin from "./Components/admin/CreateAdmin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./Components/admin/AdminDashboard";
import MainPage from "./pages/MainPage";
import Menu from "./pages/Menu";
import ForgotPassword from "./Components/admin/ForgotPassword";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/admin/create-admin" element={<CreateAdmin />} />
        <Route
          path="/admin-dashboard"
          element={user ? <AdminDashboard /> : <Navigate to="/adminLogin" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
