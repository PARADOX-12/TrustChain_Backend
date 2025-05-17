
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CustomButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PrimaryButton = ({
  children,
  className,
  size = 'md',
  ...props
}: CustomButtonProps) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base'
  };

  return (
    <Button
      variant="default"
      className={cn(
        'ripple-container bg-navy text-white hover:bg-opacity-90 active:scale-95 shadow-soft',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export const SecondaryButton = ({
  children,
  className,
  size = 'md',
  ...props
}: CustomButtonProps) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base'
  };

  return (
    <Button
      variant="secondary"
      className={cn(
        'ripple-container bg-emerald text-white hover:bg-opacity-90 active:scale-95 shadow-soft',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export const OutlineButton = ({
  children,
  className,
  size = 'md',
  ...props
}: CustomButtonProps) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base'
  };

  return (
    <Button
      variant="outline"
      className={cn(
        'ripple-container bg-transparent border border-navy text-navy hover:bg-navy hover:text-white active:scale-95',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
