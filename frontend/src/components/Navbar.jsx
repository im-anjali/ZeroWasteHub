import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">ZeroWasteHub</h1>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
        <ul className="hidden md:flex space-x-8 text-lg">
          <li><Link to="/about" className="hover:text-black-300">About</Link></li>
          <li><Link to="/login" className="hover:text-white-300">Login</Link></li>
          <li><Link to="/signup" className="hover:text-white-300">Sign Up</Link></li>
          <li><Link to="/signup" className="hover:text-white-300">Achievements</Link></li>

          
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden bg-green-500 px-4 pb-4 space-y-3 text-lg">
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/signup" onClick={toggleMenu}>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
