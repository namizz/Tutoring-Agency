import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative bg-[#1F2D3A] text-white flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/13/e6/6d/13e66df5a2bc72f0353bf9e24bd55d38.jpg')] bg-cover bg-center opacity-40"></div>

      {/* Color Overlay */}
      <div className="absolute inset-0 bg-[#1F2D3A] opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center gap-40 px-8 md:px-20 py-20 md:py-32">
        {/* Left Text Section */}
        <div className="max-w-2xl space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-snug">
            {t("home.title")}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-200">
            {t("home.description")}{" "}
            <span className="font-bold text-red-400">33 International</span>{" "}
            {t("home.continuation")}
          </p>
        </div>

        {/* Right Image Section */}
        <div className="mt-10 md:mt-0 flex-shrink-0">
          <img
            src="https://i.pinimg.com/736x/87/ba/b3/87bab35f15bb6993d7d0f68f80809ea2.jpg"
            alt="Albert Einstein"
            className="w-72 md:w-96 h-72 md:h-130 object-cover rounded-full opacity-800 border-2"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
