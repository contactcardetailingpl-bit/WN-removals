
import React from 'react';
import { Trash2, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  contact: {
    location: string;
    phone: string;
    email: string;
    license: string;
  };
}

const Footer: React.FC<FooterProps> = ({ contact }) => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Trash2 className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                WN<span className="text-emerald-600">REMOVALS</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Wigan's most trusted rubbish removal service. Fully licensed waste carriers delivering professional clearance solutions for over 10 years.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition text-gray-400 hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition text-gray-400 hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition text-gray-400 hover:text-white"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#services" className="hover:text-emerald-500 transition">Services</a></li>
              <li><a href="#about" className="hover:text-emerald-500 transition">About Us</a></li>
              <li><a href="#contact" className="hover:text-emerald-500 transition">Book Online</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Area Coverage</h4>
            <ul className="space-y-4 text-gray-400">
              <li>WN1 - Wigan Centre</li>
              <li>WN2 - Hindley / Aspull</li>
              <li>WN3 - Pemberton / Winstanley</li>
              <li>WN6 - Standish / Shevington</li>
              <li>WN7 - Leigh / Atherton</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <div className="text-emerald-500">📍</div> 
                {contact.location}
              </li>
              <li className="flex items-center gap-3">
                <div className="text-emerald-500">📞</div> 
                {contact.phone}
              </li>
              <li className="flex items-center gap-3">
                <div className="text-emerald-500">✉️</div> 
                {contact.email}
              </li>
              <li className="flex items-center gap-3 text-emerald-500 font-bold">
                Licensed Waste Carrier: {contact.license}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} WN Removals Ltd. All rights reserved. Wigan, England.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
