/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, User, Gift, Clock, Sparkles, Building, Settings, Trash2, Crown, Globe, Heart, Video, MapPin, ChevronDown, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage, LANGUAGES, LanguageCode } from '../LanguageContext';
import { luxuryAudio } from '../utils/audio';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  openCartDrawer: boolean;
  setOpenCartDrawer: (open: boolean) => void;
  savedRemindersCount: number;
  loyaltyPoints: number;
  triggerCheckout: (method: 'Paystack' | 'Flutterwave' | 'Bank Transfer') => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cart,
  setCart,
  openCartDrawer,
  setOpenCartDrawer,
  savedRemindersCount,
  loyaltyPoints,
  triggerCheckout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('lohochris@gmail.com');
  const [userName, setUserName] = React.useState('Chris');
  const [conciergeOpen, setConciergeOpen] = React.useState(false);
  const [mobileConciergeOpen, setMobileConciergeOpen] = React.useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(() => luxuryAudio.getMuteStatus());

  const { language, setLanguage, t } = useLanguage();

  // Lock body scroll when mobile-navigation is open to prevent background sliding and ensure drawer scrolling
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const primaryItems = [
    { id: 'home', label: t('nav_home', 'Home'), icon: Sparkles },
    { id: 'menu', label: t('nav_menu', 'Cuisine'), icon: ShoppingBag },
    { id: 'tray-builder', label: t('nav_tray_builder', 'Bespoke Trays'), icon: Gift },
    { id: 'catering', label: t('nav_catering', 'Event Catering'), icon: Building },
    { id: 'diaspora', label: t('nav_diaspora', 'Diaspora Desk'), icon: Globe },
  ];

  const secondaryItems = [
    { id: 'consultation', label: t('nav_consultation', 'Talk with Aqeelah'), icon: Video, desc: 'Interactive chat & video bookings' },
    { id: 'meet-aqeelah', label: t('nav_meet_aqeelah', 'Meet Aqeelah'), icon: Heart, desc: 'Our story and catering philosophy' },
    { id: 'location', label: t('nav_location', 'Our Location'), icon: MapPin, desc: 'Find our boutiques in Kano or Abuja' },
    { id: 'party-planner', label: t('nav_party_planner', 'Event Planner'), icon: Clock, desc: 'Estimate guest portion sizes easily' },
    { id: 'reminders', label: t('nav_reminders', 'Anniversary Reminders'), icon: Crown, desc: 'Register automatic SMS reminders' },
    { id: 'corporate', label: t('nav_corporate', 'Corporate Office'), icon: Building, desc: 'Bespoke boardroom lunch trays' },
    { id: 'loyalty', label: t('nav_loyalty', 'Royal Loyalty'), icon: Sparkles, desc: 'Track points and earn culinary ranks' },
    { id: 'admin', label: t('nav_admin', 'Maitama Admin'), icon: Settings, desc: 'Manage orders and system configuration' },
  ];

  const navigationItems = [...primaryItems, ...secondaryItems];


  const cartTotal = cart.reduce((sum, item) => {
    // Basic base price multiplication
    const numericPart = parseInt(item.selectedPortion.match(/\d+/)?.[0] || '12');
    const factor = numericPart > 12 ? (numericPart / 12) : 1;
    const itemPrice = item.product.price * (factor >= 1 ? Math.floor(factor) : 1);
    return sum + (itemPrice * item.quantity);
  }, 0);

  const updateCartQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setLoginModalOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-45 bg-[#052E16]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-xl overflow-x-hidden">
        {/* Row 1: Premium Ribbon Top-Bar (Desktop Only) */}
        <div className="hidden lg:block border-b border-[#D4AF37]/15 bg-[#031d0e]/90 py-2">
          <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 flex items-center justify-between">
            {/* Left: Distinct status badge */}
            <div className="flex items-center gap-2 text-[10px] font-sans font-medium text-[#D4AF37]/90 tracking-widest uppercase select-none">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>{t('brand_slogan_detail', 'Catering the Splendor of Nigeria • Kano • Abuja • Worldwide')}</span>
            </div>

            {/* Right: Premium Concierge, Chat, Language, and Account Actions */}
            <div className="flex items-center gap-4">
              {/* Concierge Suite Trigger Button */}
              <button
                id="concierge-dropdown-trigger"
                onClick={() => setCurrentTab('concierge-suite')}
                className={`px-3 py-1 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                  currentTab === 'concierge-suite' || secondaryItems.some(i => currentTab === i.id)
                    ? 'text-[#D4AF37] bg-emerald-900/60 border border-[#D4AF37]/30 font-bold shadow-md'
                    : 'text-[#FDFBF7]/80 hover:text-[#D4AF37] hover:bg-emerald-950/45'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Concierge Suite</span>
              </button>

              {/* Premium Chef Zainab Dialogue Summoner / Live Link */}
              <button
                id="navbar-chat-trigger"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-zainab-chat'));
                }}
                className="relative p-1.5 py-1 px-3 bg-[#032e16] hover:bg-emerald-900 border border-[#D4AF37]/35 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-md select-none text-[11.5px]"
                title="Chat with Chef Zainab Bello Sule"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#FDFBF7]/90 font-medium">Bespoke Consult</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
              </button>

              {/* Premium Sovereign Language Trigger Button */}
              <button
                id="navbar-language-trigger"
                onClick={() => setCurrentTab('language-select')}
                className={`p-1.5 py-1 px-3 border rounded-full transition-all flex items-center gap-1 cursor-pointer shadow-md select-none ${
                  currentTab === 'language-select'
                    ? 'bg-[#D4AF37]/25 text-[#D4AF37] border-[#D4AF37] font-bold shadow-md'
                    : 'bg-[#032e16] hover:bg-emerald-900 border-[#D4AF37]/35 text-[#FDFBF7]'
                }`}
                title="Change Language Dialect on Dashboard"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[11px] tracking-wide text-[#FDFBF7]/90 shrink-0">
                  {LANGUAGES.find(l => l.code === language)?.flag} {language.toUpperCase()}
                </span>
                <ChevronDown className={`w-2.5 h-2.5 text-[#D4AF37]/80 shrink-0 transition-transform ${currentTab === 'language-select' ? 'rotate-180' : ''}`} />
              </button>

              {/* Account Login Status indicator */}
              <button 
                id="login-modal-trigger"
                onClick={() => isLoggedIn ? setIsLoggedIn(false) : setLoginModalOpen(true)}
                className="flex items-center gap-1.5 bg-[#032e16] border border-[#D4AF37]/25 rounded-full px-3 py-1 hover:bg-[#052E16] transition-all text-[11px] cursor-pointer select-none"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#FDFBF7]">
                  {isLoggedIn ? userName : 'Sign In'}
                </span>
                {loyaltyPoints > 0 && (
                  <span className="bg-[#D4AF37] text-[#052E16] text-[9px] px-1 py-0.5 rounded-full font-mono font-bold leading-none">
                    {loyaltyPoints}★
                  </span>
                )}
              </button>

              {/* Premium Sound Orchestration Toggle */}
              <button
                onClick={() => {
                  const nextMuted = !luxuryAudio.getMuteStatus();
                  luxuryAudio.setMuteStatus(nextMuted);
                  setIsMuted(nextMuted);
                  // Sample a small chime when turning on
                  if (!nextMuted) {
                    luxuryAudio.playPaymentSuccessSound();
                  }
                }}
                className="flex items-center gap-1.5 bg-[#032e16] border border-[#D4AF37]/25 rounded-full px-3 py-1 hover:bg-[#052E16] transition-all text-[11px] cursor-pointer select-none text-[#FDFBF7]"
                title={isMuted ? "Unmute Premium Sounds" : "Mute Sound Effects"}
                id="navbar-audio-toggle"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-red-400 shrink-0" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                )}
                <span>
                  {isMuted ? "Muted" : "Chimes Active"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Primrose Header - Logo & Main Navigation */}
        <div className="w-full max-w-full mx-auto px-2.5 sm:px-6 lg:px-10 xl:px-14">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Personality */}
            <div 
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group flex-shrink-0"
              id="brand-logo-trigger"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-emerald-950 flex items-center justify-center border border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <span className="text-xs sm:text-sm md:text-lg font-serif text-[#D4AF37] font-black">A</span>
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h1 className="text-[9.5px] min-[380px]:text-[11px] sm:text-xs md:text-[14px] lg:text-[15px] font-serif tracking-[0.04em] sm:tracking-[0.14em] text-[#FDFBF7] font-bold leading-none select-none whitespace-nowrap">
                  {t('brand_name', 'SMALL CHOPS BY AQEELAH')}
                </h1>
                <p className="hidden min-[380px]:block text-[6.5px] md:text-[8.5px] uppercase font-mono tracking-[0.12em] sm:tracking-[0.24em] text-[#D4AF37] mt-1 sm:mt-1.5 leading-none select-none whitespace-nowrap">
                  {t('brand_slogan', 'Modern African Luxury')}
                </p>
              </div>
            </div>

            {/* Desktop Center Navigation - Fully Centered and Spacious */}
            <nav className="hidden lg:flex lg:items-center lg:justify-center gap-3 xl:gap-5 flex-grow min-w-0 mx-8">
              {primaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setConciergeOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-sans font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive 
                        ? 'bg-emerald-900/80 text-[#D4AF37] border border-[#D4AF37]/45 shadow-md font-bold' 
                        : 'text-[#FDFBF7]/85 hover:text-[#D4AF37] hover:bg-emerald-950/45'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#D4AF37]/90 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Interactive Widget Actions (Mobile/Tablet and Core Cart) */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Premium Chef Zainab Dialogue Summoner (Mobile/Tablet only) */}
              <button
                id="navbar-chat-trigger-mobile"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-zainab-chat'));
                }}
                className="hidden sm:flex lg:hidden relative p-1.5 sm:py-2 sm:px-3 bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/35 rounded-full transition-all flex items-center gap-1 sm:gap-2 cursor-pointer shadow-md select-none"
                title="Chat with Chef Zainab Bello Sule"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
              </button>

              {/* Premium Sovereign Language Trigger Button (Mobile/Tablet only) */}
              <button
                id="navbar-language-trigger-mobile"
                onClick={() => setCurrentTab('language-select')}
                className={`hidden sm:flex lg:hidden p-1.5 sm:py-2 sm:px-3 border rounded-full transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-md select-none ${
                  currentTab === 'language-select'
                    ? 'bg-[#D4AF37]/25 text-[#D4AF37] border-[#D4AF37] font-bold shadow-md'
                    : 'bg-emerald-950/80 hover:bg-emerald-900 border-[#D4AF37]/35 text-[#FDFBF7]'
                }`}
                title="Change Language Dialect on Dashboard"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline text-[10.5px] font-mono tracking-widest text-amber-100 font-bold uppercase shrink-0">
                  {LANGUAGES.find(l => l.code === language)?.flag} {language.toUpperCase()}
                </span>
                <ChevronDown className={`w-2.5 h-2.5 text-[#D4AF37]/80 shrink-0 transition-transform ${currentTab === 'language-select' ? 'rotate-180' : ''}`} />
              </button>

              {/* Sovereign Admin Control Access Button (Desktop only) */}
              <button
                id="navbar-admin-trigger"
                onClick={() => setCurrentTab('admin')}
                className={`hidden lg:flex items-center gap-1.5 p-1.5 sm:py-2 sm:px-3 border rounded-full transition-all cursor-pointer shadow-md select-none ${
                  currentTab === 'admin'
                    ? 'bg-[#D4AF37]/25 text-[#D4AF37] border-[#D4AF37] font-bold shadow-md'
                    : 'bg-[#032e16] hover:bg-emerald-900 border-[#D4AF37]/35 text-[#FDFBF7]'
                }`}
                title="Maitama Admin Control Panel"
              >
                <Settings className={`w-3.5 h-3.5 text-[#D4AF37] ${currentTab === 'admin' ? 'animate-spin' : ''}`} />
                <span className="text-[11px] font-sans font-semibold tracking-wide">
                  Admin
                </span>
              </button>

              {/* Account Login Status indicator (Mobile/Tablet only) */}
              <button 
                id="login-modal-trigger-mobile"
                onClick={() => isLoggedIn ? setIsLoggedIn(false) : setLoginModalOpen(true)}
                className="hidden md:flex lg:hidden items-center gap-1.5 bg-[#052E16]/80 border border-[#D4AF37]/20 rounded-full p-2.5 hover:bg-emerald-900 transition-all text-xs cursor-pointer select-none"
              >
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#FDFBF7] hidden xl:inline">
                  {isLoggedIn ? userName : 'Sign In'}
                </span>
                {loyaltyPoints > 0 && (
                  <span className="bg-[#D4AF37] text-[#052E16] text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">
                    {loyaltyPoints}★
                  </span>
                )}
              </button>

              {/* Shopping Cart Trigger Icon */}
              <button 
                id="cart-drawer-trigger"
                onClick={() => setOpenCartDrawer(true)}
                className="relative p-1.5 sm:p-2.5 bg-emerald-950/60 border border-[#D4AF37]/35 hover:bg-[#052E16] rounded-full transition-all focus:outline-none"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#052E16] text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#052E16]"
                    id="cart-badge-count"
                  >
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Action Icon (Sized beautifully, spacious click target) */}
              <button 
                id="mobile-menu-trigger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#FDFBF7] hover:text-[#D4AF37] focus:outline-none cursor-pointer lg:hidden rounded-full hover:bg-emerald-950/40 transition-colors flex items-center justify-center shrink-0"
                title="Toggle Royal Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Sidebar Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backing wash overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            {/* Main side drawer content */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute inset-y-0 right-0 w-[85vw] max-w-sm h-full max-h-screen bg-[#042411] border-l border-[#D4AF37]/30 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto overscroll-contain custom-scrollbar"
              id="mobile-navigation-dropdown"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/25 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-950 flex items-center justify-center border border-[#D4AF37]">
                      <span className="text-sm font-serif text-[#D4AF37] font-black">A</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-serif tracking-[0.14em] text-[#FDFBF7] uppercase font-bold">{t('royal_concierge', 'Royal Concierge')}</h4>
                      <p className="text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">{t('interactive_concierge', 'Small Chops Boutique')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full bg-emerald-950 border border-[#D4AF37]/20 text-[#D4AF37] hover:bg-emerald-900 transition-colors focus:outline-none cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Audio Notification Controller Row */}
                <div className="mb-4 p-2.5 rounded-xl border border-[#D4AF37]/25 bg-emerald-950/40 flex items-center justify-between text-xs font-sans text-[#FDFBF7]">
                  <div className="flex items-center gap-2">
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                    )}
                    <span className="font-medium">{isMuted ? "Sound is Muted" : "Premium Chimes Active"}</span>
                  </div>
                  <button
                    onClick={() => {
                      const nextMuted = !luxuryAudio.getMuteStatus();
                      luxuryAudio.setMuteStatus(nextMuted);
                      setIsMuted(nextMuted);
                      if (!nextMuted) {
                        luxuryAudio.playPaymentSuccessSound();
                      }
                    }}
                    className="px-2.5 py-1 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/35 rounded-lg text-[10px] font-mono font-bold uppercase transition-colors"
                  >
                    {isMuted ? "Unmute" : "Mute"}
                  </button>
                </div>

                {/* High Priority Highlight Cards (Talk With Aqeelah / Location) */}
                <div className="mb-5">
                  <span className="block text-[8px] font-mono text-[#D4AF37]/70 uppercase tracking-widest font-black mb-1.5">{t('exclusive_channels', 'Exclusive Channels')}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Bespoke Talk with Aqeelah Card */}
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('open-zainab-chat'));
                        setMobileMenuOpen(false);
                      }}
                      className="text-left p-2.5 rounded-xl text-xs font-serif tracking-wide flex flex-col gap-1 transition-all relative overflow-hidden border bg-emerald-950/45 text-[#FDFBF7] border-[#D4AF37]/25 hover:border-[#D4AF37]/50"
                    >
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span className="font-serif font-black text-[11px] text-[#FDFBF7] leading-tight line-clamp-1">{t('live_chat', 'Live Chat')}</span>
                      </div>
                      <span className="block text-[8.5px] text-emerald-100/60 font-mono leading-tight line-clamp-1">{t('zainab_suite', 'Zainab Suite')}</span>
                    </button>

                    {/* Bespoke Flagship Location Card */}
                    <button
                      onClick={() => {
                        setCurrentTab('location');
                        setMobileMenuOpen(false);
                      }}
                      className="text-left p-2.5 rounded-xl text-xs font-serif tracking-wide flex flex-col gap-1 transition-all relative overflow-hidden border bg-emerald-950/45 text-[#FDFBF7] border-[#D4AF37]/25 hover:border-[#D4AF37]/50"
                    >
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span className="font-serif font-bold text-[11px] text-[#FDFBF7] leading-tight line-clamp-1">{t('nav_location', 'Maitama')}</span>
                      </div>
                      <span className="block text-[8.5px] text-emerald-100/60 font-mono leading-tight line-clamp-1">{t('maitama_salon', 'Abuja Salon')}</span>
                    </button>
                  </div>
                </div>

                {/* Standard Navigation Options */}
                <div className="space-y-4">
                  {/* Primary Suites */}
                  <div>
                    <span className="block text-[8px] font-mono text-[#D4AF37]/70 uppercase tracking-widest font-black mb-1.5">{t('boutique_pages', 'Boutique & Cuisine Pages')}</span>
                    <div className="space-y-1">
                      {primaryItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setCurrentTab(item.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-serif tracking-wide flex items-center gap-3 transition-colors cursor-pointer ${
                              isActive 
                                ? 'bg-emerald-900 text-[#D4AF37] border-l-2 border-[#D4AF37] font-bold' 
                                : 'text-[#FDFBF7]/85 hover:text-white hover:bg-emerald-950/40'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 text-[#D4AF37]/85 shrink-0" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Secondary Suites (Concierge suite) - Accordion style! */}
                  <div className="border border-[#D4AF37]/15 rounded-xl overflow-hidden bg-emerald-950/25">
                    <button
                      onClick={() => setMobileConciergeOpen(!mobileConciergeOpen)}
                      className="w-full text-left px-3.5 py-3 text-xs font-serif tracking-wide flex items-center justify-between text-[#D4AF37] hover:bg-emerald-950/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-bold tracking-wider">Exclusive Concierge Tools</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${mobileConciergeOpen ? 'rotate-180 text-[#D4AF37]' : 'text-[#D4AF37]/65'}`} />
                    </button>
                    
                    <AnimatePresence>
                      {mobileConciergeOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-emerald-950/40 border-t border-[#D4AF37]/10"
                        >
                          <div className="p-1 space-y-0.5">
                            {secondaryItems.map((item) => {
                              const Icon = item.icon;
                              const isActive = currentTab === item.id;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    setCurrentTab(item.id);
                                    setMobileMenuOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-serif tracking-wide flex items-center gap-3 transition-colors cursor-pointer ${
                                    isActive 
                                      ? 'bg-emerald-900/60 text-[#D4AF37] font-semibold' 
                                      : 'text-[#FDFBF7]/80 hover:text-white hover:bg-emerald-900/20'
                                  }`}
                                >
                                  <Icon className="w-3.5 h-3.5 text-[#D4AF37]/75 shrink-0" />
                                  <span>{item.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

               {/* Mobile Language Selector Widget Panel */}
                <div className="mt-6 mb-4">
                  <span className="block text-[8px] font-mono text-[#D4AF37]/75 uppercase tracking-widest font-black mb-2">{t('royal_concierge', 'ROYAL LANGUAGE / NATION')}</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as LanguageCode);
                        }}
                        className={`px-2.5 py-2 rounded-xl text-[10.5px] font-serif tracking-wide border flex items-center gap-2 transition-all ${
                          language === lang.code
                            ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                            : 'bg-[#022c22]/40 text-[#FDFBF7]/80 border-[#D4AF37]/15 hover:border-[#D4AF37]/30'
                        }`}
                      >
                        <span className="text-sm shrink-0">{lang.flag}</span>
                        <span className="font-serif font-semibold">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

               {/* User Section at very bottom */}
              <div className="pt-4 border-t border-[#D4AF37]/20 pb-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (isLoggedIn) {
                      setIsLoggedIn(false);
                    } else {
                      setLoginModalOpen(true);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] py-3 rounded-xl text-xs tracking-wider font-mono font-bold hover:bg-[#D4AF37]/15 transition-all text-center cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <span>{isLoggedIn ? `Sign Out (${userName})` : 'Access Royal Profile'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Login Modal Popup */}
      <AnimatePresence>
        {loginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fafaf9] rounded-2xl overflow-hidden shadow-2xl max-w-md w-full border border-amber-500/20"
              id="royal-login-modal"
            >
              <div className="bg-[#022c22] p-6 text-center text-[#fdfbf7] relative">
                <button 
                  onClick={() => setLoginModalOpen(false)}
                  className="absolute top-4 right-4 text-emerald-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 rounded-full bg-emerald-950 flex items-center justify-center border-2 border-[#d97706]/70 shadow-lg mx-auto mb-3">
                  <span className="text-2xl font-serif text-[#eab308] font-black">A</span>
                </div>
                <h3 className="text-xl font-serif tracking-widest text-[#fdfbf7]">ROYAL CUSTOMER PROFILE</h3>
                <p className="text-xs text-yellow-200/80 font-mono tracking-wider mt-1">Unlock VIP status, track gourmet recipes & reminders</p>
              </div>

              <form onSubmit={handleLogin} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-700 tracking-wider mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    placeholder="e.g. Zainab Bello"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-700 tracking-wider mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    placeholder="Zainab@company.com"
                  />
                </div>
                
                <div className="text-[10px] text-gray-500 leading-relaxed">
                  By accessing your Aqeelah account with social or email login, you qualify for <strong>150 Royal Loyalty Points</strong> on checkout immediately and receive active delivery tracking numbers.
                </div>

                <div className="flex gap-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setUserName('Guest Patron');
                      setIsLoggedIn(true);
                      setLoginModalOpen(false);
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 border border-gray-300 py-3 rounded-lg text-xs font-mono uppercase tracking-widest hover:bg-gray-300 transition-colors"
                  >
                    Guest Checkout
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-[#022c22] text-[#fdfbf7] py-3 rounded-lg text-xs font-serif uppercase tracking-widest hover:bg-emerald-950 transition-colors shadow-md flex items-center justify-center gap-1"
                  >
                    <span>Authenticate</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#eab308] animate-spin" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Animated Desktop Shopping Cart Drawer */}
      <AnimatePresence>
        {openCartDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Overlay backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 transition-opacity" 
              onClick={() => setOpenCartDrawer(false)}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className="w-screen max-w-md bg-[#052E16] text-[#FDFBF7] shadow-x1 flex flex-col justify-between border-l border-[#D4AF37]/35 relative"
                id="cart-overlay-drawer"
              >
                {/* Drawer Header */}
                <div className="bg-[#052E16] px-6 py-5 text-[#FDFBF7] border-b border-[#D4AF37]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <h3 className="text-lg font-serif tracking-widest text-[#FDFBF7]">ROYAL CART</h3>
                      <p className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono">Kano State Gourmet Order</p>
                    </div>
                  </div>
                  <button 
                    id="close-cart-drawer"
                    onClick={() => setOpenCartDrawer(false)}
                    className="text-[#FDFBF7] hover:text-[#D4AF37]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Cart list content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-12">
                      <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-2 border border-[#D4AF37]/20">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif text-lg text-[#FDFBF7]">Your Cart is Pristine and Empty</h4>
                      <p className="text-xs text-emerald-100/70 max-w-xs leading-relaxed">
                        Add Zainab’s legendary Samosas, Gizdodo Cups, or custom-blended Hibiscus Zobos to begin your celebration.
                      </p>
                      <button
                        onClick={() => {
                          setOpenCartDrawer(false);
                          setCurrentTab('menu');
                        }}
                        className="bg-[#D4AF37] text-[#052E16] px-6 py-2.5 rounded-lg text-xs font-serif uppercase tracking-widest hover:bg-[#C5A028] transition-colors font-bold shadow-md"
                      >
                        Explore Menu
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => {
                      const numericPart = parseInt(item.selectedPortion.match(/\d+/)?.[0] || '12');
                      const factor = numericPart > 12 ? (numericPart / 12) : 1;
                      const itemPrice = item.product.price * (factor >= 1 ? Math.floor(factor) : 1);
                      const lineTotal = itemPrice * item.quantity;

                      return (
                        <div 
                          key={item.id} 
                          className="flex items-start gap-3 p-3 bg-emerald-950/40 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/45 transition-all"
                        >
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-16 h-16 rounded-lg object-cover border border-[#D4AF37]/20 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-serif text-xs font-semibold text-[#FDFBF7]">{item.product.name}</h5>
                            <p className="text-[10px] font-mono text-[#D4AF37] font-bold mt-0.5">{item.selectedPortion}</p>
                            
                            {item.customMessage && (
                              <p className="text-[9px] bg-emerald-900/60 text-[#D4AF37] p-1 rounded mt-1 border border-[#D4AF37]/20">
                                Card: "{item.customMessage}"
                              </p>
                            )}
                            
                            {item.scheduledDate && (
                              <p className="text-[9px] text-[#D4AF37] font-mono mt-0.5">
                                Scheduled: {item.scheduledDate}
                              </p>
                            )}

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity Control Buttons */}
                              <div className="flex items-center border border-[#D4AF37]/30 rounded bg-emerald-950/60">
                                <button 
                                  onClick={() => updateCartQty(item.id, item.quantity - 1)}
                                  className="px-2 py-0.5 text-xs text-emerald-100/70 hover:bg-emerald-900"
                                >
                                  -
                                </button>
                                <span className="px-2 text-xs font-mono font-semibold text-[#FDFBF7]">{item.quantity}</span>
                                <button 
                                  onClick={() => updateCartQty(item.id, item.quantity + 1)}
                                  className="px-2 py-0.5 text-xs text-emerald-100/70 hover:bg-emerald-900"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-xs font-mono font-bold text-[#D4AF37]">
                                ₦{lineTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-emerald-100/40 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Drawer Footer with Checkout */}
                {cart.length > 0 && (
                  <div className="border-t border-[#D4AF37]/20 p-6 bg-emerald-950/40 space-y-4">
                    <div className="space-y-1.5 text-xs font-mono text-emerald-100/80">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <span className="text-[#FDFBF7]">₦{cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#D4AF37]">
                        <span>Exclusive Discount (10% Off):</span>
                        <span>-₦{(cartTotal * 0.1).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lekki/Maitama Delivery Fee:</span>
                        <span className="text-[#FDFBF7]">₦3,500</span>
                      </div>
                      <div className="flex justify-between text-base font-serif font-black text-[#D4AF37] border-t border-[#D4AF37]/20 pt-2 mt-2">
                        <span>ESTIMATED TOTAL:</span>
                        <span>₦{(cartTotal * 0.9 + 3500).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37]/70 text-center">Select Secure Nigerian Checkout</p>
                      
                      {/* checkout methods */}
                      <div className="grid grid-cols-3 gap-2">
                        <button 
                          id="checkout-paystack"
                          onClick={() => triggerCheckout('Paystack')}
                          className="bg-emerald-900 text-[#FDFBF7] p-2.5 rounded-lg text-[10px] font-mono tracking-wider font-bold hover:bg-emerald-850 shadow-md border border-[#D4AF37]/30 transition-all text-center flex flex-col items-center justify-center cursor-pointer"
                        >
                          <span>Paystack</span>
                          <span className="text-[8px] text-[#D4AF37]">Instant</span>
                        </button>
                        
                        <button 
                          id="checkout-flutterwave"
                          onClick={() => triggerCheckout('Flutterwave')}
                          className="bg-zinc-900/40 text-[#FDFBF7] p-2.5 rounded-lg text-[10px] font-mono tracking-wider font-bold hover:bg-zinc-850 shadow-md border border-[#D4AF37]/20 transition-all text-center flex flex-col items-center justify-center cursor-pointer"
                        >
                          <span>Flutterwave</span>
                          <span className="text-[8px] text-[#D4AF37]/80">Inline</span>
                        </button>

                        <button 
                          id="checkout-transfer"
                          onClick={() => triggerCheckout('Bank Transfer')}
                          className="bg-[#D4AF37] text-[#052E16] p-2.5 rounded-lg text-[10px] font-mono tracking-wider font-bold hover:bg-[#C5A028] shadow-md transition-all text-center flex flex-col items-center justify-center cursor-pointer"
                        >
                          <span>Bank Wire</span>
                          <span className="text-[8px] text-[#052E16]/80 font-bold">Offline</span>
                        </button>
                      </div>
                      <p className="text-[8px] text-center text-emerald-100/50">
                        Orders processed with 256-bit bank card standard authentication protocols.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
