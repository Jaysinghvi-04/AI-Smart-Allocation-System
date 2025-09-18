
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  // FIX: Updated onClick prop to accept a mouse event handler, allowing for more flexible event handling like `stopPropagation`.
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const cursorStyle = onClick ? 'cursor-pointer' : '';
  return (
    <div
      className={`bg-card text-card-foreground rounded-lg shadow-md border border-border p-6 transition-shadow hover:shadow-lg ${cursorStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
