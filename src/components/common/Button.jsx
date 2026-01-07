import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-2 rounded-full font-medium transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md hover:shadow-lg",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
    outline: "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    text: "bg-transparent text-gray-600 hover:text-gray-900 shadow-none px-4",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
