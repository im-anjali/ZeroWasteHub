import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigat = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);
  const handlelogout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no token found");
      return;
    }
    localStorage.removeItem("token");
    navigat("/login")

  }
  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90">
          <img
            src={logo}
            alt="Logo"
            className="w-7 h-7 object-contain rounded-md"
          />
          <span className="text-2xl font-bold">ZeroWasteHub</span>
        </Link>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
        <ul className="hidden md:flex space-x-8 text-lg">
          <li><Link to="/about" className="hover:text-black-300">About</Link></li>
          <li><Link to="/login" className="hover:text-white-300">Login</Link></li>
          <li><Link to="/signup" className="hover:text-white-300">Sign Up</Link></li>
          <li><Link to="/achievements" className="hover:text-white-300">Achievements</Link></li>
          {/* <li><Link to="/login" className="hover:text-white-300">Logout</Link></li> */}
          <li onClick={handlelogout} className="hover:text-white hover:cursor-pointer">
            Logout
          </li>
        </ul>
      </div>

     
      {isOpen && (
        <ul className="md:hidden bg-green-500 px-4 pb-4 space-y-3 text-lg">
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/signup" onClick={toggleMenu}>Sign Up</Link></li>
             <li onClick={handlelogout} className="hover:text-white hover:cursor-pointer">
            Logout
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
