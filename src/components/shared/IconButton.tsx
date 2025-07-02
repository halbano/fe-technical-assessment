import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
  'aria-label': string; // Required for accessibility
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    size = 'default',
    children,
    className = '',
    ...props
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500";

    const sizeClasses = {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-12 w-12",
    };

    const classes = `${baseClasses} ${sizeClasses[size]} ${className}`.trim();

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton"; 