import Button from "../components/Button";
import { useTranslation } from "react-i18next";

const GoRegister = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-[#f3ebd5] to-[#f9f5e7] py-10 px-6 flex flex-col md:flex-row items-center justify-center gap-8 rounded-2xl shadow-md">
      <div className="text-gray-800 text-center md:text-left max-w-md">
        <h1 className="text-3xl font-bold mb-3">{t("goRegister.title")}</h1>
        <p className="text-lg mb-4 leading-relaxed">
          {t("goRegister.description")}
        </p>
        <Button name={t("goRegister.button")} />
      </div>
    </section>
  );
};

export default GoRegister;
