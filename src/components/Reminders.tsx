/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Bell, Plus, Users, Trash2, Heart, Check, Download } from 'lucide-react';
import { CelebrationReminder } from '../types';
import { luxuryAudio } from '../utils/audio';

interface RemindersProps {
  onAddReminder: (reminder: CelebrationReminder) => void;
  onDeleteReminder: (id: string) => void;
  reminders: CelebrationReminder[];
}

export default function Reminders({ onAddReminder, onDeleteReminder, reminders }: RemindersProps) {
  const [celebrantName, setCelebrantName] = React.useState('');
  const [relationship, setRelationship] = React.useState('Family');
  const [date, setDate] = React.useState('');
  const [eventType, setEventType] = React.useState<'Birthday' | 'Anniversary' | 'Graduation' | 'Corporate' | 'Other'>('Birthday');
  const [customMessage, setCustomMessage] = React.useState('');
  const [triggerCount, setTriggerCount] = React.useState(0);

  const formatDTSTAMP = () => {
    const now = new Date();
    return now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const formatDateICS = (dateStr: string) => {
    return dateStr.replace(/-/g, '');
  };

  const escapeText = (str: string) => {
    if (!str) return '';
    return str
      .replace(/\\/g, '\\\\')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;')
      .replace(/\n/g, '\\n');
  };

  const generateICS = (events: CelebrationReminder[]) => {
    let icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aqeelah Small Chops//Anniversary Reminders//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    events.forEach((rm) => {
      const startValue = formatDateICS(rm.date);
      // For all-day events, DTEND is the next day from start
      let endValue = startValue;
      if (rm.date) {
        const d = new Date(rm.date);
        d.setDate(d.getDate() + 1);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        endValue = `${year}${month}${day}`;
      }

      icsLines = icsLines.concat([
        'BEGIN:VEVENT',
        `UID:${rm.id}-${rm.date}@aqeelahsmallchops.com`,
        `DTSTAMP:${formatDTSTAMP()}`,
        `DTSTART;VALUE=DATE:${startValue}`,
        `DTEND;VALUE=DATE:${endValue}`,
        'RRULE:FREQ=YEARLY',
        `SUMMARY:Aqeelah Chops: ${escapeText(rm.celebrantName)}'s ${escapeText(rm.eventType)} (${escapeText(rm.relationship)})`,
        `DESCRIPTION:${escapeText(rm.customMessage || `Surprise gift and catering reminder for ${rm.celebrantName}.`)}\\n\\nScheduled via Aqeelah Celebration Reminders Kano.`,
        'TRANSP:TRANSPARENT',
        'CLASS:PUBLIC',
        'END:VEVENT'
      ]);
    });

    icsLines.push('END:VCALENDAR');
    return icsLines.join('\r\n');
  };

  const handleDownload = (events: CelebrationReminder[], filename: string) => {
    const icsString = generateICS(events);
    const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Play celebratory sound
    luxuryAudio.playPaymentSuccessSound();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReminder: CelebrationReminder = {
      id: `RM-${Date.now().toString().slice(-5)}`,
      celebrantName,
      relationship,
      date,
      eventType,
      customMessage
    };

    onAddReminder(newReminder);
    setTriggerCount(prev => prev + 1);

    // Reset Form
    setCelebrantName('');
    setCustomMessage('');
    setDate('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="anniversary-reminders">
      
      {/* Header section */}
      <div className="text-center space-y-3">
        <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">VIP SCHEDULE UTILITIES</span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold">Celebration Reminder System</h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 max-w-lg mx-auto leading-relaxed">
          Never miss critical family or boardroom milestones. Save annual events. Small Chops by Aqeelah will automatically email you <strong>7 days prior</strong> and initiate pre-scheduled gift boxes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
        
        {/* Left Grid Column: Insert Form */}
        <div className="lg:col-span-6 bg-[#052E16]/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-[#FDFBF7] font-bold">Register Celebration Milestone</h3>
            <p className="text-xs text-emerald-100/60 font-sans">Add milestones to spawn automatic luxury notifications.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Celebrant Full Name</label>
                <input 
                  type="text" 
                  required
                  value={celebrantName}
                  onChange={(e) => setCelebrantName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] placeholder-emerald-100/40 focus:border-[#D4AF37] outline-none"
                  placeholder="e.g. Zainab Bello Sule"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Your Relationship</label>
                <select 
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full bg-emerald-950/60 border border-[#D4AF37]/25 py-2.5 px-3 rounded-lg text-xs text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Spouse">Spouse / Partner</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling / Brother / Sister</option>
                  <option value="Corporate Client">Corporate Client / Partner</option>
                  <option value="Friend">Friend</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Celebration Date</label>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] focus:border-[#D4AF37] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Category style</label>
                <select 
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as any)}
                  className="w-full bg-emerald-950/60 border border-[#D4AF37]/25 py-2.5 px-3 rounded-lg text-xs text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Birthday">Birthday Milestone</option>
                  <option value="Anniversary">Luxury Anniversary</option>
                  <option value="Graduation">Graduation Assembly</option>
                  <option value="Corporate">Management Summit</option>
                  <option value="Other">Bespoke Affair</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Gift Card Calligraphy Note message</label>
              <textarea 
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-4 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] placeholder-emerald-100/35 focus:border-[#D4AF37] outline-none"
                placeholder="e.g. Wishing you many years of continuous victory, wealth and fine food! Enjoy this hot tray from Zainab Bello."
                rows={3}
              />
            </div>

            {triggerCount > 0 && (
              <div className="bg-emerald-950 text-[#D4AF37] border border-[#D4AF37]/30 p-3.5 rounded-xl text-xs font-mono text-center flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Celebration registered beautifully! <strong>A 15% discount coupon</strong> code routed.</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] font-serif text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 border border-[#D4AF37]/20 shadow-md font-bold cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#052E16]" />
              <span>Incorporate Reminder</span>
            </button>
          </form>
        </div>

        {/* Right Grid Column: Active Saved Reminders list details with countdown timers */}
        <div className="lg:col-span-6 bg-emerald-950/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D4AF37]/15 pb-4 gap-3">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37]/60">MILITARY ACCURACIES</span>
              <h3 className="font-serif text-lg text-[#FDFBF7] font-bold flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#D4AF37] animate-bounce" />
                <span>Personalized Trackbook</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {reminders.length > 0 && (
                <button
                  onClick={() => handleDownload(reminders, 'aqeelah-celebration-tracker.ics')}
                  className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-[10px] font-mono font-bold uppercase py-1.5 px-3 rounded-lg border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-all cursor-pointer select-none outline-none"
                  title="Export all reminders to your digital calendar as ICS"
                  id="export-reminders-ics"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Trackbook (.ics)</span>
                </button>
              )}
              <span className="bg-[#D4AF37] text-[#052E16] font-mono text-xs px-2.5 py-1 rounded-full font-bold shadow shrink-0">
                {reminders.length} Registered
              </span>
            </div>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
            {reminders.length === 0 ? (
              <div className="text-center py-12 text-emerald-100/50 space-y-4 font-sans">
                <Calendar className="w-12 h-12 mx-auto text-[#D4AF37]/75 animate-pulse" />
                <div>
                  <h4 className="font-serif text-[#FDFBF7] text-sm font-bold">Empty Reminders Journal</h4>
                  <p className="text-[10px] text-emerald-100/60 leading-normal max-w-xs mx-auto mt-1">
                    Store and organize your milestones here to prompt surprise courier scheduling and secure early event prices.
                  </p>
                </div>
              </div>
            ) : (
              reminders.map((rm) => (
                <div 
                  key={rm.id} 
                  className="bg-emerald-950/65 rounded-xl p-4 border border-[#D4AF37]/15 shadow-sm flex items-start justify-between gap-4 group hover:border-[#D4AF37]/45 transition-all"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase border border-[#D4AF37]/20">
                        {rm.eventType}
                      </span>
                      <span className="text-[10px] text-emerald-100/50 font-mono font-bold">Ref: {rm.id}</span>
                    </div>

                    <h4 className="font-serif text-xs font-bold text-[#FDFBF7] leading-none">
                      {rm.celebrantName} <span className="text-emerald-100/60 text-[10px] italic">({rm.relationship})</span>
                    </h4>

                    {rm.customMessage && (
                      <p className="text-[10px] text-emerald-100/70 italic bg-emerald-950 p-2 rounded border border-[#D4AF37]/10 font-sans">
                        "{rm.customMessage}"
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-mono font-bold">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{rm.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleDownload([rm], `aqeelah-milestone-${rm.id}.ics`)}
                      className="text-emerald-100/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 border border-transparent hover:border-[#D4AF37]/20 p-1.5 rounded-lg transition-all cursor-pointer outline-none"
                      title="Add to Digital Calendar (.ics)"
                      aria-label="Export single milestone"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteReminder(rm.id)}
                      className="text-emerald-100/50 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/25 p-1.5 rounded-lg transition-all cursor-pointer outline-none"
                      title="Delete milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-[#052E16]/80 p-4 rounded-xl border border-[#D4AF37]/15 text-[10px] text-emerald-100/60 space-y-1">
            <span className="font-serif font-black text-[#FDFBF7] uppercase block">AUTOMATION PROTOCOLS</span>
            <p className="leading-relaxed font-sans">
              * Upon matching, pre-filled cart triggers will send direct links to verified email profiles. Order confirmations initiate 1-hour fast packaging queues automatically.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
