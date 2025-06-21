import React from 'react';
import '../../styles/ui/Card.scss';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  titleAlign?: 'left' | 'center' | 'right';
  titleColor?: string;    // e.g., "#FF6347" or "var(--primary)"
  subtitleColor?: string; // optional
}

const Card: React.FC<CardProps> = ({ title, subtitle, children, className = '', fullHeight = true }) => {
  return (
    <section className={`card ${className} ${!fullHeight ? 'card--short' : ''}`}>
      <h3 className="card__title">{title}</h3>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
      <div className="card__body">{children}</div>
    </section>
  );
};

export default Card;
