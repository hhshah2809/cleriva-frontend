import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  disabled, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-elevated",
    secondary: "bg-surface-100 text-surface-900 hover:bg-surface-200 border border-surface-200",
    outline: "border border-surface-200 bg-white hover:bg-surface-50 text-surface-900",
    ghost: "hover:bg-surface-100 hover:text-surface-900 text-surface-700",
    link: "text-primary-600 underline-offset-4 hover:underline",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
    icon: "h-11 w-11",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
