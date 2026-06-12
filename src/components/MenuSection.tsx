/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Star, Info, Share2, Heart, Plus, ShoppingBag, CheckCircle, Flame } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuSectionProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, portion: string, spiciness?: string, scheduledDate?: string) => void;
  addToWishlist: (item: MenuItem) => void;
  wishlist: MenuItem[];
}

export default function MenuSection({
  menuItems,
  addToCart,
  addToWishlist,
  wishlist
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [sortBy, setSortBy] = React.useState<string>('default');
  const [selectedProduct, setSelectedProduct] = React.useState<MenuItem | null>(null);
  const [portionSelected, setPortionSelected] = React.useState<string>('');
  const [spicinessSelected, setSpicinessSelected] = React.useState<string>('Authentic Nigerian Spicy');
  const [scheduleGiftDate, setScheduleGiftDate] = React.useState<string>('');

  const categories = [
    { id: 'all', label: 'All Cuisine' },
    { id: 'small-chops', label: 'Small Chops' },
    { id: 'desserts', label: 'French Desserts' },
    { id: 'drinks', label: 'Craft Cocktails' },
    { id: 'party-trays', label: 'Grand Party Trays' },
    { id: 'gift-boxes', label: 'Luxury Gift Chests' },
    { id: 'corporate', label: 'Boardroom Corporate' }
  ];

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setSelectedSubCategory('all');
  };

  // Filtering + Searching logic
  const filteredItems = React.useMemo(() => {
    return menuItems
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        
        let matchesSubCategory = true;
        if (selectedCategory === 'small-chops' && selectedSubCategory !== 'all') {
          const idNum = parseInt(item.id.replace('sc-', ''), 10);
          const isHausaItem = !isNaN(idNum) && idNum >= 12 && idNum <= 21;
          const isEnglishItem = !isNaN(idNum) && idNum >= 22 && idNum <= 31;
          const isClassicItem = !isNaN(idNum) && idNum >= 1 && idNum <= 11;
          
          if (selectedSubCategory === 'hausa') {
            matchesSubCategory = isHausaItem;
          } else if (selectedSubCategory === 'english') {
            matchesSubCategory = isEnglishItem;
          } else if (selectedSubCategory === 'classic') {
            matchesSubCategory = isClassicItem;
          }
        }

        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSubCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default
      });
  }, [selectedCategory, selectedSubCategory, searchQuery, sortBy, menuItems]);

  const handleShare = (item: MenuItem) => {
    const shareText = `Luxury catering from Small Chops by Aqeelah! Try the "${item.name}" - ${item.description}`;
    if (navigator.share) {
      navigator.share({
         title: item.name,
         text: shareText,
         url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText}\nOrder here: ${window.location.href}`);
      alert("Taste link copied to clipboard! Share with family, brides, or colleagues.");
    }
  };

  const getRecommendations = (item: MenuItem) => {
    return menuItems
      .filter(m => m.id !== item.id && m.category !== item.category)
      .slice(0, 2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="cuisine-menu-catalog">
      
      {/* Menu Header banner */}
      <div className="text-center space-y-3">
        <span className="text-[#D4AF37] uppercase text-xs font-mono tracking-widest block font-bold">THE ONLINE CABINET</span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold">Our Culinary Treasury</h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 max-w-lg mx-auto leading-relaxed">
          Order premium finger snacks, zobo brews, and whole celebration trays online. Prepared fresh to order and shipped in secure climate-proof thermal lockers.
        </p>
      </div>

      {/* Searching & Sorting Controls Grid */}
      <div className="bg-emerald-950/45 p-4 rounded-2xl border border-[#D4AF37]/20 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Input field */}
        <div className="relative md:col-span-6">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-100/40" />
          <input 
            type="text"
            id="menu-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#052E16]/80 border border-[#D4AF37]/25 rounded-xl text-xs text-[#FDFBF7] placeholder-emerald-100/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            placeholder="Search Samosas, Puff Puff, Prawn wrap, Wafer Cup or specific ingredients..."
          />
        </div>

        {/* Sorting selection Dropdown */}
        <div className="relative md:col-span-3 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
          <select 
            id="menu-sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-[#052E16]/80 border border-[#D4AF37]/25 py-3 px-3 rounded-xl text-xs text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="default">Default Royal Sort</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Critic Rating (4.5+)</option>
          </select>
        </div>

        {/* Instantly Available Status Toggle display */}
        <div className="md:col-span-3 text-right">
          <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-mono uppercase px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/25 w-full justify-center md:w-auto">
            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Maitama & Lekki Delivery Active</span>
          </span>
        </div>
      </div>

      {/* Category Horizontal Filter Rails */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`menu-cat-${cat.id}`}
            onClick={() => handleCategorySelect(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-serif tracking-wide whitespace-nowrap transition-all flex-shrink-0 border cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#D4AF37] text-[#052E16] border-[#D4AF37] shadow-lg font-bold'
                : 'bg-emerald-950/40 text-emerald-100/80 border-[#D4AF37]/15 hover:border-[#D4AF37]/35'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Embedded Sub-tabs for Small Chops varieties */}
      <AnimatePresence>
        {selectedCategory === 'small-chops' && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-wrap items-center gap-1.5 p-2 bg-emerald-950/20 rounded-xl border border-[#D4AF37]/10 w-full"
            id="small-chops-subfilters"
          >
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider px-2 block font-semibold shrink-0">
              Assorted Groupings:
            </span>
            {[
              { id: 'all', label: 'All Chops' },
              { id: 'classic', label: 'Classic Core' },
              { id: 'hausa', label: 'Arewa (Hausa) Heritage' },
              { id: 'english', label: 'English Tea Classics' }
            ].map((sub) => {
              const isSel = selectedSubCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  id={`subcat-${sub.id}`}
                  onClick={() => setSelectedSubCategory(sub.id)}
                  className={`px-3 py-1 text-[10px] uppercase font-mono tracking-wider rounded-full transition-all cursor-pointer border ${
                    isSel 
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] font-bold' 
                      : 'bg-[#052E16]/40 border-[#D4AF37]/10 text-emerald-100/50 hover:text-[#FDFBF7]'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food Catalog Grid Layout */}
      {filteredItems.length === 0 ? (
        <div className="bg-emerald-950/45 border border-[#D4AF37]/20 p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto">
            <Info className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-lg text-[#FDFBF7] font-semibold">Cuisine Not Discovered</h4>
          <p className="text-xs text-emerald-100/70">
            Zainab Bello Sule’s kitchen has no exact database matches for your phrase. Try typing "puff puff", "Asun", or "Platter".
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="bg-[#D4AF37] text-[#052E16] py-2 px-5 rounded-lg text-xs font-mono uppercase tracking-widest font-bold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const isWishlisted = wishlist.some(w => w.id === item.id);

            // Dynamic Cultural Metadata detection
            const idNum = parseInt(item.id.replace('sc-', ''), 10);
            const isHausaItem = item.category === 'small-chops' && !isNaN(idNum) && idNum >= 12 && idNum <= 21;
            const isEnglishItem = item.category === 'small-chops' && !isNaN(idNum) && idNum >= 22 && idNum <= 31;
            const isClassicChops = item.category === 'small-chops' && !isNaN(idNum) && idNum >= 1 && idNum <= 11;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-emerald-950/40 rounded-2xl overflow-hidden border border-[#D4AF37]/15 hover:border-[#D4AF37]/45 transition-all group flex flex-col justify-between h-full"
              >
                {/* Product Image Overlay */}
                <div className="relative overflow-hidden aspect-[4/3] bg-emerald-950/30">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur-sm shadow-sm border border-[#D4AF37]/25 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="text-[10px] font-mono text-[#FDFBF7] font-bold">{item.rating}</span>
                  </div>

                  <button 
                    onClick={() => addToWishlist(item)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-emerald-950/90 backdrop-blur-md shadow-sm text-emerald-100/60 hover:text-red-500 transition-all border border-[#D4AF37]/25 cursor-pointer"
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500 animate-ping' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 bg-[#052E16]/95 backdrop-blur-sm px-2.5 py-1 rounded text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase border border-[#D4AF37]/25">
                    {item.availability}
                  </div>
                </div>

                {/* Card description details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-emerald-950/20">
                  <div className="space-y-1.5">
                    {/* Cultural Group Header indicator */}
                    {(isHausaItem || isEnglishItem || isClassicChops) && (
                      <span className={`inline-block text-[9px] font-mono uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-full border mb-1.5 ${
                        isHausaItem 
                          ? 'text-[#D4AF37] border-[#D4AF37]/25 bg-[#D4AF37]/5' 
                          : isEnglishItem 
                            ? 'text-sky-300 border-sky-400/20 bg-sky-950/10'
                            : 'text-[#FDFBF7]/40 border-emerald-100/10 bg-emerald-950/15'
                      }`}>
                        {isHausaItem ? '✦ Arewa Heritage' : isEnglishItem ? '✦ English Classic' : '✦ Classic Core'}
                      </span>
                    )}
                    <h4 className="font-serif text-base font-bold text-[#FDFBF7]">{item.name}</h4>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Pricing/Action section */}
                  <div className="border-t border-[#D4AF37]/15 pt-4 flex items-center justify-between">
                    <div>
                      <span className="block text-[9px] uppercase font-mono tracking-widest text-[#D4AF37]/60">Pristine Base Price</span>
                      <span className="text-base font-mono font-black text-[#D4AF37]">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      id={`menu-quick-peek-${item.id}`}
                      onClick={() => {
                        setSelectedProduct(item);
                        setPortionSelected(item.portionSizes[0]);
                      }}
                      className="bg-[#052E16] hover:bg-[#D4AF37] hover:text-[#052E16] text-[#D4AF37] border border-[#D4AF37]/35 rounded-lg px-4 py-2 text-xs font-serif font-bold tracking-wide transition-all cursor-pointer"
                    >
                      Customize & Order
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Detailed Premium Drawer Modal Popup */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto custom-scrollbar">
            {/* Click outside safety overlay backdrop */}
            <div className="absolute inset-0 z-0" onClick={() => setSelectedProduct(null)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 bg-[#052E16] text-[#FDFBF7] rounded-3xl overflow-y-auto md:overflow-hidden custom-scrollbar shadow-2xl max-w-4xl w-full border border-[#D4AF37]/35 flex flex-col md:flex-row max-h-[85vh] md:h-[680px]"
              id="peeking-food-modal"
            >
              {/* Left Column: Visual representation */}
              <div className="w-full md:w-1/2 relative aspect-video md:aspect-auto md:h-full bg-[#052E16] border-b md:border-b-0 md:border-r border-[#D4AF37]/20 flex-shrink-0">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => handleShare(selectedProduct)}
                  className="absolute top-4 left-4 bg-emerald-950/85 backdrop-blur-md p-2.5 rounded-full text-emerald-100/75 shadow-md border border-[#D4AF37]/25 hover:text-[#D4AF37] cursor-pointer"
                  title="Share with clients/family"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#052E16]/95 via-transparent to-transparent p-6 text-[#FDFBF7] text-xs">
                  <span className="font-mono text-[#D4AF37] font-bold uppercase tracking-widest block">MASTERPIECE REVIEWS</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star className="w-4 h-4 font-bold fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="font-bold text-sm">{selectedProduct.rating} / 5</span>
                    <span className="text-emerald-100/60">({selectedProduct.reviewsCount} customer reviews)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Config choices */}
              <div className="w-full md:w-1/2 overflow-hidden md:h-full flex flex-col min-h-0 md:rounded-r-3xl bg-[#052E16] flex-grow">
                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6 min-h-0">
                  
                  {/* Header info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20 font-bold">
                        {selectedProduct.availability}
                      </span>
                      <button 
                        onClick={() => setSelectedProduct(null)}
                        className="text-emerald-100/60 hover:text-[#D4AF37] text-xs font-bold uppercase font-mono cursor-pointer"
                      >
                        Close [x]
                      </button>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] font-extrabold">{selectedProduct.name}</h3>
                    <p className="text-xs text-emerald-100/70 leading-relaxed font-sans">{selectedProduct.description}</p>
                  </div>

                  {/* Selection Details */}
                  <div className="space-y-4">
                    
                    {/* Ingredients array */}
                    <div>
                      <span className="block text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold mb-1.5">Chef Zainab’s Ingredient Map</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedProduct.ingredients.map((ing, i) => (
                          <span key={i} className="text-[10px] bg-emerald-950/60 border border-[#D4AF37]/15 text-emerald-100/80 px-2.5 py-1 rounded font-mono">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Portion Sizing Selection */}
                    <div>
                      <span className="block text-[9px] uppercase font-mono tracking-widest text-emerald-100/60 font-bold mb-1.5">Select Portion Suite</span>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProduct.portionSizes.map((sz, i) => (
                          <button
                            key={i}
                            onClick={() => setPortionSelected(sz)}
                            className={`p-3 rounded-lg border text-xs font-mono text-center tracking-wide flex flex-col items-center justify-center transition-all cursor-pointer ${
                              portionSelected === sz 
                                ? 'border-[#D4AF37] bg-[#D4AF37] text-[#052E16] font-bold shadow' 
                                : 'border-[#D4AF37]/20 bg-emerald-950/40 text-emerald-100/85 hover:border-[#D4AF37]/45'
                            }`}
                          >
                            <span className="font-bold">{sz.split(' (+')[0]}</span>
                            {sz.includes(' (+') && (
                              <span className={`text-[9px] font-bold ${portionSelected === sz ? 'text-[#052E16]/80' : 'text-[#D4AF37]'}`}>
                                +{sz.split(' (+')[1].replace(')', '')}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Spiciness Slider Selector */}
                    <div>
                      <span className="block text-[9px] uppercase font-mono tracking-widest text-emerald-100/60 font-bold mb-1.5 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse font-bold" />
                        <span>Adjust Hotness Dial / Spiciness level</span>
                      </span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {['No Spice', 'Mild Chops', 'Medium Heat', 'Authentic Nigerian Spicy'].map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setSpicinessSelected(lvl)}
                            className={`py-2 text-[8px] font-mono tracking-widest uppercase rounded border text-center transition-all cursor-pointer ${
                              spicinessSelected === lvl 
                                ? 'bg-red-700 border-red-800 text-white font-black shadow-md' 
                                : 'bg-emerald-950/40 border-[#D4AF37]/25 text-emerald-100/70 hover:bg-[#052E16]/80'
                            }`}
                          >
                            {lvl.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Optional Scheduling Deliveries */}
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-widest text-emerald-100/60 font-bold mb-1.5">Schedule delivery for surprise date (Optional)</label>
                      <input 
                        type="date"
                        value={scheduleGiftDate}
                        onChange={(e) => setScheduleGiftDate(e.target.value)}
                        className="w-full px-3 py-2 bg-emerald-950/50 border border-[#D4AF37]/35 rounded text-xs text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37] font-mono"
                      />
                    </div>
                  </div>

                  {/* Recommendations Engine Section */}
                  <div className="border-t border-[#D4AF37]/15 pt-4">
                    <span className="block text-[9px] uppercase font-mono tracking-widest text-emerald-100/50 font-bold mb-2">Frequently Paired Complementaries</span>
                    <div className="grid grid-cols-2 gap-3">
                      {getRecommendations(selectedProduct).map((rec) => (
                        <div 
                          key={rec.id}
                          className="flex items-center gap-2 p-2 bg-emerald-950/60 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 rounded-lg transition-all cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(rec);
                            setPortionSelected(rec.portionSizes[0]);
                          }}
                        >
                          <img 
                            src={rec.image} 
                            alt={rec.name} 
                            className="w-10 h-10 object-cover rounded-md"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="block text-[10px] font-bold text-[#FDFBF7]">{rec.name}</span>
                            <span className="text-[9px] font-mono text-[#D4AF37] font-bold">₦{rec.price.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Pricing / Booking button - Fixed bottom panel */}
                <div className="border-t border-[#D4AF37]/20 p-6 bg-emerald-950/90 flex items-center justify-between gap-4 z-10 shrink-0">
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-[#D4AF37]/60 animate-pulse">Selected Choice Price</span>
                    <span className="text-xl font-mono text-[#D4AF37] font-black">
                      ₦{selectedProduct.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    id="add-customised-to-cart"
                    onClick={() => {
                      addToCart(selectedProduct, portionSelected, spicinessSelected, scheduleGiftDate);
                      alert(`Successfully added ${selectedProduct.name} (${portionSelected}) to your cart! Choice: ${spicinessSelected}`);
                      setSelectedProduct(null);
                    }}
                    className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] py-3 px-6 rounded-xl text-xs font-serif uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg border-2 border-[#D4AF37] font-bold cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#052E16]" />
                    <span>Incorporate Platter</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
