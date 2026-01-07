import React from 'react';

import Logo from '../../images/ServerPe_Logo.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <img src={Logo} alt="ServerPe" className="h-8 w-auto mx-auto mb-4 opacity-50 grayscale" />
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ServerPe App Solutions. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Designed for excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
