import React, { createContext, useContext, useMemo, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru'); // Начальный язык

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'ru' ? 'en' : 'ru'));
  };

  const memoValue = useMemo(() => ({ language, toggleLanguage }), [language, toggleLanguage]);

  return <LanguageContext.Provider value={memoValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
