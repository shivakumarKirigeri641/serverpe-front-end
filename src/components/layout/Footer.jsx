import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/ServerPe_Logo.svg"
                alt="ServerPe Logo"
                className="h-10 w-10 brightness-0 invert"
              />
              <span className="text-2xl font-bold">ServerPe</span>
            </div>
            <p className="text-gray-400">
              Premium academic project solutions for CSE students. Your success is our mission.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-primary-400 transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/privacy-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/privacy-policy', '_blank', 'noopener,noreferrer');
                  }}
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms-and-conditions"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/terms-and-conditions', '_blank', 'noopener,noreferrer');
                  }}
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a 
                  href="/refund-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/refund-policy', '_blank', 'noopener,noreferrer');
                  }}
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a 
                  href="/disclaimer"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/disclaimer', '_blank', 'noopener,noreferrer');
                  }}
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com/serverpe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors text-2xl">
                <FaFacebook />
              </a>
              <a href="https://twitter.com/serverpe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors text-2xl">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/serverpe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors text-2xl">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/company/serverpe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors text-2xl">
                <FaLinkedin />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              📧 support@serverpe.in
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} ServerPe. All rights reserved. | Powered by serverpe.in</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
