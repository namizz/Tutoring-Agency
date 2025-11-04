import { useTranslation } from "react-i18next";
import ServiceComponent from "../components/ServiceComponent";
import { FaSchoolLock, FaPlane } from "react-icons/fa6";
import { SiDuolingo, SiTestin } from "react-icons/si";
import { RiVipFill } from "react-icons/ri";

const Service = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("service.generalTutor.title"),
      description: t("service.generalTutor.desc"),
      icon: (
        <FaSchoolLock className="text-4xl text-yellow-500 p-1.5" size={62} />
      ),
    },
    {
      title: t("service.gatUat.title"),
      description: t("service.gatUat.desc"),
      icon: (
        <SiTestin
          className="text-4xl text-blue-500 border p-1.5 rounded-full"
          size={62}
        />
      ),
    },
    {
      title: t("service.satDuolingo.title"),
      description: t("service.satDuolingo.desc"),
      icon: (
        <SiDuolingo
          className="text-4xl text-green-500 bg-yellow-100 rounded-xl"
          size={50}
        />
      ),
    },
    {
      title: t("service.vipTutor.title"),
      description: t("service.vipTutor.desc"),
      icon: <RiVipFill className="text-4xl text-purple-500 p-1.5" size={62} />,
    },
    {
      title: t("service.visa.title"),
      description: t("service.visa.desc"),
      icon: (
        <FaPlane className="text-4xl text-red-500 font-bold p-1.5" size={62} />
      ),
    },
  ];

  return (
    <section className="py-20 px-8 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#1F2D3A] mb-10">
          {t("service.title")}
        </h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          {t("service.subtitle")}
        </p>

        <div className="flex flex-wrap justify-center gap-8">
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
