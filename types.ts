
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Changed to string (lucide icon name) for easier serialization
  img: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SiteContent {
  hero: {
    title: string;
    description: string;
    image: string;
    postcodeBadge: string;
  };
  about: {
    title: string;
    description: string;
    features: Feature[];
  };
  services: Service[];
  contact: {
    location: string;
    phone: string;
    hours: string;
    email: string;
    license: string;
  };
}

export interface WasteAnalysis {
  type: string;
  estimatedVolume: string;
  disposalAdvice: string;
  estimatedPriceRange: string;
}
