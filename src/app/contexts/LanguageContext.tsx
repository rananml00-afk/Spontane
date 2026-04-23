import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '../translations/translations';
import { journalTeamTranslations } from '../translations/journal-team-translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: any): string => {
    // Try main translations first
    const mainTranslation = translations[language]?.[key];
    if (mainTranslation) return mainTranslation;
    
    // Try journal/team translations
    const journalTeamTranslation = journalTeamTranslations[language]?.[key];
    if (journalTeamTranslation) return journalTeamTranslation;
    
    // Fallback to English
    const fallback = translations.en?.[key] || journalTeamTranslations.en?.[key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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