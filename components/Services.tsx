
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section id="services" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our <span className="text-emerald-600">Services</span></h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professional waste management solutions tailored to your needs. Licensed, insured, and local.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Trash2;
            return (
              <div key={service.id} className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-4 right-4 bg-white p-3 rounded-2xl shadow-lg text-emerald-600">
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <a href="#contact" className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Get a quote <span className="text-xl">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
