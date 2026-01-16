
import React, { useState } from 'react';
import { Menu, X, Trash2, Phone, Settings } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
  phone: string;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick, phone }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Trash2 className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              WN<span className="text-emerald-600">REMOVALS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-emerald-600 font-medium transition">About Us</a>
            <a href="#services" className="text-gray-600 hover:text-emerald-600 font-medium transition">Services</a>
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-1 text-gray-400 hover:text-emerald-600 transition text-sm"
              title="Admin Panel"
            >
              <Settings size={16} /> Admin
            </button>
            <a href="#contact" className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-emerald-700 transition flex items-center gap-2">
              <Phone size={18} /> {phone}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          <a href="#about" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 font-medium">About Us</a>
          <a href="#services" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 font-medium">Services</a>
          <button 
            onClick={() => { onAdminClick(); setIsOpen(false); }}
            className="flex items-center gap-2 text-gray-700 py-2 font-medium"
          >
            <Settings size={20} /> Admin Panel
          </button>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block w-full text-center bg-emerald-600 text-white py-3 rounded-lg font-bold">
            Call: {phone}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
