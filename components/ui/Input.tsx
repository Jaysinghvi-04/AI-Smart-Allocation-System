import React from 'react';

// SVG icon for the error state for better UX.
const ExclamationCircleIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5 text-red-500' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, className, ...props }) => {
  const hasError = !!error;

  const baseInputClasses = "w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm transition-colors duration-200 bg-transparent";
  
  // Add right padding for the icon if there is an error
  const stateClasses = hasError 
    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 pr-10"
    : "border-input text-foreground placeholder:text-muted-foreground focus:ring-primary-500 focus:border-primary-500";
    
  const disabledClasses = "disabled:bg-muted disabled:text-muted-foreground disabled:border-border disabled:shadow-none disabled:cursor-not-allowed";

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`${baseInputClasses} ${stateClasses} ${disabledClasses}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          {...props}
        />
        {hasError && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon />
            </div>
        )}
      </div>
      {hasError && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
