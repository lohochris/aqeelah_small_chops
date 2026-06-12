/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Compass, Navigation, Clock, Sparkles, CheckCircle, ExternalLink, GraduationCap, Map
} from 'lucide-react';

interface RouteOption {
  id: string;
  originName: string;
  distance: string;
  duration: string;
  steps: string[];
}

export default function InteractiveLocationMap() {
  const [viewMode, setViewMode] = React.useState<'live' | 'blueprint'>('live');

  // Exact coordinates: 11.9682, 8.4908 (Janbulo, Kano)
  const latitude = 11.9682;
  const longitude = 8.4908;
  const coordinatesString = `${latitude},${longitude}`;
  const verifiedAddress = "House No. 14, Janbulo First Gate, Near Bayero University Kano (BUK) Entrance, Gwale LGA, Kano State, Nigeria";

  const routes: RouteOption[] = [
    {
      id: 'kano-airport',
      originName: 'Mallam Aminu Kano International Airport (KAN)',
      distance: '10.2 km',
      duration: '18 mins',
      steps: [
        'Head southwest on Airport Road toward Katsina Road.',
        'At the roundabout, take the 3rd exit onto Katsina Road.',
        'Drive down past Kofar Ruwa and merge onto Kabuga/BUK Road.',
        'At BUK Old Site Roundabout, take the first right heading toward Gwale/Janbulo.',
        'Turn right at Janbulo First Gate; our headquarters will be on your left.'
      ]
    },
    {
      id: 'kano-centre',
      originName: 'Bristol Palace Hotel / Kano Centre',
      distance: '8.4 km',
      duration: '14 mins',
      steps: [
        'Head west on Guda Abdullahi Road toward State Road.',
        'Merge onto State Road and continue toward Sabo Bakin Zuwo Road.',
        'Follow Sabo Bakin Zuwo Road westward straight onto Kabuga Road.',
        'Under the Kabuga Flyover, merge toward BUK entrance avenue.',
        'Turn left at the Janbulo First Gate intersection to arrive.'
      ]
    }
  ];

  const [selectedRouteId, setSelectedRouteId] = React.useState(routes[0].id);
  const activeRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  // Auto-inject verified JSON-LD for Search Engine Optimization
  React.useEffect(() => {
    const localSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Small Chops by Aqeelah - Gourmet Office & Kitchen Headquarters",
      "description": "Premium catering service offering the best Small Chops in Kano, featuring gourmet samosas, gold-brushed pastries, puff platters, spring rolls, and traditional northern Nigerian delicacies.",
      "image": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200",
      "founder": {
        "@type": "Person",
        "name": "Zainab Bello Sule"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "House No. 14, Janbulo First Gate, Near BUK Entrance",
        "addressLocality": "Gwale LGA, Kano",
        "addressRegion": "Kano State",
        "addressCountry": "NG",
        "postalCode": "700261"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": latitude,
        "longitude": longitude
      },
      "telephone": "+2348166217586",
      "url": "https://smallchops-by-aqeelah.com",
      "priceRange": "₦₦",
      "servesCuisine": "Traditional Northern Nigerian Small Chops, Gourmet Desserts, Samosas, Spring Rolls",
      "areaServed": "Kano Metropolitan Area, Gwale LGA, Nassarawa, Janbulo, Tarauni"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'aqeelah-precise-seo-schema';
    script.innerHTML = JSON.stringify(localSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('aqeelah-precise-seo-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Web intent for Google Maps direction (opens native iOS/Android navigation apps transparently in-place)
  const handleTriggerDrivingDirections = () => {
    const mapsIntentUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinatesString}`;
    window.open(mapsIntentUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="interactive-location-map">
      
      {/* 1. Luxurious Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full px-4 py-1.5 text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Verified Gourmet Headquarters</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold tracking-tight">
          Locate Our Kitchen <span className="text-[#D4AF37]">Headquarters</span>
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-sans max-w-2xl mx-auto">
          Our world-class testing salon and production headquarters is located in Kano’s prestigious Gwale ward, right at the BUK entry point. Visit us or track our distance to your upcoming event.
        </p>

        {/* Precise Location Banner */}
        <div className="bg-[#042A14]/80 border border-[#D4AF37]/25 p-4 rounded-2xl inline-flex flex-col sm:flex-row items-center gap-3 mt-2 text-left shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] flex-shrink-0 animate-pulse">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-wider font-bold">Official Physical Address</h4>
            <p className="text-xs sm:text-sm text-emerald-100/95 font-serif font-medium mt-0.5 leading-relaxed">
              14 Janbulo Road, First Gate near BUK Entrance, Gwale, Kano, Nigeria
            </p>
          </div>
        </div>
      </div>

      {/* 2. Map Visualizer & Direction Engine Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Map Panel Card */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-emerald-100/90 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>Interactive Location Radar</span>
            </span>
            
            {/* Map Mode Toggler */}
            <div className="flex bg-[#042A14] border border-[#D4AF37]/20 rounded-lg p-0.5 text-[10px] font-mono uppercase tracking-wider">
              <button
                onClick={() => setViewMode('live')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'live' 
                    ? 'bg-[#D4AF37] text-[#052E16] font-bold' 
                    : 'text-emerald-100/60 hover:text-white'
                }`}
              >
                Live Google Maps
              </button>
              <button
                onClick={() => setViewMode('blueprint')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'blueprint' 
                    ? 'bg-[#D4AF37] text-[#052E16] font-bold' 
                    : 'text-emerald-100/60 hover:text-white'
                }`}
              >
                Vector Blueprint
              </button>
            </div>
          </div>

          {/* Map Frame Card Container */}
          <div className="bg-emerald-950/40 border border-[#D4AF37]/20 rounded-3xl p-3 shadow-xl relative overflow-hidden flex-1 min-h-[360px] flex flex-col justify-between">
            {viewMode === 'live' ? (
              <div className="absolute inset-0 w-full h-full p-2 bg-emerald-950/40">
                <iframe 
                  src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  className="w-full h-full rounded-2xl relative z-10 border border-[#D4AF37]/15 shadow-inner"
                />
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-[#052E16] flex flex-col p-6 s justify-between relative z-10">
                {/* Simulated Vector Grid Blueprint background */}
                <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-md border border-[#D4AF37]/25">
                      Vector Alignment Matrix
                    </span>
                    <h5 className="font-serif text-sm font-semibold text-[#FDFBF7] mt-2">Janbulo - BUK Grid Intersection</h5>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] animate-spin" style={{ animationDuration: '16s' }}>
                    <Compass className="w-4 h-4" />
                  </div>
                </div>

                {/* Grid Visual */}
                <div className="h-44 border border-[#D4AF37]/10 rounded-2xl relative bg-[#042A14] overflow-hidden my-4 flex items-center justify-center">
                  <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-[#D4AF37]/10 rotate-12 border-x border-[#D4AF37]/5" />
                  <div className="absolute left-0 right-0 top-1/2 h-3 bg-[#D4AF37]/10 -rotate-3 border-y border-[#D4AF37]/5" />

                  {/* BUK Entrance Landmark */}
                  <div className="absolute left-1/3 top-1/4 bg-emerald-950 border border-[#D4AF37]/30 rounded-lg p-1.5 flex flex-col items-center justify-center text-[8px] font-mono">
                    <GraduationCap className="w-4.5 h-4.5 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] font-bold mt-1">BUK ENTRANCE</span>
                  </div>

                  {/* Headquarters Hub Pin */}
                  <div className="absolute right-1/4 bottom-1/4 bg-[#D4AF37] border-2 border-[#052E16] text-[#052E16] rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-[10px] shadow-lg animate-bounce">
                    <MapPin className="w-3.5 h-3.5 fill-current" />
                    <span className="font-serif font-black">HOUSE No. 14 HQ</span>
                  </div>
                </div>

                {/* System Coordinate readouts */}
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-100/60 border-t border-emerald-500/10 pt-2 shrink-0">
                  <div>LATITUDE: <strong className="text-white">{latitude.toFixed(4)} N</strong></div>
                  <div>LONGITUDE: <strong className="text-white">{longitude.toFixed(4)} E</strong></div>
                  <div>SYSTEM STATE: <strong className="text-emerald-400">INDEXED</strong></div>
                </div>
              </div>
            )}
          </div>

          {/* Web driving directions Button */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=11.9682,8.4908"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] py-3.5 px-6 rounded-2xl font-serif font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] shrink-0 border border-[#D4AF37]/50 text-center cursor-pointer"
          >
            <Navigation className="w-4 h-4 fill-current animate-bounce" />
            <span>Get Driving Directions (Google / Apple Maps App)</span>
          </a>
        </div>

        {/* Driving Directions Engine Routing Steps card */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-emerald-950/40 border border-[#D4AF37]/20 p-6 rounded-3xl space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">Quick Routing Guide</span>
                <h3 className="font-serif text-md font-bold text-[#FDFBF7]">Kano Municipal Route Calculator</h3>
              </div>

              {/* Select starting target */}
              <div className="space-y-2">
                <span className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/50 font-semibold">Select Target Airport or Spot:</span>
                <div className="space-y-1.5">
                  {routes.map((rt) => (
                    <button
                      key={rt.id}
                      onClick={() => setSelectedRouteId(rt.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                        selectedRouteId === rt.id 
                          ? 'bg-[#042A14] border-[#D4AF37] text-white' 
                          : 'bg-[#042A14]/30 border-emerald-500/5 text-emerald-100/60 hover:text-[#D4AF37]'
                      }`}
                    >
                      <span className="font-sans font-medium">{rt.originName}</span>
                      <span className="font-mono text-[10px] text-[#D4AF37] font-semibold">{rt.distance}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Turn-by-turn list */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoute.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-[#052E16]/70 border border-[#D4AF37]/10 p-4.5 rounded-2xl space-y-3"
                >
                  <div className="flex justify-between items-center text-xs font-mono border-b border-[#D4AF37]/10 pb-2">
                    <span className="text-emerald-100/50">Est. Transit Duration:</span>
                    <span className="text-[#D4AF37] font-bold">{activeRoute.duration}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-emerald-100/50 font-bold">Directions:</span>
                    <ol className="list-decimal pl-4 space-y-2 text-xs text-emerald-100/80 leading-relaxed font-sans font-medium">
                      {activeRoute.steps.map((stp, idx) => (
                        <li key={idx}>{stp}</li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Note bar */}
            <div className="bg-[#D4AF37]/5 border-l-2 border-[#D4AF37] p-3 rounded-r-xl mt-4">
              <p className="text-[10px] text-emerald-100/70 leading-relaxed font-sans">
                💡 Entering BUK Old Site or Kabuga area? Search for "Janbulo First Gate" and locate House No. 14 on the left side of the avenue. Punctual heat-seal container pickups occur hourly.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 2.5. Serving Areas & Delivery Radius Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" id="serving-areas-section">
        
        {/* Kano Serving Areas Card */}
        <div className="bg-[#052E16]/40 border border-[#D4AF37]/25 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full px-3 py-1 text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Catering Coverage Zones</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] font-bold">
              Key Kano Serving Districts
            </h3>
            <p className="text-xs text-emerald-100/70 leading-relaxed font-sans">
              Our high-speed kitchen dispatch team is stationed right in Gwale to guarantee maximum spice-freshness and heat locks upon arrival to these key metropolitan zones:
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              { name: 'Gwale LGA', highlight: true },
              { name: 'BUK (Old & New Site)', highlight: true },
              { name: 'Janbulo', highlight: true },
              { name: 'Nassarawa GRA', highlight: false },
              { name: 'Tarauni', highlight: false },
              { name: 'Kano Municipal', highlight: false },
              { name: 'State Road / GRA', highlight: false },
              { name: 'Hotoro', highlight: false },
              { name: 'Badawa', highlight: false },
            ].map((zone, idx) => (
              <span 
                key={idx}
                className={`text-xs px-3.5 py-1.5 rounded-full font-mono tracking-wider transition-all duration-300 border ${
                  zone.highlight 
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37] font-bold shadow-sm shadow-[#D4AF37]/10 scale-105' 
                    : 'bg-emerald-900/20 text-emerald-100/60 border-emerald-500/10'
                }`}
              >
                {zone.highlight && "✦ "}{zone.name}
              </span>
            ))}
          </div>
        </div>

        {/* Delivery Radius & Promptness Card */}
        <div className="bg-gradient-to-br from-emerald-950 to-[#042A14] border border-[#D4AF37]/25 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full px-3 py-1 text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              <span>Gourmet Delivery Guarantee</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] font-semibold">
              Rapid Transit Dispatch Radius
            </h3>
            <p className="text-xs text-emerald-100/70 leading-relaxed font-sans">
              We leverage thermal containment systems to verify temperatures exceed 75°C upon delivery. This premium treatment serves neighboring local customers with promptness and flavor retention:
            </p>
          </div>

          <div className="bg-[#052E16]/70 border border-[#D4AF37]/10 p-4.5 rounded-2xl">
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1 font-sans">
                <span className="block text-emerald-100/40 text-[9px] uppercase tracking-widest font-mono">Gwale, Janbulo, BUK:</span>
                <strong className="text-emerald-400 block font-serif text-sm">Within 35 - 45 Mins</strong>
                <span className="text-[10px] text-emerald-100/65 block">Immediate proximity hot-dropoff</span>
              </div>
              <div className="space-y-1 border-l border-emerald-500/10 pl-4 font-sans">
                <span className="block text-emerald-100/40 text-[9px] uppercase tracking-widest font-mono">Other Kano Districts:</span>
                <strong className="text-[#D4AF37] block font-serif text-sm">Within 60 Mins Max</strong>
                <span className="text-[10px] text-emerald-100/65 block">100% Sealed Thermal Chest transit</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Local SEO Optimization Matrix */}
      <div className="bg-gradient-to-tr from-emerald-950 via-[#052E16] to-emerald-950 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/25 shadow-xl space-y-6">
        <div className="border-b border-[#D4AF37]/15 pb-4">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">Kano Logistics Information Desk</span>
          <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] font-bold mt-0.5">Google Business Profiles & Catering Logistics</h3>
          <p className="text-xs text-emerald-100/60 mt-1 leading-relaxed">
            Our luxury transit operations are state-wide, temperature locked, and certified for executive catering dropoffs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-normal font-sans">
          <div className="bg-[#052E16]/80 p-5 rounded-2xl border border-emerald-500/10 space-y-2.5">
            <h5 className="font-serif text-[#D4AF37] font-bold text-sm">1. Accurate Coordinates Mapping</h5>
            <p className="text-emerald-100/70">
              Pinning our headquarters at <strong className="text-white">11.9682° N, 8.4908° E</strong> guarantees accurate logistics and coordinates matching for standard food dispatch and hot-box delivery tracks.
            </p>
          </div>

          <div className="bg-[#052E16]/80 p-5 rounded-2xl border border-emerald-500/10 space-y-2.5">
            <h5 className="font-serif text-[#D4AF37] font-bold text-sm">2. Keyword Anchor Seeding</h5>
            <p className="text-emerald-100/70">
              Optimized metadata supports state-level query targets: <strong className="text-white">"Traditional gourmet samosas", "gold-brushed pastries in Janbulo Gwale", "BUK road elite events"</strong>.
            </p>
          </div>

          <div className="bg-[#052E16]/80 p-5 rounded-2xl border border-emerald-500/10 space-y-2.5">
            <h5 className="font-serif text-[#D4AF37] font-bold text-sm">3. 100% Thermal Preservation</h5>
            <p className="text-emerald-100/70">
              Every package of luxury puff platters, zobo mocktail barrels, and crunchy sausage rolls is prepared at our Kano kitchen and packed in sealed insulated chests before leaving our headquarters.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
