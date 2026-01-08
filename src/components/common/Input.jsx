import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  id,
  name,
  value, 
  onChange, 
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
