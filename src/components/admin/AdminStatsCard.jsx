import React from 'react';

/**
 * AdminStatsCard - Reusable statistics card component
 * @param {ReactNode} icon - Icon component
 * @param {string} title - Card title
 * @param {string|number} value - Main value to display
 * @param {string} subtitle - Optional subtitle/description
 * @param {string} trend - Optional trend indicator (e.g., "+12%")
 * @param {string} variant - Color variant (primary, secondary, success, warning, danger)
 */
const AdminStatsCard = ({ icon: Icon, title, value, subtitle, trend, variant = 'primary' }) => {
  const variantClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    danger: 'from-red-500 to-red-600',
    accent: 'from-accent-500 to-accent-600',
  };

  const iconBgClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-600',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
    accent: 'bg-accent-100 text-accent-600',
  };

  return (
    <div className="glass rounded-xl p-6 card-hover fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <p className={`text-xs font-semibold mt-2 ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${iconBgClasses[variant]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStatsCard;
