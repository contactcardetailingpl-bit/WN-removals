
import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  content: {
    title: string;
    description: string;
    image: string;
    postcodeBadge: string;
  };
  onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <div className="relative pt-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            {content.postcodeBadge}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            {content.title}
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto md:mx-0">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#contact" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
              Book a Collection <ArrowRight size={20} />
            </a>
            <a href="#services" className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-emerald-600 transition flex items-center justify-center gap-2">
              View Services
            </a>
          </div>
          
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <CheckCircle className="text-emerald-500" size={18} /> Same Day Service
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <CheckCircle className="text-emerald-500" size={18} /> Fully Licensed
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <CheckCircle className="text-emerald-500" size={18} /> Eco-Friendly
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <CheckCircle className="text-emerald-500" size={18} /> Best Prices in WN
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-xl">
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-3xl rotate-2"></div>
            <img 
              src={content.image} 
              alt="Waste Removal Services" 
              className="relative rounded-2xl shadow-2xl object-cover w-full aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
