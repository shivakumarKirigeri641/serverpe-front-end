import React from 'react';

import Logo from '../../images/ServerPe_Logo.svg';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
            <img src={Logo} alt="ServerPe" className="h-10 w-auto opacity-80 grayscale hover:grayscale-0 transition-all duration-300" />
        </div>
        <p className="text-sm font-medium mb-2">
          &copy; {new Date().getFullYear()} ServerPe App Solutions. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Dedicated to providing high-quality project demonstrations for educational purposes. 
          Built with <span className="text-indigo-500">♥</span> for students and developers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
