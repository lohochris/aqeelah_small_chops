/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, Award, ShieldCheck, Truck, Quote, Heart, ArrowRight, Instagram, Mail, Smartphone, Globe, Video, MapPin, Compass, Twitter, X, Share, PlusSquare, Chrome, Laptop, Download, Info } from 'lucide-react';
import { MenuItem, Review, Order } from '../types';
import { useLanguage } from '../LanguageContext';

interface HomeProps {
  menuItems: MenuItem[];
  testimonials: Review[];
  orders?: Order[];
  setCurrentTab: (tab: string) => void;
  addToCart: (item: MenuItem, portion: string) => void;
  addToWishlist: (item: MenuItem) => void;
}

export default function Home({
  menuItems,
  testimonials,
  orders = [],
  setCurrentTab,
  addToCart,
  addToWishlist
}: HomeProps) {
  const bestSellers = menuItems.filter(item => item.isBestSeller).slice(0, 3);
  const { t } = useLanguage();

  // Helper matching to verify if reviewer has a matching transaction in orders ledger
  const hasMatchingOrder = (authorName: string) => {
    if (!authorName) return false;
    const authorLower = authorName.toLowerCase().trim();
    return orders.some(ord => {
      const nameLower = (ord.customerName || '').toLowerCase().trim();
      const emailNameLower = (ord.customerEmail || '').split('@')[0]?.toLowerCase().trim() || '';
      return (
        nameLower === authorLower ||
        nameLower.includes(authorLower) ||
        authorLower.includes(nameLower) ||
        emailNameLower === authorLower
      );
    });
  };

  // PWA States
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<'ios' | 'android' | 'desktop'>('android');

  useEffect(() => {
    // Auto detect platform based on user agent
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    
    if (isIOS) {
      setDetectedPlatform('ios');
    } else if (isAndroid) {
      setDetectedPlatform('android');
    } else {
      setDetectedPlatform('desktop');
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Install PWA Trigger Helper
  const handlePwaInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Show gorgeous interactive step-by-step instructions modal
      setShowInstallModal(true);
    }
  };

  return (
    <div className="space-y-16 pb-12 overflow-hidden bg-[#052E16] text-[#FDFBF7]">
      
      {/* 1. Hero / Brand Manifest Section */}
      <section className="relative bg-gradient-to-tr from-[#052E16] to-emerald-950 py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 overflow-hidden">
        {/* Abstract golden pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#D4AF37_1.5px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 text-xs font-mono text-[#D4AF37] uppercase tracking-widest shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>{t('brand_slogan', 'Catering the Splendor of Nigeria')}</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-serif leading-tight font-semibold tracking-tight">
              {t('hero_title_gold', 'The Gilded Standard of')} <br/>
              <span className="text-[#D4AF37]">{t('hero_title_chops', 'African Gastronomy')}</span>
            </h2>
            
            <p className="text-sm sm:text-base text-emerald-100/70 max-w-lg leading-relaxed font-sans">
              {t('hero_desc', 'Indulge in hand-tailored, multi-sensory small chops that transcend ordinary dining. Crafted by Chef Zainab with organic ingredients, shipped instantly, and served in pure sovereign elegance.')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                id="hero-order-menu"
                onClick={() => setCurrentTab('menu')}
                className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] px-8 py-4 rounded-xl text-xs font-serif uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group font-bold border border-[#D4AF37]/20 cursor-pointer"
              >
                <span>{t('hero_cta_menu', 'Explore Cuisine')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <button 
                id="hero-build-tray"
                onClick={() => setCurrentTab('tray-builder')}
                className="bg-emerald-950 text-[#D4AF37] border border-[#D4AF37]/40 px-8 py-4 rounded-xl text-xs font-serif uppercase tracking-widest hover:bg-[#052E16] transition-all duration-300 shadow-md text-center cursor-pointer"
              >
                {t('hero_cta_tray', 'Design Custom Tray')}
              </button>
            </div>

            {/* Micro proofs */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#D4AF37]/25 pt-6 text-center lg:text-left">
              <div>
                <span className="block text-2xl font-serif text-[#D4AF37] font-bold">50k+</span>
                <span className="text-[10px] text-emerald-100/60 font-mono tracking-widest uppercase">Trays Delivered</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#D4AF37] font-bold">100%</span>
                <span className="text-[10px] text-emerald-100/60 font-mono tracking-widest uppercase">Punctual Catering</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#D4AF37] font-bold">4.9★</span>
                <span className="text-[10px] text-emerald-100/60 font-mono tracking-widest uppercase">Average Rating</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative flex items-center justify-center"
          >
            {/* Elegant luxury plating background framing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/25 to-transparent rounded-3xl filter blur-3xl opacity-20" />
            
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl w-full max-w-lg">
              <img 
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200" 
                alt="Small Chops luxury plating platter" 
                className="w-full aspect-[4/3] object-cover hover:scale-105 duration-700 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#052E16]/95 via-[#052E16]/50 to-transparent p-6 text-[#FDFBF7]">
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono">Plating Elegance</p>
                <h4 className="font-serif text-lg font-bold">The Signature 60-Piece Golden Platter</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PWA Application Promotion Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-[#052E16] to-emerald-950 text-[#FDFBF7] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/25 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4AF37]/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-4">
            <div className="bg-[#D4AF37]/10 p-4 rounded-2xl border border-[#D4AF37]/30 flex-shrink-0 text-[#D4AF37]">
              <Smartphone className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#052E16] bg-[#D4AF37] px-2 py-0.5 rounded-full font-bold">Mobile App Enabled</span>
              <h3 className="font-serif text-xl sm:text-2xl mt-1.5 text-[#FDFBF7]">Install on your iPhone or Android</h3>
              <p className="text-emerald-100/70 text-xs sm:text-sm max-w-md mt-0.5">
                Enjoy offline ordering support, lightning-fast reorders, corporate invoice synchronization, and instant push notification tracking with our Progressive Web App.
              </p>
            </div>
          </div>
          <button 
            id="pwa-installer-app"
            onClick={handlePwaInstall}
            className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] py-3 px-6 rounded-xl text-xs font-serif uppercase tracking-widest transition-all duration-300 flex-shrink-0 border border-[#D4AF37]/20 shadow-md font-bold cursor-pointer"
          >
            Install PWA App
          </button>
        </div>
      </section>

      {/* Royal Celebration Gateways - Elite Portals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">PREMIUM CONVERGENCIES</span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#FDFBF7] font-semibold">Sovereign Concierge Gateways</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {/* Card 1: Virtual Consultations */}
          <div className="bg-emerald-950/40 border border-[#D4AF37]/20 p-6 rounded-2xl hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]">
                <Video className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-[#FDFBF7] font-bold text-base">Executive Consultations</h4>
              <p className="text-emerald-100/70 text-xs leading-relaxed">
                Connect with Zainab Bello Sule live via video conference for private custom menu curation, ingredient mapping and event logistics.
              </p>
            </div>
            <button 
              onClick={() => setCurrentTab('consultation')}
              className="w-full bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#052E16] border border-[#D4AF37]/40 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              Book Video Session
            </button>
          </div>

          {/* Card 2: Diaspora surprises Gifting */}
          <div className="bg-emerald-950/40 border border-[#D4AF37]/20 p-6 rounded-2xl hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-[#FDFBF7] font-bold text-base">Diaspora surprise Portal</h4>
              <p className="text-emerald-100/70 text-xs leading-relaxed">
                Are you based in the UK, US, or UAE? Deliver imperial small chops baskets remotely to parents or colleagues in Kano. Pay in NGN, GBP, USD, or AED.
              </p>
            </div>
            <button 
              onClick={() => setCurrentTab('diaspora')}
              className="w-full bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#052E16] border border-[#D4AF37]/40 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              Access Gifting Desk
            </button>
          </div>

          {/* Card 3: Exact Location & Directions Maps */}
          <div className="bg-emerald-950/40 border border-[#D4AF37]/20 p-6 rounded-2xl hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-[#FDFBF7] font-bold text-base font-serif">Kano HQ GPS Directions</h4>
              <p className="text-emerald-100/70 text-xs leading-relaxed">
                Near Bayero University Kano Entrance (BUK) Gwale LGA. View coordinates, structured maps and retrieve step-by-step turn driving routes.
              </p>
            </div>
            <button 
              onClick={() => setCurrentTab('location')}
              className="w-full bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#052E16] border border-[#D4AF37]/40 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              Verify Exact Location
            </button>
          </div>
        </div>
      </section>

      {/* 3. Meet the Founder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl" />
          <div className="border border-[#D4AF37]/30 p-2 bg-emerald-950/80 rounded-2xl shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
            <img 
              src="/src/assets/images/zainab_portrait_1780757712146.png" 
              alt="Zainab Bello Sule - Founder and Chef" 
              className="w-full h-[400px] object-cover rounded-lg border border-[#D4AF37]/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">MEET THE FOUNDER</span>
            <h3 className="text-3xl font-serif text-[#FDFBF7] font-semibold tracking-tight">Zainab Bello Sule</h3>
            <p className="text-xs uppercase tracking-widest text-emerald-100/60 font-mono">Visionary Chef & Creative Director</p>
          </div>
          
          <p className="text-sm font-sans text-emerald-100/80 leading-relaxed italic border-l-4 border-[#D4AF37] pl-6 py-1">
            "Food is the international currency of celebration. When families and corporations assemble across Kano State, they are expressing unity, love, and victory. At Small Chops by Aqeelah, our team wraps this victory inside a gold-sprinkled samosa."
          </p>
          
          <p className="text-sm text-emerald-100/75 leading-relaxed font-sans">
            Under Zainab’s perfectionist eye, each element of the small chops suite, from the precise hydration of flour yeast dough in our cinnamon puff puff to the slow hardwood choice during charcoal goatskin grilling, is governed by zero-compromise criteria.
          </p>

          <button 
            id="founder-story-trigger"
            onClick={() => setCurrentTab('meet-aqeelah')}
            className="text-xs font-serif text-[#D4AF37] font-bold uppercase tracking-wider hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Read full founder story & philosophy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. Best Sellers Highlights Section */}
      <section className="bg-emerald-950/40 border-y border-[#D4AF37]/15 text-[#FDFBF7] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">PREMIUM SELECTION</span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#FDFBF7] font-bold">Chef Zainab’s Best Sellers</h3>
            <p className="text-xs text-emerald-100/70 max-w-sm mx-auto leading-relaxed">
              Order individual masterworks delivered in 1-hour intervals across Kano metropolitan areas, including Gwale, Nassarawa, Janbulo, and Tarauni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellers.map((item) => (
              <div 
                key={item.id}
                className="bg-[#052E16]/80 rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-xl group hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-56 object-cover group-hover:scale-105 duration-700 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#052E16] text-[9px] font-mono tracking-wider font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                    Instantly Available
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-emerald-950/20">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-[#D4AF37]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                        <span className="text-[10px] text-emerald-100/80 font-mono ml-1 font-bold">{item.rating}</span>
                      </div>
                      <span className="text-xs text-emerald-100/55 font-mono">({item.reviewsCount} reviews)</span>
                    </div>

                    <h4 className="font-serif text-lg text-[#FDFBF7] font-semibold">{item.name}</h4>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="border-t border-[#D4AF37]/15 pt-4 flex items-center justify-between">
                    <span className="text-lg font-mono text-[#D4AF37] font-black">
                      ₦{item.price.toLocaleString()}
                    </span>
                    <button 
                      id={`home-add-cart-${item.id}`}
                      onClick={() => {
                        addToCart(item, item.portionSizes[0]);
                        alert(`Added ${item.name} to your Royal Cart!`);
                      }}
                      className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] px-4 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-colors font-bold cursor-pointer"
                    >
                      Bespoke Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8 mt-4">
            <button 
              id="view-all-cuisine-trigger"
              onClick={() => setCurrentTab('menu')}
              className="text-[#D4AF37] border-b border-[#D4AF37]/20 hover:border-[#D4AF37] pb-1 text-xs uppercase font-serif tracking-widest transition-all cursor-pointer"
            >
              Discover all luxury menus ({menuItems.length} items)
            </button>
          </div>
        </div>
      </section>

      {/* 5. Custom Party Planner Widget Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#052E16]/40 border border-[#D4AF37]/20 rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">ALGORITHMIC QUANTITY METRICS</span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#FDFBF7] font-semibold">Strategest Party Planning Tool</h3>
            </div>
            
            <p className="text-sm text-emerald-100/75 leading-relaxed font-sans">
              Enter your exact guest count, target event budget to automatically calculate requested catering volume. Avoid standard under-ordering crises with calculations backed by Kano wedding committee experience.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-100/80 font-mono">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Precision guest allocation</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Gwale/Janbulo direct mapping</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Zero waste target ratio</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D4AF37]" />
                <span>Complete drink recommendations</span>
              </li>
            </ul>

            <button 
              id="teaser-party-planner"
              onClick={() => setCurrentTab('party-planner')}
              className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] font-serif text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 shadow-md font-bold cursor-pointer"
            >
              <span>Launch Planning Engine</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#052E16]" />
            </button>
          </div>

          <div className="lg:col-span-5 relative bg-[#052E16]/80 border border-[#D4AF37]/20 p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-3 animate-pulse">
              <Quote className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-[#FDFBF7] font-bold text-md">Kano Traditional Weddings approved</h4>
            <p className="text-xs text-emerald-100/70 max-w-sm mt-1.5 leading-relaxed">
              "We utilized this planning algorithm for our board of directors reception. Estimated totals matched the catering invoice with 99% accuracy."
            </p>
            <p className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] mt-4 font-bold">Kano Chamber Secretariat, Nigeria</p>
          </div>
        </div>
      </section>

      {/* 6. High-Society Testimonials Carousel Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">CLIENT SATISFACTION</span>
          <h3 className="text-3xl font-serif text-[#FDFBF7] font-bold">Royal Endorsements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className="bg-emerald-950/30 border border-[#D4AF37]/20 p-6 rounded-2xl shadow-md space-y-4 hover:border-[#D4AF37]/40 duration-305 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-0.5 text-[#D4AF37]">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs font-sans text-emerald-100/80 leading-relaxed italic">
                  "{test.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#D4AF37]/15">
                <img 
                  src={test.avatar} 
                  alt={test.author} 
                  className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/40"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start sm:items-center justify-between gap-1.5 flex-wrap">
                    <h5 className="font-serif text-xs font-bold text-[#FDFBF7]">{test.author}</h5>
                    {hasMatchingOrder(test.author) && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[8px] font-mono uppercase tracking-wider font-bold shadow-sm select-none" id={`verified-purchase-${test.id}`}>
                        <ShieldCheck className="w-2.5 h-2.5 text-amber-400" />
                        <span>Verified Purchase</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37] block mt-0.5">Verified Patron</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Beautiful Golden Instagram / Moments Gallery */}
      <section className="bg-gradient-to-tr from-emerald-950/50 to-[#052E16] py-12 border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">SOCIAL VERIFICATION CHANNELS</span>
              <h3 className="text-2xl font-serif text-[#FDFBF7]">Aqeelah Celebration Chronicles</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a 
                href="https://x.com/aqeelah06?s=11" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900/40 border border-slate-500/35 hover:bg-slate-900/60 text-white text-xs font-serif uppercase tracking-widest py-2.5 px-4 rounded-xl shadow-md transition-all font-bold cursor-pointer"
              >
                <Twitter className="w-4 h-4 text-sky-400" />
                <span>X @aqeelah06</span>
              </a>
              <a 
                href="https://www.instagram.com/small_chops_by_aqeelah?utm_source=qr" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-pink-900/40 border border-pink-500/35 hover:bg-pink-900/60 text-white text-xs font-serif uppercase tracking-widest py-2.5 px-4 rounded-xl shadow-md transition-all font-bold cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.tiktok.com/@ummie314?_r=1&_t=ZS-96yzhTSpy5P" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-950 border border-[#D4AF37]/35 hover:bg-emerald-900 text-[#D4AF37] text-xs font-mono uppercase tracking-widest py-2.5 px-4 rounded-xl shadow-md transition-all font-bold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>TikTok @ummie314</span>
              </a>
              <a 
                href="https://snapchat.com/t/39kkwmwX" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-950/40 border border-yellow-500/35 hover:bg-yellow-950/60 text-white text-xs font-serif uppercase tracking-widest py-2.5 px-4 rounded-xl shadow-md transition-all font-bold cursor-pointer"
              >
                <svg className="w-4 h-4 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c-.65 0-2.3.16-3.14 1-.22.22-.38.56-.47.93-.19.78-.05 1.5-.03 2.15 0 .14 0 .28-.01.4-.04.42-.14.73-.39 1.05-.28.36-.67.62-1.12.78a2.9 2.9 0 0 0-1.57 1.34 3.7 3.7 0 0 0-.25 1.76c.02.66.27 1.2.73 1.58.34.28.75.44 1.15.44.25 0 .48-.06.69-.17a1.5 1.5 0 0 1 1.48 0 2.2 2.2 0 0 0 1.94-.12c.18-.09.34-.1.49-.03.1.04.14.13.13.25a2.3 2.3 0 0 1-.34 1c-.32.55-1 1.07-1.7 1.3-.43.14-.65.41-.66.8-.02.63.15 1.06.5 1.28l.24.1c.4.15.82-.04 1.13-.3l.1-.09c.28-.24.58-.55.9-.6a2.1 2.1 0 0 1 1.76.62c.7.75 1.63 1.15 2.65 1.15a4.2 4.2 0 0 0 2-.51c.3-.17.48-.48.5-.8.04-.64-.22-1.07-.63-1.28l-.2-.1a.75.75 0 0 1-.41-.53.75.75 0 0 1 .15-.65c.1-.1.2-.23.32-.4.2-.29.43-.65.43-1.13a.9.9 0 0 0-.54-.83c-.35-.15-.42-.51-.15-.81.25-.28.53-.55.77-.85a2.8 2.8 0 0 0 .5-1.58c0-.75-.24-1.34-.73-1.76a2.9 2.9 0 0 0-1.58-.78c-.44-.16-.84-.42-1.11-.78-.26-.32-.36-.63-.4-.1.05v-.4c0-.65.14-1.37-.05-2.15l-.47-.93C14.3 2.16 12.65 2 12 2z" />
                </svg>
                <span>Snapchat</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                url: '/src/assets/images/zainab_portrait_1780757712146.png',
                meta: 'Chef Zainab Bello Sule welcoming guests inside Janbulo Kitchen',
                handle: '@smallchops_by_aqeelah'
              },
              {
                url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400',
                meta: 'Simmering hot zobo decanters for grand state banquet',
                handle: '@smallchops_by_aqeelah'
              },
              {
                url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=400',
                meta: 'The crunch: authentic shrimp roll crust closeup video',
                handle: '@ummie314 (TikTok)'
              },
              {
                url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400',
                meta: 'Imperial celebration gift chest delivery moments',
                handle: '@ummie314 (TikTok)'
              }
            ].map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group shadow-md border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all aspect-square bg-[#052E16]">
                <img 
                  src={img.url} 
                  alt={img.meta} 
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-all opacity-85"
                  referrerPolicy="no-referrer"
                />
                
                {/* Simulated playback/info overlay */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-3 flex flex-col justify-end text-left">
                  <span className="text-[8px] font-mono text-[#D4AF37] block font-bold tracking-wider">{img.handle}</span>
                  <p className="text-[10px] text-white/95 line-clamp-2 leading-snug font-sans mt-0.5">{img.meta}</p>
                </div>

                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#052E16] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Heart className="w-5 h-5 fill-[#052E16] text-[#052E16]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter Luxury Sign Up */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-[#052E16]/80 text-[#FDFBF7] p-8 rounded-3xl border border-[#D4AF37]/20 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl" />
          <div className="max-w-md mx-auto space-y-3">
            <h4 className="font-serif text-2xl tracking-wide font-bold">Enter Aqeelah’s Tasting Circle</h4>
            <p className="text-xs text-emerald-100/70 leading-relaxed font-sans">
              Get notified immediately when Zainab Bello Sule launches regional seasonal dessert menus, exclusive corporate discounts, or recipe secrets.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to Zainab’s Tasting Circle! Verification inbox email has been routed."); }} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto relative z-10">
            <input 
              type="email" 
              required
              className="flex-1 px-4 py-3 rounded-xl bg-emerald-950/40 text-white border border-[#D4AF37]/35 focus:outline-none focus:border-[#D4AF37] text-xs text-center sm:text-left font-mono"
              placeholder="Your royal email address"
            />
            <button 
              type="submit"
              className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] font-bold py-3 px-6 rounded-xl text-xs font-serif uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Enroll Circle</span>
            </button>
          </form>
          <span className="block text-[8px] text-emerald-100/40 font-mono">No spam. Only warm pastries, VIP alerts & champagne pairing tips.</span>
        </div>
      </section>

      {/* 9. Progressive Web App (PWA) Install Modal overlay */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-all" id="pwa-install-modal-overlay">
          <div className="w-full max-w-lg bg-[#052E16] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-8 text-[#FDFBF7] shadow-2xl relative space-y-6">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 p-2 bg-emerald-950/80 text-[#D4AF37] hover:text-white rounded-full border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all cursor-pointer"
              title="Close Dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37] mb-2">
                <Smartphone className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold tracking-wide text-white">Install Small Chops App</h4>
              <p className="text-emerald-100/60 text-xs font-sans max-w-sm mx-auto">
                Enjoy offline gourmet ordering support, lightning-fast reorders, corporate invoice synchronization, and push notifications tracked by Chef Zainab.
              </p>
            </div>

            {/* Tabs for iOS, Android, and Desktop */}
            <div className="grid grid-cols-3 gap-2 bg-[#02180b] p-1.5 rounded-2xl border border-[#D4AF37]/15 font-mono text-[10px]">
              {[
                { id: 'ios', label: 'iPhone / iOS' },
                { id: 'android', label: 'Android' },
                { id: 'desktop', label: 'Desktop / PC' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDetectedPlatform(tab.id as any)}
                  className={`py-2 px-3 rounded-xl uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    detectedPlatform === tab.id
                      ? 'bg-[#D4AF37] text-[#052E16] shadow-md font-black'
                      : 'text-emerald-100/55 hover:text-[#FDFBF7] hover:bg-emerald-900/45'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Platform Instructions Content */}
            <div className="bg-[#02180b] border border-[#D4AF37]/15 rounded-2xl p-4 sm:p-5 text-xs text-emerald-100/90 leading-relaxed font-sans space-y-4">
              {detectedPlatform === 'ios' && (
                <div className="space-y-4">
                  <span className="block font-serif text-[11px] text-[#D4AF37] uppercase tracking-widest font-bold">iOS Safari Instructions</span>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">1</span>
                      <p>
                        Open this website in your iOS <strong className="text-white">Safari</strong> browser.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">2</span>
                      <p className="flex items-center gap-1.5 flex-wrap">
                        Tap the <strong className="text-white flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 rounded border border-[#D4AF37]/20 text-[10px]"><Share className="w-3.5 h-3.5 text-[#D4AF37]" /> Share</strong> icon at the bottom of Safari.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">3</span>
                      <p className="flex items-center gap-1.5 flex-wrap">
                        Scroll down the share sheet and tap <strong className="text-white flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 rounded border border-[#D4AF37]/20 text-[10px]"><PlusSquare className="w-3.5 h-3.5 text-[#D4AF37]" /> Add to Home Screen</strong>.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">4</span>
                      <p>
                        Confirm by tapping <strong className="text-[#D4AF37]">Add</strong> in the top-right corner to place it beautifully alongside your other royal apps.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {detectedPlatform === 'android' && (
                <div className="space-y-4">
                  <span className="block font-serif text-[11px] text-[#D4AF37] uppercase tracking-widest font-bold">Android Chrome Instructions</span>
                  <div className="space-y-3">
                    {deferredPrompt ? (
                      <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-xl text-center space-y-2.5">
                        <p className="text-[11px] text-[#D4AF37] font-mono">Instant installer is ready for validation!</p>
                        <button
                          onClick={async () => {
                            deferredPrompt.prompt();
                            const { outcome } = await deferredPrompt.userChoice;
                            if (outcome === 'accepted') {
                              setDeferredPrompt(null);
                              setShowInstallModal(false);
                            }
                          }}
                          className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] rounded-lg font-serif font-black uppercase tracking-wider text-[11px] transition-colors cursor-pointer"
                        >
                          Trigger Smart Native Install
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">1</span>
                          <p>
                            Tap the <strong className="text-white">three vertical dots Menu</strong> icon in the top-right corner of your Chrome browser.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">2</span>
                          <p>
                            Select <strong className="text-white bg-emerald-950/80 px-2 py-0.5 rounded border border-[#D4AF37]/20">Install App</strong> or <strong className="text-white bg-emerald-950/80 px-2 py-0.5 rounded border border-[#D4AF37]/20">Add to Home screen</strong> from the list.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">3</span>
                          <p>
                            Tap <strong className="text-[#D4AF37]">Install</strong> in the dialog popup to finalize your local device storage allocation.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {detectedPlatform === 'desktop' && (
                <div className="space-y-4">
                  <span className="block font-serif text-[11px] text-[#D4AF37] uppercase tracking-widest font-bold">Desktop Browser Instructions</span>
                  <div className="space-y-3">
                    {deferredPrompt ? (
                      <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-xl text-center space-y-2.5">
                        <p className="text-[11px] text-[#D4AF37] font-mono">Compatible native computer desktop installer ready!</p>
                        <button
                          onClick={async () => {
                            deferredPrompt.prompt();
                            const { outcome } = await deferredPrompt.userChoice;
                            if (outcome === 'accepted') {
                              setDeferredPrompt(null);
                              setShowInstallModal(false);
                            }
                          }}
                          className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] rounded-lg font-serif font-black uppercase tracking-wider text-[11px] transition-colors cursor-pointer"
                        >
                          Trigger Desktop Install
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">1</span>
                          <p>
                            On compatible PC/Mac browsers (e.g., Google Chrome, Edge, Brave), look at the <strong className="text-white">address/search bar</strong>.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">2</span>
                          <p>
                            Click the circular <strong className="text-[#D4AF37]">Install App icon</strong> inside the right end of the browser input field.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-[10px] font-mono shrink-0">3</span>
                          <p>
                            Confirm adding the applet as a fast standalone desktop application.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center font-mono text-[9px] text-[#D4AF37]/60">
              ⚡ Sourced natively with offline storage configuration.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
