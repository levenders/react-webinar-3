import { useLanguage } from '../../context/language-context';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return <button onClick={toggleLanguage}>{language === 'ru' ? 'English' : 'Русский'}</button>;
};

export default LanguageSwitcher;
