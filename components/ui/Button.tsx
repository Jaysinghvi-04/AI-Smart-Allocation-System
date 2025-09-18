import React from 'react';

// Base props for the button, allowing for a polymorphic 'as' prop.
interface ButtonProps<C extends React.ElementType> {
  as?: C;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// This type utility combines our custom props with the props of the underlying component,
// ensuring that we can pass any valid HTML attribute (like 'href' for an 'a' tag)
// without TypeScript errors.
type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & ButtonProps<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof (Props & ButtonProps<C>)>;

// The component is defined as a generic, defaulting to 'button'.
const Button = <C extends React.ElementType = 'button'>({
  as,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: PolymorphicComponentProps<C>) => {
  // The component to render is determined by the 'as' prop, or defaults to 'button'.
  const Component = as || 'button';

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-accent text-accent-foreground hover:bg-accent/80 focus:ring-primary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-primary-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
