/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Gift, Share2, Medal, Clock, Check, Users, Lock, Award, Crown, Info, ChevronRight, RotateCcw, ShoppingBag, Calendar, MapPin, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { luxuryAudio } from '../utils/audio';
import { Order, CartItem } from '../types';

interface LoyaltyProps {
  loyaltyPoints: number;
  onRedeemPoints: (points: number) => void;
  orders?: Order[];
  onReorder?: (items: CartItem[]) => void;
}

export const TIERS_CONFIG = [
  { 
    id: 'bronze', 
    name: 'Bronze Chops Elite', 
    minPoints: 0, 
    maxPoints: 149, 
    color: '#CD7F32', 
    bgGradient: 'from-[#CD7F32]/15 to-emerald-950/20',
    borderColor: 'border-[#CD7F32]/30',
    glowColor: 'shadow-[#CD7F32]/10',
    accentColor: 'text-[#CD7F32]',
    benefitSummary: 'Complimentary standard treats & birthday surprises',
    benefits: [
      'Priority 1-hour expedited delivery routing within Kano coordinates',
      'Surprise complimentary 6-piece Cinnamon Puff set on your birthday',
      'Standard gourmet catering reservations portal access'
    ]
  },
  { 
    id: 'silver', 
    name: 'Silver Chops Patron', 
    minPoints: 150, 
    maxPoints: 599, 
    color: '#A0A0A0', 
    bgGradient: 'from-[#A0A0A0]/15 to-emerald-950/20',
    borderColor: 'border-[#A0A0A0]/35',
    glowColor: 'shadow-[#A0A0A0]/10',
    accentColor: 'text-gray-300',
    benefitSummary: 'Free luxury setups & silver premium treats',
    benefits: [
      'All Bronze Tier Perks Included',
      'Zero base traditional wooden platter presentation & decoration setup fees',
      'Exclusive early tasting alerts of premium seasonal test recipes',
      'Reduced climate-controlled container shipping fees on orders over ₦50,000'
    ]
  },
  { 
    id: 'gold', 
    name: 'Gold Royal VIP', 
    minPoints: 600, 
    maxPoints: 999, 
    color: '#D4AF37', 
    bgGradient: 'from-[#D4AF37]/20 to-emerald-950/25',
    borderColor: 'border-[#D4AF37]/45',
    glowColor: 'shadow-[#D4AF37]/15',
    accentColor: 'text-[#D4AF37]',
    benefitSummary: 'Private tastings with Chef Zainab & dual star multipliers',
    benefits: [
      'All Silver Tier Perks Included',
      'Premium private sampling sessions directly scheduled with Chef Zainab Bello Sule',
      'Dual Star (2x) accumulation multipliers on festive holiday weekends',
      'Priority concierge hot-line for premium wedding and royal durbar gathers'
    ]
  },
  { 
    id: 'platinum', 
    name: 'Platinum Sovereign Emperor', 
    minPoints: 1000, 
    maxPoints: Infinity, 
    color: '#E5E4E2', 
    bgGradient: 'from-[#E5E4E2]/25 to-emerald-950/30',
    borderColor: 'border-[#E5E4E2]/50',
    glowColor: 'shadow-[#E5E4E2]/20',
    accentColor: 'text-zinc-100',
    benefitSummary: 'Physical gold-foiled card & bespoke signature service',
    benefits: [
      'All Gold Tier Perks Included',
      'Custom-crafted personal gold-foiled Aqeelah Imperial Card dispatched directly to your address',
      'Unlimited complimentary climate-insulated shipping across all major Kano State coordinates',
      'Instant culinary interventions (custom customized appetizers and off-menu savories request on demand)',
      'Sovereign executive lounge privileges for regional durbar & modern elite galas'
    ]
  }
];

