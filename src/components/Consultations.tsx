/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, Video, Send, FileText, CheckCircle, 
  MapPin, HelpCircle, Inbox, Award, MessageSquare, Loader, Trash2, ShieldAlert,
  Search, ChevronDown, ChevronUp, X
} from 'lucide-react';

interface Consultation {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  time: string;
  videoPlatform: 'Google Meet' | 'Zoom' | 'Microsoft Teams' | 'WebRTC';
  meetingLink: string;
  details: string;
  status: 'Confirmed' | 'Completed' | 'Pending';
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'Catering' | 'Pricing' | 'Delivery' | 'Customization' | 'Ingredients' | 'Policies';
}

const CONSULTATION_FAQS: FAQItem[] = [
  {
    question: 'How far in advance must I book Event Catering?',
    answer: 'For premium custom celebrations (Weddings, Corporate Gala dinners, Large Birthdays), we highly encourage 14 days in advance. However, standard Party Trays and smaller Event Box options can be prepared with a 24-hour to 48-hour notice depending on current order book volumes.',
    category: 'Catering'
  },
  {
    question: 'What specific ingredients are used in Aqeelah’s Samosa filling?',
    answer: 'Our signature crispy golden Samosas are handcrafted by Chef Zainab Bello Sule using dual-minced lean halal local beef (or tender chicken), aromatic green scallions, diced white onions, ground black pepper, fresh ginger, garlic, and our secret blend of northern spices. We never use artificial MSG, fillers, or preservatives.',
    category: 'Ingredients'
  },
  {
    question: 'Does Chef Zainab offer custom non-spicy adjustments under request?',
    answer: 'Absolutely. We respect all culinary preferences. While our hallmark is modern Northern Nigerian spice pairing, you can configure your spiciness tolerance directly inside EACH menu item before clicking "Add To Cart", or specify bespoke instructions in your catering booking form.',
    category: 'Customization'
  },
  {
    question: 'Are there gluten-free or completely vegan small chops options available?',
    answer: 'Yes! We craft several gluten-free and vegan-friendly culinary options. Our authentic Hausa Alkaki sweet wheaten twists, crispy golden fried Sweet Potatoes, and local Honey-glazed Awara (tofu) bites are entirely plant-based. Samosas and Spring Rolls can also be customized with full-vegetable fillings upon request.',
    category: 'Ingredients'
  },
  {
    question: 'What is your cancellation and booking modification policy?',
    answer: 'Event bookings cancelled more than 7 days prior to your scheduled celebration qualify for a 75% refund of the deposit. Cancellations made between 2 to 7 days qualify for a credit note of 50% toward future orders or trays within 12 months. Requests under 48 hours are non-refundable as fresh premium ingredients are already sourced.',
    category: 'Policies'
  },
  {
    question: 'How do you guarantee the freshness of scheduled gifts?',
    answer: 'All scheduled deliveries use our custom-insulated climate-controlled courier vehicles. Your hot small chops stay crispy inside thermal food locks, while desserts and sparkling zobos remain exactly at 4°C right to the celebrant’s doorstep.',
    category: 'Delivery'
  },
  {
    question: 'What states in Nigeria do you support for delivery?',
    answer: 'We currently run our state-of-the-art production headquarters in Kano (Janbulo, Gwale). For large-scale destination events, our executive custom cater teams travel anywhere across Northern Nigeria and beyond.',
    category: 'Delivery'
  },
  {
    question: 'What is the custom pricing framework for royal weddings?',
    answer: 'Our luxury wedding catering starts at ₦8,500 per guest. This premium rate includes a curated standard selection of authentic spiced minced beef samosas, crispy spring rolls, supreme peppered gizzards, native local puff varieties, elegant setup, and dedicated professional servers.',
    category: 'Pricing'
  },
  {
    question: 'Are there strict minimum order quotas for catering policies?',
    answer: 'For our bespoke on-the-spot live frying or buffet setup, there is a minimum requirement of 50 guests. For smaller gatherings or intimate house parties, we recommend building customized assorted party trays or luxury box packages via our Interactive Tray Builder with no minimum guest count.',
    category: 'Policies'
  },
  {
    question: 'Is there a setup and service charge for corporate events?',
    answer: 'Yes, for live on-site chef orchestration and corporate waiter services, we apply a standard 12% operational logistics fee. This secures interactive heating chafing dishes, premium branded serveware, and professional servers dressed in elegant traditional attire.',
    category: 'Pricing'
  },
  {
    question: 'Are there discounts available for very large orders of party trays?',
    answer: 'Yes! For guest counts exceeding 500 patrons, we offer a tiered discount starting at 5% off the premium base menu. You can also accrue and redeem points via our Royal Stars loyalty program during checkout to save automatically on repeat events.',
    category: 'Pricing'
  }
];

