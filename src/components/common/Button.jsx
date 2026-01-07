import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 focus:ring-indigo-500 shadow-sm border border-transparent",
    secondary: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:ring-indigo-500 shadow-sm",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-sm",
    text: "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 bg-transparent shadow-none",
    gradient: "text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 border-transparent",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
