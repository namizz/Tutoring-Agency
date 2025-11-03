import { useTranslation } from "react-i18next";
import List from "../components/List";
import { LuBrain } from "react-icons/lu";
import { BsBook } from "react-icons/bs";
import { RiHeartLine } from "react-icons/ri";
import { LiaChalkboardSolid } from "react-icons/lia";

const Value = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white text-[#1F2D3A] py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-8 md:px-20">
        {/* Left Text Section */}
        <div className="space-y-6 md:max-w-lg ">
          <h1 className="text-3xl md:text-4xl font-bold">{t("value.title")}</h1>

          <List icon={<LuBrain className="text-[#1F2D3A] text-2xl mr-4" />}>
            {t("value.point1")}
          </List>

          <List icon={<BsBook className="text-[#1F2D3A] text-2xl mr-4" />}>
            {t("value.point2")}
          </List>

          <List icon={<RiHeartLine className="text-[#1F2D3A] text-2xl mr-4" />}>
            {t("value.point3")}
          </List>

          <List
            icon={
              <LiaChalkboardSolid className="text-[#1F2D3A] text-2xl mr-4 shrink-0" />
            }
          >
            {t("value.point4")}
          </List>
        </div>

        {/* Right Image Section */}
        <div className="flex-shrink-0">
          <img
            src="/Teacher 3D cartoon.jpg"
            alt="Tutoring session illustration"
            className="w-72 md:w-96 h-auto object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Value;
