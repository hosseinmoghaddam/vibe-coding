'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  isRTL: boolean;
  toggleDirection: () => void;
  currentLang: 'en' | 'fa';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isRTL, setIsRTL] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'fa'>('en');

  useEffect(() => {
    // Update document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [isRTL, currentLang]);

  const toggleDirection = () => {
    setIsRTL(!isRTL);
    setCurrentLang(current => current === 'en' ? 'fa' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ isRTL, toggleDirection, currentLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
