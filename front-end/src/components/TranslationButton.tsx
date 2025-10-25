import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

interface TranslationButtonProps {
  dark?: boolean;
}

const TranslationButton = ({ dark }: TranslationButtonProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "am" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-4 py-2 border-1  ${
        dark ? "text-gray-50" : "text-gray-800"
      } font-semibold rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-blue-500 focus:outline-none`}
    >
      <MdLanguage size={20} />
      <span className="text-sm">{i18n.language === "en" ? "EN" : "አማ"}</span>
    </button>
  );
};

export default TranslationButton;
