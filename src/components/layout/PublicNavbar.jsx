import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCode, FaHome, FaProjectDiagram, FaUser, FaEnvelope } from 'react-icons/fa';

const PublicNavbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/projects', label: 'Explore Projects', icon: FaProjectDiagram },
    { path: '/about', label: 'About Me', icon: FaUser },
    { path: '/contact', label: 'Contact Me', icon: FaEnvelope },
  ];
  
  return (
    <nav className="glass sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaCode className="text-3xl text-primary-600" />
            <span className="text-2xl font-bold text-gradient">ServerPe</span>
            <span className="text-sm text-gray-600 hidden md:block">App Solutions</span>
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
          
          {/* Auth Button */}
          <Link
            to="/auth"
            className="btn-primary px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Subscribe / Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
