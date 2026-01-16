
import React, { useState } from 'react';
import { X, Save, Trash2, Plus, Edit3, Image as ImageIcon } from 'lucide-react';
import { SiteContent, Service, Feature } from '../types';

interface AdminPanelProps {
  content: SiteContent;
  onSave: (content: SiteContent) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onSave, onClose }) => {
  const [editedContent, setEditedContent] = useState<SiteContent>(JSON.parse(JSON.stringify(content)));
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'services' | 'contact'>('hero');

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [name]: value }
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedContent(prev => ({
      ...prev,
      contact: { ...prev.contact, [name]: value }
    }));
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setEditedContent(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'New Service',
      description: 'Service description...',
      icon: 'Trash2',
      img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400'
    };
    setEditedContent(prev => ({ ...prev, services: [...prev.services, newService] }));
  };

  const removeService = (id: string) => {
    setEditedContent(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  const handleSave = () => {
    onSave(editedContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <Edit3 className="text-emerald-600" /> Site Editor
            </h2>
            <p className="text-sm text-gray-500">Edit your home page sections in real-time</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content Tabs */}
        <div className="flex-1 flex overflow-hidden">
          <div className="w-48 bg-gray-50 border-r border-gray-100 py-6 px-3 flex flex-col gap-2">
            {[
              { id: 'hero', label: 'Hero Section' },
              { id: 'about', label: 'About Us' },
              { id: 'services', label: 'Our Services' },
              { id: 'contact', label: 'Contact Info' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-white">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Hero Title</label>
                  <input 
                    name="title"
                    value={editedContent.hero.title}
                    onChange={handleHeroChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Hero Description</label>
                  <textarea 
                    name="description"
                    rows={4}
                    value={editedContent.hero.description}
                    onChange={handleHeroChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Hero Image URL</label>
                  <div className="flex gap-2">
                    <input 
                      name="image"
                      value={editedContent.hero.image}
                      onChange={handleHeroChange}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
                    />
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                      <img src={editedContent.hero.image} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Postcode Badge Text</label>
                  <input 
                    name="postcodeBadge"
                    value={editedContent.hero.postcodeBadge}
                    onChange={handleHeroChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
                  />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">Manage Services</h3>
                  <button onClick={addService} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-100 transition">
                    <Plus size={20} /> Add Service
                  </button>
                </div>
                <div className="grid gap-4">
                  {editedContent.services.map((service) => (
                    <div key={service.id} className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <input 
                            placeholder="Service Title"
                            value={service.title}
                            onChange={(e) => updateService(service.id, { title: e.target.value })}
                            className="bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none font-bold"
                          />
                          <input 
                            placeholder="Image URL"
                            value={service.img}
                            onChange={(e) => updateService(service.id, { img: e.target.value })}
                            className="bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none text-sm"
                          />
                        </div>
                        <button onClick={() => removeService(service.id)} className="ml-4 p-2 text-red-400 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <textarea 
                        placeholder="Description"
                        value={service.description}
                        onChange={(e) => updateService(service.id, { description: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none text-sm"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Section Title</label>
                  <input 
                    value={editedContent.about.title}
                    onChange={(e) => setEditedContent(prev => ({ ...prev, about: { ...prev.about, title: e.target.value }}))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Main Description</label>
                  <textarea 
                    value={editedContent.about.description}
                    onChange={(e) => setEditedContent(prev => ({ ...prev, about: { ...prev.about, description: e.target.value }}))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none" 
                    rows={6}
                  />
                </div>
                <div className="grid gap-6">
                  {editedContent.about.features.map(f => (
                    <div key={f.id} className="p-6 bg-gray-50 border border-gray-100 rounded-2xl space-y-3">
                      <input 
                        value={f.title}
                        onChange={(e) => setEditedContent(prev => ({
                          ...prev,
                          about: { ...prev.about, features: prev.about.features.map(x => x.id === f.id ? { ...x, title: e.target.value } : x) }
                        }))}
                        className="w-full bg-transparent border-b border-gray-200 py-1 font-bold outline-none"
                      />
                      <textarea 
                        value={f.description}
                        onChange={(e) => setEditedContent(prev => ({
                          ...prev,
                          about: { ...prev.about, features: prev.about.features.map(x => x.id === f.id ? { ...x, description: e.target.value } : x) }
                        }))}
                        className="w-full bg-transparent text-sm text-gray-600 outline-none"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Phone Number</label>
                  <input name="phone" value={editedContent.contact.phone} onChange={handleContactChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Address</label>
                  <input name="email" value={editedContent.contact.email} onChange={handleContactChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Base Location</label>
                  <input name="location" value={editedContent.contact.location} onChange={handleContactChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Opening Hours</label>
                  <input name="hours" value={editedContent.contact.hours} onChange={handleContactChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">License Number</label>
                  <input name="license" value={editedContent.contact.license} onChange={handleContactChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400 font-medium">Changes are saved to local storage.</p>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 flex items-center gap-2 transition"
            >
              <Save size={20} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
