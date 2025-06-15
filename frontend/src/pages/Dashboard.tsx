import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Projects from './dashboard/Projects';
import BlogPosts from './dashboard/BlogPosts';
import Messages from './dashboard/Messages';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1">Welcome, {user?.username}</p>
          </div>
          <nav className="mt-4">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Overview
            </Link>
            <Link
              to="/dashboard/projects"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Projects
            </Link>
            <Link
              to="/dashboard/blog"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Blog Posts
            </Link>
            <Link
              to="/dashboard/messages"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Messages
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<BlogPosts />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Blog Posts</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 