import React, { useState } from "react";
import NavPoints from "../components/NavPoints";
import Button from "../components/Button";
import { FiMenu, FiX } from "react-icons/fi"; // for the menu icon

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white font-semibold">
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
          <NavPoints name="Home" id="home" />
          <NavPoints name="About Us" id="aboutus" />
          <NavPoints name="Services" id="services" />
          <NavPoints name="Contact" id="contact" />
          <Button name="Register" />
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
          className="md:hidden flex flex-col items-center space-y-4 pb-6 text-white font-medium"
          style={{ backgroundColor: "rgba(31, 45, 58, 0.95)" }}
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
