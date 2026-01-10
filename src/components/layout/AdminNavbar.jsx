import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChartBar, FaKey, FaUsers, FaServer, FaSignOutAlt, FaTachometerAlt, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const navLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FaChartBar },
    { path: '/admin/licenses', label: 'Licenses', icon: FaKey },
    { path: '/admin/users', label: 'Users', icon: FaUsers },
    { path: '/admin/system', label: 'System', icon: FaServer },
  ];
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleExitAdmin = () => {
    navigate('/dashboard');
  };
  
  return (
    <nav className="glass sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Admin Badge */}
          <Link to="/admin/dashboard" className="flex items-center space-x-3">
            <img 
              src="/ServerPe_Logo.svg" 
              alt="ServerPe Logo" 
              className="h-10 w-10"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient">ServerPe</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                <FaShieldAlt className="w-3 h-3" />
                Admin Portal
              </span>
            </div>
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
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700 hidden md:block">
              <span className="font-semibold text-primary-600">{user?.user_name}</span>
              <span className="text-xs text-gray-500 ml-1">(Admin)</span>
            </span>
            <button
              onClick={handleExitAdmin}
              className="flex items-center space-x-1 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-sm"
            >
              <FaTachometerAlt />
              <span className="hidden sm:inline">Exit Admin</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
