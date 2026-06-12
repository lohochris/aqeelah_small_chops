/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Award, Send, Users, ShieldCheck, DollarSign, MessageSquare, X, ChevronRight, Info, FileText } from 'lucide-react';
import { EventBooking } from '../types';
import { jsPDF } from 'jspdf';

interface CateringProps {
  onAddBooking: (booking: EventBooking) => void;
  bookings: EventBooking[];
}

export default function Catering({ onAddBooking, bookings }: CateringProps) {
  const [clientName, setClientName] = React.useState('');
  const [email, setEmail] = React.useState('lohochris@gmail.com');
  const [phone, setPhone] = React.useState('');
  const [eventType, setEventType] = React.useState('Wedding');
  const [eventDate, setEventDate] = React.useState('');
  const [guestCount, setGuestCount] = React.useState<number>(100);
  const [selectedThemeColor, setSelectedThemeColor] = React.useState('Golden Sage');
  const [specialRequests, setSpecialRequests] = React.useState('');
  const [submittedId, setSubmittedId] = React.useState<string | null>(null);
  const [openTooltipId, setOpenTooltipId] = React.useState<string | null>(null);

  const downloadPackagePDF = () => {
    const doc = new jsPDF();
    
    // Header Banner: Emerald Green block
    doc.setFillColor(5, 46, 22);
    doc.rect(15, 15, 180, 25, 'F');
    
    // Add gold accent line below banner
    doc.setFillColor(212, 175, 55);
    doc.rect(15, 39, 180, 1.5, 'F');
    
    // Company Header Text inside Emerald banner
    doc.setTextColor(253, 251, 247);
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text('SMALL CHOPS BY AQEELAH', 20, 27);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(212, 175, 55);
    doc.text('MODERN AFRICAN LUXURY  •  ESTABLISHED IN KANO STATE', 20, 34);
    
    // Document Subtitle
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(5, 46, 22);
    doc.text('Gourmet Catering Proposal & Estimate', 15, 50);
    
    // Horizontal divider
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(15, 54, 195, 54);
    
    // Date & Client Metadata Box
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const dateStr = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric'
    });
    doc.text(`Estimated On: ${dateStr}`, 15, 61);
    doc.text(`Client E-mail: ${email || 'lohochris@gmail.com'}`, 15, 66);
    if (clientName) {
      doc.text(`Client Name: ${clientName}`, 15, 71);
    } else {
      doc.text(`Client Name: Prospective Luxury Patron`, 15, 71);
    }
    if (phone) {
      doc.text(`Contact Phone: ${phone}`, 15, 76);
    }
    
    // Selected Package Block Styling
    doc.setFillColor(248, 246, 242);
    doc.rect(15, 83, 180, 48, 'F');
    doc.setDrawColor(212, 175, 55);
    doc.rect(15, 83, 180, 48, 'S');
    
    // Package Content Header inside block
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(5, 46, 22);
    doc.text('I. ELECTED CATERING PROGRAM', 20, 92);
    
    doc.setFont('times', 'italic');
    doc.setFontSize(13);
    doc.setTextColor(212, 175, 55);
    doc.text(activeMetric.label, 20, 100);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    
    // Wrap description to fit on page nicely
    const splitDesc = doc.splitTextToSize(activeMetric.desc, 170);
    doc.text(splitDesc, 20, 107);
    
    // Rate metric text
    const descHeight = splitDesc.length * 4.5;
    const rateY = 107 + (descHeight > 4.5 ? descHeight : 9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(5, 46, 22);
    doc.text(`Proposed Base Rate: N${activeMetric.baseRatePerGuest.toLocaleString()} per guest`, 20, rateY);
    
    // Table Details Block
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(5, 46, 22);
    doc.text('II. COST CALCULATION SHEET', 15, 143);
    
    doc.setDrawColor(220, 220, 220);
    doc.line(15, 146, 195, 146);
    
    // Detailed Grid table columns
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Description', 15, 153);
    doc.text('Metric / Detail', 110, 153);
    doc.text('Subtotal', 165, 153);
    
    doc.line(15, 156, 195, 156);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text('Catering Guest Coverage', 15, 163);
    doc.text(`${guestCount} Attendees`, 110, 163);
    doc.text(`N${calculatedQuoteSum.toLocaleString()}`, 165, 163);
    
    doc.text('Table Visualization Palette', 15, 171);
    doc.text(selectedThemeColor, 110, 171);
    doc.text('Complimentary', 165, 171);
    
    doc.text('Premium Thermal Logistics', 15, 179);
    doc.text('Direct via Kano Kitchen', 110, 179);
    doc.text('Complimentary', 165, 179);
    
    if (specialRequests) {
      doc.text('Bespoke Custom Adjustments', 15, 187);
      doc.text('Tailored Spice / Allergy Profile', 110, 187);
      doc.text('Subject to Review', 165, 187);
    }
    
    doc.line(15, 192, 195, 192);
    
    // Total Estimated Sum Box
    doc.setFillColor(5, 46, 22);
    doc.rect(120, 198, 75, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(253, 251, 247);
    doc.text('TOTAL PROPOSED:', 123, 206);
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(11);
    doc.text(`N${calculatedQuoteSum.toLocaleString()}`, 154, 206);
    
    // III. Included Benefits & Quality Seal section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(5, 46, 22);
    doc.text('III. PREMIUM SERVICE BENEFITS', 15, 222);
    doc.setDrawColor(220, 220, 220);
    doc.line(15, 225, 195, 225);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('- Authentic thermal logistics preserving food at perfect safe hot temperatures.', 15, 232);
    doc.text('- Active uniform supervisors guiding event culinary timelines with military punctuality.', 15, 237);
    doc.text('- Comprehensive selection of homemade classic red pepper jams and fragrant emerald herbal dips.', 15, 242);
    doc.text('- Welcome round of chilled, gold-rimmed organic Elderflower Hibiscus Zobo mocktails.', 15, 247);
    
    // Special request block down there
    if (specialRequests) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(5, 46, 22);
      doc.text('Client Special Note:', 15, 256);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(80, 80, 80);
      const requestText = doc.splitTextToSize(specialRequests, 175);
      doc.text(requestText, 15, 261);
    }
    
    // Signature lines / Authentic Seal
    const footerY = 278;
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.3);
    doc.line(15, footerY - 5, 195, footerY - 5);
    
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(110, 110, 110);
    doc.text('Small Chops by Aqeelah Group  •  Directorate of Event Logistics  •  BUK Road Kano State', 15, footerY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Disclaimer: This instant proposal estimation is indicative and valid only for bookings finalized within 30 days of generation.', 15, footerY + 4);
    
    doc.save(`Aqeelah_Catering_Proposal_${activeMetric.label.replace(/\s+/g, '_')}.pdf`);
  };

  // Chatbot State Managers & Active Handlers
  const [chatOpen, setChatOpen] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState<Array<{ sender: 'user' | 'chef'; text: string; time: string; chips?: string[] }>>([
    {
      sender: 'chef',
      text: "As-salamu alaykum! I am Zainab Bello Sule. Welcome to my gourmet consultation. Tell me about your grand event—how many guests are you expecting, and which package matches your vision? I can help you estimate prices and customize your chops selection!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      chips: ['Recommend a package', 'Calculate budget', 'Special requests', 'Pre-fill Form!']
    }
  ]);
  const [userInput, setUserInput] = React.useState('');
  const [isChefTyping, setIsChefTyping] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  const CATERING_METRICS: Record<string, { baseRatePerGuest: number, label: string, desc: string }> = {
    'Wedding': {
      baseRatePerGuest: 5500,
      label: 'Majestic Royal Wedding',
      desc: 'Featuring dedicated waiters in full gold-trimmed uniform, premium Gizdodo cups, and unlimited premium elderflower hibiscus Zobo.'
    },
    'Birthday': {
      baseRatePerGuest: 4200,
      label: 'Elite Birthday Gala',
      desc: 'Vibrant catering, chocolate sticky-dates puddings, spicy Asun, and custom birthday name golden calligraphy flags.'
    },
    'Corporate': {
      baseRatePerGuest: 6500,
      label: 'Executive Boardroom & Pitch Suite',
      desc: 'Boxed individual snacks, gourmet wraps, cold pressed ginger passion brews, and boardroom custom invoices.'
    },
    'Graduation': {
      baseRatePerGuest: 3500,
      label: 'Graduation & Reunion Celebration',
      desc: 'High energy finger arrays, sweet cinnamon puff, mini sausage pastries, and flexible banquet servers.'
    }
  };

  const activeMetric = CATERING_METRICS[eventType] || CATERING_METRICS['Wedding'];
  const calculatedQuoteSum = activeMetric.baseRatePerGuest * guestCount;

  // Auto scroll to bottom of chat
  React.useEffect(() => {
    if (chatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  // Premium scroll helper on package select
  const handleSelectPackage = (key: string) => {
    setEventType(key);
    setTimeout(() => {
      const element = document.getElementById('brief-form-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Custom chat message submission handler
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = {
      sender: 'user' as const,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setUserInput('');
    setIsChefTyping(true);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: updatedMessages })
      });
      
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      
      const data = await response.json();
      
      // Execute any automated state-updates generated by Zainab during discussion
      if (data.autoUpdate) {
        const up = data.autoUpdate;
        if (up.eventType) {
          setEventType(up.eventType);
        }
        if (up.guestCount !== null && up.guestCount !== undefined) {
          const count = Number(up.guestCount);
          if (!isNaN(count) && count > 0) {
            setGuestCount(count);
          }
        }
        if (up.specialRequests) {
          setSpecialRequests(up.specialRequests);
        }
        if (up.action === 'scroll_to_form' || up.action === 'pre_fill') {
          setTimeout(() => {
            const element = document.getElementById('brief-form-section');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 300);
        }
      }
      
      setChatMessages(prev => [...prev, {
        sender: 'chef',
        text: data.reply || "I am listening. How can I personalize your royal banquet chops menu today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: data.chips && data.chips.length > 0 ? data.chips : ['Recommend a package', 'Calculate budget']
      }]);
      
    } catch (err) {
      console.warn("Chef Zainab dynamic fallback active:", err);
      
      // Standard local matching fallback to protect uptime under extreme cases
      const lower = text.toLowerCase();
      let chefText = "";
      let chips: string[] = [];
      
      const numMatch = lower.match(/\d+/);
      const isGuestQuery = lower.includes('guest') || lower.includes('people') || lower.includes('attendee') || lower.includes('pax') || lower.includes('person');
      
      if (numMatch && isGuestQuery) {
        const num = parseInt(numMatch[0]);
        chefText = `Masha Allah, ${num} guests is a wonderful size for a bespoke celebration! Here is a live estimate:\n\n• Minimalist Setup (₦3,500/guest): ₦${(num * 3500).toLocaleString()}\n• Elite Birthday Gala (₦4,200/guest): ₦${(num * 4200).toLocaleString()}\n• Majestic Royal Wedding (₦5,500/guest): ₦${(num * 5500).toLocaleString()}\n• Executive Boardroom (₦6,500/guest): ₦${(num * 6500).toLocaleString()}\n\nWould you like me to pre-fill your Consultation Brief sheet with ${num} guests right now?`;
        chips = [`Pre-fill with ${num} guests`, 'Compare packages', 'Consultation Form'];
      } else if (lower.includes('wedding')) {
        chefText = `Ah, a majestic traditional wedding! For weddings, our 'Majestic Royal Wedding' package is our crowning achievement. At ₦5,500 per guest, it includes our dedicated gold-trimmed hospitality servers, custom Gizdodo cups, and unlimited chilled Hibiscus Elderflower Zobo barrels. Shall I set your package to Wedding?`;
        chips = ['Set package to Wedding', 'Calculate budget', 'Other Packages'];
      } else if (lower.includes('birthday') || lower.includes('gala')) {
        chefText = `Glorious birthdays are a specialty! Our 'Elite Birthday Gala' (₦4,200 / guest) features custom chocolate sticky-dates puddings, freshly grilled Asun skewers, and cute golden name flags. Shall we configure this for your event?`;
        chips = ['Set package to Birthday', 'Calculate budget', 'Special requests'];
      } else if (lower.includes('corporate') || lower.includes('boardroom') || lower.includes('office') || lower.includes('meeting')) {
        chefText = `For corporate affairs, our 'Executive Boardroom & Pitch Suite' (₦6,500 / guest) is the gold standard. It features individual eco-boxed gourmet chops arrangements, cold pressed ginger passion brews, and special corporate invoices. Shall I configure this for your Brief Form?`;
        chips = ['Set package to Corporate', 'Dietary controls', 'Pre-fill Form'];
      } else if (lower.includes('grad') || lower.includes('school') || lower.includes('reunion') || lower.includes('re-union')) {
        chefText = `Graduations and reunions bring immense joy! Our 'Graduation & Reunion Celebration' (₦3,500 / guest) is budget-friendly yet premium, with cinnamon sweet puff, mini sausage pastry envelopes, and flexible servers. Shall I lock this package for you?`;
        chips = ['Set package to Graduation', 'Set Guest Count', 'Pre-fill Form'];
      } else if (lower.includes('spice') || lower.includes('chili') || lower.includes('allergy') || lower.includes('diet') || lower.includes('veg')) {
        chefText = `We are perfectionists about food design. We offer fully customizable spicing tiers: Standard Hot Kano-Style, Medium Gwale Spice, or Mild Gwale. We also bake exquisite gluten-free sausage buns and organic vegan-friendly puffs upon request. You can state these in our Special Requests field!`;
        chips = ['Apply Custom Spicing in Form', 'Explore Packages'];
      } else if (lower.includes('price') || lower.includes('how much') || lower.includes('cost') || lower.includes('package') || lower.includes('rate')) {
        chefText = `Our premium rates are completely transparent:\n• Majestic Royal Wedding: ₦5,500/guest\n• Executive Boardroom: ₦6,500/guest\n• Elite Birthday Gala: ₦4,200/guest\n• Graduation Celebration: ₦3,500/guest\n\nTell me, what is your expected guest size? If you write a line like "120 guests," I can instantly calculate an exact estimate for you!`;
        chips = ['Calculate budget', 'List Packages', 'Consultation Form'];
      } else if (lower.includes('kano') || lower.includes('location') || lower.includes('address') || lower.includes('office') || lower.includes('kitchen')) {
        chefText = `Our state-of-the-art head kitchen is located at House No. 14, Janbulo First Gate (near BUK old gate entrance) in Gwale LGA, Kano. We have active thermal transport logistics to deliver catering hot to any corner of Kano State and Abuja.`;
        chips = ['Catering Range Map', 'Consultation Form'];
      } else {
        chefText = `That is wonderful details! I would be delighted to coordinate your gourmet chops presentation. To personalize this further, I suggest selecting one of our premium package layouts, or we can pre-set your preferences in the Brief Form below. How would you like to proceed?`;
        chips = ['List Packages', 'Calculate budget', 'Pre-fill Form now!'];
      }
      
      setChatMessages(prev => [...prev, {
        sender: 'chef',
        text: chefText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: chips
      }]);
    } finally {
      setIsChefTyping(false);
    }
  };

  // Clickable interactive suggestions handler
  const handleChipClick = (chip: string) => {
    // Check if the chip requires natural language processor vs instant programmatic action
    const localTriggerChips = [
      'Set package to Wedding', 'Set package to Birthday', 'Set package to Corporate', 'Set package to Graduation',
      'Scroll to Form ✅', 'Pre-fill Form!', 'Pre-fill Form now!', 'Consultation Form', 'Apply Custom Spicing in Form'
    ];
    
    if (!localTriggerChips.some(c => chip.startsWith(c) || chip === c) && !chip.includes('guests')) {
      // Delegate creative or general prompt questions directly to corporate AI Brain
      handleSendMessage(chip);
      return;
    }

    const userMsg = {
      sender: 'user' as const,
      text: chip,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setIsChefTyping(true);
    
    setTimeout(() => {
      let responseText = "";
      let responseChips: string[] = [];
      
      if (chip === 'Recommend a package' || chip === 'List Packages' || chip === 'Compare packages' || chip === 'Other Packages' || chip === 'Explore Packages') {
        responseText = `Our bespoke catering metrics are designed to fit your unique celebration mood:\n\n1. 👑 Majestic Royal Wedding (₦5,500 / guest): Premium gold-trimmed uniform servers, Gizdodo cups, and unlimited Elderflower Hibiscus Zobo.\n2. 🎂 Elite Birthday Gala (₦4,200 / guest): Asun skewers, sticky-dates puddings, custom hand-written golden name calligraphy.\n3. 💼 Executive Boardroom (₦6,500 / guest): Self-contained luxury lunchbox arrangements, ginger passion brews, and professional invoices.\n4. 🎓 Graduation Celebration (₦3,500 / guest): High energy bites, sweet cinnamon puff, mini sausage pastry envelopes.\n\nWhich one resonates most with you?`;
        responseChips = ['Set package to Wedding', 'Set package to Birthday', 'Set package to Corporate', 'Set package to Graduation'];
      } else if (chip === 'Calculate budget' || chip === 'Calculate guest budget') {
        responseText = `Let's run a calculation! How many guests are you expecting to host? Type a guest count, for example '120 guests' or '300 guests', and I will compile an instant quote sheet for you.`;
        responseChips = ['50 guests', '150 guests', '250 guests', '500 guests'];
      } else if (chip === 'Special requests' || chip === 'Dietary controls') {
        responseText = `Catering to all your guests with meticulous detail is our pride! We offer mild Gwale spice alterations, allergy-gated sausage wraps, and sweet nut-free sticky treats. You can note these in the Consultation Form beneath, and our team will lock it into the event plan.`;
        responseChips = ['Apply Custom Spicing in Form', 'Consultation Form'];
      } else if (chip.startsWith('Set package to')) {
        const pkg = chip.replace('Set package to ', '');
        setEventType(pkg);
        responseText = `Superb choosing! I have updated your active package to the "${CATERING_METRICS[pkg]?.label || pkg}" package. The consultation form below and the automatic quote estimator sheet have been updated automatically. Would you like to set your guest count next?`;
        responseChips = ['Set Guest Count', 'Pre-fill Form now!', 'Consultation Form'];
      } else if (chip === 'Set Guest Count') {
        responseText = `Perfect! To estimate your budget, please choose or type your guest count:`;
        responseChips = ['50 guests', '120 guests', '250 guests', '500 guests'];
      } else if (chip.includes('guests') && !chip.includes('Pre-fill')) {
        const num = parseInt(chip);
        setGuestCount(num);
        responseText = `Done! I have set your Guest Count to ${num} attendees. The price estimator sheet on the right has calculated the matching quote of ₦${(num * activeMetric.baseRatePerGuest).toLocaleString()} successfully.\n\nWould you like me to scroll you down to the Consultation Form to finalize your submission?`;
        responseChips = ['Scroll to Form ✅', 'Suggest special requests', 'Recommend a package'];
      } else if (chip.startsWith('Pre-fill with') && chip.endsWith('guests')) {
        const num = parseInt(chip.replace('Pre-fill with ', ''));
        setGuestCount(num);
        responseText = `Spectacular! I have updated your expected guest size in the brief form to ${num} attendees. Let's head down to fill in your contact information and lock in the date!`;
        responseChips = ['Scroll to Form ✅'];
      } else if (chip === 'Pre-fill Form!' || chip === 'Pre-fill Form now!' || chip === 'Scroll to Form ✅' || chip === 'Consultation Form') {
        responseText = `Splendid! Let's direct your attention to the Consultation Brief Form on the left. I have pre-filled and locked your chosen catering configurations. Just compile your name, number, and proposed date!`;
        responseChips = ['List Packages', 'Calculate budget'];
        
        setTimeout(() => {
          const element = document.getElementById('brief-form-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      } else if (chip === 'Apply Custom Spicing in Form') {
        setSpecialRequests(`Please provide mild spice chops where necessary. Ensure allergy accommodations as discussed with Chef Zainab.`);
        responseText = `Splendid! I have pre-filled your special dietary requests in the form. Just compile your contact name and date!`;
        responseChips = ['Scroll to Form ✅'];
        
        setTimeout(() => {
          const element = document.getElementById('brief-form-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      } else {
        responseText = `I would be honored to craft a premier food experience for your guests. To detail your traditional custom layers, please submit our brief consultation form or call us directly!`;
        responseChips = ['Recommend a package', 'Calculate budget'];
      }
      
      setChatMessages(prev => [...prev, {
        sender: 'chef',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: responseChips
      }]);
      setIsChefTyping(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBooking: EventBooking = {
      id: `BK-${Date.now().toString().slice(-6)}`,
      clientName,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      estimatedBudget: calculatedQuoteSum,
      selectedThemeColor,
      specialRequests,
      menuPackageSelected: activeMetric.label,
      status: 'Consultation Scheduled'
    };

    onAddBooking(newBooking);
    setSubmittedId(newBooking.id);
    
    // reset form fields
    setClientName('');
    setPhone('');
    setSpecialRequests('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="catering-services">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">LUXURY HOSPITALITY GROUP</span>
        <h2 className="text-4xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold">Bespoke Event Catering</h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 max-w-lg mx-auto leading-relaxed">
          From executive banquets in Kano City to grand traditional weddings in Gwale, Zainab Bello Sule’s professional catering teams coordinate exquisite, punctual culinary experiences.
        </p>
      </div>

      {/* Grid containing services details of Weddings, Birthdays, Corporates */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(CATERING_METRICS).map(([key, value]) => {
          const isActive = eventType === key;
          return (
            <div 
              key={key} 
              className={`p-5 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-all group duration-300 shadow-md ${
                isActive 
                  ? 'bg-emerald-950/90 border-2 border-[#D4AF37] ring-1 ring-[#D4AF37]/35 shadow-lg shadow-[#D4AF37]/15' 
                  : 'bg-emerald-950/45 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="block text-[8px] uppercase font-mono tracking-widest text-emerald-100/50 font-bold">PACKAGE LAYOUT</span>
                  {isActive && (
                    <span className="text-[8px] bg-[#D4AF37] text-emerald-950 font-bold px-1.5 py-0.5 rounded leading-none">ACTIVE SELECT</span>
                  )}
                </div>
                <h4 className="font-serif text-base font-bold text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors">{value.label}</h4>
                <p className="text-xs text-emerald-100/70 leading-relaxed min-h-[70px]">{value.desc}</p>
              </div>
              <div className="border-t border-[#D4AF37]/15 pt-3 mt-3 flex items-center justify-between relative">
                <div className="flex items-center gap-1 relative group/info">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">
                    ₦{value.baseRatePerGuest.toLocaleString()} / guest
                  </span>
                  
                  {/* Info Icon Tooltip Activator button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenTooltipId(openTooltipId === key ? null : key);
                    }}
                    onMouseEnter={() => setOpenTooltipId(key)}
                    onMouseLeave={() => setOpenTooltipId(null)}
                    className="p-1 -m-1 text-emerald-100/50 hover:text-[#D4AF37] transition-all focus:outline-none cursor-pointer"
                    aria-label="Price inclusions info"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>

                  {/* Tooltip Content box */}
                  <AnimatePresence>
                    {openTooltipId === key && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-0 mb-2.5 w-60 bg-emerald-950 border border-[#D4AF37] rounded-xl p-3.5 shadow-2xl z-30 font-sans text-[11px] leading-relaxed text-emerald-100"
                        onMouseEnter={() => setOpenTooltipId(key)}
                        onMouseLeave={() => setOpenTooltipId(null)}
                      >
                        <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-emerald-950 border-r border-b border-[#D4AF37] rotate-45" />
                        <h5 className="font-serif font-bold text-[#FDFBF7] text-xs mb-1.5 flex items-center gap-1 text-[#D4AF37]">
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Base Inclusions
                        </h5>
                        <p className="text-emerald-100/90 leading-normal mb-1.5">
                          Base rate includes the following premium design details:
                        </p>
                        <ul className="space-y-1 font-sans text-[10px]">
                          <li className="flex items-start gap-1">
                            <span className="text-[#D4AF37] text-[10px] leading-none shrink-0">✦</span>
                            <span>Freshly prepared luxury small chops crafted in Kano</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-[#D4AF37] text-[10px] leading-none shrink-0">✦</span>
                            <span>Dedicated uniform service staff & premium event styling</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-[#D4AF37] text-[10px] leading-none shrink-0">✦</span>
                            <span>Thermal heat-insulated food transport logistics</span>
                          </li>
                        </ul>
                        <p className="mt-2 text-[9px] font-mono italic text-emerald-100/50 leading-tight">
                          *Tax & final delivery fees calculated at booking validation.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => handleSelectPackage(key)}
                  className={`text-[10px] font-mono font-bold border-b border-dashed cursor-pointer pb-0.5 transition-all ${
                    isActive 
                      ? 'text-white border-[#D4AF37]' 
                      : 'text-[#D4AF37] border-[#D4AF37]/65 hover:text-white'
                  }`}
                >
                  {isActive ? 'Selected' : 'Customize Package'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
        
        {/* Left Side: Booking request Form */}
        <div id="brief-form-section" className="lg:col-span-7 bg-[#052E16]/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-[#FDFBF7] font-bold">Consultation Brief Form</h3>
            <p className="text-xs text-emerald-100/60 font-sans">Launch a luxury food design consultation in direct alignment with Zainab Bello.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Your Full Name</label>
                <input 
                  type="text" 
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] placeholder-emerald-100/30 focus:border-[#D4AF37] outline-none font-sans"
                  placeholder="e.g. Chief Khadijah Bello"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Contact Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] placeholder-emerald-100/30 focus:border-[#D4AF37] outline-none font-mono"
                  placeholder="e.g. +234 803 111 2222"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">E-mail address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] placeholder-emerald-100/30 focus:border-[#D4AF37] outline-none font-sans"
                  placeholder="info@yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Proposed Event Date</label>
                <input 
                  type="date" 
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] focus:border-[#D4AF37] outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/75 font-bold mb-1">Expected Attendee Count</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">{guestCount} Guests</span>
                  <input 
                    type="range" 
                    min="30" 
                    max="1000" 
                    step="10"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="flex-1 h-1.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Lover Table Theme Palette</label>
                <select 
                  value={selectedThemeColor}
                  onChange={(e) => setSelectedThemeColor(e.target.value)}
                  className="w-full bg-emerald-950/60 border border-[#D4AF37]/25 py-2.5 px-3 rounded-lg text-xs text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Golden Sage">Golden Sage & Emerald ribbons</option>
                  <option value="Royale Gold">Imperial Gold & White lace</option>
                  <option value="Cosmopolitan Silver">Cosmopolitan Silver & Soft Lilac</option>
                  <option value="Traditional Crimson">Traditional Crimson & Dried Palm Crowns</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Special Dietary / Allergy / Spiciness requests</label>
              <textarea 
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full p-4 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] placeholder-emerald-100/40 focus:border-[#D4AF37] outline-none font-sans"
                placeholder="e.g. Please provide mild spice samosas for children tables. Add gluten-free mini cakes."
                rows={3}
              />
            </div>

            {submittedId && (
              <div className="bg-emerald-950 text-[#D4AF37] border border-[#D4AF37]/35 p-3.5 rounded-xl text-xs font-mono text-center shadow-lg">
                Success! Custom consultation <strong>{submittedId}</strong> registered. Our Event Executive will call your number within 15 minutes!
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] font-serif text-xs uppercase tracking-widest py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#D4AF37]/20 shadow-md font-bold cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#052E16]" />
              <span>Launch Chef Consultation</span>
            </button>
          </form>
        </div>

        {/* Right Side: Reactive Real-Time Estimate Sheet rendering */}
        <div className="lg:col-span-5 bg-gradient-to-tr from-[#052E16] to-[#043e31]/80 text-[#FDFBF7] p-8 rounded-3xl border border-[#D4AF37]/25 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-4">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#052E16] bg-[#D4AF37] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/25 font-bold">Automatic Quote Estimator</span>
              <h3 className="font-serif text-lg text-[#FDFBF7] mt-1 font-bold">Estimator Sheet</h3>
            </div>
            <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          </div>

          <div className="space-y-4 text-xs font-mono text-emerald-100/75 animate-fade-in">
            <div className="flex justify-between">
              <span>Selected Program:</span>
              <span className="text-[#FDFBF7] font-bold text-right">{activeMetric.label}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Bespoke Food Rate:</span>
              <span>₦{activeMetric.baseRatePerGuest.toLocaleString()} per attendee</span>
            </div>

            <div className="flex justify-between">
              <span>Target Attendees:</span>
              <span className="text-[#FDFBF7] font-bold">{guestCount} Guests</span>
            </div>

            <div className="flex justify-between">
              <span>Table Visual Theme:</span>
              <span className="text-[#D4AF37] font-semibold">{selectedThemeColor}</span>
            </div>

            <div className="flex justify-between border-t border-[#D4AF37]/15 pt-4 text-base font-serif font-black text-[#FDFBF7]">
              <span>PROPOSED ESTIMATED:</span>
              <span className="text-[#D4AF37]">₦{calculatedQuoteSum.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-[#052E16]/80 border border-[#D4AF37]/15 p-4 rounded-xl text-[10px] text-emerald-100/70 space-y-2">
            <span className="font-serif font-bold text-[#FDFBF7] uppercase tracking-wider block">INCLUDED BENEFITS</span>
            <ul className="space-y-1 bg-transparent text-left list-disc list-inside">
              <li>Punctual logistics with thermal climate boxes</li>
              <li>Uniform executive server supervisors</li>
              <li>Signature customized red and green dips</li>
              <li>Complimentary sparkling elderflower cocktails</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={downloadPackagePDF}
            className="w-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-[#D4AF37] hover:text-[#f3d05c] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 rounded-xl py-3 px-4 font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 shadow-md transition-all duration-300 font-bold cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>Download Package Details (PDF)</span>
          </button>


          {/* Render Active Consultations */}
          {bookings.length > 0 && (
            <div className="border-t border-[#D4AF37]/20 pt-4">
              <span className="block text-[9px] uppercase font-mono tracking-widest text-emerald-100/50 font-bold mb-2">Registered Inquiries</span>
              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                {bookings.map((bk) => (
                  <div key={bk.id} className="bg-[#052E16] p-2.5 rounded border border-[#D4AF37]/20 text-[10px] font-mono flex items-center justify-between">
                    <div>
                      <span className="text-[#D4AF37] font-bold">{bk.id}</span>
                      <p className="text-emerald-100/60">{bk.eventType} • {bk.guestCount} guests</p>
                    </div>
                    <span className="bg-[#D4AF37] text-[#052E16] px-2 py-0.5 rounded-full text-[8px] font-mono font-bold leading-none">
                      {bk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
