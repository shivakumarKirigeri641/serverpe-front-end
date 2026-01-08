import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  const hoverClass = hover ? 'card-hover' : '';
  
  return (
    <div 
      className={`project-card ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
