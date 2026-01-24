import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "../Locales/en";
import { bn } from "../Locales/bn";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState(localStorage.getItem("locale") || "en");
    const [t, setT] = useState(locale === "en" ? en : bn);

    const setLanguage = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem("locale", newLocale);
    };

    const toggleLanguage = () => {
        const newLocale = locale === "en" ? "bn" : "en";
        setLanguage(newLocale);
    };

    useEffect(() => {
        setT(locale === "en" ? en : bn);
        document.documentElement.lang = locale;
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
