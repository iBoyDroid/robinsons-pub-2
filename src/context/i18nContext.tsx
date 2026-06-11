import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { T, type Lang, type TranslationKey } from '../translations';

interface I18nContextValue {
  lang: Lang;
  t: (key: TranslationKey) => string;
  setLanguage: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('rpLang') as Lang | null;
    return saved && T[saved] ? saved : 'sl';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('rpLang', lang);
  }, [lang]);

  function t(key: TranslationKey): string {
    return T[lang][key] ?? T.sl[key] ?? key;
  }

  function setLanguage(newLang: Lang) {
    if (T[newLang]) setLang(newLang);
  }

  return (
    <I18nContext.Provider value={{ lang, t, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be inside I18nProvider');
  return ctx;
}
