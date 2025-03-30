import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", { adminId, password });
  
      console.log("Login Response:", response.data);  // Debugging API response
  
      if (response.data.success) {
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        console.log("Admin stored in localStorage:", localStorage.getItem("admin"));
  
        navigate("/admin-dashboard"); // Redirect to Admin Dashboard
        console.log("Navigating to admin dashboard..."); // Debugging
      } else {
        setError(response.data.message);
        console.log("Login failed:", response.data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid credentials or server error");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Admin ID</label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button type="submit" >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
