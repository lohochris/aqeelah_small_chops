/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Award, ShieldCheck, Play, UtensilsCrossed, Star, CheckCircle, Quote } from 'lucide-react';

export default function AboutFounder() {
  const [activeMediaTab, setActiveMediaTab] = React.useState<'story' | 'philosophy' | 'message'>('story');
  const [isPlayingVideo, setIsPlayingVideo] = React.useState(false);

  const galleryImages = [
    {
      url: "/src/assets/images/zainab_portrait_1780757712146.png",
      caption: "Culinary leader: Zainab Bello Sule in the Kano kitchen."
    },
    {
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=600",
      caption: "Northern Hospitality: Traditional styling room."
    },
    {
      url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600",
      caption: "Perfect proportions: Crafting local puff delicacies."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="meet-aqeelah">
      
      {/* 1. Header Hero Panel */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full px-3.5 py-1 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
          <span>Karamci & Grace in every serving</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold tracking-tight">
          Meet Chef <span className="text-[#D4AF37]">Aqeelah</span>
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-sans">
          Discover the culinary heritage, uncompromising standard of excellence, and warm hospitality governing Small Chops by Aqeelah, directed by founder <strong>Zainab Bello Sule</strong> in Kano State.
        </p>
      </div>

      {/* 2. Interactive Spotlight story panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Highly styled video introducer panel or high fidelity picture frame */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent blur-2xl opacity-40 rounded-full" />
          <div className="border border-[#D4AF37]/35 p-3 rounded-3xl bg-emerald-950/80 shadow-2xl relative z-10">
            
            {/* Visual Screen Case */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
              <img 
                src="/src/assets/images/zainab_portrait_1780757712146.png" 
                alt="Zainab Bello Sule portrait welcome" 
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlayingVideo ? 'scale-105 filter brightness-50' : 'group-hover:scale-102'}`}
                referrerPolicy="no-referrer"
              />
              
              <AnimatePresence>
                {!isPlayingVideo ? (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center p-6 text-center text-[#FDFBF7]"
                  >
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="w-16 h-16 rounded-full bg-[#D4AF37] border-4 border-emerald-900/60 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center text-[#052E16] shadow-xl relative cursor-pointer"
                      title="Play welcome introduction video"
                    >
                      <Play className="w-6 h-6 fill-[#052E16] text-[#052E16] translate-x-0.5" />
                      <span className="absolute -inset-2 rounded-full border-2 border-[#D4AF37]/40 animate-ping pointer-events-none" />
                    </button>
                    <span className="text-[10px] tracking-widest font-mono uppercase text-[#D4AF37] mt-4 font-bold">Play Introduction Video</span>
                    <h4 className="font-serif text-sm font-semibold mt-1">Zainab Bello Sule Welcome Address</h4>
                    <p className="text-[9px] text-[#FDFBF7]/60 font-mono mt-0.5">Recorded live at BUK Kano kitchen</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-emerald-950/95 flex flex-col items-center justify-center p-8 text-center space-y-4"
                  >
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
                    <Quote className="w-8 h-8 text-[#D4AF37]/40" />
                    <p className="text-xs italic text-emerald-100/90 leading-relaxed font-sans">
                      "Assalamu Alaikum. Welcome to my virtual kitchen. Here, we craft each platter with Bismillah, blending ancient Northern hospitality with elite presentation. My commitment is that your family and guests experience absolute luxury in every single chop."
                    </p>
                    <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest">ZAINAB BELLO SULE, FOUNDER</span>
                    <button 
                      onClick={() => setIsPlayingVideo(false)}
                      className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full cursor-pointer transition-colors"
                    >
                      Close Video Address
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right column: Tabbed story bio narrative */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Sub tabs selectors */}
          <div className="flex border-b border-[#D4AF37]/15">
            {(['story', 'philosophy', 'message'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveMediaTab(tab); setIsPlayingVideo(false); }}
                className={`pb-3.5 px-4 font-serif text-sm uppercase tracking-wide border-b-2 transition-all cursor-pointer ${
                  activeMediaTab === tab 
                    ? 'border-[#D4AF37] text-[#D4AF37] font-bold' 
                    : 'border-transparent text-emerald-100/40 hover:text-emerald-100/70'
                }`}
              >
                {tab === 'story' && "Her Story"}
                {tab === 'philosophy' && "Food Philosophy"}
                {tab === 'message' && "Welcome Message"}
              </button>
            ))}
          </div>

          <div className="space-y-6 font-sans text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            <AnimatePresence mode="wait">
              {activeMediaTab === 'story' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  key="story"
                  className="space-y-4"
                >
                  <h4 className="font-serif text-lg sm:text-xl text-[#FDFBF7] font-bold">The Seed of a Masterpiece</h4>
                  <p>
                    Growing up in Kano, Zainab was enveloped by rich culinary cultures through the smell of slow-roasting goat meat, traditional spices hand-crushed in brass mortars, and grand wedding events where catering defined family pride.
                  </p>
                  <p>
                    Observing that local event catering either sacrificed taste for scale or lacked elegant visual aesthetics, she founded <strong className="text-[#D4AF37] font-bold">Small Chops by Aqeelah</strong>. Her mission was singular: elevate traditional snacks like samosas, puffs, and zobo into sophisticated, high-end, world-class culinary experiences.
                  </p>
                  <div className="grid grid-cols-2 gap-4 border-t border-[#D4AF37]/15 pt-4 text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-[#D4AF37] block font-serif font-black uppercase text-[10px]">Headquarters:</span>
                      <span>Janbulo First Gate, Gwale, Kano</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#D4AF37] block font-serif font-black uppercase text-[10px]">Serving since:</span>
                      <span>1999/2012 Elite Circles</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeMediaTab === 'philosophy' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  key="philosophy"
                  className="space-y-4"
                >
                  <h4 className="font-serif text-lg sm:text-xl text-[#FDFBF7] font-bold">Karamci & Mutumin Kirki</h4>
                  <p>
                    Zainab’s cooking is directed by two noble tenets of Northern Nigerian philosophy:
                  </p>
                  <ul className="list-none space-y-3.5 pl-2 mt-4 text-[#FDFBF7] font-serif font-medium">
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] mt-0.5 font-bold font-mono text-[9px] flex-shrink-0">1</div>
                      <div>
                        <strong>Mutumin Kirki (The Good Person):</strong>
                        <p className="font-sans text-xs text-emerald-100/70 font-normal mt-0.5">Absolute operational integrity. We use the highest-grade flour, hand-selected vegetables, and oils that guarantees your relative health and absolute peace of mind.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] mt-0.5 font-bold font-mono text-[9px] flex-shrink-0">2</div>
                      <div>
                        <strong>Karamci (Supreme Hospitality):</strong>
                        <p className="font-sans text-xs text-emerald-100/70 font-normal mt-0.5">Warm, generous hospitality. Every tray is packed to the absolute brim, decorated as standard visual art pieces, and delivered hot.</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              )}

              {activeMediaTab === 'message' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  key="message"
                  className="space-y-4 font-sans"
                >
                  <h4 className="font-serif text-lg sm:text-xl text-[#FDFBF7] font-bold">Your Trust, My Sacred Bond</h4>
                  <p className="italic text-emerald-100/95 font-serif text-sm">
                    "When you book me for your wedding, your child’s graduation at Bayero University, or your company’s board summit, you are granting me entry into your life’s happiest peaks."
                  </p>
                  <p>
                    "I take this responsibility with utmost solemnity. Every member of my Janbulo kitchen works under clean, standardized luxury protocols. We pledge to deliver exquisite flavor, punctual transit timelines, and a visual display that makes your boardroom look like an imperial palace."
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-[#D4AF37] font-serif italic text-xs font-bold">
                    <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
                    <span>In service of your joy, Zainab Bello Sule</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* 3. Luxury Gallery Cards section */}
      <div className="space-y-6 pt-6 border-t border-[#D4AF37]/15">
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">KANO KITCHEN DIALOGUE</span>
          <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] font-bold">Aqeelah Culinary Moments Gallery</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <div 
              key={index} 
              className="bg-emerald-950/30 border border-[#D4AF37]/20 p-2.5 rounded-2xl group hover:border-[#D4AF37]/45 transition-all shadow-md relative"
            >
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-emerald-100/60 font-mono text-[9px] mt-2 text-center uppercase tracking-wider">{img.caption}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
