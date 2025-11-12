import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content mt-16">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* ✅ Left: Logo & Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/2FsfXqM/default-avatar.png"
            alt="PlateShare Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-xl font-bold text-primary">PlateShare</span>
        </Link>

        {/* ✅ Middle: Social Links */}
        <div className="flex gap-5 text-2xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition"
          >
            <FaGithub />
          </a>
        </div>

        {/* ✅ Right: Copyright */}
        <p className="text-sm text-gray-600 text-center md:text-right">
          © {currentYear} PlateShare — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
