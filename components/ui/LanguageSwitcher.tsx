import React from 'react';
import { useLanguage, languageOptions } from '../../contexts/LanguageContext';

const LanguageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 4V5m0 4a2 2 0 11-4 0 2 2 0 014 0zm11 1-4 6h4m-2 0v4m0-4h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
  };

  return (
    <div className="relative">
      <LanguageIcon />
      <select
        value={language}
        onChange={handleLanguageChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Select language"
      >
        {languageOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;