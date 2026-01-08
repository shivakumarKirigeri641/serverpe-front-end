import React, { useState, useRef, useEffect } from 'react';

const Autocomplete = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  placeholder, 
  required = false,
  disabled = false,
  displayKey = 'name',
  valueKey = 'id',
  error = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Update input value when selected value changes
  useEffect(() => {
    if (value && options.length > 0) {
      const selectedOption = options.find(opt => String(opt[valueKey]) === String(value));
      if (selectedOption) {
        setInputValue(selectedOption[displayKey]);
      }
    } else if (!value) {
      setInputValue('');
    }
  }, [value, options, displayKey, valueKey]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Filter options based on input
    if (newValue.trim()) {
      const filtered = options.filter(option =>
        option[displayKey].toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setFilteredOptions([]);
      setShowSuggestions(false);
    }

    // Clear selection if input is cleared
    if (!newValue.trim() && value) {
      onChange({ target: { name, value: '' } });
    }
  };

  const handleSelectOption = (option) => {
    setInputValue(option[displayKey]);
    onChange({ target: { name, value: option[valueKey] } });
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelectOption(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleFocus = () => {
    if (inputValue.trim() && filteredOptions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="mb-4" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`input-field ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${
            error ? 'border-red-500' : ''
          }`}
          autoComplete="off"
        />
        
        {showSuggestions && filteredOptions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={option[valueKey]}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  index === highlightedIndex
                    ? 'bg-primary-100 text-primary-900'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="font-semibold">{option[displayKey]}</div>
                {option.college_university && (
                  <div className="text-xs text-gray-500">{option.college_university}</div>
                )}
                {option.college_district && (
                  <div className="text-xs text-gray-400">{option.college_district}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {showSuggestions && filteredOptions.length === 0 && inputValue.trim() && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500">
            No colleges found matching "{inputValue}"
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      {!disabled && options.length > 0 && !showSuggestions && (
        <p className="text-xs text-gray-500 mt-1">
          Type to search from {options.length} colleges
        </p>
      )}
    </div>
  );
};

export default Autocomplete;
