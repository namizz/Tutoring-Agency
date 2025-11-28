import { useState, useEffect } from "react";
import NavPoints from "../components/NavPoints";
import Button from "../components/Button";
import { FiMenu, FiX } from "react-icons/fi";
import TranslationButton from "../components/TranslationButton";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true);

  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const handleScroll = () => {
      const heroHeightDesktop = 700;
      const heroHeightMobile = 800;
      const currentHeroHeight = isMobile ? heroHeightMobile : heroHeightDesktop;

      setIsDarkBg(window.scrollY < currentHeroHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <nav
      className={`fixed w-full z-50 backdrop-blur-md shadow-sm transition-colors duration-300 ${
        isDarkBg ? "text-white bg-transparent" : "text-slate-950 bg-white/90"
      }`}
    >
      <div className="max-w-7xl mx-auto sm:px-6 px-4 py-2 sm:py-4 flex justify-between items-center font-semibold">
        {/* Left - Logo and Title */}
        <div
          className="flex items-center gap-3"
          onClick={() =>
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <img
            src="/33 logo.jpg"
            alt="Logo"
            width={45}
            height={45}
            className="rounded-full border-2 border-gray-400"
          />
          <h2 className="text-lg sm:text-xl font-semibold">
            33 International Home & Online Tutoring Agency
          </h2>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavPoints name={t("nav.home")} id="home" />
          <NavPoints name={t("nav.aboutus")} id="aboutus" />
          <NavPoints name={t("nav.services")} id="services" />
          <Button name={t("nav.register")} navigate="register" />
          <TranslationButton dark={isDarkBg} />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden flex py-4 flex-col items-center space-y-4 pb-6 font-medium transition-colors duration-300 ${
            isDarkBg
              ? "text-white bg-[rgba(31,45,58,0.95)]"
              : "text-black bg-white/95"
          }`}
        >
          <NavPoints name={t("nav.home")} id="home" />
          <NavPoints name={t("nav.aboutus")} id="aboutus" />
          <NavPoints name={t("nav.services")} id="services" />
          <TranslationButton dark={isDarkBg} />

          <Button name="Register" navigate="register" />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
