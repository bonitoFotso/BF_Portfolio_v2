import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../context/LanguageContext";

export const useLanguage = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageContext();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };
};