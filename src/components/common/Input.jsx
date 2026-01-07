import React from 'react';

const Input = ({ label, id, type = "text", error, className = "", ...props }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}
        `}
        {...props}
      />
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
