
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { SiteContent } from './types';

const INITIAL_CONTENT: SiteContent = {
  hero: {
    title: 'Fast & Reliable Waste Removal in Wigan',
    description: 'From house clearances to garden waste, WN Removals provides professional, fully licensed rubbish removal services across Wigan and surrounding areas.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    postcodeBadge: 'Serving All WN Postcodes'
  },
  about: {
    title: 'About WN Removals',
    description: "We’re a local waste removal team dedicated to helping our community keep homes, businesses, and outdoor spaces clean and clutter-free. We pride ourselves on being friendly, reliable, and easy to deal with, offering a straightforward service you can trust. Whether it’s a small household collection or a larger clearance, we work efficiently, dispose of waste responsibly, and treat every job with care — supporting our local area one clear-out at a time.",
    features: [
      { id: '1', title: 'Transparent Pricing', description: 'No hidden fees or "extras". The price we quote is the price you pay, including all disposal fees.', icon: 'PoundSterling' },
      { id: '2', title: 'Eco-Conscious', description: 'We aim to recycle over 90% of all waste collected. We partner with local Wigan recycling plants.', icon: 'Recycle' },
      { id: '3', title: 'Local Wigan Experts', description: 'Being based in Wigan means we can offer fast, often same-day collections for all WN postcodes.', icon: 'MapPin' }
    ]
  },
  services: [
    { id: '1', title: 'House Clearance', description: 'Full or partial house clearances. We take everything from old furniture to attic junk.', icon: 'Home', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
    { id: '2', title: 'Garden Waste', description: 'Removing branches, soil, old sheds, and general garden debris to keep your Wigan garden tidy.', icon: 'Leaf', img: 'https://images.unsplash.com/photo-1599831935667-622f67210e71?auto=format&fit=crop&q=80&w=400' },
    { id: '3', title: 'Office Clearance', description: 'Professional removal of office furniture, E-waste, and general commercial rubbish.', icon: 'Briefcase', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400' },
    { id: '4', title: "Builder's Waste", description: 'Removal of renovation debris including plasterboard, bricks, tiles, and old fittings.', icon: 'Construction', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400' },
    { id: '5', title: 'Single Item Pickup', description: 'Need just one sofa or fridge gone? We offer quick single-item collections across Wigan.', icon: 'Truck', img: 'https://images.unsplash.com/photo-1517520287167-4bda6428c11b?auto=format&fit=crop&q=80&w=400' },
    { id: '6', title: 'Commercial Waste', description: 'Contracted or one-off pickups for businesses, shops, and restaurants in the town centre.', icon: 'Trash2', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400' }
  ],
  contact: {
    location: 'Wigan, Greater Manchester',
    phone: '01942 555 123',
    hours: 'Mon - Sat: 7am - 7pm',
    email: 'hello@wnremovals.co.uk',
    license: 'CB/DU123456'
  }
};

function App() {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('wn_removals_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.about.description) parsed.about.description = INITIAL_CONTENT.about.description;
        return parsed;
      } catch (e) {
        return INITIAL_CONTENT;
      }
    }
    return INITIAL_CONTENT;
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('wn_removals_content', JSON.stringify(content));
  }, [content]);

  const handleUpdateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAdminClick={() => setIsAdminOpen(true)} phone={content.contact.phone} />
      
      {isAdminOpen && (
        <AdminPanel 
          content={content} 
          onSave={handleUpdateContent} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}

      <main>
        <Hero content={content.hero} onContactClick={() => {}} />
        
        {/* About Us Section */}
        <section id="about" className="py-24 bg-gray-50 scroll-mt-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">{content.about.title}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
              {content.about.description}
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              {content.about.features.map(feature => (
                <div key={feature.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                    <span className="text-2xl font-bold">
                      {feature.icon === 'PoundSterling' ? '£' : feature.icon === 'Recycle' ? '♻️' : '📍'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Services services={content.services} />
        <ContactForm contactInfo={content.contact} />
      </main>
      <Footer contact={content.contact} />
    </div>
  );
}

export default App;
