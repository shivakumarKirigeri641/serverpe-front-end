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
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3">
              <img src={Logo} alt="ServerPe Logo" className="h-10 w-auto" />
              <div className="hidden sm:block">
                 <span className="block text-xl font-black text-gray-900 leading-none">
                  ServerPe
                </span>
                <span className="block text-[0.65rem] font-bold text-indigo-600 uppercase tracking-widest leading-none">App Solutions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <Button variant="text" onClick={logout} className="text-red-500 hover:text-red-600">
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="primary">Subscribe / Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
               <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
               >
                 Logout
               </button>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <div className="mt-4 px-3">
                   <Button variant="primary" className="w-full">Subscribe / Login</Button>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
