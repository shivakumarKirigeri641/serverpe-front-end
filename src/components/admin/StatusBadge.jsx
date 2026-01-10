import React from 'react';

/**
 * StatusBadge - Displays status with colored indicator
 * @param {string} status - Status text (ACTIVE, INACTIVE, PAID, etc.)
 * @param {string} variant - Color variant (success, danger, warning, info)
 */
const StatusBadge = ({ status, variant }) => {
  // Auto-detect variant based on status if not provided
  const getVariant = () => {
    if (variant) return variant;
    
    // Handle non-string status values
    if (!status) return 'info';
    const statusUpper = String(status).toUpperCase();
    
    if (statusUpper === 'ACTIVE' || statusUpper === 'SUCCESS' || statusUpper === 'PAID') {
      return 'success';
    }
    if (statusUpper === 'INACTIVE' || statusUpper === 'FAILED') {
      return 'danger';
    }
    if (statusUpper === 'PENDING' || statusUpper === 'PROCESSING') {
      return 'warning';
    }
    return 'info';
  };

  const selectedVariant = getVariant();

  const variantClasses = {
    success: 'bg-green-100 text-green-800 border-green-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  const dotClasses = {
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${variantClasses[selectedVariant]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[selectedVariant]}`}></span>
      {status || 'N/A'}
    </span>
  );
};

export default StatusBadge;
