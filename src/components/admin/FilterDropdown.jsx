import React from 'react';

/**
 * FilterDropdown - Filter dropdown component
 * @param {string} label - Filter label
 * @param {string} value - Current selected value
 * @param {Array} options - Array of {label, value} options
 * @param {function} onChange - Callback when selection changes
 * @param {boolean} allowClear - Show clear option
 */
const FilterDropdown = ({ label, value, options, onChange, allowClear = true }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="input-field cursor-pointer"
      >
        {allowClear && <option value="">All</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
