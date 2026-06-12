/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Building, Download, Calendar, RefreshCw, BarChart3, Check, Printer, FileText } from 'lucide-react';
import { CartItem } from '../types';

interface CorporateProps {
  cart: CartItem[];
}

export default function Corporate({ cart }: CorporateProps) {
  const [billingCompany, setBillingCompany] = React.useState('Dangote Industries Ltd');
  const [corporateTaxId, setCorporateTaxId] = React.useState('TIN-99201048-AQC');
  const [billingAddress, setBillingAddress] = React.useState('Dangote Office Suite, BUK Road, Gwale, Kano');
  const [activeInvoiceTab, setActiveInvoiceTab] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);

  const mockHistoricalSpends = [
    { date: '2026-05-15', memo: 'AGM Shareholder Samosa boxes', amount: 320000, reference: 'INV-2026-056' },
    { date: '2026-05-28', memo: 'Executive Board Lunch (Gizdodo wafer trays)', amount: 185000, reference: 'INV-2026-089' },
    { date: '2026-06-02', memo: 'HR Milestone - Employee Puff Puff Day', amount: 95000, reference: 'INV-2026-112' }
  ];

  const cartTotal = cart.reduce((sum, item) => {
    const numericPart = parseInt(item.selectedPortion.match(/\d+/)?.[0] || '12');
    const factor = numericPart > 12 ? (numericPart / 12) : 1;
    const itemPrice = item.product.price * (factor >= 1 ? Math.floor(factor) : 1);
    return sum + (itemPrice * item.quantity);
  }, 0);

  const currentSpendSum = mockHistoricalSpends.reduce((s, h) => s + h.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="corporate-dashboard">
      
      {/* Header banner */}
      <div className="text-center space-y-3">
        <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">BUSINESS GOVERNANCE</span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold">Corporate Dashboard</h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 max-w-lg mx-auto leading-relaxed">
          Manage procurement schedules, export downloadable invoices, monitor quarterly culinary overheads, and coordinate corporate catering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Procurement spend analytics charts and forms */}
        <div className="lg:col-span-6 bg-[#052E16]/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-6">
          
          <div className="space-y-1.5 border-b border-[#D4AF37]/15 pb-4">
            <h3 className="font-serif text-lg text-[#FDFBF7] font-bold">Billing Information Profile</h3>
            <p className="text-xs text-emerald-100/60 font-sans">Configure corporate identifiers for automated invoice generation.</p>
          </div>

          <div className="space-y-4 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Company Registered Name</label>
                <input 
                  type="text"
                  value={billingCompany}
                  onChange={(e) => setBillingCompany(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Taxpayer Identification (TIN)</label>
                <input 
                  type="text"
                  value={corporateTaxId}
                  onChange={(e) => setCorporateTaxId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] focus:border-[#D4AF37] outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Corporate Physical HQ Address</label>
              <input 
                type="text"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/60 border border-[#D4AF37]/25 text-xs text-[#FDFBF7] focus:border-[#D4AF37] outline-none"
              />
            </div>
          </div>

          {/* Historical spends logging spreadsheet */}
          <div className="space-y-3 pt-2">
            <span className="block text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">Procurement Spendings ledger</span>
            <div className="border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-emerald-900/60 border-b border-[#D4AF37]/15 text-emerald-100/60 font-mono text-[9px]">
                    <th className="p-3">Reference No</th>
                    <th className="p-3">Event Brief</th>
                    <th className="p-3 text-right">Sum paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/15 font-mono text-[#FDFBF7]">
                  {mockHistoricalSpends.map((sp, idx) => (
                    <tr key={idx} className="hover:bg-emerald-950/30">
                      <td className="p-3 font-mono font-bold text-[#D4AF37]">{sp.reference}</td>
                      <td className="p-3 font-sans text-emerald-100/80">{sp.memo}</td>
                      <td className="p-3 text-right font-mono font-bold">₦{sp.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-950/70 text-[#D4AF37] border-t border-[#D4AF37]/35 font-bold">
                    <td className="p-3 font-serif">Quarter Cumulative:</td>
                    <td className="p-3"></td>
                    <td className="p-3 text-right font-mono text-[#D4AF37] font-black">₦{currentSpendSum.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/25 p-4 rounded-xl flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div className="text-[10px] text-emerald-100/80 leading-relaxed font-sans">
              <strong>Interactive Expense Report:</strong> Your cumulative business account has unlocked <span className="text-[#D4AF37] font-semibold">Silver VIP Corporate Tier</span>, qualifying Dangote Industries Ltd for an automatic 10% discount on all boardroom bookings!
            </div>
          </div>

          {/* Prompt invoice viewing */}
          <button 
            type="button"
            onClick={() => setActiveInvoiceTab(!activeInvoiceTab)}
            className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] font-serif text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-bold cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#052E16]" />
            <span>{activeInvoiceTab ? "Collapse Invoice Casing Sheet" : "Compile Active Basket Invoice"}</span>
          </button>

        </div>

        {/* Right Side: High Fidelity custom printable digital Invoice representation */}
        <div className="lg:col-span-6 bg-emerald-950/40 border border-[#D4AF37]/20 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 text-[#FDFBF7]">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-4">
            <div>
              <span className="block text-[8px] uppercase tracking-widest font-mono text-[#D4AF37] font-bold">Catering Invoice Sheet</span>
              <h3 className="font-serif text-lg text-[#FDFBF7] font-bold">Invoice: AQE-2026-993</h3>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handlePrint}
                className="p-2 text-emerald-100/60 hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/20 bg-[#052E16]/80 rounded-lg cursor-pointer"
                title="Print Corporate records"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDownloadInvoice}
                className="p-2 text-emerald-100/60 hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/20 bg-[#052E16]/80 rounded-lg cursor-pointer"
                title="Download CSV spreadsheet"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs font-sans">
            {/* Invoice Metadata grids */}
            <div className="grid grid-cols-2 gap-4 border-b border-[#D4AF37]/15 pb-4 text-emerald-100/70">
              <div>
                <span className="block text-[8px] font-mono uppercase text-[#D4AF37]/60 font-bold">ISSUER:</span>
                <strong className="text-[#FDFBF7] font-serif">Small Chops by Aqeelah Group</strong>
                <p className="text-[10px] mt-0.5">House No. 14, Janbulo First Gate, Gwale, Kano</p>
                <p className="text-[10px]">TIN: 1102948-009</p>
              </div>

              <div>
                <span className="block text-[8px] font-mono uppercase text-[#D4AF37]/60 font-bold">BILLED TO:</span>
                <strong className="text-[#FDFBF7] block font-serif">{billingCompany}</strong>
                <p className="text-[10px] mt-0.5">{billingAddress}</p>
                <p className="text-[10px]">Tax ID: {corporateTaxId}</p>
              </div>
            </div>

            {/* Invoiced items list */}
            <div>
              <span className="block text-[8px] font-mono uppercase text-[#D4AF37]/60 font-bold mb-2">PARTICULARS DECLARED:</span>
              <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-6 text-emerald-100/40 italic">
                    Add menu items to your shopping cart to visualize an automated corporate VAT pricing invoice representation.
                  </div>
                ) : (
                  cart.map((item, id) => {
                    const numericPart = parseInt(item.selectedPortion.match(/\d+/)?.[0] || '12');
                    const factor = numericPart > 12 ? (numericPart / 12) : 1;
                    const itemPrice = item.product.price * (factor >= 1 ? Math.floor(factor) : 1);
                    return (
                      <div key={id} className="flex justify-between items-center text-emerald-100/90 pt-1 border-b border-[#D4AF37]/10 pb-1">
                        <div>
                          <span className="font-bold text-[#FDFBF7] block font-serif">{item.product.name}</span>
                          <span className="text-[10px] text-emerald-100/50">Quantity: {item.quantity} × {item.selectedPortion}</span>
                        </div>
                        <span className="font-mono font-semibold text-[#D4AF37]">₦{(itemPrice * item.quantity).toLocaleString()}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Calculations totals with VAT (7.5% Nigerian standard value added tax) */}
            <div className="border-t border-[#D4AF37]/15 pt-4 space-y-1.5 font-mono text-emerald-100/80 text-right">
              <div className="flex justify-between text-[11px]">
                <span>Logistics Subtotal:</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#D4AF37]">
                <span>Exclusive corporate discount (10% VIP):</span>
                <span>-₦{(cartTotal * 0.1).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Nigerian standard VAT (7.5%):</span>
                <span>₦{Math.round(cartTotal * 0.9 * 0.075).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-black text-[#FDFBF7] border-t border-[#D4AF37]/20 pt-2 mt-1">
                <span>TOTAL PAYABLE INVOICE:</span>
                <span className="font-mono text-[#D4AF37] font-black text-base">
                  ₦{cartTotal === 0 ? '0' : Math.round(cartTotal * 0.9 * 1.075 + 3500).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D4AF37]/15 pt-4 text-center">
            <span className="text-[10px] text-emerald-100/40 font-mono">Verified securely by Aqeelah Financial Office. Non-refundable.</span>
            
            <AnimatePresence>
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-xs bg-[#D4AF37] text-[#052E16] p-2 rounded border border-[#D4AF37] text-center font-mono flex items-center justify-center gap-1.5 font-bold shadow"
                >
                  <Check className="w-4 h-4 text-[#052E16] font-bold" />
                  <span>Invoice downloaded successfully as CSV spreadsheet!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
}
