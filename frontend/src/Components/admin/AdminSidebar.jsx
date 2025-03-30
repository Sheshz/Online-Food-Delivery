import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Fetch admin details from local storage or API
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
  }, []);

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      {/* Admin Profile Section */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        {admin && (
          <div className="mt-4">
            <p className="text-sm">Welcome, {admin.adminId}</p>
            <p className="text-xs text-gray-300">{admin.email}</p>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/admin/manage-users" className="hover:bg-gray-700 p-2 rounded">Manage Users</Link>
        <Link to="/admin/settings" className="hover:bg-gray-700 p-2 rounded">Settings</Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
