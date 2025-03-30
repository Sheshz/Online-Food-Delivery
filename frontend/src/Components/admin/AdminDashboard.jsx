import React from "react";
import AdminSidebar from "./AdminSidebar"; // Import Sidebar

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome to the Admin Panel.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
