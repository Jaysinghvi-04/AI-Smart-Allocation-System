
import React from 'react';

// A mock reCAPTCHA-style checkbox for demonstrating security features.
const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className = 'h-8 w-8 text-primary-500' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        <path fillRule="evenodd" d="M.5 10a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0zM10 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" />
    </svg>
);


interface CaptchaProps {
    verified: boolean;
    onChange: (verified: boolean) => void;
    className?: string;
}

const Captcha: React.FC<CaptchaProps> = ({ verified, onChange, className = '' }) => {
  return (
    <div className={`flex items-center justify-between p-3 border border-border rounded-md bg-muted/50 ${className}`}>
        <div className="flex items-center">
            <input
                id="captcha"
                type="checkbox"
                checked={verified}
                onChange={(e) => onChange(e.target.checked)}
                className="h-6 w-6 text-primary-600 border-input rounded focus:ring-primary-500 focus:ring-offset-background"
                aria-label="I'm not a robot checkbox"
            />
            <label htmlFor="captcha" className="ml-3 text-sm font-medium text-foreground cursor-pointer">
                I'm not a robot
            </label>
        </div>
        <div className="flex flex-col items-center text-center">
             <ShieldCheckIcon />
             <span className="text-xs text-muted-foreground mt-1 leading-none">Protected</span>
        </div>
    </div>
  );
};

export default Captcha;
