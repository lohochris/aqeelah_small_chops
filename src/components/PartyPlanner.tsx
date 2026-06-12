/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Users, Sparkles, AlertTriangle, ArrowRight, ShieldCheck, Heart, Crown, CheckCircle2 } from 'lucide-react';
import { MenuItem } from '../types';

interface PartyPlannerProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, portion: string) => void;
  setCurrentTab: (tab: string) => void;
}

export default function PartyPlanner({ menuItems, addToCart, setCurrentTab }: PartyPlannerProps) {
  const [guestCount, setGuestCount] = React.useState<number>(50);
  const [budgetConstraint, setBudgetConstraint] = React.useState<number>(300000); // in Naira
  const [eventType, setEventType] = React.useState<string>('Wedding');
  const [showSuccessModal, setShowSuccessModal] = React.useState<boolean>(false);

  const EVENT_STYLES = [
    { id: 'Wedding', label: 'Grand Kano Wedding Reception', multiplier: 1.5 },
    { id: 'Birthday', label: 'Elite Birthday Gala', multiplier: 1.2 },
    { id: 'Corporate', label: 'Executive Boardroom Meeting', multiplier: 1.8 },
    { id: 'Graduation', label: 'Graduation & Reunion Celebration', multiplier: 1.0 },
    { id: 'Other', label: 'Cocktails & Private Dining', multiplier: 1.3 }
  ];

  // Algorithmic recommendations math
  const calculatedMetrics = React.useMemo(() => {
    const selectedStyle = EVENT_STYLES.find(e => e.id === eventType) || EVENT_STYLES[0];
    
    // Core small chops volume: Nigerians eat an average of 4-6 small chops at an event. Higher factor for corporate/weddings
    const chopsPerGuest = Math.ceil(5 * selectedStyle.multiplier);
    const totalChopsNeeded = guestCount * chopsPerGuest;
    
    // Drinks: 1.5 glasses of exotic zobo or palm wine per guest
    const totalDrinksNeeded = Math.ceil(guestCount * 1.5);
    
    // Desserts: 1.2 premium cake or caramel wedges per attendee
    const totalDessertsNeeded = Math.ceil(guestCount * 1.2 * (eventType === 'Corporate' ? 1.5 : 1));

    // Recommendations pricing from existing catalogue
    const proposedChopsValue = Math.round(totalChopsNeeded * 1000); // ₦1,000 average per piece
    const proposedDrinksValue = Math.round(totalDrinksNeeded * 4500); // Zobo bottle is ₦4,500
    const proposedDessertsValue = Math.round(totalDessertsNeeded * 2000); // Sweet slice average is ₦2,000

    const proposedSumTotal = proposedChopsValue + proposedDrinksValue + proposedDessertsValue;
    const isBudgetFeasible = budgetConstraint >= proposedSumTotal;

    return {
      chopsPerGuest,
      totalChopsNeeded,
      totalDrinksNeeded,
      totalDessertsNeeded,
      proposedChopsValue,
      proposedDrinksValue,
      proposedDessertsValue,
      proposedSumTotal,
      isBudgetFeasible
    };
  }, [guestCount, budgetConstraint, eventType]);

  const handleApplyRecommendedPackage = () => {
    // Generate a hybrid menu item to bundle this dynamic catering config in the core cart
    const generatedPackageMenuItem: MenuItem = {
      id: `party-package-${Date.now()}`,
      name: `Assigned Party Package: ${eventType} Bundle (${guestCount} Guests)`,
      category: 'corporate',
      price: Math.min(budgetConstraint, calculatedMetrics.proposedSumTotal),
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=400',
      description: `Complete algorithmic event allocation for ${guestCount} attendees inside target budget. Holds ${calculatedMetrics.totalChopsNeeded} custom small chops, ${calculatedMetrics.totalDrinksNeeded} hibiscus zobos, and ${calculatedMetrics.totalDessertsNeeded} premium caramel dates puddings.`,
      ingredients: ['Savory Small Chops array', 'Artisanal hibiscus elderflower zobos', 'Baked French-Nigerian dessert cakes', 'Thermal lock delivery guarantee'],
      portionSizes: [`Elite Bundle configuration for ${guestCount} users`],
      availability: '48h Notice',
      isBestSeller: false,
      rating: 5.0,
      reviewsCount: 1
    };

    addToCart(generatedPackageMenuItem, `Elite Bundle configuration for ${guestCount} users`);
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="party-planner-container">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">ALGORITHMIC EVENT METRICS</span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold">Catering Party Planner</h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 max-w-lg mx-auto leading-relaxed">
          Input guest aggregates, budget limits, and celebratory parameters to map recommended quantities directly to your final checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Grid: Option adjustments */}
        <div className="lg:col-span-6 bg-[#052E16]/40 p-6 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-[#FDFBF7] font-bold">Parameters Layout</h3>
            <p className="text-xs text-emerald-100/60">Fine tune targets using sliders and toggles.</p>
          </div>

          <div className="space-y-5">
            {/* Event Category dropdown */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#D4AF37]/80 font-bold mb-2">Celebration Category</label>
              <select 
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-emerald-950/60 border border-[#D4AF37]/25 py-3 px-3 rounded-lg text-xs text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
              >
                {EVENT_STYLES.map((st) => (
                  <option key={st.id} value={st.id}>{st.label}</option>
                ))}
              </select>
            </div>

            {/* Guest Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-100/80 font-bold">Guest Count Range</label>
                <div className="flex items-center gap-1.5 text-[#D4AF37]">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-serif font-black">{guestCount} Guests</span>
                </div>
              </div>
              <input 
                type="range"
                min="10"
                max="500"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[9px] font-mono text-emerald-100/40 mt-1">
                <span>10 (Intimate)</span>
                <span>250 (Mid-level Wedding)</span>
                <span>500 (Grand Kano Gala Banquet)</span>
              </div>
            </div>

            {/* Budget constraints input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-100/80 font-bold">Target Budget Allocation</label>
                <span className="font-mono text-[#D4AF37] font-bold text-sm">
                  ₦{budgetConstraint.toLocaleString()} NGN
                </span>
              </div>
              <input 
                type="range"
                min="50000"
                max="3000000"
                step="25000"
                value={budgetConstraint}
                onChange={(e) => setBudgetConstraint(parseInt(e.target.value))}
                className="w-full h-1.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[9px] font-mono text-emerald-100/40 mt-1">
                <span>₦50k</span>
                <span>₦1.5M</span>
                <span>₦3M+</span>
              </div>
            </div>
          </div>

          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-emerald-100/70 leading-relaxed font-sans">
              Our algorithmic ratios track historical metrics gathered during Zainab Bello’s work with the Kano and Gwale wedding chambers. It counts average waste margins, spice tolerance buffers, and heat locks.
            </p>
          </div>
        </div>

        {/* Right Grid: Algorithmic Output proposal Card */}
        <div className="lg:col-span-6 bg-gradient-to-tr from-[#052E16] to-emerald-950 text-[#FDFBF7] p-8 rounded-3xl border border-[#D4AF37]/25 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-4">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#052E16] bg-[#D4AF37] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/20 font-bold">Algorithmic Match</span>
              <h3 className="font-serif text-lg tracking-wide mt-1 text-[#FDFBF7] font-bold">Calculated Allocation</h3>
            </div>
            <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          </div>

          {/* Allocation Statistics items */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]/60">Essential Finger Snacks recommended</span>
              <div className="flex items-baseline justify-between pt-0.5">
                <span className="font-serif text-lg font-bold text-[#FDFBF7]">{calculatedMetrics.totalChopsNeeded} Chops total</span>
                <span className="text-[10px] font-mono text-emerald-100/50">({calculatedMetrics.chopsPerGuest} pcs / guest)</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]/60">Exotic Craft Bottled Beverages recommended</span>
              <div className="flex items-baseline justify-between pt-0.5">
                <span className="font-serif text-lg font-bold text-[#FDFBF7]">{calculatedMetrics.totalDrinksNeeded} Bottles total</span>
                <span className="text-[10px] font-mono text-emerald-100/50">(Elderflower Hibiscus craft)</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]/60">Baked Premium Dessert Slices recommended</span>
              <div className="flex items-baseline justify-between pt-0.5">
                <span className="font-serif text-lg font-bold text-[#FDFBF7]">{calculatedMetrics.totalDessertsNeeded} Portion pieces</span>
                <span className="text-[10px] font-mono text-emerald-100/50">(Vanilla-Cream crimson cake)</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D4AF37]/15 pt-4 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-100/50">Estimated Gourmet Costs:</span>
              <span className="text-xl font-mono text-[#D4AF37] font-black">
                ₦{calculatedMetrics.proposedSumTotal.toLocaleString()}
              </span>
            </div>

            {/* Budget status validation */}
            {!calculatedMetrics.isBudgetFeasible ? (
              <div className="bg-red-950/60 border border-red-800 p-3 rounded-lg flex items-start gap-2 text-[10px] text-red-100/80 font-sans">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                <span>
                  <strong>Target Limit Exceeded:</strong> Computed totals exceed your target budget. We have downscaled some premium portions to align, but recommend increasing bounds if catering luxury traditional weddings.
                </span>
              </div>
            ) : (
              <div className="bg-emerald-950 border border-[#D4AF37]/30 p-3 rounded-lg flex items-start gap-2 text-[10px] text-[#D4AF37] font-sans bg-[#D4AF37]/10">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-[#D4AF37] mt-0.5" />
                <span>
                  <strong>Optimal Configuration:</strong> Target budget perfectly fits standard portion recommendations. Zero wastage margin is active. Premium silver cutlery included.
                </span>
              </div>
            )}
          </div>

          {/* Action trigger checkout */}
          <div className="pt-2">
            <button
              id="party-planner-purchase"
              onClick={handleApplyRecommendedPackage}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] font-serif text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg border border-[#D4AF37]/25 transition-all text-center flex items-center justify-center gap-2 font-bold cursor-pointer"
            >
              <span>Adopt Recommended Package</span>
              <ArrowRight className="w-4 h-4 text-[#052E16]" />
            </button>
            <p className="text-[8px] text-center text-emerald-100/40 font-mono mt-3">
              *Adjust bounds anytime dynamically. Final selections editable in core basket.
            </p>
          </div>

        </div>

      </div>

      {/* Luxury feedback modal state */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#052E16] border border-[#D4AF37] max-w-md w-full p-8 rounded-3xl text-center space-y-6 shadow-2xl relative"
            >
              <div className="w-16 h-16 bg-[#D4AF37]/15 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block font-bold">Package Royal Integration</span>
                <h3 className="font-serif text-2xl tracking-wide text-[#FDFBF7] font-semibold">Catering Package Adopted</h3>
                <p className="text-xs text-emerald-100/70 leading-relaxed">
                  Your Algorithmic Catering Suite for <strong className="text-[#D4AF37] font-extrabold">{guestCount}</strong> guests is successfully formulated and placed in your basket. 
                </p>
              </div>

              <div className="bg-emerald-950/60 p-4 rounded-2xl text-left border border-[#D4AF37]/15 space-y-2">
                <div className="flex justify-between text-[11px] font-mono text-emerald-100/60 font-bold">
                  <span>Category type:</span>
                  <span className="text-[#FDFBF7] font-bold">{eventType} event</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-emerald-100/60">
                  <span>Custom components:</span>
                  <span className="text-[#FDFBF7] font-bold text-right leading-tight">
                    {calculatedMetrics.totalChopsNeeded} Chops, {calculatedMetrics.totalDrinksNeeded} Drinks, {calculatedMetrics.totalDessertsNeeded} Portions
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-emerald-100/60 border-t border-[#D4AF37]/15 pt-2 mt-2">
                  <span>Estimated Royal Invoice:</span>
                  <span className="text-[#D4AF37] font-bold font-mono">₦{calculatedMetrics.proposedSumTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setCurrentTab('menu'); // Redirect them to menu view or cart to checkout
                  }}
                  className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] font-serif text-xs uppercase tracking-widest py-3 rounded-xl font-bold cursor-pointer transition-all"
                >
                  Explore Sovereign Menu
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-transparent hover:bg-emerald-950 text-[#FDFBF7] border border-emerald-800 font-serif text-[10px] uppercase tracking-widest py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Configure More Params
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
