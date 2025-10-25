import React, { useState, useEffect } from "react";
import NavPoints from "../components/NavPoints";
import Button from "../components/Button";
import { FiMenu, FiX } from "react-icons/fi";
import TranslationButton from "../components/TranslationButton";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 700;
      setIsDarkBg(window.scrollY < heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 backdrop-blur-md shadow-sm transition-colors duration-300 ${
        isDarkBg ? "text-white bg-transparent" : "text-black bg-white/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center font-semibold">
        {/* Left - Logo and Title */}
        <div className="flex items-center gap-3">
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
          <NavPoints name="Home" id="home" dark={isDarkBg} />
          <NavPoints name="About Us" id="aboutus" dark={isDarkBg} />
          <NavPoints name="Services" id="services" dark={isDarkBg} />
          <NavPoints name="Contact" id="contact" dark={isDarkBg} />
          <Button name="Register" />
        </div>

        <TranslationButton dark={isDarkBg} />

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
          className={`md:hidden flex flex-col items-center space-y-4 pb-6 font-medium transition-colors duration-300 ${
            isDarkBg
              ? "text-white bg-[rgba(31,45,58,0.95)]"
              : "text-black bg-white/95"
          }`}
        >
          <NavPoints name="Home" id="home" />
          <NavPoints name="About Us" id="aboutus" />
          <NavPoints name="Services" id="services" />
          <NavPoints name="Contact" id="contact" />
          <Button name="Register" />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
