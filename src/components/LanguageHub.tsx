/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, Sparkles, Languages } from 'lucide-react';
import { useLanguage, LANGUAGES, LanguageCode } from '../LanguageContext';

export default function LanguageHub() {
  const { language, setLanguage, t } = useLanguage();
  const [successLang, setSuccessLang] = React.useState<LanguageCode | null>(null);

  const handleLanguageSelect = (code: LanguageCode) => {
    setLanguage(code);
    setSuccessLang(code);
    
    // Clear animation state after a short while
    setTimeout(() => {
      setSuccessLang(null);
    }, 3000);
  };

  // Luxury native greeting text based on selected language code
  const getNativeGreeting = (code: LanguageCode) => {
    switch (code) {
      case 'en':
        return 'Welcome, your Royal Highness. Let us prepare your feast!';
      case 'fr':
        return 'Bienvenue, Votre Altesse Royale. Préparons votre festin!';
      case 'yo':
        return 'Ẹ kú àbọ̀, Kabiyesi. Ẹ jẹ́ kí á ṣetò àsè aládùn fún yín!';
      case 'ha':
        return 'Barka da zuwa, Shugaba Mai Daraja. Bari mu shirya muku babban biki!';
      case 'ig':
        return 'Nnọọ, Eze na Onye Ukwu. Ka anyị kwadebe oké oriri gị!';
      case 'ar':
        return 'مرحباً بجلالتكم الملكية. دعنا نعد مأدبتكم السعيدة الفاخرة!';
      case 'es':
        return '¡Bienvenido, Su Alteza Real. ¡Permítanos preparar su banquete!';
      case 'zh':
        return '恭迎亲王殿下/公主殿下。请让我们为您精心筹划这场至臻筵席！';
      default:
        return 'Welcome, your Royal Highness.';
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-14 max-w-7xl mx-auto space-y-12" id="language-hub-page">
      {/* Exquisite Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full text-xs font-mono text-[#D4AF37] tracking-widest uppercase"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Sovereign Language & Nation Portal</span>
        </motion.div>
        
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] tracking-tight leading-tight">
          Sovereign <span className="font-serif italic text-[#D4AF37]">Language Center</span>
        </h2>
        
        <p className="text-sm sm:text-base text-emerald-100/70 font-sans leading-relaxed">
          Select your preferred national language dialect. All menu plates, bespoke ingredients, automated SMS reminder schedules, and real-time courier statuses will adapt instantaneously.
        </p>
      </div>

      {/* Dynamic Feedback Display */}
      <AnimatePresence mode="wait">
        {successLang && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="max-w-xl mx-auto rounded-2xl bg-emerald-950/80 border border-[#D4AF37]/50 p-6 text-center space-y-2 shadow-xl shadow-[#D4AF37]/5"
          >
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mx-auto animate-bounce">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#D4AF37]">
              {LANGUAGES.find(l => l.code === successLang)?.name} Translation Activated
            </h4>
            <p className="text-xs text-[#FDFBF7]/90 leading-relaxed max-w-sm mx-auto font-serif italic">
              "{getNativeGreeting(successLang)}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageSelect(lang.code)}
              className={`relative overflow-hidden text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 ${
                isSelected 
                  ? 'bg-gradient-to-br from-[#D4AF37]/15 to-[#052E16] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10' 
                  : 'bg-emerald-950/45 border-[#D4AF37]/15 hover:border-[#D4AF37]/40 hover:bg-[#052E16]/40'
              }`}
            >
              {/* Flag Emoji Indicator */}
              <div className="flex items-center justify-between">
                <span className="text-4xl filter drop-shadow-md select-none">{lang.flag}</span>
                {isSelected && (
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#052E16] flex items-center justify-center text-xs font-bold shadow-md">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>

              {/* Text Detail */}
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-100/50">
                  {lang.code === 'en' ? 'Global Dialect' : 'Regional Core'}
                </div>
                <h3 className="text-xl font-serif font-black text-[#FDFBF7]">
                  {lang.name}
                </h3>
              </div>

              {/* Aesthetic indicator line */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Trust and security badges */}
      <div className="flex items-center justify-center gap-6 max-w-md mx-auto pt-8 border-t border-[#D4AF37]/10 text-[11px] font-mono text-emerald-100/40">
        <div className="flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Real-time GeoIP-aligned dictionary</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>8 Sovereignties Supported</span>
        </div>
      </div>
    </div>
  );
}
