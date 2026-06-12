/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Video, Heart, MapPin, Clock, Building, Sparkles, Settings, Crown, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ConciergeSuiteHubProps {
  setCurrentTab: (tab: string) => void;
}

export default function ConciergeSuiteHub({ setCurrentTab }: ConciergeSuiteHubProps) {
  const { t } = useLanguage();

  const services = [
    {
      id: 'consultation',
      title: t('nav_consultation', 'Talk with Aqeelah'),
      icon: Video,
      desc: 'Connect with Chef Zainab Bello Sule through live interactive chat, private video sessions, and custom spice-lore consults.',
      badge: 'Highly Premium',
      color: 'from-amber-500/10 to-emerald-500/10'
    },
    {
      id: 'meet-aqeelah',
      title: t('nav_meet_aqeelah', 'Meet Aqeelah'),
      icon: Heart,
      desc: 'Our rich heritage, the fine geometry of our puff recipes, and the deep culinary philosophy powering our Kano & Abuja kitchens.',
      badge: 'Heritage Story',
      color: 'from-pink-500/10 to-emerald-500/10'
    },
    {
      id: 'location',
      title: t('nav_location', 'Our Location'),
      icon: MapPin,
      desc: 'Visit our flagship small chops boutiques in Kano or Maitama Abuja. Explore maps, operating hours, and curbside order pickup lanes.',
      badge: 'Boutiques',
      color: 'from-blue-500/10 to-emerald-500/10'
    },
    {
      id: 'party-planner',
      title: t('nav_party_planner', 'Event Planner'),
      icon: Clock,
      desc: 'An intelligent algorithmic calculator to estimate portion counts, guest volumes, heat locks, and tray quantities automatically.',
      badge: 'Intelligent App',
      color: 'from-purple-500/10 to-emerald-500/10'
    },
    {
      id: 'reminders',
      title: t('nav_reminders', 'Anniversary Reminders'),
      icon: Crown,
      desc: 'Never miss an elite milestone again. Program automated SMS reminders to surprise family, boardroom partners, or social groups with dodo trays.',
      badge: 'VIP Automation',
      color: 'from-yellow-500/20 to-emerald-500/10'
    },
    {
      id: 'corporate',
      title: t('nav_corporate', 'Corporate Office'),
      icon: Building,
      desc: 'Seamless boardroom lunch coordination, executive catering contracts, monthly subscriptions, and elegant courier packaging.',
      badge: 'Executive Desk',
      color: 'from-teal-500/10 to-emerald-500/10'
    },
    {
      id: 'loyalty',
      title: t('nav_loyalty', 'Royal Loyalty'),
      icon: Sparkles,
      desc: 'Track your accumulated Star Points. Uncover your regional culinary rank, redeem star discount vouchers, and unlock private tasting menu invitations.',
      badge: 'Royal Rewards',
      color: 'from-amber-500/20 to-emerald-500/10'
    },
    {
      id: 'admin',
      title: t('nav_admin', 'Maitama Admin'),
      icon: Settings,
      desc: 'The centralized dashboard to trace real-time logistics steps, manage active orders, test coupons, and adjust regional server parameters.',
      badge: 'Control Tower',
      color: 'from-gray-500/10 to-emerald-500/10'
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-14 max-w-7xl mx-auto space-y-12" id="concierge-hub-page">
      {/* Exquisite Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full text-xs font-mono text-[#D4AF37] tracking-widest uppercase"
        >
          <Crown className="w-3.5 h-3.5" />
          <span>Sovereign Concierge Cabinet</span>
        </motion.div>
        
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] tracking-tight leading-tight">
          The Luxury <span className="font-serif italic text-[#D4AF37]">Concierge Suite</span>
        </h2>
        
        <p className="text-sm sm:text-base text-emerald-100/70 font-sans leading-relaxed">
          Unlock your exclusive gateway to digital companion utilities, custom regional planning wizards, and elite catering. Click any portal below to interact seamlessly in full-dashboard focus.
        </p>
      </div>

      {/* Grid of Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setCurrentTab(service.id)}
              className={`group relative overflow-hidden rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-br ${service.color} p-6 hover:border-[#D4AF37]/50 hover:bg-[#052E16]/80 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-2xl hover:shadow-[#D4AF37]/5`}
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-950/85 text-[#D4AF37]/95 px-2.5 py-1 rounded-full border border-[#D4AF37]/15">
                    {service.badge}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-xs text-emerald-100/60 leading-relaxed font-sans line-clamp-3">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Action indicator at bottom */}
              <div className="mt-6 pt-4 border-t border-[#D4AF37]/10 flex items-center justify-between text-xs text-[#D4AF37]/80 font-mono group-hover:text-[#D4AF37] transition-colors">
                <span>Enter Suite</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>

              {/* Aesthetic background mesh effect for each item */}
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-[#D4AF37]/5 rounded-tl-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-colors pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* Culinary quote signature */}
      <div className="text-center pt-8 border-t border-[#D4AF37]/10">
        <p className="text-xs font-serif italic text-emerald-100/40">
          "We govern the fine details of dining so that you may govern the table." — Chef Zainab Bello Sule
        </p>
      </div>
    </div>
  );
}
