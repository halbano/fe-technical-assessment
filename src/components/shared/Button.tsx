import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  textOnly?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'default',
    fullWidth = false,
    textOnly = false,
    children,
    className = '',
    disabled,
    ...props
  }, ref) => {
    const baseClasses = "gap-2 inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-blue-600 disabled:bg-blue-300",
      secondary: "bg-white text-primary hover:bg-gray-50 focus:ring-gray-500 border border-gray-300 disabled:bg-gray-100",
      ghost: "text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      outline: "border border-gray-200 bg-gray-200 hover:bg-gray-300 focus:ring-gray-300",
    };

    // For icon-only buttons, use square dimensions
    const iconSizeClasses = {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-12 w-12",
    };

    // For text buttons, use padding and height
    const textSizeClasses = {
      sm: "h-8 px-3 text-xs",
      default: "h-10 px-4 py-2 text-sm",
      lg: "h-11 px-8 text-base",
    };

    const sizeClasses = textOnly ? textSizeClasses[size] : iconSizeClasses[size];
    const widthClass = fullWidth && !textOnly ? "w-full" : "";
    const isDisabled = disabled;
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${widthClass} ${className}`.trim();

    return (
      <button
        className={classes}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"; 