export default function Consultations() {
  const [clientName, setClientName] = React.useState('Chris loho');
  const [email, setEmail] = React.useState('lohochris@gmail.com');
  const [phone, setPhone] = React.useState('+2348166217586');
  const [eventType, setEventType] = React.useState('Weddings');
  const [date, setDate] = React.useState('2026-06-15');
  const [time, setTime] = React.useState('14:30');
  const [videoPlatform, setVideoPlatform] = React.useState<'Google Meet' | 'Zoom' | 'Microsoft Teams' | 'WebRTC'>('Google Meet');
  const [details, setDetails] = React.useState('Gourmet presentation designs for 400 VIP guests at General Hassan Usman Hall, Kano.');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successOverlay, setSuccessOverlay] = React.useState(false);
  const [whatsappTriggered, setWhatsappTriggered] = React.useState(false);
  const [emailTriggered, setEmailTriggered] = React.useState(false);

  const [faqSearch, setFaqSearch] = React.useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = React.useState<number | null>(null);

  const filteredFaqs = CONSULTATION_FAQS.filter(faq => {
    const query = faqSearch.toLowerCase();
    return faq.question.toLowerCase().includes(query) || 
           faq.answer.toLowerCase().includes(query) ||
           faq.category.toLowerCase().includes(query);
  });

  // default consultations logs stored locally
  const [consultations, setConsultations] = React.useState<Consultation[]>(() => {
    const local = localStorage.getItem('aqeelah_consultations');
    return local ? JSON.parse(local) : [
      {
        id: 'CON-9821',
        clientName: 'Alhaji Almustapha Aminu',
        email: 'aminu_mustapha@kanocombines.com',
        phone: '+234803920993',
        eventType: 'Corporate Events',
        date: '2026-06-10',
        time: '11:00',
        videoPlatform: 'Google Meet',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        details: 'High-Society Board retreat and launch of Northern Energy Bloc at Bristol Palace Kano.',
        status: 'Confirmed'
      }
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('aqeelah_consultations', JSON.stringify(consultations));
  }, [consultations]);

  const eventTypesList = [
    'Weddings', 'Birthdays', 'Corporate Events', 'Naming Ceremonies', 
    'Graduation Celebrations', 'Surprise Packages', 'Family Gatherings'
  ];

  const timeSlots = [
    '09:00', '10:30', '11:30', '13:00', '14:30', '15:30', '17:00'
  ];

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Create custom Google Meet link or other service link
      const platformLinks = {
        'Google Meet': 'https://meet.google.com/aqe-bello-sule',
        'Zoom': 'https://zoom.us/j/9921020302?pwd=AqeelahSecret',
        'Microsoft Teams': 'https://teams.microsoft.com/l/meetup-join/aqeelah',
        'WebRTC': 'https://meet.jit.si/SmallChopsByAqeelahConsultation'
      };

      const newCon: Consultation = {
        id: `CON-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName,
        email,
        phone,
        eventType,
        date,
        time,
        videoPlatform,
        meetingLink: platformLinks[videoPlatform],
        details,
        status: 'Confirmed'
      };

      setConsultations([newCon, ...consultations]);
      setIsSubmitting(false);
      setSuccessOverlay(true);
      
      // Auto-simulate notifications dispatching
      setWhatsappTriggered(true);
      setEmailTriggered(true);
    }, 1500);
  };

  const handleDeleteConsultation = (id: string) => {
    if (confirm("Are you sure you want to retract this royal consultation slot?")) {
      setConsultations(consultations.filter(c => c.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="consultation-hub">
      
      {/* 1. Header Hero Panel */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full px-3.5 py-1 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
          <Calendar className="w-3 h-3 text-[#D4AF37]" />
          <span>Talk With Aqeelah</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold tracking-tight">
          Sovereign Event <span className="text-[#D4AF37]">Consultations</span>
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-sans">
          Avoid standard generic package lists. Secure a private virtual video consultation with Founder & Executive Chef <strong>Zainab Bello Sule</strong> to detail and design custom trays for high-society wedding venues, corporate office openings, or surprise diaspora gifting initiatives.
        </p>
      </div>

      {/* 2. Interactive Booking Console Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Highly stylized form */}
        <div className="lg:col-span-7 bg-[#052E16]/50 border border-[#D4AF37]/25 p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-xl" />
          
          <h3 className="font-serif text-lg text-[#FDFBF7] mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <span>Schedule Chef Video Consultation</span>
          </h3>

          <form onSubmit={handleBookConsultation} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1.5Packed">Full Name / Patron Title</label>
                <input 
                  type="text" 
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                  placeholder="e.g. Alhaji Almustapha Aminu"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1.5">Direct phone (WhatsApp Enabled)</label>
                <input 
                  type="text" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none font-mono"
                  placeholder="e.g. +234 803 123 4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1.5">Email for meeting invite</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none font-mono"
                  placeholder="e.g. aminu@kanocourt.com"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1.5">Elite celebration Type</label>
                <select 
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-emerald-950 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none font-serif"
                >
                  {eventTypesList.map((et, index) => (
                    <option key={index} value={et}>{et}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1.5">Preferred Date</label>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1.5">Preferred Time (WAT)</label>
                <select 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-emerald-950 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none font-mono"
                >
                  {timeSlots.map((ts, index) => (
                    <option key={index} value={ts}>{ts} WAT - Slot Available</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1.5">Video Conferencing Platform</label>
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                  {(['Google Meet', 'Zoom', 'Microsoft Teams', 'WebRTC'] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setVideoPlatform(p)}
                      className={`p-2 rounded border cursor-pointer ${
                        videoPlatform === p 
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] font-semibold' 
                          : 'bg-emerald-950/20 border-emerald-100/10 text-emerald-100/60'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1.5">Patron Meeting scope details</label>
                <textarea 
                  value={details}
                  rows={2}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-2 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none font-sans"
                  placeholder="Detail menu requests, allergy scopes, specific VIP numbers..."
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] text-xs font-serif font-black uppercase tracking-widest py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer pt border border-[#D4AF37]"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 text-[#052E16] animate-spin" />
                  <span>Locking Slots on Chef Calendar...</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 text-[#052E16]" />
                  <span>Schedule Executive Consultation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right column: Explanatory and live interactive queues */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Elite hospitality cards */}
          <div className="bg-emerald-950/50 border border-[#D4AF37]/20 p-5 rounded-2xl space-y-3">
            <span className="text-[#D4AF37] font-serif text-sm block font-bold">Why Video Consultation?</span>
            <p className="text-xs text-emerald-100/70 leading-relaxed font-sans">
              To host an incredible reception in Kano State requires deep, creative, strategic curation. Zainab guides you personally on:
            </p>
            <ul className="text-xs text-emerald-100/90 font-mono space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Spice profile custom blending</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Temperature and timing logistics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Custom visual plating themes</span>
              </li>
            </ul>
          </div>

          {/* Realtime active logs */}
          <div className="bg-emerald-950/30 border border-[#D4AF37]/15 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-xs text-[#FDFBF7] uppercase tracking-wide font-bold">Your Booked Consultation Logs</h4>
              <span className="text-[9px] font-mono bg-emerald-900 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                {consultations.length} Active
              </span>
            </div>

            {consultations.length === 0 ? (
              <p className="text-xs text-emerald-100/40 text-center py-6">No scheduled meetings on this profile.</p>
            ) : (
              <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                {consultations.map((con) => (
                  <div key={con.id} className="bg-emerald-950/60 border border-emerald-500/10 p-3 rounded-xl flex items-start justify-between gap-2.5">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#D4AF37]">{con.id}</span>
                        <span className="text-[10px] bg-emerald-900 text-white px-1.5 py-0.5 rounded font-bold font-mono uppercase">{con.status}</span>
                      </div>
                      <h5 className="font-serif text-[#FDFBF7] font-semibold">{con.clientName}</h5>
                      <p className="text-[10px] text-emerald-100/60">{con.eventType}</p>
                      <p className="text-[10px] font-mono text-[#D4AF37]">
                        {con.date} at {con.time} WAT
                      </p>
                      
                      <div className="pt-1.5 flex items-center gap-2 text-[9px] font-mono">
                        <Video className="w-3.5 h-3.5 text-emerald-400" />
                        <a href={con.meetingLink} target="_blank" rel="noreferrer" className="text-emerald-400 font-bold border-b border-dashed border-emerald-400 hover:text-emerald-300">
                          Join {con.videoPlatform} Meet
                        </a>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDeleteConsultation(con.id)}
                      className="text-emerald-100/30 hover:text-red-400 p-1"
                      title="Cancel booking"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 3. Luxurious Interactive FAQ Section with live search */}
      <div className="border-t border-[#D4AF37]/15 pt-12 space-y-8" id="faq-interactive-section">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">
            Instant Clarity Core
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7] font-semibold tracking-tight">
            Consultation, Catering & Pricing <span className="text-[#D4AF37]">FAQs</span>
          </h3>
          <p className="text-xs text-emerald-100/60 leading-relaxed font-sans">
            Quickly filter through premium operational details, customized spice orchestration, delivery ranges, and royal billing frameworks.
          </p>
        </div>

        {/* Elegant searching toolbar container */}
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-250/50 group-focus-within:text-[#D4AF37] transition-colors">
            <Search className="w-4 h-4 text-emerald-100/40" />
          </div>
          <input 
            type="text"
            value={faqSearch}
            onChange={(e) => {
              setFaqSearch(e.target.value);
              setExpandedFaqIndex(null); // Reset collapsed block index when searching
            }}
            id="faq-search-input"
            className="w-full pl-10 pr-10 py-3 bg-emerald-950/40 border border-[#D4AF37]/25 rounded-2xl text-xs text-[#FDFBF7] placeholder-emerald-100/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all shadow-inner focus:bg-emerald-950/70"
            placeholder="Search small chops, ingredients, catering policies, pricing..."
          />
          {faqSearch && (
            <button 
              onClick={() => {
                setFaqSearch('');
                setExpandedFaqIndex(null);
              }}
              id="faq-clear-btn"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#D4AF37] hover:text-[#FDFBF7] transition-colors cursor-pointer"
              title="Clear inquiry filter text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter categories hints buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-lg mx-auto">
          {['All', 'Catering', 'Pricing', 'Delivery', 'Customization', 'Ingredients', 'Policies'].map((cat) => {
            const isSelected = cat === 'All' ? faqSearch === '' : faqSearch.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                id={`faq-cat-${cat}`}
                onClick={() => {
                  setFaqSearch(cat === 'All' ? '' : cat);
                  setExpandedFaqIndex(null);
                }}
                className={`px-3 py-1 text-[10px] uppercase font-mono tracking-wider rounded-full border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] font-bold' 
                    : 'bg-emerald-950/25 border-emerald-100/10 text-emerald-100/50 hover:text-emerald-100/80 hover:border-emerald-100/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* FAQ list accordion columns */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 bg-emerald-950/20 border border-[#D4AF37]/10 rounded-2xl space-y-3"
            >
              <HelpCircle className="w-10 h-10 mx-auto text-[#D4AF37]/40 animate-bounce" />
              <p className="text-xs text-emerald-100/50 font-sans">
                No matching questions found for "<span className="text-[#D4AF37] font-semibold">{faqSearch}</span>"
              </p>
              <button
                onClick={() => {
                  setFaqSearch('');
                  setExpandedFaqIndex(null);
                }}
                id="faq-reset-search"
                className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/35 text-[#D4AF37] text-[10px] font-mono uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </motion.div>
          ) : (
            filteredFaqs.map((faq, originalIndex) => {
              const itemIndex = originalIndex;
              const isExpanded = expandedFaqIndex === itemIndex;
              return (
                <div 
                  key={itemIndex}
                  className="bg-emerald-950/40 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 rounded-2xl overflow-hidden transition-all duration-350 shadow-md"
                  id={`faq-item-${itemIndex}`}
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : itemIndex)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isExpanded}
                    id={`faq-toggle-${itemIndex}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-xs font-mono font-bold text-[#D4AF37]">
                        ?
                      </span>
                      <span className="font-serif text-sm text-[#FDFBF7] font-semibold tracking-wide pr-2">
                        {faq.question}
                      </span>
                    </div>
                    <div className="shrink-0 text-[#D4AF37] w-6 h-6 rounded-full bg-emerald-900/40 border border-[#D4AF37]/20 flex items-center justify-center transition-transform duration-350 bg-opacity-70">
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#D4AF37]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-[#D4AF37]/10 bg-[#052E16]/30"
                      >
                        <div className="p-4 sm:p-5 text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-sans space-y-3">
                          <p>{faq.answer}</p>
                          <div className="flex items-center justify-between text-[9px] font-mono text-emerald-100/40 pt-2 border-t border-emerald-500/5">
                            <span className="flex items-center gap-1">
                              Category: <span className="text-[#D4AF37] font-bold uppercase">{faq.category}</span>
                            </span>
                            <span>Aqeelah Hospitality Care</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Success Notification simulation Dialog Box overlay */}
      <AnimatePresence>
        {successOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#052E16] border border-[#D4AF37]/35 rounded-3xl p-6 max-w-sm w-full text-center space-y-6 shadow-2xl relative"
            >
              <div className="w-14 h-14 bg-emerald-900/60 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                <CheckCircle className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full uppercase border border-[#D4AF37]/30">
                  Meeting Confirmed
                </span>
                <h4 className="font-serif text-lg text-[#FDFBF7] font-bold">Chef Zainab Sule Calendar Locked</h4>
                <p className="text-xs text-emerald-100/70 leading-relaxed font-sans">
                  The consultation is booked. Automated calendar invites and reminders have been generated.
                </p>
              </div>

              {/* Status checklist of notifications */}
              <div className="bg-emerald-950/70 border border-[#D4AF37]/25 rounded-2xl p-4 text-left space-y-2 text-[10px] font-mono">
                <div className="flex items-center justify-between text-emerald-100/80">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                    <span>WhatsApp VIP Alert:</span>
                  </span>
                  <span className="text-[#D4AF37] font-bold">✓ Sent to {phone}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-100/80">
                  <span className="flex items-center gap-1.5">
                    <Inbox className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Calendar Invites (ICS):</span>
                  </span>
                  <span className="text-[#D4AF37] font-bold">✓ Routed to {email}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-100/80 border-t border-emerald-500/10 pt-2 mt-2">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Link Platform:</span>
                  </span>
                  <span className="text-white font-bold">{videoPlatform}</span>
                </div>
              </div>

              <button 
                onClick={() => setSuccessOverlay(false)}
                className="w-full bg-[#D4AF37] text-[#052E16] py-2 px-4 rounded-xl text-xs font-serif uppercase tracking-widest hover:bg-[#C5A028] transition-colors font-bold cursor-pointer"
              >
                Close Invitation Center
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
