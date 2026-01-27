'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { jaMessages } from "./messages/ja";
import { enMessages } from "./messages/en";

export type Locale = "ja" | "en";

const allMessages = {
  ja: jaMessages,
  en: enMessages,
} as const;

type Messages = (typeof allMessages)[Locale];

type I18nContextType = {
  locale: Locale;
  messages: Messages;
  t: (path: string) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

type I18nProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale ?? "en");

  const value = useMemo<I18nContextType>(
    () => ({
      locale,
      messages: allMessages[locale],
      t: (path: string) => {
        const parts = path.split(".");
        let current: any = allMessages[locale];
        for (const part of parts) {
          if (current == null) return path;
          current = current[part];
        }
        if (typeof current === "string") return current;
        return path;
      },
      setLocale,
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}

