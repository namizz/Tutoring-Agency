import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1F2D3A] text-white py-10 px-6 ">
      {/* Social Media */}
      <div className="flex justify-center gap-6 mb-8">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-pink-500 transition-colors"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-600 transition-colors"
        >
          <FaLinkedinIn size={20} />
        </a>
      </div>

      {/* Logo and Company Name */}
      <hr className="max-w-3xl mx-auto text-gray-500" />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3  pt-6">
        <img
          src="/33 logo.jpg"
          alt="Logo"
          width={45}
          height={45}
          className="rounded-full border-2 border-gray-400"
        />
        <h2 className="max-w-xs text-lg sm:text-xl font-semibold text-white text-center ">
          33 International Home & Online Tutoring Agency
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
