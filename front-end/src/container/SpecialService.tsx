import ServiceComponent from "../components/ServiceComponent";
import { FaSchoolLock } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Service = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("special_service.title"),
      description: t("special_service.description"),
      icon: <FaSchoolLock className="text-4xl text-yellow-500" />,
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center mb-12">
          {t("special_service.heading")}
        </h1>
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {services.map((service, index) => (
            <ServiceComponent
              key={index}
              icon={service.icon}
              title={service.title}
            >
              {service.description}
            </ServiceComponent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
