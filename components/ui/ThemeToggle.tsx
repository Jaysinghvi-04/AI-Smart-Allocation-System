import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';

// FIX: Added className prop to allow dynamic styling from parent component.
const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

// FIX: Added className prop to allow dynamic styling from parent component.
const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            onClick={toggleTheme}
            variant="ghost"
            size="sm"
            className="flex items-center justify-center w-10 h-10 rounded-full !p-0 !bg-transparent text-slate-600 dark:text-slate-300 hover:!bg-slate-100 dark:hover:!bg-slate-700"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {/* FIX: Added size classes (h-6 w-6) which were previously inside the icon component definition. */}
            <SunIcon className={`h-6 w-6 transition-transform duration-500 ${theme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            {/* FIX: Added size classes (h-6 w-6) which were previously inside the icon component definition. */}
            <MoonIcon className={`absolute h-6 w-6 transition-transform duration-500 ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
        </Button>
    );
};

export default ThemeToggle;