export default function Loyalty({ 
  loyaltyPoints, 
  onRedeemPoints,
  orders = [],
  onReorder
}: LoyaltyProps) {
  const [referralName, setReferralName] = React.useState('');
  const [generatedRefCode, setGeneratedRefCode] = React.useState('');
  const [redeemedToast, setRedeemedToast] = React.useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(null);

  const loyaltyPointsNum = loyaltyPoints;
  const currentTierIdx = loyaltyPointsNum >= 1000 ? 3 : (loyaltyPointsNum >= 600 ? 2 : (loyaltyPointsNum >= 150 ? 1 : 0));
  const currentTier = TIERS_CONFIG[currentTierIdx];
  const nextTier = currentTierIdx < 3 ? TIERS_CONFIG[currentTierIdx + 1] : null;

  // Selected tier for visual detail inspection, defaults to user's current tier
  const [activeInspectedTierIdx, setActiveInspectedTierIdx] = React.useState<number>(currentTierIdx);

  // Sync state if loyalty points change
  React.useEffect(() => {
    setActiveInspectedTierIdx(currentTierIdx);
  }, [currentTierIdx]);

  // Let's compute exact target progress bar stats
  let progressInPercentage = 0;
  let pointsNeededForNext = 0;
  if (nextTier) {
    const rangeSpan = nextTier.minPoints - currentTier.minPoints;
    const accumulatedInRange = loyaltyPointsNum - currentTier.minPoints;
    progressInPercentage = Math.round((Math.max(0, accumulatedInRange) / rangeSpan) * 100);
    pointsNeededForNext = nextTier.minPoints - loyaltyPointsNum;
  } else {
    progressInPercentage = 100;
    pointsNeededForNext = 0;
  }

  const REWARD_STORE = [
    { points: 150, prize: 'Warm Box of 12 Cinnamon Puff Puffs', value: '₦9,500 value' },
    { points: 300, prize: '2 Glass Liters of Craft Elderflower Zobo', value: '₦12,000 value' },
    { points: 600, prize: 'Imperial Golden 60-Piece Platter Upgrade', value: '₦48,000 value' },
    { points: 1000, prize: 'Exclusive Home Dining Cook Service session', value: 'Bespoke Private Service' }
  ];

  const handleCreateReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralName) return;
    const cleanStr = referralName.replace(/\s+/g, '_').toUpperCase();
    const computedCode = `AQEELAH_${cleanStr}_${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedRefCode(computedCode);
  };

  const handleShareCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Small Chops by Aqeelah Referral',
        text: `Taste luxury with my referral code: ${generatedRefCode}! Get 10% off and earn 150 Royal Points.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`Use referral code [${generatedRefCode}] at Small Chops by Aqeelah to secure 10% off!`);
      alert("Referral code copied successfully to clipboard!");
    }
  };

  const handleRedeem = (p: number, prize: string) => {
    if (loyaltyPoints < p) {
      alert(`The crown requires ${p} Royal Points to unlock this privilege. Place more orders to gather stars!`);
      return;
    }
    onRedeemPoints(p);
    setRedeemedToast(prize);
    // Trigger standard sound cue
    luxuryAudio.playPaymentSuccessSound();
    setTimeout(() => setRedeemedToast(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="loyalty-hub">
      
      {/* Header banner */}
      <div className="text-center space-y-3">
        <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">THE ROYAL ENCLAVE</span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold">Gourmet Loyalty Center</h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 max-w-lg mx-auto leading-relaxed">
          Unlock high-society culinary privileges, redeem accrued star balances on fresh traditional snacks, and generate referral codes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Grid: VIP Progression and Spends */}
        <div className="lg:col-span-12 bg-gradient-to-tr from-[#052E16] to-[#03200f] text-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/35 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D4AF37]/15 pb-4 gap-3">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">STAR BALANCE & VISUAL TIERS</span>
              <h3 className="font-serif text-xl text-[#FDFBF7] mt-1 font-bold">Your Sovereign Honor Status</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                ★ {currentTier.name}
              </span>
              <Medal className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Points score display panel */}
            <div className="lg:col-span-4 bg-emerald-950/60 p-6 rounded-2xl border border-[#D4AF37]/15 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#D4AF37] font-semibold">Accumulated Balance</span>
              <div className="flex items-baseline justify-center sm:justify-start gap-1.5 mt-2">
                <span className="text-6xl font-mono text-[#D4AF37] font-black tracking-tight">{loyaltyPoints}</span>
                <span className="text-lg text-emerald-100/70 font-mono">★</span>
              </div>
              <p className="text-[11px] text-emerald-100/50 font-sans mt-2">
                Every stellar purchase automatically gathers seeds for traditional culinary redemptions.
              </p>
            </div>

            {/* Immediate Next Milestone Gauge panel */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-[#FDFBF7] mb-1.5">
                  <span className="flex items-center gap-1">
                    Current: <strong className="text-[#D4AF37]">{currentTier.name}</strong>
                  </span>
                  {nextTier ? (
                    <span className="text-emerald-100/80">
                      Next Milestone: <strong className="text-[#D4AF37]">{nextTier.name} ({nextTier.minPoints}★)</strong>
                    </span>
                  ) : (
                    <span className="text-emerald-300 font-serif italic">★ Maximum Royal Heights Secured</span>
                  )}
                </div>

                {/* Progress bar to next tier */}
                <div className="w-full bg-[#02180b] h-4 rounded-full overflow-hidden border border-[#D4AF37]/30 p-0.5 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-[#CD7F32] via-[#D4AF37] to-[#E5E4E2] h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${Math.min(100, progressInPercentage)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-emerald-100/50 mt-2">
                  <span>Current Range: {currentTier.minPoints}★ to {currentTier.maxPoints === Infinity ? '∞' : `${currentTier.maxPoints}★`}</span>
                  <span>{progressInPercentage}% completed</span>
                </div>
              </div>

              {/* Countdown Alert or congratulatory banner */}
              <div className="bg-[#052e16]/40 p-3.5 rounded-xl border border-[#D4AF37]/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0 border border-[#D4AF37]/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  {nextTier ? (
                    <span>
                      Masha Allah! You are only <strong className="text-[#D4AF37] font-mono text-sm">{pointsNeededForNext} Royal Stars ★</strong> away from climbing to the esteemed <strong className="text-[#D4AF37]">{nextTier.name}</strong> coordinate.
                    </span>
                  ) : (
                    <span>
                      Verily, you reign as an Imperial <strong className="text-zinc-100">Sovereign Platinum Emperor</strong>. All premium menus, luxury setup packages, and elite private degustations are unlocked.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tier Progression Matrix Line */}
          <div className="pt-4 border-t border-[#D4AF37]/10">
            <span className="block text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-3.5 font-semibold text-center sm:text-left">
              Click any Tier below to inspect Premium Privileges & Rewards Catalog
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {TIERS_CONFIG.map((tier, idx) => {
                const isUserCurrentClass = currentTierIdx === idx;
                const isUnlocked = loyaltyPointsNum >= tier.minPoints;
                const isInspected = activeInspectedTierIdx === idx;

                return (
                  <button
                    key={tier.id}
                    onClick={() => {
                      setActiveInspectedTierIdx(idx);
                      // Soft touch indicator sound
                      luxuryAudio.playPaymentSuccessSound();
                    }}
                    className={`p-4 rounded-xl text-left border transition-all duration-300 relative select-none cursor-pointer overflow-hidden ${
                      isInspected 
                        ? `bg-gradient-to-b ${tier.bgGradient} ${tier.borderColor} ring-1 ring-[#D4AF37]/30 shadow-md`
                        : `bg-emerald-950/20 border-emerald-900/40 hover:border-[#D4AF37]/30 hover:bg-emerald-950/40`
                    }`}
                  >
                    {/* Active User Tier indicator badge */}
                    {isUserCurrentClass && (
                      <span className="absolute top-2 right-2 bg-[#D4AF37] text-[#052E16] text-[8px] font-mono uppercase font-black px-1.5 py-0.5 rounded-full select-none">
                        YOU ARE HERE
                      </span>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" 
                          style={{ backgroundColor: `${tier.color}30`, color: tier.color }}
                        >
                          {idx + 1}
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-[#FDFBF7]" style={{ color: isInspected ? tier.color : undefined }}>
                          {tier.name}
                        </h4>
                      </div>

                      <p className="text-[10px] font-mono text-emerald-100/50">
                        {tier.minPoints}★ {tier.maxPoints === Infinity ? 'and above' : `to ${tier.maxPoints}★`}
                      </p>

                      <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#D4AF37]/10">
                        <span className={`font-mono text-[9px] uppercase tracking-wider font-bold ${isUnlocked ? 'text-emerald-400' : 'text-zinc-500'}`}>
                          {isUnlocked ? '✦ Unlocked' : '🔒 Locked Tier'}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isInspected ? 'translate-x-1 text-[#D4AF37]' : 'text-emerald-100/30'}`} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Tier Perks Detail Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeInspectedTierIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-5 sm:p-6 rounded-2xl border bg-gradient-to-br ${TIERS_CONFIG[activeInspectedTierIdx].bgGradient} ${TIERS_CONFIG[activeInspectedTierIdx].borderColor} space-y-4`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D4AF37]/15 pb-3">
                  <div>
                    <h5 className="font-serif text-base font-bold text-[#FDFBF7] flex items-center gap-2">
                      <Award className="w-5 h-5" style={{ color: TIERS_CONFIG[activeInspectedTierIdx].color }} />
                      <span>{TIERS_CONFIG[activeInspectedTierIdx].name} Benefits Station</span>
                    </h5>
                    <p className="text-[11px] text-emerald-100/70 italic mt-0.5">
                      {TIERS_CONFIG[activeInspectedTierIdx].benefitSummary}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-[#D4AF37]">
                    Requirements: <strong className="font-bold text-sm tracking-tight">{TIERS_CONFIG[activeInspectedTierIdx].minPoints}★</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="block text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] font-semibold">Exquisite Privileges & Perks</span>
                    <ul className="space-y-2.5">
                      {TIERS_CONFIG[activeInspectedTierIdx].benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs text-emerald-100/85 leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-950/55 p-4 rounded-xl border border-emerald-900/50 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider font-bold">
                        <Info className="w-3.5 h-3.5" />
                        <span>Executive Chef Note</span>
                      </div>
                      <p className="font-serif text-xs italic text-emerald-100/70 leading-relaxed">
                        {activeInspectedTierIdx === 0 && `"Masha Allah! Welcome to your gourmet start. As an Elite member, our home kitchen treats your plates with professional warmth."`}
                        {activeInspectedTierIdx === 1 && `"Your loyalty blooms beautifully! Our traditional wood platter arrangements are set up elegantly to reflect your Silver status."`}
                        {activeInspectedTierIdx === 2 && `"Exquisite honor, Gold VIP patron. I look forward to personally greeting you at our next signature sampling session."`}
                        {activeInspectedTierIdx === 3 && `"The zenith of Northern luxury. You command our ultimate priority and customized recipe orchestration with royal prestige."`}
                      </p>
                    </div>

                    <div className="text-[9px] font-mono text-emerald-100/40">
                      — Chef Zainab Bello Sule, Janbulo Kano
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
 
        {/* Right Grid: Referral program */}
        <div className="lg:col-span-6 bg-[#052E16]/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-6">
          <div className="space-y-1.5 border-b border-[#D4AF37]/15 pb-4">
            <span className="block text-[8px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">RECRUIT AND MULTIPLY PRIVILEGES</span>
            <h3 className="font-serif text-lg text-[#FDFBF7] font-bold">Gold Referral Network</h3>
            <p className="text-xs text-emerald-100/60 leading-relaxed font-sans">
              Equip brides, colleagues, and event planners with your custom code. They secure 10% off checkout, and you accrue <span className="text-[#D4AF37] font-semibold">150 Royal Stars</span> automatically upon verified transactions!
            </p>
          </div>

          <form onSubmit={handleCreateReferral} className="flex gap-2.5 font-sans">
            <input 
              type="text"
              required
              value={referralName}
              onChange={(e) => setReferralName(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-emerald-950/60 border border-[#D4AF37]/25 rounded-lg text-xs text-[#FDFBF7] outline-none"
              placeholder="Input client name (e.g. Chief Sule)"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] font-serif text-xs uppercase tracking-widest px-5 rounded-lg transition-colors border border-amber-500/10 font-bold cursor-pointer"
            >
              Configure Code
            </button>
          </form>

          {/* Render compiled code and share handle */}
          {generatedRefCode && (
            <div className="bg-[#D4AF37]/10 p-4 rounded-xl border-2 border-dashed border-[#D4AF37]/45 flex items-center justify-between gap-4">
              <div>
                <span className="block text-[8px] font-mono text-emerald-100/50">COMPILED CODES:</span>
                <strong className="text-base font-mono text-[#FDFBF7] font-black">{generatedRefCode}</strong>
              </div>
              <button
                onClick={handleShareCode}
                className="bg-[#D4AF37] text-[#052E16] p-2.5 rounded hover:bg-[#C5A028] transition-colors flex items-center gap-1.5 text-xs font-mono font-bold uppercase cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 text-[10px] text-emerald-100/50 bg-emerald-950/40 p-2 rounded">
            <Users className="w-4 h-4 text-[#D4AF37]" />
            <span>* Points accrue only upon completed bank verification checkouts.</span>
          </div>
        </div>

      </div>

      {/* Modern High-Fidelity Personal Order History & Tracking Dashboard */}
      <div className="bg-[#052E16]/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-6" id="personal-order-history-dashboard">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D4AF37]/15 pb-4 gap-3">
          <div>
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">Patron Portal Ledger</span>
            <h3 className="font-serif text-2xl text-[#FDFBF7] mt-0.5 font-bold flex items-center gap-2">
              <ShoppingBag className="w-5.5 h-5.5 text-[#D4AF37]" />
              <span>Your Luxury Order History & Live Tracker</span>
            </h3>
            <p className="text-xs text-emerald-100/60 font-sans mt-1">
              Re-explore past culinary arrays and track real-time delivery timelines monitored directly by Chef Zainab.
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-mono border border-[#D4AF37]/20 font-bold">
              Total Transactions: {orders.length}
            </span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="p-8 text-center bg-emerald-950/20 border border-[#D4AF37]/15 rounded-2xl italic font-mono text-emerald-100/40 text-xs">
            No previous transactions detected in this active session. Place an order at Checkout to initiate tracking.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => {
              const isExpanded = expandedOrderId === ord.id;
              
              // Status Badge configuration
              const statusConfig = {
                'Order Received': { bg: 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/35', label: 'Received' },
                'Preparing': { bg: 'bg-orange-950/80 text-orange-400 border-orange-500/30', label: 'Preparing' },
                'Packaging': { bg: 'bg-yellow-950/80 text-yellow-500 border-yellow-500/30', label: 'Packaging' },
                'Out for Delivery': { bg: 'bg-indigo-950/80 text-indigo-400 border-indigo-500/30', label: 'Out Enroute' },
                'Delivered': { bg: 'bg-green-950/80 text-green-400 border-green-500/30', label: 'Delivered' }
              }[ord.status] || { bg: 'bg-emerald-950/40 text-emerald-100/60 border-[#D4AF37]/15', label: ord.status };

              const itemsCount = ord.items.reduce((sum, item) => sum + item.quantity, 0);

              return (
                <div 
                  key={ord.id} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded 
                      ? 'border-[#D4AF37]/45 bg-emerald-950/30 shadow-md' 
                      : 'border-[#D4AF37]/15 bg-emerald-950/10 hover:border-[#D4AF37]/30 hover:bg-emerald-950/20'
                  }`}
                >
                  {/* Order Card Summary Row */}
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                      <div>
                        <span className="block text-[8px] font-mono text-emerald-100/40 uppercase">Transaction ID</span>
                        <strong className="text-sm font-mono text-[#D4AF37] font-black">{ord.id}</strong>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-emerald-100/40 uppercase">Date Logged</span>
                        <span className="text-xs text-[#FDFBF7] font-medium flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-[#D4AF37]" />
                          <span>{ord.date}</span>
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-emerald-100/40 uppercase">Gourmet Array</span>
                        <span className="text-xs text-[#FDFBF7] font-bold block mt-0.5">
                          {itemsCount} {itemsCount === 1 ? 'snack item' : 'snack items'}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-emerald-100/40 uppercase">Fulfillment</span>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider font-bold border mt-0.5 ${statusConfig.bg}`}>
                          ● {statusConfig.label}
                        </span>
                      </div>
                    </div>

                    {/* Operational Actions */}
                    <div className="flex items-center gap-2 mt-2 md:mt-0 font-sans shrink-0">
                      {/* Premium Instant Reorder Action */}
                      <button
                        onClick={() => {
                          if (onReorder) {
                            onReorder(ord.items);
                          }
                        }}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-[#D4AF37] hover:from-yellow-400 hover:to-amber-500 text-[#052E16] text-[10px] font-serif font-black uppercase tracking-widest rounded-xl transition-all shadow-md select-none cursor-pointer outline-none active:scale-[0.98]"
                        title="Automatically clone this entire order back into your active shopping basket"
                      >
                        <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Reorder</span>
                      </button>

                      {/* Expand Details Trigger */}
                      <button
                        onClick={() => setExpandedOrderId(isExpanded ? null : ord.id)}
                        className="px-3.5 py-2 bg-emerald-950/60 border border-[#D4AF37]/25 text-[#D4AF37] rounded-xl hover:border-[#D4AF37] inline-flex items-center justify-center text-xs font-mono select-none cursor-pointer outline-none transition-all"
                      >
                        {isExpanded ? (
                          <span className="flex items-center gap-1">
                            <span>Collapse</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <span>Track & Details</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Visual tracking checkpoints and recipes lists */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-[#D4AF37]/15 bg-emerald-950/20 p-4 sm:p-6 space-y-6 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          
                          {/* Recipe list detail items */}
                          <div className="lg:col-span-6 space-y-3">
                            <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-black border-b border-[#D4AF37]/10 pb-1.5">
                              Consolidated Snack Items Breakdown
                            </h4>
                            <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                              {ord.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/60 border border-[#D4AF37]/10 text-xs">
                                  <div className="flex items-center gap-3">
                                    <img 
                                      src={item.product.image} 
                                      alt={item.product.name} 
                                      className="w-10 h-10 object-cover rounded-lg border border-[#D4AF37]/20 flex-shrink-0"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div>
                                      <h5 className="font-serif font-black text-[#FDFBF7]">{item.product.name}</h5>
                                      <p className="text-[9px] font-mono text-emerald-100/50 mt-0.5">
                                        Size: {item.selectedPortion} {item.customMessage ? ` | ${item.customMessage}` : ''}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right font-mono text-[10px] shrink-0">
                                    <span className="text-emerald-100/50 block">Qty: {item.quantity}</span>
                                    <span className="text-[#D4AF37] font-bold">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Consolidated Ledger Totals box */}
                            <div className="bg-emerald-950/80 p-3 rounded-xl border border-[#D4AF37]/15 text-[10px] font-mono space-y-1 text-emerald-100/70">
                              <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="text-[#FDFBF7]">₦{ord.subtotal?.toLocaleString() || ord.total.toLocaleString()}</span>
                              </div>
                              {ord.discount > 0 && (
                                <div className="flex justify-between text-red-400">
                                  <span>Custom Discount Badge:</span>
                                  <span>- ₦{ord.discount.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span>Secure Climate Insulated Courier Fee:</span>
                                <span className="text-[#FDFBF7]">₦{ord.deliveryFee?.toLocaleString() || '1,500'}</span>
                              </div>
                              <div className="flex justify-between border-t border-[#D4AF37]/15 pt-1.5 mt-1.5 text-xs text-[#D4AF37] font-bold">
                                <span>Absolute Total Sum Paid:</span>
                                <strong className="text-white">₦{ord.total.toLocaleString()}</strong>
                              </div>
                            </div>
                          </div>

                          {/* Live logistics tracking flow steps timeline */}
                          <div className="lg:col-span-6 space-y-3">
                            <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-black border-b border-[#D4AF37]/10 pb-1.5">
                              Real-Time Logistics Milestones
                            </h4>

                            <div className="relative pl-6 space-y-4 pt-1 font-mono text-[10px]">
                              {/* Connector line */}
                              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-emerald-900/60 border-l border-dashed border-[#D4AF37]/20" />

                              {[
                                { 
                                  key: 'received', 
                                  title: 'Order Received', 
                                  time: ord.receivedAt || ord.date, 
                                  desc: 'Patron transaction validated, checklist queued for prep.',
                                  active: true,
                                  highlightColors: 'text-[#D4AF37] border-[#D4AF37]' 
                                },
                                { 
                                  key: 'preparing', 
                                  title: 'Kitchen Preparation', 
                                  time: ord.preparingAt, 
                                  desc: 'Chef Zainab cooking & hand-rolling small chops inside Janbulo.',
                                  active: !!ord.preparingAt || ord.status === 'Preparing',
                                  highlightColors: 'text-orange-400 border-orange-500' 
                                },
                                { 
                                  key: 'packaging', 
                                  title: 'Delightful Packaging', 
                                  time: ord.packagingAt, 
                                  desc: 'Snacks locked into climate-regulated containers with fresh mint wraps.',
                                  active: !!ord.packagingAt || ord.status === 'Packaging',
                                  highlightColors: 'text-yellow-500 border-yellow-500' 
                                },
                                { 
                                  key: 'delivery', 
                                  title: 'Courier Out Enroute', 
                                  time: ord.outForDeliveryAt, 
                                  desc: 'Handed to premium chauffeur for real-time dispatch across Kano lanes.',
                                  active: !!ord.outForDeliveryAt || ord.status === 'Out for Delivery',
                                  highlightColors: 'text-indigo-400 border-indigo-500' 
                                },
                                { 
                                  key: 'delivered', 
                                  title: 'Patron Hand Delivery', 
                                  time: ord.deliveredAt, 
                                  desc: 'Order received with golden royal smiles. Enjoy your bite!',
                                  active: !!ord.deliveredAt || ord.status === 'Delivered',
                                  highlightColors: 'text-green-400 border-green-500' 
                                }
                              ].map((step, sIdx) => {
                                const isCurrentStateStep = 
                                  (ord.status === 'Order Received' && step.key === 'received') ||
                                  (ord.status === 'Preparing' && step.key === 'preparing') ||
                                  (ord.status === 'Packaging' && step.key === 'packaging') ||
                                  (ord.status === 'Out for Delivery' && step.key === 'delivery') ||
                                  (ord.status === 'Delivered' && step.key === 'delivered');

                                return (
                                  <div key={sIdx} className="relative space-y-1">
                                    {/* Timeline Node dot indicators */}
                                    <span className={`absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-emerald-950 flex items-center justify-center transition-all ${
                                      isCurrentStateStep 
                                        ? 'animate-pulse scale-125 border-[#D4AF37] bg-[#D4AF37]' 
                                        : step.active 
                                          ? 'border-emerald-400 bg-emerald-950 text-emerald-400' 
                                          : 'border-emerald-900 bg-[#02180b]'
                                    }`}>
                                      {step.active && !isCurrentStateStep && (
                                        <Check className="w-2 h-2 text-emerald-400" />
                                      )}
                                    </span>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                      <span className={`font-serif font-black text-xs ${step.active ? (isCurrentStateStep ? 'text-[#D4AF37]' : 'text-white') : 'text-emerald-100/30'}`}>
                                        {step.title} {isCurrentStateStep && '● Active Now'}
                                      </span>
                                      <span className={`text-[9px] ${step.active ? 'text-[#D4AF37]/90 font-bold' : 'text-emerald-100/30 font-medium'}`}>
                                        {step.active ? (step.time || 'Logged Now') : 'Awaiting kitchen progression...'}
                                      </span>
                                    </div>
                                    <p className={`text-[10px] leading-relaxed ${step.active ? 'text-emerald-100/70' : 'text-emerald-100/20'}`}>
                                      {step.desc}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Rewards Redeem table */}
      <div className="space-y-4 pt-4">
        <div className="space-y-1">
          <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">Accrued stars catalog redemption</span>
          <h3 className="font-serif text-2xl text-[#FDFBF7] font-semibold">Royal Treasury Redeemable Prizes</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REWARD_STORE.map((prize, idx) => {
            const isAffordable = loyaltyPoints >= prize.points;
            return (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border flex flex-col justify-between hover:shadow-md transition-all ${
                  isAffordable 
                    ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/35 shadow-sm' 
                    : 'bg-emerald-950/20 border border-[#D4AF37]/15'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#D4AF37] text-[#052E16] font-mono font-black text-xs px-2.5 py-0.5 rounded-full">
                      {prize.points}★
                    </span>
                    <Gift className={`w-4 h-4 ${isAffordable ? 'text-[#D4AF37] animate-pulse' : 'text-emerald-100/25'}`} />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#FDFBF7]">{prize.prize}</h4>
                  <p className="text-[10px] text-[#D4AF37] font-mono font-bold">{prize.value}</p>
                </div>

                <div className="border-t border-[#D4AF37]/15 pt-3 mt-4">
                  <button
                    onClick={() => handleRedeem(prize.points, prize.prize)}
                    className={`w-full py-2.5 rounded text-[9px] font-mono uppercase tracking-widest font-black cursor-pointer ${
                      isAffordable 
                        ? 'bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] shadow-sm font-bold' 
                        : 'bg-emerald-950/25 text-emerald-100/20 border border-[#D4AF37]/10 cursor-not-allowed'
                    }`}
                  >
                    {isAffordable ? 'Unlock privilege' : 'Locked star level'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {redeemedToast && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-6 right-6 bg-gradient-to-tr from-[#052E16] to-[#043318] border-2 border-[#D4AF37] text-[#FDFBF7] rounded-2xl p-4 shadow-2xl max-w-sm z-50 font-mono text-center flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] flex-shrink-0 animate-pulse border border-[#D4AF37]/25">
                <Medal className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="text-left font-sans text-xs">
                <strong className="text-[#D4AF37] block font-serif text-sm">Privilege Activated!</strong>
                Your free custom gift item <strong>"{redeemedToast}"</strong> has been successfully associated to our kitchen queue!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
