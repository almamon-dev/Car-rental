import React, { createContext, useContext, useState, useEffect } from "react";
import { locales, rtlLanguages } from "../Locales/index";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState(localStorage.getItem("locale") || "en");
    const [t, setT] = useState(locales[locale] || locales.en);

    const setLanguage = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem("locale", newLocale);
    };

    const toggleLanguage = () => {
        // Toggle logic might need update if we have multiple languages, 
        // but keeping simple toggle between en/bn for legacy or updating to cycle/modal?
        // User asked for "easy add", let's assume specific selector is used elsewhere.
        // For now, let's just default this to cycling en/bn or maybe just next key?
        // Better to minimal change here: just let setLanguage handle it.
        const newLocale = locale === "en" ? "bn" : "en"; 
        setLanguage(newLocale);
    };

    useEffect(() => {
        setT(locales[locale] || locales.en);
        document.documentElement.lang = locale;
        document.documentElement.dir = rtlLanguages.includes(locale) ? "rtl" : "ltr";
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ locale, toggleLanguage, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
