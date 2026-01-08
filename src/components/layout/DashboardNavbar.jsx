import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCode, FaHome, FaProjectDiagram, FaHistory, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const navLinks = [
    { path: '/dashboard', label: 'Home', icon: FaHome },
    { path: '/dashboard/explore-projects', label: 'Explore Projects', icon: FaProjectDiagram },
    { path: '/dashboard/purchase-history', label: 'Purchase History', icon: FaHistory },
    { path: '/dashboard/profile', label: 'Profile', icon: FaUser },
  ];
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  return (
    <nav className="glass sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <FaCode className="text-3xl text-primary-600" />
            <span className="text-2xl font-bold text-gradient">ServerPe</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link flex items-center space-x-1 ${isActive ? 'active' : ''}`}
                >
                  <Icon className="text-sm" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 hidden md:block">
              Welcome, <span className="font-semibold text-primary-600">{user?.user_name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
