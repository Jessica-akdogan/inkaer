import React from 'react';
import { cn } from '../../lib/utils';

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return <div className={cn('rounded-2xl shadow-md border bg-white', className)}>{children}</div>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return <div className={cn('p-4', className)}>{children}</div>;
};
