import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">ServerPe</h3>
            <p className="text-gray-400">
              Premium academic project solutions for CS/IS students. 
              Real-world projects, comprehensive documentation, and professional support.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="/projects" className="hover:text-primary-400 transition-colors">Explore Projects</a></li>
              <li><a href="/about" className="hover:text-primary-400 transition-colors">About Me</a></li>
              <li><a href="/contact" className="hover:text-primary-400 transition-colors">Contact Me</a></li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-primary-400 transition-colors">
                <FaGithub />
              </a>
              <a href="#" className="text-2xl hover:text-primary-400 transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="text-2xl hover:text-primary-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-primary-400 transition-colors">
                <FaEnvelope />
              </a>
            </div>
            <p className="text-gray-400 mt-4">
              Email: support@serverpe.in
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
