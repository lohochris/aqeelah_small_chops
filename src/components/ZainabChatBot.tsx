import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, Send, X, Sparkles, MapPin, Clock, MessageCircle, 
  ChevronDown, HelpCircle, Phone, ArrowRight, CornerDownRight 
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'chef';
  text: string;
  time: string;
  chips?: string[];
}

interface ZainabChatBotProps {
  onPreFillRequest?: (data: { eventType?: string; guestCount?: number; specialRequests?: string }) => void;
  currentTab?: string;
  setCurrentTab?: (tab: string) => void;
}

export default function ZainabChatBot({ onPreFillRequest, currentTab, setCurrentTab }: ZainabChatBotProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, language } = useLanguage();
  const [messages, setMessages] = React.useState<Message[]>([]);

  // Sync initial welcome message to current chosen language context
  React.useEffect(() => {
    setMessages([
      {
        id: 'init-1',
        sender: 'chef',
        text: t('welcome_msg', "As-salamu alaykum, my esteemed guest! I am Chef Zainab Bello Sule. Welcome to my modern African luxury suite. How may I craft some unforgettable, premium culinary experiences for your guests today?"),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: [
          t('nav_menu', "Cuisine"), 
          t('nav_tray_builder', "Bespoke Trays"), 
          t('nav_catering', "Event Catering"), 
          t('nav_location', "Our Location")
        ]
      }
    ]);
  }, [language]);

  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [hasNewMessage, setHasNewMessage] = React.useState(true); // Blinking status on load
  const chatEndRef = React.useRef<HTMLDivElement>(null);


  // Auto-scroll when messages update
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Listen to custom summons from other components
  React.useEffect(() => {
    const handleRemoteOpen = () => {
      setIsOpen(true);
      setHasNewMessage(false);
    };
    window.addEventListener('open-zainab-chat', handleRemoteOpen);
    return () => {
      window.removeEventListener('open-zainab-chat', handleRemoteOpen);
    };
  }, []);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 1. Try real server-side API chat route backed by Gemini 3.5 Flash
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          history: [...messages, userMsg].map(m => ({
            sender: m.sender,
            text: m.text
          })),
          language
        })
      });

      if (!response.ok) {
        throw new Error("Server response was not ok");
      }

      const data = await response.json();
      
      // Handle programmatic state changes if active
      if (data.autoUpdate && onPreFillRequest) {
        onPreFillRequest({
          eventType: data.autoUpdate.eventType || undefined,
          guestCount: data.autoUpdate.guestCount || undefined,
          specialRequests: data.autoUpdate.specialRequests || undefined
        });
      }

      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: 'chef-' + Date.now(),
        sender: 'chef',
        text: data.reply || "I am here to attend to your desires. Tell me more.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: data.chips && data.chips.length > 0 ? data.chips : ["Help me book", "Calculate budget"]
      }]);

    } catch (err) {
      // 2. Fall back to smart context-aware direct simulation matching
      console.warn("ZainabChatBot falling back to context-aware local simulator", err);
      
      setTimeout(() => {
        const query = text.toLowerCase();
        let reply = "";
        let chips: string[] = [];

        if (query.includes('dan wake') || query.includes('dumpling')) {
          reply = "Masha Allah, our Arewa Empress Dan Wake Skewers (₦13,500 per dozen) are heavenly! They are super-soft bean-flour dumplings tossed in pure groundnut oil, spicy native Kulikuli (Yaji), fresh cabbage strips, and halved boiled quail eggs. Truly a royal northern standard.";
          chips = ["See Indigenous Menu", "What are your spice levels?", "Corporate Box Catering"];
        } else if (query.includes('red velvet') || query.includes('velvet') || query.includes('gold crimson') || query.includes('gold flake')) {
          reply = "Ah, the Velvet Gold Crimson Slices (₦22,000)! It is an incredibly moist premium cocoa sponge with Madagascar vanilla bean cream cheese frosting, topped with authentic 24K edible gold flakes. It represents true luxurious celebration.";
          chips = ["Aqeelah Dessert Tray", "Glazed Cinnamon Puff Puff", "Consultation Form"];
        } else if (query.includes('dambun' ) || query.includes('nama') || query.includes('meat floss')) {
          reply = "Our Gilded Dambun Nama Savory Cups (₦19,000 for 15) are a masterpiece. We slow-shred beef into fluffy floss, season it with northern ginger-garlic aromatics, deep fry it in groundnut oil, and serve it in edible buttery shortcrust cups with shiny fresh pomegranate jewels!";
          chips = ["Tell me about Masa Canapés", "Standard Hot Kano-Style?", "Order Dambun Cups"];
        } else if (query.includes('masa') || query.includes('rice cake')) {
          reply = "Yes, our Sovereign Masa Blossom Canapés (₦15,500 for 16) are miniature premium versions of the classic fermented puffed rice cakes. We pan-grill them on custom brass ladles, hollow them out, and dress them with honey-glazed minced beef yaji sauce!";
          chips = ["Dan Wake Skewers", "Zainab's Elderflower Zobo", "How do you deliver?"];
        } else if (query.includes('zobo') || query.includes('hibiscus') || query.includes('drink')) {
          reply = "My signature Hibiscus Elderflower Zobo (₦4,500) takes organic dried zobo petals, cold brews them with sweet pineapples and crushed ginger root, then infuses high-end elderflower syrup and dehydrated orange wheels. It is served in 500ml glass or 10L event dispensers!";
          chips = ["Palmwine Elixir", "Gizdodo Wafer Cups", "Bespoke Trays Builder"];
        } else if (query.includes('price') || query.includes('how much') || query.includes('cost') || query.includes('rate') || query.includes('package')) {
          reply = "Our gourmet selection ranges from ₦3,500 for high-energy sweet & savory fingers, up to ₦6,500 per guest for self-contained executive boardroom snack envelopes. We specialize in hot temperature control delivery. Which celebration style fits your needs?";
          chips = ["Majestic Royal Wedding", "Executive Boardroom", "Elite Birthday Gala", "Graduations"];
        } else if (query.includes('abuja') || query.includes('deliver') || query.includes('location') || query.includes('kano') || query.includes('address')) {
          reply = "Masha Allah, we cater state-wide! Our state-of-the-art kitchen operates at House No. 14, Janbulo First Gate (near BUK Old Gate), Gwale LGA, Kano. We also operate premium thermal locked delivery corridors directly across Kano and Abuja boutique venues weekly.";
          chips = ["Our Location Maps", "Consult Private Chef", "Main Menu"];
        } else if (query.includes('spice') || query.includes('hot') || query.includes('spicy') || query.includes('allerg')) {
          reply = "We craft with three unique hot-locked spice tiers: 'Mild Gwale' for subtle aroma, 'Medium Gwale' for traditional warmth, and 'Standard Hot Kano-Style' for extreme, genuine heat! All are made with authentic West African spice lore.";
          chips = ["Show Mild Chops", "Book Custom Spice", "Order Samosas"];
        } else if (query.includes('wedding') || query.includes('marry') || query.includes('marriage')) {
          reply = "Traditional wedding sequences are our absolute crowning achievement! At ₦5,500/guest, our Majestic Wedding package incorporates uniform-styled gold servers, individual Gizdodo cups, and endless Zobo elderflower flow. Should I pre-fill this in your catering planner?";
          chips = ["Yes, pre-fill Wedding form", "Let's check budget"];
        } else if (query.includes('guest') || /[0-9]/.test(query)) {
          const numMatch = query.match(/\d+/);
          const count = numMatch ? parseInt(numMatch[0]) : 100;
          const estPrice = count * 4200;
          reply = `Subhan Allah, hosting ${count} guests will be a magnificent occasion! On our medium 'Elite Birthday' tier, this aggregates to a live estimated budget of ₦${estPrice.toLocaleString()}. May I configure this into your local planning board?`;
          chips = ["Pre-fill form now", "Adjust guest count", "Compare other rates"];
        } else {
          reply = "What beautiful inquiries! As the executive head chef, I personally oversee all spice marinades, pastry dough lockups, and logistics routing. Tell me, what type of event are we planning, or which small chops interest you?";
          chips = ["Bespoke Trays Builder", "Event Catering Setup", "Talk with Aqeelah"];
        }

        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: 'chef-' + Date.now(),
          sender: 'chef',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          chips: chips
        }]);
      }, 250);
    }
  };

  const handleChipClick = (chip: string) => {
    // Check if the chip is an immediate navigation action or utility trigger
    if (chip === "Bespoke Trays Builder") {
      if (setCurrentTab) setCurrentTab('tray-builder');
      setIsOpen(false);
      return;
    }
    if (chip === "Event Catering Setup" || chip === "Consultation Form" || chip === "Yes, pre-fill Wedding form" || chip === "Pre-fill form now") {
      if (setCurrentTab) setCurrentTab('catering');
      setTimeout(() => {
        const formEl = document.getElementById('brief-form-section');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
      setIsOpen(false);
      
      if (onPreFillRequest) {
        if (chip.includes("Wedding")) {
          onPreFillRequest({ eventType: 'Wedding' });
        } else {
          onPreFillRequest({ eventType: 'Corporate' });
        }
      }
      return;
    }
    if (chip === "Our Location Maps") {
      if (setCurrentTab) setCurrentTab('location');
      setIsOpen(false);
      return;
    }
    if (chip === "Main Menu") {
      if (setCurrentTab) setCurrentTab('menu');
      setIsOpen(false);
      return;
    }

    handleSendMessage(chip);
  };

  return (
    <>
      {/* 1. FLOATING ACTION ACTION BUBBLE */}
      <div className="fixed bottom-6 right-6 z-[95] pointer-events-auto">
        <button
          id="zainab-chatbot-launcher"
          onClick={handleOpenToggle}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-950 via-[#032e16] to-emerald-900 border-2 border-[#D4AF37] hover:border-[#F1D26E] shadow-2xl flex items-center justify-center cursor-pointer group hover:scale-105 transition-all duration-300 focus:outline-none"
        >
          {/* Portrait or Logo */}
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/40 relative">
            <img 
              src="/src/assets/images/zainab_portrait_1780757712146.png" 
              alt="Chef Zainab Portrait" 
              className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Golden glow pulsing dot indicating active Zainab simulated agent */}
          <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-950 border border-[#D4AF37] flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>

          {/* Visual unread notification badge */}
          {hasNewMessage && !isOpen && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-emerald-950 text-[8px] font-mono font-black border border-emerald-950 shadow-md uppercase tracking-wider whitespace-nowrap"
            >
              Ask Zainab
            </motion.div>
          )}

          {/* Tooltip on hover */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-emerald-950/95 border border-[#D4AF37]/30 text-[#FDFBF7] text-[10px] font-sans px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Chef Zainab is chatting</span>
            </div>
          </div>
        </button>
      </div>

      {/* 2. CONVERSATION OVERLAY CABINET */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="zainab-chatbot-cabinet"
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40, x: 15 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[410px] h-[550px] bg-[#032e16] border border-[#D4AF37]/45 rounded-2xl shadow-2xl flex flex-col z-[110] overflow-hidden"
          >
            {/* Header: Royal Brand Context & Photo */}
            <div className="bg-gradient-to-r from-emerald-950 to-[#032913] p-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/15">
                  <img 
                    src="/src/assets/images/zainab_portrait_1780757712146.png" 
                    alt="Zainab Profile" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border border-emerald-950 animate-pulse"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-serif text-[13.5px] font-black text-[#FDFBF7] tracking-wide">Chef Zainab Bello Sule</h3>
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <p className="text-[9.5px] text-[#D4AF37] font-mono uppercase tracking-widest leading-none mt-0.5">Founder & Executive Chops Master</p>
                  <p className="text-[8px] text-emerald-100/60 font-sans tracking-wide leading-none mt-1">Live from Gwale, Kano State</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button 
                  id="zainab-chatbot-close"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-emerald-900/40 hover:bg-emerald-900/80 text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrolling Dialogue Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950 via-[#032f17] to-emerald-950 custom-scrollbar">
              
              {/* Luxury Intro Accent Badge */}
              <div className="text-center pb-2 border-b border-[#D4AF37]/10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-900/30 border border-[#D4AF37]/15 rounded-full text-[8.5px] font-mono uppercase tracking-extrawide text-[#D4AF37] text-center">
                  <Clock className="w-2.5 h-2.5 text-[#D4AF37]/70" />
                  Zainab's Concierge Hub Active
                </span>
                <p className="text-[10px] text-emerald-100/50 font-sans mt-1">Ask questions, calculate budgets, or configure your party form</p>
              </div>

              {messages.map((msg) => {
                const isChef = msg.sender === 'chef';
                return (
                  <div 
                    key={msg.id} 
                    className={`flex items-end gap-2.5 ${isChef ? 'justify-start' : 'justify-end'}`}
                  >
                    {isChef && (
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-[#D4AF37]/25 shrink-0 shadow-sm mt-1">
                        <img 
                          src="/src/assets/images/zainab_portrait_1780757712146.png" 
                          alt="Zainab small" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    
                    <div className="flex flex-col space-y-1.5 max-w-[80%]">
                      <div 
                        className={`p-3.5 rounded-2xl text-[11.5px] leading-relaxed font-sans text-left shadow-md border ${
                          isChef 
                            ? 'bg-emerald-900/40 border-[#D4AF37]/10 text-emerald-50' 
                            : 'bg-[#D4AF37] border-[#D4AF37]/20 text-[#032e16] font-medium rounded-br-none'
                        }`}
                      >
                        {/* Rendering single lines or list segments nicely */}
                        {msg.text.split('\n').map((line, idx) => (
                          <span key={idx} className="block mt-0.5 first:mt-0">{line}</span>
                        ))}
                      </div>

                      {/* Msg Timestamp */}
                      <span className={`text-[8.5px] font-mono text-emerald-100/40 px-1 ${!isChef ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </span>

                      {/* Embedded contextual chips for royal guidance */}
                      {isChef && msg.chips && msg.chips.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.chips.map((chip, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleChipClick(chip)}
                              className="px-2.5 py-1 text-[10px] bg-emerald-950/80 hover:bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 rounded-lg transition-all text-left font-serif cursor-pointer font-medium hover:scale-1.02 duration-200"
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Chat typing bubbles simulation */}
              {isTyping && (
                <div className="flex justify-start items-end gap-2.5 animate-pulse">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-[#D4AF37]/25 shrink-0">
                    <img 
                      src="/src/assets/images/zainab_portrait_1780757712146.png" 
                      alt="Zainab Writing" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-emerald-900/40 border border-[#D4AF37]/10 p-3.5 px-4 rounded-2xl flex items-center justify-center gap-1.5 w-16 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce"></span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input submission compartment */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-emerald-950 border-t border-[#D4AF37]/35 flex items-center gap-2"
            >
              <input
                id="zainab-chatbot-input-field"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Zainab about spices, trays, or booking..."
                className="flex-1 bg-[#032913] text-emerald-50 text-[11.5px] font-sans placeholder-emerald-100/40 border border-[#D4AF37]/25 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 transition-all"
                disabled={isTyping}
              />
              <button
                id="zainab-chatbot-submit-btn"
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37] text-emerald-950 hover:bg-[#F1D26E] disabled:opacity-40 disabled:hover:bg-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#D4AF37]/10"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
