import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../data/translations';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (path) => {
    return getTranslation(language, path);
  };

  return { t, language };
};

