
import React, { useState } from 'react';
import { Send, MapPin, Phone, Clock } from 'lucide-react';

interface ContactFormProps {
  contactInfo: {
    location: string;
    phone: string;
    hours: string;
  };
}

const ContactForm: React.FC<ContactFormProps> = ({ contactInfo }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-600 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-8 md:p-16 text-white">
            <h2 className="text-4xl font-extrabold mb-8">Get Your Free <span className="underline decoration-emerald-300">No-Obligation</span> Quote</h2>
            <p className="text-emerald-100 mb-12 text-lg">
              We cover all of Wigan including Pemberton, Ince, Standish, Orrell, Aspull, and Hindley. Get in touch for a fair price today.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500/40 p-3 rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Base Location</h4>
                  <p className="text-emerald-100">{contactInfo.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500/40 p-3 rounded-xl">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Call Us</h4>
                  <p className="text-emerald-100">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500/40 p-3 rounded-xl">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Operating Hours</h4>
                  <p className="text-emerald-100">{contactInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-8 md:p-16">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-600">Thanks for contacting WN Removals. We'll get back to you with a quote within the hour.</p>
                <button onClick={() => setSubmitted(false)} className="text-emerald-600 font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Name</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone</label>
                    <input type="tel" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" placeholder="07123..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Postcode (WN Area)</label>
                  <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" placeholder="WN1, WN2, etc." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Describe Your Waste</label>
                  <textarea rows={4} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" placeholder="E.g. 1 sofa, 5 bags of garden waste, and an old fridge..."></textarea>
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2">
                  Send Quote Request <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
