import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

import Logo from '../../images/ServerPe_Logo.svg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Common links
  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Projects', path: '/#projects' }, // Anchor for landing
    { name: 'About me', path: '/#about' },
    { name: 'Contact me', path: '/#contact' },
  ];

  const dashboardLinks = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Explore projects', path: '/dashboard/explore' },
    { name: 'Purchase history', path: '/dashboard/history' },
    { name: 'Profile', path: '/dashboard/profile' },
  ];

  const links = user ? dashboardLinks : publicLinks;

  return (
    <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group">
              <img src={Logo} alt="ServerPe Logo" className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" />
              <div className="hidden sm:block">
                 <span className="block text-xl font-bold text-gray-900 leading-none tracking-tight">
                  ServerPe
                </span>
                <span className="block text-[0.65rem] font-bold text-indigo-600 uppercase tracking-widest leading-none mt-0.5">App Solutions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pl-4 ml-4 border-l border-gray-200 h-8 flex items-center">
              {user ? (
                <Button variant="text" onClick={logout} className="text-red-500 hover:text-red-700 text-sm font-semibold">
                  Logout
                </Button>
              ) : (
                <Link to="/auth">
                  <Button variant="gradient" className="rounded-full px-6 shadow-indigo-500/20">Subscribe / Login</Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors focus:outline-none"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 absolute w-full shadow-lg animate-fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-100">
                {user ? (
                <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full text-left block px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                >
                    Logout
                </button>
                ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="gradient" className="w-full justify-center rounded-xl py-3">Subscribe / Login</Button>
                </Link>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
