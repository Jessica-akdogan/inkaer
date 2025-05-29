import React from 'react';
import { cn } from '../../lib/utils';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'default', ...props }) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-semibold transition-all',
        variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'outline' && 'border border-gray-300 text-gray-800 bg-white hover:bg-gray-100',
        variant === 'ghost' && 'bg-transparent text-blue-600 hover:underline',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
