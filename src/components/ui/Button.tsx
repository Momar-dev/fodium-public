import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F17] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs h-9 px-3.5 gap-1.5 min-h-[40px]',
    md: 'text-sm h-11 px-5 gap-2 min-h-[44px]',
    lg: 'text-base h-13 px-6 gap-2.5 min-h-[48px] font-semibold',
  };

  const variantStyles = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20 active:scale-[0.98]',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700/60 active:scale-[0.98]',
    outline: 'border border-slate-700 text-slate-200 hover:bg-slate-800/60 hover:border-slate-600 active:scale-[0.98]',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/50 active:scale-[0.98]',
    accent: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 active:scale-[0.98]',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Chargement...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
