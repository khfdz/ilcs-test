import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue1 text-white text-xl font-gilda">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold ml-8">Pak Olin</div>

        <div className="lg:hidden mr-8" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6 mr-9">
          <a href="/" className="hover:text-gray-300">
            Home
          </a>
          <a href="/" className="hover:text-gray-300">
            About
          </a>
          <a href="/" className="hover:text-gray-300">
            Contact
          </a>
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-blue1 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="text-2xl font-bold">Pak Olin</div>
          <div onClick={toggleMenu}>
            <FaTimes size={24} />
          </div>
        </div>
        <div className="mt-8 space-y-6 ml-4">
          <a href="/" className="block hover:text-gray-300">
            Home
          </a>
          <a href="/" className="block hover:text-gray-300">
            About
          </a>
          <a href="/" className="block hover:text-gray-300">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;