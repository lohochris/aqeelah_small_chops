/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, Plus, Info, HelpCircle, Check, ShoppingBag, ShieldAlert } from 'lucide-react';
import { MenuItem, TrayItemPlacement } from '../types';

interface TrayBuilderProps {
  addToCart: (customPlatterItem: MenuItem, portion: string) => void;
}

export default function TrayBuilder({ addToCart }: TrayBuilderProps) {
  const [trayName, setTrayName] = React.useState<string>("Sule's Sovereign Platter");
  const [placements, setPlacements] = React.useState<TrayItemPlacement[]>([]);
  const [activePlatterSize, setActivePlatterSize] = React.useState<'classic' | 'royal'>('classic');

  const CHOPS_OPTIONS = [
    { id: 'opt-1', name: 'Zainab Beef Samosa', price: 1200, color: 'bg-amber-600 border-amber-800 animate-fade-in' },
    { id: 'opt-2', name: 'Shrimp Spring Roll', price: 1500, color: 'bg-orange-500 border-orange-700 animate-fade-in' },
    { id: 'opt-3', name: 'Glazed Cinnamon Puff Puff', price: 500, color: 'bg-yellow-500 border-yellow-700 animate-fade-in' },
    { id: 'opt-4', name: 'Gilded Peppered Gizdodo Cup', price: 1800, color: 'bg-red-600 border-red-800 animate-fade-in' },
    { id: 'opt-5', name: 'Gourmet Grilled Asun Skewer', price: 2400, color: 'bg-rose-700 border-rose-900 animate-fade-in' },
    { id: 'opt-6', name: 'Smokey Peppered Chicken Wing', price: 1600, color: 'bg-amber-800 border-amber-950 animate-fade-in' }
  ];

  const platterPricing = {
    classic: { base: 5000, maxChops: 40, label: "Imperial Platter (Hold up to 40 Chops)" },
    royal: { base: 10000, maxChops: 80, label: "Royal Sovereign Platter (Hold up to 80 Chops)" }
  };

  const selectedPlatter = platterPricing[activePlatterSize];

  const handleAddChops = (chopsId: string) => {
    const option = CHOPS_OPTIONS.find(opt => opt.id === chopsId);
    if (!option) return;

    if (placements.length >= selectedPlatter.maxChops) {
      alert(`The selected ${selectedPlatter.label} has reached full capacity. Upgrade to Sovereign of 80 Chops or remove items.`);
      return;
    }

    // Generate smart orbital coordinate layout to make dots look naturally spaced on circular tray
    const count = placements.length;
    let radiusPercentage = 20; // default inner orbit
    if (count > 8 && count <= 20) radiusPercentage = 35; // middle orbit
    if (count > 20) radiusPercentage = 42; // outer orbit
    
    const angleRad = (count * 137.5 * Math.PI) / 180; // golden angle spiral spacing
    const x = Math.round(50 + radiusPercentage * Math.cos(angleRad));
    const y = Math.round(50 + radiusPercentage * Math.sin(angleRad));

    const newPlacement: TrayItemPlacement = {
      id: `place-${Date.now()}-${placements.length}`,
      name: option.name,
      x,
      y,
      color: option.color
    };

    setPlacements([...placements, newPlacement]);
  };

  const handleRemoveOne = (index: number) => {
    setPlacements(placements.filter((_, i) => i !== index));
  };

  const handleClearTray = () => {
    setPlacements([]);
  };

  // Pricing math calculation
  const calculatedChopsSum = placements.reduce((sum, item) => {
    const configDetail = CHOPS_OPTIONS.find(o => o.name === item.name);
    return sum + (configDetail?.price || 1000);
  }, 0);

  const finalTrayTotal = calculatedChopsSum + selectedPlatter.base;
  const currentChopsCount = placements.length;

  const handleIncorporatePlatterToCart = () => {
    if (currentChopsCount < 15) {
      alert("Traditional Yoruba and Edo etiquette requires at least 15 small chops to build a luxurious platter. Please add more pastries to complete!");
      return;
    }

    // Map custom Tray to standard MenuItem catalog representation
    const generatedTrayMenuItem: MenuItem = {
      id: `custom-tray-${Date.now()}`,
      name: `Custom Royal Tray: ${trayName}`,
      category: 'party-trays',
      price: finalTrayTotal,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400',
      description: `Custom Platter build containing: ${getPlatterCountsSummary()}`,
      ingredients: ['Custom Chosen Small Chops Mixture', 'Golden presentation case', 'Craft dipping selections'],
      portionSizes: [`Custom Mix of ${currentChopsCount} items`],
      availability: '24h Notice',
      rating: 5.0,
      reviewsCount: 1,
      isBestSeller: false
    };

    addToCart(generatedTrayMenuItem, `Custom Mix of ${currentChopsCount} items`);
    alert(`Success! "${trayName}" with ${currentChopsCount} small chops compiled beautifully into your master shopping cart!`);
    handleClearTray();
  };

  const getPlatterCountsSummary = () => {
    const counts: Record<string, number> = {};
    placements.forEach(p => {
      counts[p.name] = (counts[p.name] || 0) + 1;
    });
    return Object.entries(counts).map(([name, num]) => `${num}x ${name.replace('Zainab ', '')}`).join(', ');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="tray-builder-container">
      
      {/* Visual Header */}
      <div className="text-center space-y-3">
        <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">INTERACTIVE PLATTER REVOLUTION</span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold">Build Your Own Royal Tray</h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 max-w-lg mx-auto leading-relaxed">
          Arrange Samosas, Spring Rolls, Peppered Gizdodo, and Skewers. Watch your interactive golden platter update dynamically below with live weights and pricing metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Placement Preview */}
        <div className="lg:col-span-7 bg-[#052E16]/40 p-6 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-6 flex flex-col justify-between">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-4">
            <div>
              <label className="block text-[8px] uppercase tracking-widest font-mono text-emerald-100/50 font-extrabold mb-1">Casing Master Inscription</label>
              <input 
                type="text"
                value={trayName}
                onChange={(e) => setTrayName(e.target.value)}
                className="font-serif text-lg bg-transparent border-b border-dashed border-[#D4AF37]/35 focus:border-[#D4AF37] outline-none font-bold text-[#FDFBF7] w-full max-w-sm font-sans"
                placeholder="e.g. Sule's Anniversary Platter"
              />
            </div>
            
            {/* Tray Size Selection buttons */}
            <div className="flex items-center gap-1.5 self-end">
              <button
                onClick={() => { setActivePlatterSize('classic'); setPlacements([]); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-colors cursor-pointer ${
                  activePlatterSize === 'classic' 
                    ? 'bg-[#D4AF37] text-[#052E16] font-bold shadow' 
                    : 'bg-emerald-950/50 text-emerald-100/80 hover:bg-[#052E16]'
                }`}
              >
                Classic Gilded Tray
              </button>
              <button
                onClick={() => { setActivePlatterSize('royal'); setPlacements([]); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-colors cursor-pointer ${
                  activePlatterSize === 'royal' 
                    ? 'bg-[#D4AF37] text-[#052E16] font-bold shadow' 
                    : 'bg-emerald-950/50 text-emerald-100/80 hover:bg-[#052E16]'
                }`}
              >
                Sovereign Platter
              </button>
            </div>
          </div>

          {/* Interactive Circle visual displaying orbital layout of dot placements */}
          <div className="relative aspect-square max-w-[450px] mx-auto w-full bg-gradient-to-tr from-[#052E16] to-[#031d0d] rounded-full border-8 border-double border-[#D4AF37] shadow-2xl flex items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-4 rounded-full border border-dashed border-[#D4AF37]/25 animate-pulse" />
            <div className="absolute inset-16 rounded-full border border-dashed border-[#D4AF37]/15" />
            <div className="absolute inset-32 rounded-full border border-dashed border-[#D4AF37]/10" />
            
            {/* Platter Center Logo Crown indicator */}
            <div className="w-16 h-16 rounded-full bg-[#052E16]/90 backdrop-blur-sm border border-[#D4AF37]/20 flex flex-col items-center justify-center text-center p-2 z-0 shadow-lg">
              <span className="text-[7px] uppercase tracking-widest text-[#D4AF37] font-mono font-bold leading-none">AQEELAH</span>
              <span className="text-[6px] text-emerald-100/50 font-sans mt-0.5 font-bold">PLATTER</span>
            </div>

            {/* Placements Render map */}
            <AnimatePresence>
              {placements.map((placed, idx) => (
                <motion.div
                  key={placed.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0 }}
                  style={{ left: `${placed.x}%`, top: `${placed.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-mono font-bold text-[#FDFBF7] shadow-md border cursor-pointer z-10 transition-transform hover:scale-125 ${placed.color}`}
                  title={`${placed.name} - Tap to remove`}
                  onClick={() => handleRemoveOne(idx)}
                >
                  {placed.name.substring(0, 2).toUpperCase()}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty state overlay */}
            {placements.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-transparent">
                <HelpCircle className="w-8 h-8 text-[#D4AF37] animate-pulse mb-2" />
                <span className="font-serif text-sm font-bold text-[#FDFBF7]">Tray is Spotless & Untouched</span>
                <p className="text-[10px] text-emerald-100/70 max-w-xs mt-1 leading-relaxed">
                  Start tapping from the catalog option bar to orbit your fresh samosas, spring rolls, or Asun sticks onto the tray!
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-emerald-100/50 pt-2 border-t border-[#D4AF37]/15">
            <span className="font-mono">Platter Casing Charge: ₦{selectedPlatter.base.toLocaleString()}</span>
            <span className="text-red-400 font-mono font-bold">Tapping layout points deletes individual items</span>
          </div>
        </div>

        {/* Right Column: Custom Option Controls Sidebar */}
        <div className="lg:col-span-12 xl:col-span-5 bg-[#052E16]/40 p-6 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg text-[#FDFBF7] font-bold">Gourmet Selection Cabinet</h3>
            <p className="text-xs text-emerald-100/60">Add individual items directly to your layout mapping below.</p>
          </div>

          {/* Catalog Buttons Selection array */}
          <div className="space-y-2">
            {CHOPS_OPTIONS.map((chop) => {
              const currentTotalForThisChop = placements.filter(p => p.name === chop.name).length;
              return (
                <div 
                  key={chop.id}
                  className="flex items-center justify-between p-3 bg-emerald-950/60 border border-[#D4AF37]/15 rounded-xl hover:bg-emerald-950 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full ${chop.color}`} />
                    <div>
                      <h4 className="font-serif text-xs font-bold text-[#FDFBF7]">{chop.name}</h4>
                      <span className="text-[10px] text-[#D4AF37] font-mono font-bold">₦{chop.price.toLocaleString()} / piece</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentTotalForThisChop > 0 && (
                      <span className="bg-[#D4AF37] text-[#052E16] px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border border-[#D4AF37]/20">
                        {currentTotalForThisChop} mapped
                      </span>
                    )}
                    <button
                      onClick={() => handleAddChops(chop.id)}
                      className="bg-emerald-950 border border-[#D4AF37]/35 hover:bg-[#D4AF37] hover:text-[#052E16] text-[#D4AF37] p-1.5 rounded transition-colors cursor-pointer"
                      title="Add item to platter"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive platter calculations details */}
          <div className="bg-emerald-950/65 p-4 rounded-2xl border border-[#D4AF37]/15 text-xs font-mono text-emerald-100/70 space-y-2">
            <div className="flex justify-between">
              <span>Tray capacity reached:</span>
              <span className="font-bold">{currentChopsCount} / {selectedPlatter.maxChops} Chops</span>
            </div>
            <div className="flex justify-between">
              <span>Chops value total:</span>
              <span>₦{calculatedChopsSum.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Elite case base charge:</span>
              <span>₦{selectedPlatter.base.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-base font-serif font-black text-[#FDFBF7] border-t border-[#D4AF37]/15 pt-2 mt-2">
              <span>PLATTER PRICE:</span>
              <span className="text-[#D4AF37]">₦{finalTrayTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Validation indicators */}
          {currentChopsCount < 15 ? (
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/25 p-3.5 rounded-xl flex items-start gap-2.5 font-sans">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="text-[10px] text-[#D4AF37] leading-relaxed">
                <strong>Attention Required:</strong> You must place a minimum of 15 bites/chops to balance our luxury golden platter arrangement ({currentChopsCount} placed currently).
              </div>
            </div>
          ) : (
            <div className="bg-emerald-950/90 border border-[#D4AF37]/30 p-3.5 rounded-xl flex items-start gap-2.5 font-sans">
              <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div className="text-[10px] text-emerald-100/90 leading-relaxed">
                <strong>Platter configuration is valid !</strong> Elegant golden ribbons and matching spicy chili dips have been included free of charge. Ready to synchronize!
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2.5">
            <button
              onClick={handleClearTray}
              className="flex-shrink-0 border border-[#D4AF37]/25 hover:bg-red-950 hover:text-red-400 text-emerald-100/50 p-3.5 rounded-xl transition-colors cursor-pointer"
              title="Reset Platter Mapping"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleIncorporatePlatterToCart}
              disabled={currentChopsCount < 15}
              className={`flex-1 font-serif text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg border transition-all flex items-center justify-center gap-2 font-bold cursor-pointer ${
                currentChopsCount < 15 
                  ? 'bg-emerald-950/20 text-emerald-100/25 border-emerald-950/15 cursor-not-allowed shadow-none' 
                  : 'bg-[#D4AF37] text-[#052E16] hover:bg-[#C5A028] border-[#D4AF37]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#052E16]" />
              <span>Incorporate Platter Cart</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
