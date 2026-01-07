import React from 'react';

const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`appearance-none block w-full px-4 py-2.5 border rounded-lg shadow-sm placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
        transition-all duration-200 sm:text-sm 
        ${error 
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' 
          : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
      />
      {error && <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
        {error}
      </p>}
    </div>
  );
};

export default Input;
