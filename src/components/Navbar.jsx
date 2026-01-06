import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate(user ? '/dashboard' : '/')}>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              ServerPe
            </span>
            <span className="ml-2 text-sm font-semibold text-gray-500 hidden sm:block">App Solutions</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to={user ? "/dashboard" : "/"} className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
            
            {user ? (
              <>
                 <Link to="/dashboard/explore" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Explore Projects</Link>
                 <Link to="/dashboard/history" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Purchase History</Link>
                 <Link to="/dashboard/profile" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Profile</Link>
                 <button onClick={logout} className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg">
                   Logout
                 </button>
              </>
            ) : (
              <>
                <Link to="/explore" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Explore Projects</Link>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About Me</Link>
                <Link to="/contact" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact Me</Link>
                <Link to="/auth" className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5">
                  Subscribe / Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
