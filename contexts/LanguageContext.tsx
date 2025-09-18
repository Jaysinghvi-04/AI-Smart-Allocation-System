import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'gu' | 'mr' | 'pa' | 'ta' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

export const languageOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'gu', label: 'ગુજરાતી' },
  { value: 'mr', label: 'मराठी' },
  { value: 'pa', label: 'ਪੰਜਾਬੀ' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'te', label: 'తెలుగు' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<Language, any> | null>(null);

  useEffect(() => {
    const loadAllTranslations = async () => {
        try {
            const responses = await Promise.all(languageOptions.map(lang => fetch(`/locales/${lang.value}.json`)));
            
            for (const res of responses) {
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${res.url}: ${res.statusText}`);
                }
            }
            
            const jsonData = await Promise.all(responses.map(res => res.json()));
            
            const loadedTranslations = languageOptions.reduce((acc, lang, index) => {
                acc[lang.value] = jsonData[index];
                return acc;
            }, {} as Record<Language, any>);
            
            setTranslations(loadedTranslations);
        } catch (error) {
            console.error("Failed to load translation files:", error);
            try {
                const enRes = await fetch('/locales/en.json');
                if (!enRes.ok) throw new Error('English fallback failed to load');
                const enData = await enRes.json();
                setTranslations({ en: enData } as any);
            } catch (e) {
                console.error("Failed to load English fallback:", e);
                setTranslations({} as any); // Set to empty to stop loading state
            }
        }
    };
    loadAllTranslations();
  }, []);

  useEffect(() => {
    if (translations) {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage);
      }
    }
  }, [translations]);

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  const t = (key: string, options?: { [key: string]: string | number }): string => {
    if (!translations) {
      return key; // Return key while loading
    }
    
    const keys = key.split('.');
    
    let result = translations[language] || translations['en'];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) break;
    }

    if (result === undefined && language !== 'en' && translations['en']) {
      result = translations['en'];
       for (const k of keys) {
        result = result?.[k];
        if (result === undefined) break;
      }
    }

    if (result === undefined) {
      return key;
    }

    let strResult = String(result);

    if (options) {
      Object.keys(options).forEach(optKey => {
        strResult = strResult.replace(new RegExp(`{{${optKey}}}`, 'g'), String(options[optKey]));
      });
    }

    return strResult;
  };
  
  if (!translations) {
      return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};