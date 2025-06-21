import React from 'react';
import '../../styles/ui/Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
  
export default Button;
