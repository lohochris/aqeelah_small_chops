/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, MapPin, Activity, Clock, CreditCard, 
  CheckCircle2, Info, Lock, ShieldCheck, Smartphone, X, Star, HelpCircle,
  Instagram, Twitter, ShieldAlert, Scale, FileText, Cookie
} from 'lucide-react';

import { MenuItem, CartItem, CelebrationReminder, EventBooking, Review, Order } from './types';
import { MENU_ITEMS, TESTIMONIALS, BLOG_ARTICLES, FAQS } from './data';
import { jsPDF } from 'jspdf';
import { luxuryAudio } from './utils/audio';

import Navbar from './components/Navbar';
import Home from './components/Home';
import MenuSection from './components/MenuSection';
import TrayBuilder from './components/TrayBuilder';
import PartyPlanner from './components/PartyPlanner';
import Catering from './components/Catering';
import Reminders from './components/Reminders';
import Corporate from './components/Corporate';
import Loyalty from './components/Loyalty';
import AdminDashboard from './components/AdminDashboard';
import AboutFounder from './components/AboutFounder';
import Consultations from './components/Consultations';
import DiasporaHub from './components/DiasporaHub';
import InteractiveLocationMap from './components/InteractiveLocationMap';
import ZainabChatBot from './components/ZainabChatBot';
import ConciergeSuiteHub from './components/ConciergeSuiteHub';
import LanguageHub from './components/LanguageHub';

export function formatDetailedTimestamp(dateInput?: Date | string) {
  const d = dateInput ? new Date(dateInput) : new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  return d.toLocaleDateString('en-US', options);
}

export default function App() {
  const [currentTab, setCurrentTab] = React.useState<string>('home');
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    const local = localStorage.getItem('aqeelah_cart');
    return local ? JSON.parse(local) : [];
  });
  const [wishlist, setWishlist] = React.useState<MenuItem[]>([]);
  const [openCartDrawer, setOpenCartDrawer] = React.useState(false);
  
  const [bookings, setBookings] = React.useState<EventBooking[]>(() => {
    const local = localStorage.getItem('aqeelah_bookings');
    return local ? JSON.parse(local) : [
      {
        id: 'BK-9910',
        clientName: 'Chevron HQ Secretariat',
        email: 'procure@chevron.com',
        phone: '+234803920192',
        eventType: 'Corporate',
        eventDate: '2026-06-15',
        guestCount: 50,
        estimatedBudget: 325000,
        selectedThemeColor: 'Golden Sage',
        specialRequests: 'Client boardroom meeting layout.',
        menuPackageSelected: 'Executive Boardroom',
        status: 'Contract Sent'
      }
    ];
  });

  const [reminders, setReminders] = React.useState<CelebrationReminder[]>(() => {
    const local = localStorage.getItem('aqeelah_reminders');
    return local ? JSON.parse(local) : [
      {
        id: 'RM-102',
        celebrantName: 'Chief Adebayo Alao',
        relationship: 'Family Patron',
        date: '2026-06-25',
        eventType: 'Birthday',
        customMessage: 'Happy birthday to the pillar of our home! Enjoy Zainab’s golden puffs.'
      }
    ];
  });

  const [loyaltyPoints, setLoyaltyPoints] = React.useState<number>(() => {
    const local = localStorage.getItem('aqeelah_pts');
    return local ? parseInt(local) : 350; // default initial gold tier seeding
  });

  // Master Orders log for tracked stages (Received -> Preparing -> Packaging -> Out -> Delivered)
  const [orders, setOrders] = React.useState<Order[]>(() => {
    const local = localStorage.getItem('aqeelah_orders');
    return local ? JSON.parse(local) : [
      {
        id: 'AQE-2026-0921',
        items: [
          {
            id: 'item-001',
            product: MENU_ITEMS[0],
            selectedPortion: 'Box of 24',
            quantity: 1
          }
        ],
        subtotal: 22000,
        deliveryFee: 3500,
        discount: 2200,
        total: 23300,
        status: 'Preparing',
        customerName: 'Chris loho',
        customerEmail: 'lohochris@gmail.com',
        deliveryAddress: 'House No. 14, Janbulo First Gate, Near BUK Entrance, Gwale LGA, Kano',
        paymentMethod: 'Paystack',
        date: '2026-06-06',
        archived: false,
        receivedAt: 'Saturday, June 6, 2026 at 02:15 PM',
        preparingAt: 'Saturday, June 6, 2026 at 02:40 PM'
      }
    ];
  });

  const [reviews, setReviews] = React.useState<Review[]>(TESTIMONIALS);
  const [couponCodes, setCouponCodes] = React.useState<{ code: string; discount: number }[]>([
    { code: 'WELCOMETOAFRICA', discount: 15 },
    { code: 'AQEELAH99', discount: 10 }
  ]);

  // Secure Billing Modal Overlays state variables
  const [checkoutActive, setCheckoutActive] = React.useState<boolean>(false);
  const [checkoutMethod, setCheckoutMethod] = React.useState<'Paystack' | 'Flutterwave' | 'Bank Transfer'>('Paystack');
  const [cardNo, setCardNo] = React.useState('5399 2011 4458 9912');
  const [cardExpiry, setCardExpiry] = React.useState('12/28');
  const [cardCvv, setCardCvv] = React.useState('382');
  const [cardPin, setCardPin] = React.useState('2093');
  const [checkoutStatus, setCheckoutStatus] = React.useState<'Ready' | 'Processing' | 'Success'>('Ready');
  const [toasts, setToasts] = React.useState<{ id: string; message: string }[]>([]);
  const [legalModalOpen, setLegalModalOpen] = React.useState<boolean>(false);
  const [activeLegalTab, setActiveLegalTab] = React.useState<'terms' | 'privacy' | 'legal' | 'cookie'>('terms');

  // Customer identity and coordinate inputs
  const [custName, setCustName] = React.useState('Chris');
  const [custEmail, setCustEmail] = React.useState('lohochris@gmail.com');
  const [custAddress, setCustAddress] = React.useState('House No. 8, BUK Road, Gwale, Kano');

  React.useEffect(() => {
    // Elegant fallback and custom interceptor for window.alert state management
    const nativeAlert = window.alert;
    window.alert = (message: string) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      setToasts(prev => [...prev, { id, message }]);
      
      // Auto-dismiss within 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 5000);
    };

    return () => {
      window.alert = nativeAlert;
    };
  }, []);

  // Synchronize localStorage buffers securely on state transitions
  React.useEffect(() => {
    localStorage.setItem('aqeelah_cart', JSON.stringify(cart));
  }, [cart]);

  React.useEffect(() => {
    localStorage.setItem('aqeelah_bookings', JSON.stringify(bookings));
  }, [bookings]);

  React.useEffect(() => {
    localStorage.setItem('aqeelah_reminders', JSON.stringify(reminders));
  }, [reminders]);

  React.useEffect(() => {
    localStorage.setItem('aqeelah_orders', JSON.stringify(orders));
  }, [orders]);

  React.useEffect(() => {
    localStorage.setItem('aqeelah_pts', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  const handleAddToCart = (
    item: MenuItem, 
    portion: string, 
    spiciness = 'Authentic Nigerian Spicy',
    scheduledDate?: string
  ) => {
    const existing = cart.find(c => c.product.id === item.id && c.selectedPortion === portion);
    if (existing) {
      setCart(cart.map(c => c.product.id === item.id && c.selectedPortion === portion 
        ? { ...c, quantity: c.quantity + 1 } 
        : c
      ));
    } else {
      setCart([...cart, {
        id: `cart-item-${Date.now()}`,
        product: item,
        selectedPortion: portion,
        quantity: 1,
        customMessage: spiciness !== 'Authentic Nigerian Spicy' ? `Spice: ${spiciness}` : undefined,
        scheduledDate
      }]);
    }

    // Dynamic alert for instant Chef Zainab sync on WhatsApp / Email
    const chefMsg = `🛒 Added "${item.name}" (${portion}) to cart! Chef Zainab received an instant prep notification on WhatsApp (+234 803 762 9012) & Email (chef.zainab@aqeelah.com) for culinary pre-coordination.`;
    const toastId = `toast-chef-cart-${Date.now()}`;
    setToasts(prev => [...prev, { id: toastId, message: chefMsg }]);
    // Auto-dismiss within 7 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 7000);
  };

  const handleReorder = (items: CartItem[]) => {
    let updatedCart = [...cart];
    items.forEach(item => {
      const existingIdx = updatedCart.findIndex(c => c.product.id === item.product.id && c.selectedPortion === item.selectedPortion);
      if (existingIdx > -1) {
        updatedCart[existingIdx] = {
          ...updatedCart[existingIdx],
          quantity: updatedCart[existingIdx].quantity + item.quantity
        };
      } else {
        updatedCart.push({
          ...item,
          id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
        });
      }
    });
    setCart(updatedCart);

    const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const successMsg = `🔄 Successful Premium Reorder! Automatically cloned ${totalItemsCount} custom-seasoned items from your historic transaction directly into your active cart.`;
    const toastId = `toast-reorder-success-${Date.now()}`;
    setToasts(prev => [...prev, { id: toastId, message: successMsg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 8000);
    
    luxuryAudio.playPaymentSuccessSound();
  };

  const handleAddToWishlist = (item: MenuItem) => {
    if (wishlist.some(w => w.id === item.id)) {
      setWishlist(wishlist.filter(w => w.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
      alert(`Saved "${item.name}" to your private culinary wishlist!`);
    }
  };

  const handleAddBooking = (booking: EventBooking) => {
    setBookings([booking, ...bookings]);
  };

  const handleAddReminder = (reminder: CelebrationReminder) => {
    setReminders([reminder, ...reminders]);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        const update: Partial<Order> = { status };
        const nowStr = formatDetailedTimestamp();
        if (status === 'Order Received' && !o.receivedAt) update.receivedAt = nowStr;
        else if (status === 'Preparing' && !o.preparingAt) update.preparingAt = nowStr;
        else if (status === 'Packaging' && !o.packagingAt) update.packagingAt = nowStr;
        else if (status === 'Out for Delivery' && !o.outForDeliveryAt) update.outForDeliveryAt = nowStr;
        else if (status === 'Delivered' && !o.deliveredAt) update.deliveredAt = nowStr;
        return { ...o, ...update };
      }
      return o;
    }));
  };

  const handleArchiveOrder = (orderId: string, archived: boolean) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, archived } : o));
  };

  const handleToggleReviewVerify = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, verified: !r.verified } : r));
  };

  const handleAddCoupon = (code: string, discount: number) => {
    setCouponCodes([{ code, discount }, ...couponCodes]);
  };

  const handleRedeemPoints = (points: number) => {
    setLoyaltyPoints(p => Math.max(0, p - points));
  };

  // Checkout deployment logic
  const handleTriggerCheckout = (method: 'Paystack' | 'Flutterwave' | 'Bank Transfer') => {
    setCheckoutMethod(method);
    setCheckoutStatus('Ready');
    setCheckoutActive(true);
  };

  const handleCompleteSecurePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStatus('Processing');

    setTimeout(() => {
      // Create final success order payload mapping
      const cartTotal = cart.reduce((sum, item) => {
        const numericPart = parseInt(item.selectedPortion.match(/\d+/)?.[0] || '12');
        const factor = numericPart > 12 ? (numericPart / 12) : 1;
        const itemPrice = item.product.price * (factor >= 1 ? Math.floor(factor) : 1);
        return sum + (itemPrice * item.quantity);
      }, 0);

      const computedTotal = Math.round(cartTotal * 0.9 + 3500);

      const newlyMintedOrder: Order = {
        id: `AQE-2026-${Math.floor(1000 + Math.random() * 9000).toString()}`,
        items: [...cart],
        subtotal: cartTotal,
        deliveryFee: 3500,
        discount: Math.round(cartTotal * 0.1),
        total: computedTotal,
        status: 'Order Received',
        customerName: custName,
        customerEmail: custEmail,
        deliveryAddress: custAddress,
        paymentMethod: checkoutMethod,
        date: new Date().toISOString().split('T')[0],
        archived: false,
        receivedAt: formatDetailedTimestamp()
      };

      // Generate dynamically the order's premium high-fidelity PDF
      let pdfBase64Data = "";
      try {
        const doc = new jsPDF();
        
        // Header Banner: Emerald Green block
        doc.setFillColor(3, 29, 14);
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
        doc.text('MODERN AFRICAN LUXURY \u2022 ESTABLISHED IN KANO STATE', 20, 34);
        
        // Document Title
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(5, 46, 22);
        doc.text('Gourmet Small Chops - Order Invoice', 15, 50);
        
        // Horizontal divider
        doc.setDrawColor(212, 175, 55);
        doc.setLineWidth(0.5);
        doc.line(15, 54, 195, 54);
        
        // Metadata fields
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(`Order Reference: ${newlyMintedOrder.id}`, 15, 61);
        doc.text(`Date of Purchase: ${newlyMintedOrder.date}`, 15, 66);
        doc.text(`Customer Name: ${newlyMintedOrder.customerName}`, 15, 71);
        doc.text(`Email Address: ${newlyMintedOrder.customerEmail}`, 15, 76);
        
        const addressLines = doc.splitTextToSize(`Delivery Target Coordinate: ${newlyMintedOrder.deliveryAddress}`, 170);
        doc.text(addressLines, 15, 81);
        
        const yOffsetAfterAddress = 81 + (addressLines.length * 4.5);
        
        // Section II. ORDER ITEMS BREAKDOWN
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(5, 46, 22);
        doc.text('I. PURCHASED CULINARY DELICACIES', 15, yOffsetAfterAddress + 10);
        
        doc.setDrawColor(212, 175, 55);
        doc.line(15, yOffsetAfterAddress + 12, 195, yOffsetAfterAddress + 12);
        
        // List items
        let itemY = yOffsetAfterAddress + 18;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        
        newlyMintedOrder.items.forEach((item, index) => {
          const itemNum = parseInt(item.selectedPortion.match(/\d+/)?.[0] || '12');
          const factor = itemNum > 12 ? (itemNum / 12) : 1;
          const itemPrice = item.product.price * (factor >= 1 ? Math.floor(factor) : 1);
          const itemTotal = itemPrice * item.quantity;
          
          if (itemY > 260) {
            doc.addPage();
            itemY = 20;
          }
          
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(5, 46, 22);
          doc.text(`${index + 1}. ${item.product.name}`, 15, itemY);
          
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(80, 80, 80);
          doc.text(`Portion: ${item.selectedPortion}   |   Qty: ${item.quantity}   |   Rate: N${itemPrice.toLocaleString()}`, 15, itemY + 4.5);
          
          doc.setFont('helvetica', 'bold');
          doc.text(`N${itemTotal.toLocaleString()}`, 175, itemY, { align: 'right' });
          
          itemY += 12;
        });
        
        // Total line
        if (itemY > 240) {
          doc.addPage();
          itemY = 20;
        }
        
        doc.setDrawColor(212, 175, 55);
        doc.line(15, itemY, 195, itemY);
        
        itemY += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text('Subtotal:', 130, itemY);
        doc.text(`N${newlyMintedOrder.subtotal.toLocaleString()}`, 175, itemY, { align: 'right' });
        
        itemY += 5;
        doc.text('Aqeelah Premium Discount (10%):', 130, itemY);
        doc.text(`-N${newlyMintedOrder.discount.toLocaleString()}`, 175, itemY, { align: 'right' });
        
        itemY += 5;
        doc.text('Climate Locked Premium Delivery:', 130, itemY);
        doc.text(`N${newlyMintedOrder.deliveryFee.toLocaleString()}`, 175, itemY, { align: 'right' });
        
        itemY += 7;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(5, 46, 22);
        doc.text('GRAND TOTAL PAID:', 130, itemY);
        doc.text(`N${newlyMintedOrder.total.toLocaleString()}`, 175, itemY, { align: 'right' });
        
        // Chef Zainab's Thank You Note Section
        itemY += 18;
        if (itemY > 210) {
          doc.addPage();
          itemY = 25;
        }
        
        doc.setFillColor(248, 246, 242);
        doc.rect(15, itemY, 180, 42, 'F');
        doc.setDrawColor(212, 175, 55);
        doc.rect(15, itemY, 180, 42, 'S');
        
        doc.setFont('times', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(5, 46, 22);
        doc.text('A NOTE OF APPRECIATION FROM CHEF ZAINAB BELLO SULE', 20, itemY + 8);
        
        doc.setFont('times', 'italic');
        doc.setFontSize(9.5);
        doc.setTextColor(80, 80, 80);
        
        const personalNote = `"Masha Allah, my esteemed patron ${newlyMintedOrder.customerName}! I am deeply honored to handcraft your select delicacies. Every golden fold of the crispy samosas and wedding-tier delights is seasoned with authentic Kano love and pride. May your culinary celebration be filled with beauty and victory!"`;
        const splitNote = doc.splitTextToSize(personalNote, 170);
        doc.text(splitNote, 20, itemY + 14);
        
        doc.setFont('times', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(212, 175, 55);
        doc.text('Chef Zainab Bello Sule', 20, itemY + 36);
        doc.setFont('times', 'italic');
        doc.setTextColor(120, 120, 120);
        doc.text('Founder & Executive Chef', 53, itemY + 36);
        
        // Footer
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('This is a dynamically generated high-fidelity digital layout. For inquiries, reach out at chef.zainab@aqeelah.com', 15, 285);
        
        pdfBase64Data = doc.output('datauristring');
      } catch (pdfErr) {
        console.error("PDF construction crashed client side:", pdfErr);
      }

      setOrders([newlyMintedOrder, ...orders]);
      setLoyaltyPoints(prev => prev + 150); // reward stars on checkout
      setCart([]); // Clear cart
      setCheckoutStatus('Success');

      // Trigger standard bright luxury double-bell payment tone
      luxuryAudio.playPaymentSuccessSound();

      // Dispatch dynamic secure invoice email to endpoint
      fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: newlyMintedOrder,
          pdfBase64: pdfBase64Data
        })
      })
      .then(res => res.json())
      .then(emailData => {
        console.log("Invoice dispatch server response:", emailData);
        if (emailData.success) {
          let mailPrompt = `📬 Premium invoice and invoice card PDF dispatched successfully to ${newlyMintedOrder.customerEmail}!`;
          if (emailData.previewUrl) {
            mailPrompt += ` (Click link to view: ${emailData.previewUrl})`;
            console.log("%c📧 CUSTOMER EMAIL DISPATCHED (Ethereal test mailbox link):", "color: #D4AF37; font-weight: bold;", emailData.previewUrl);
          }
          setToasts(prev => [...prev, { id: `email-dispatch-${Date.now()}`, message: mailPrompt }]);
        }
      })
      .catch(fetchErr => {
        console.error("Secure invoice transaction failed:", fetchErr);
      });

      // Automated instant messaging dispatch simulation notification
      const checkoutDispatchMsg = `🎉 Order ${newlyMintedOrder.id} confirmed! Chef Zainab's team was notified instantly. Your climate locked parcel is being hand-rolled with native spices.`;
      const toastId = `toast-checkout-success-${Date.now()}`;
      setToasts(prev => [...prev, { id: toastId, message: checkoutDispatchMsg }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toastId));
      }, 9500);
      
      // Auto routing tab to focus order tracking status bar
      setTimeout(() => {
        setCheckoutActive(false);
        setCurrentTab('loyalty'); // Shift to loyalty rewards view so they see their points
      }, 2000);

    }, 2500);
  };

  // Detect active ongoing orders (status is not Delivered yet)
  const activeTrackedOrder = orders.find(o => o.status !== 'Delivered');

  return (
    <div className="min-h-screen bg-[#052E16] text-[#FDFBF7] font-sans flex flex-col justify-between selection:bg-[#D4AF37]/25 selection:text-[#FDFBF7] relative overflow-hidden">
      {/* Immersive Theme Accents */}
      <div className="absolute inset-0 dot-grid opacity-[0.07] pointer-events-none z-0" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
      
      {/* Dynamic Header & Navigation Cabinet */}
      <Navbar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cart={cart}
        setCart={setCart}
        openCartDrawer={openCartDrawer}
        setOpenCartDrawer={setOpenCartDrawer}
        savedRemindersCount={reminders.length}
        loyaltyPoints={loyaltyPoints}
        triggerCheckout={handleTriggerCheckout}
      />

      {/* Main Container tabs routing */}
      <main className="flex-1 pt-[72px] lg:pt-[128px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentTab === 'home' && (
              <Home 
                menuItems={MENU_ITEMS}
                testimonials={reviews}
                orders={orders}
                setCurrentTab={setCurrentTab}
                addToCart={handleAddToCart}
                addToWishlist={handleAddToWishlist}
              />
            )}

            {currentTab === 'menu' && (
              <MenuSection 
                menuItems={MENU_ITEMS}
                addToCart={handleAddToCart}
                addToWishlist={handleAddToWishlist}
                wishlist={wishlist}
              />
            )}

            {currentTab === 'tray-builder' && (
              <TrayBuilder 
                addToCart={handleAddToCart}
              />
            )}

            {currentTab === 'party-planner' && (
              <PartyPlanner 
                menuItems={MENU_ITEMS}
                addToCart={handleAddToCart}
                setCurrentTab={setCurrentTab}
              />
            )}

            {currentTab === 'catering' && (
              <Catering 
                onAddBooking={handleAddBooking}
                bookings={bookings}
              />
            )}

            {currentTab === 'reminders' && (
              <Reminders 
                onAddReminder={handleAddReminder}
                onDeleteReminder={handleDeleteReminder}
                reminders={reminders}
              />
            )}

            {currentTab === 'corporate' && (
              <Corporate 
                cart={cart}
              />
            )}

            {currentTab === 'loyalty' && (
              <Loyalty 
                loyaltyPoints={loyaltyPoints}
                onRedeemPoints={handleRedeemPoints}
                orders={orders}
                onReorder={handleReorder}
              />
            )}

            {currentTab === 'meet-aqeelah' && (
              <AboutFounder />
            )}

            {currentTab === 'consultation' && (
              <Consultations />
            )}

            {currentTab === 'diaspora' && (
              <DiasporaHub 
                onCustomAddCart={handleAddToCart}
                setCurrentTab={setCurrentTab}
              />
            )}

            {currentTab === 'location' && (
              <InteractiveLocationMap />
            )}

            {currentTab === 'concierge-suite' && (
              <ConciergeSuiteHub setCurrentTab={setCurrentTab} />
            )}

            {currentTab === 'language-select' && (
              <LanguageHub />
            )}

            {currentTab === 'admin' && (
              <AdminDashboard 
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onArchiveOrder={handleArchiveOrder}
                reviews={reviews}
                onToggleReviewVerify={handleToggleReviewVerify}
                couponCodes={couponCodes}
                onAddCoupon={handleAddCoupon}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Luxury checkout banking flow Modal Overlays */}
      <AnimatePresence>
        {checkoutActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-y-auto custom-scrollbar backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#052E16] text-[#FDFBF7] rounded-3xl overflow-hidden shadow-2xl max-w-md w-full border border-[#D4AF37]/30"
              id="payment-modal-frame"
            >
              <div className="bg-emerald-950/80 p-6 text-[#FDFBF7] text-center relative border-b border-[#D4AF37]/20">
                <button 
                  onClick={() => setCheckoutActive(false)}
                  className="absolute top-4 right-4 text-emerald-100/60 hover:text-[#D4AF37] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 bg-[#052E16] rounded-full border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-2 text-[#D4AF37] shadow-inner">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg tracking-widest text-[#FDFBF7] font-bold">SECURE TRANSACTION LOCK</h4>
                <p className="text-[10px] font-mono tracking-wider text-[#D4AF37]">Verified by {checkoutMethod} Secure API</p>
              </div>

              <div className="p-6">
                {checkoutStatus === 'Ready' && (
                  <form onSubmit={handleCompleteSecurePayment} className="space-y-4">
                    <div className="bg-emerald-950/60 border border-[#D4AF37]/20 p-3 rounded-xl flex items-center justify-between text-xs font-mono text-emerald-100/80">
                      <span>Total Invoice Due Charge:</span>
                      <span className="font-bold text-[#D4AF37]">
                        ₦{(cart.reduce((s, i) => {
                          const numeric = parseInt(i.selectedPortion.match(/\d+/)?.[0] || '12');
                          const f = numeric > 12 ? (numeric / 12) : 1;
                          return s + (i.product.price * f * i.quantity);
                        }, 0) * 0.9 + 3500).toLocaleString()}
                      </span>
                    </div>

                    {/* Guest Patron Details Section */}
                    <div className="border-b border-[#D4AF37]/15 pb-4 mb-4 space-y-3">
                      <h5 className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] font-bold">Patron Dispatch Coordinates</h5>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8px] uppercase font-mono tracking-wider text-emerald-100/70 font-semibold mb-1">Your Full Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Chris"
                            value={custName}
                            onChange={(e) => setCustName(e.target.value)}
                            className="w-full px-3 py-2 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[8px] uppercase font-mono tracking-wider text-emerald-100/70 font-semibold mb-1">Your Email Target</label>
                          <input 
                            type="email" 
                            required
                            placeholder="e.g. patron@domain.com"
                            value={custEmail}
                            onChange={(e) => setCustEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] uppercase font-mono tracking-wider text-emerald-100/70 font-semibold mb-1">Physical Delivery Coordinate (Kano City)</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. House No. 8, BUK Road, Gwale"
                          value={custAddress}
                          onChange={(e) => setCustAddress(e.target.value)}
                          className="w-full px-3 py-2 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Your Virtual Credit/Debit Card Number</label>
                      <input 
                        type="text" 
                        required
                        value={cardNo}
                        onChange={(e) => setCardNo(e.target.value)}
                        className="w-full px-4 py-2.5 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Expiry date</label>
                        <input 
                          type="text" 
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-2.5 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Security PIN (CVV)</label>
                        <input 
                          type="password" 
                          required
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-4 py-2.5 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-center font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1 flex items-center justify-between">
                        <span>Card Pin (4 digits)</span>
                        <span className="text-[8px] text-[#D4AF37]/60 font-normal lowercase font-mono">Simulated terminal</span>
                      </label>
                      <input 
                        type="password" 
                        required
                        maxLength={4}
                        value={cardPin}
                        onChange={(e) => setCardPin(e.target.value)}
                        className="w-full px-4 py-2.5 bg-emerald-950/40 border border-[#D4AF37]/30 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none text-center font-mono"
                      />
                    </div>

                    <p className="text-[9px] text-[#FDFBF7]/60 leading-normal text-center">
                      * Bank standard 3D Secure 2 authentication protocols active. This is a fully compliant sandbox simulation of Paystack/Flutterwave gateway.
                    </p>

                    <button 
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] font-serif text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md text-center flex items-center justify-center gap-2 border-2 border-[#D4AF37] font-bold cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-[#052E16]" />
                      <span>Authenticate Secure Wire</span>
                    </button>
                  </form>
                )}

                {checkoutStatus === 'Processing' && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
                    <h5 className="font-serif text-[#D4AF37] font-semibold text-sm">Processing Bank Settlement API...</h5>
                    <p className="text-xs text-emerald-100/70 max-w-xs leading-normal">
                      Acquiring network handshake authorizations through secure Paystack nodes. Avoid closing this overlay box.
                    </p>
                  </div>
                )}

                {checkoutStatus === 'Success' && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-900 border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h5 className="font-serif text-[#D4AF37] font-semibold text-base">Payment settled successfully !</h5>
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full">
                      Welcome to the Sovereign circle
                    </span>
                    <p className="text-xs text-emerald-100/70 max-w-xs leading-normal">
                      We have routed <strong>150 Accrued Loyalty Stars</strong> to your profile! Your order is active. Shifting view...
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exquisite Footer Structure */}
      <footer className="footer bg-emerald-950/80 text-[#FDFBF7] border-t border-[#D4AF37]/30 pt-16 pb-8 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-start" id="lux-brand-footer">
          
          {/* Logo column & Founder Message */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#052E16] flex items-center justify-center border border-[#D4AF37]/45 shadow-sm">
                <span className="text-lg font-serif text-[#D4AF37] font-black">A</span>
              </div>
              <div>
                <h4 className="font-serif text-lg tracking-widest text-[#FDFBF7]">SMALL CHOPS BY <span className="text-[#D4AF37]">AQEELAH</span></h4>
                <p className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37]/80 leading-none">Modern African Gourmet Luxury</p>
              </div>
            </div>
            
            <p className="text-xs text-emerald-100/70 leading-relaxed font-sans max-w-sm">
              We translate West African spice lore, dough baking precision, and premium presentation layouts into unforgettable celebration food events spanning Kano, Gwale, and major metropolitan culinary rooms across Northern Nigeria.
            </p>
            
            <span className="block text-[#D4AF37] font-serif text-xs italic">"Handcrafted by Zainab Bello Sule"</span>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <span className="block text-[8px] font-mono uppercase tracking-widest text-[#D4AF37]">The online Treasury</span>
            <ul className="space-y-2 text-xs text-emerald-100/80 font-serif">
              <li><button onClick={() => setCurrentTab('home')} className="hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer">Elegance Home</button></li>
              <li><button onClick={() => setCurrentTab('menu')} className="hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer">Cuisine cabinet menu</button></li>
              <li><button onClick={() => setCurrentTab('tray-builder')} className="hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer">Bespoke Tray builder</button></li>
              <li><button onClick={() => setCurrentTab('party-planner')} className="hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer">Fulfillment Quantity Planner</button></li>
              <li><button onClick={() => setCurrentTab('catering')} className="hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer">Bespoke Event Catering</button></li>
            </ul>
          </div>

          {/* Logistics & coordinates */}
          <div className="md:col-span-4 space-y-4 text-xs font-mono">
            <div className="space-y-1.5 text-emerald-100/70">
              <span className="block text-[8px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">Kano Headquarters Terminal</span>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <p><strong>Kano HQ:</strong> House No. 14, Janbulo First Gate, Near Bayero University Kano (BUK) Entrance, Gwale LGA, Kano State, Nigeria.</p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>Working: Mon-Sun (08:00 AM - 10:00 PM)</span>
              </div>
            </div>

            <div className="border-t border-[#D4AF37]/15 pt-3 space-y-3">
              <div className="text-[10px] text-emerald-100/50 font-mono">
                WhatsApp hotline: +234 816 621 7586 • Email: Zainabmaimakaneey@gmail.com
              </div>
              
              {/* Verified Digital Channels Row */}
              <div className="space-y-1">
                <span className="block text-[8px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">Verified Channels</span>
                <div className="flex flex-wrap items-center gap-2">
                  <a 
                    href="https://x.com/aqeelah06?s=11" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#042A14] border border-[#D4AF37]/20 rounded-md text-[9px] font-mono text-emerald-100/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
                  >
                    <Twitter className="w-3 h-3 text-sky-400" />
                    <span>X @aqeelah06</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/small_chops_by_aqeelah?utm_source=qr" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#042A14] border border-[#D4AF37]/20 rounded-md text-[9px] font-mono text-emerald-100/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
                  >
                    <Instagram className="w-3 h-3 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@ummie314?_r=1&_t=ZS-96yzhTSpy5P" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#042A14] border border-[#D4AF37]/20 rounded-md text-[9px] font-mono text-emerald-100/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
                  >
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>TikTok @ummie314</span>
                  </a>
                  <a 
                    href="https://snapchat.com/t/39kkwmwX" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#042A14] border border-[#D4AF37]/20 rounded-md text-[9px] font-mono text-emerald-100/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
                  >
                    <svg className="w-3 h-3 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2c-.65 0-2.3.16-3.14 1-.22.22-.38.56-.47.93-.19.78-.05 1.5-.03 2.15 0 .14 0 .28-.01.4-.04.42-.14.73-.39 1.05-.28.36-.67.62-1.12.78a2.9 2.9 0 0 0-1.57 1.34 3.7 3.7 0 0 0-.25 1.76c.02.66.27 1.2.73 1.58.34.28.75.44 1.15.44.25 0 .48-.06.69-.17a1.5 1.5 0 0 1 1.48 0 2.2 2.2 0 0 0 1.94-.12c.18-.09.34-.1.49-.03.1.04.14.13.13.25a2.3 2.3 0 0 1-.34 1c-.32.55-1 1.07-1.7 1.3-.43.14-.65.41-.66.8-.02.63.15 1.06.5 1.28l.24.1c.4.15.82-.04 1.13-.3l.1-.09c.28-.24.58-.55.9-.6a2.1 2.1 0 0 1 1.76.62c.7.75 1.63 1.15 2.65 1.15a4.2 4.2 0 0 0 2-.51c.3-.17.48-.48.5-.8.04-.64-.22-1.07-.63-1.28l-.2-.1a.75.75 0 0 1-.41-.53.75.75 0 0 1 .15-.65c.1-.1.2-.23.32-.4.2-.29.43-.65.43-1.13a.9.9 0 0 0-.54-.83c-.35-.15-.42-.51-.15-.81.25-.28.53-.55.77-.85a2.8 2.8 0 0 0 .5-1.58c0-.75-.24-1.34-.73-1.76a2.9 2.9 0 0 0-1.58-.78c-.44-.16-.84-.42-1.11-.78-.26-.32-.36-.63-.4-.1.05v-.4c0-.65.14-1.37-.05-2.15l-.47-.93C14.3 2.16 12.65 2 12 2z" />
                    </svg>
                    <span>Snapchat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* copyright notes */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/15 pt-6 mt-12 text-center text-[10px] font-mono text-emerald-100/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col text-center sm:text-left gap-1 items-center sm:items-start">
            <span>© 1999–2026 Small Chops by Aqeelah Group, Zainab Bello Sule Chef. Unlawful replications of food spice formulations prohibited.</span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-bold">
              <button onClick={() => { setLegalModalOpen(true); setActiveLegalTab('terms'); }} className="hover:text-white transition-colors cursor-pointer select-none outline-none border-b border-[#D4AF37]/20 pb-0.5">Terms & Conditions</button>
              <span className="text-emerald-100/20 select-none">•</span>
              <button onClick={() => { setLegalModalOpen(true); setActiveLegalTab('privacy'); }} className="hover:text-white transition-colors cursor-pointer select-none outline-none border-b border-[#D4AF37]/20 pb-0.5">Privacy Policy</button>
              <span className="text-emerald-100/20 select-none">•</span>
              <button onClick={() => { setLegalModalOpen(true); setActiveLegalTab('legal'); }} className="hover:text-white transition-colors cursor-pointer select-none outline-none border-b border-[#D4AF37]/20 pb-0.5">Sovereign Legal Charter</button>
              <span className="text-emerald-100/20 select-none">•</span>
              <button onClick={() => { setLegalModalOpen(true); setActiveLegalTab('cookie'); }} className="hover:text-white transition-colors cursor-pointer select-none outline-none border-b border-[#D4AF37]/20 pb-0.5">Cookie Policy</button>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>256-bit bank card standard authentication protocols active.</span>
          </div>
        </div>
      </footer>

      {/* Exquisite Sovereign Legal Cabinet Modal */}
      <AnimatePresence>
        {legalModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-gradient-to-b from-emerald-950 to-[#021d0d] border border-[#D4AF37]/45 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#FDFBF7] overflow-hidden"
              id="boutique-legal-cabinet"
            >
              {/* Corner Floral Motif Decoration */}
              <div className="absolute top-4 left-4 text-[#D4AF37]/15 font-serif text-[10px] uppercase tracking-widest font-bold select-none pointer-events-none">
                Aqeelah Royal Charter
              </div>

              {/* Close Button Anchor */}
              <button
                onClick={() => {
                  setLegalModalOpen(false);
                  luxuryAudio.playPaymentSuccessSound();
                }}
                className="absolute top-5 right-5 p-2 bg-emerald-900/60 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 rounded-full text-[#D4AF37] hover:text-[#FDFBF7] transition-all cursor-pointer select-none"
                aria-label="Close legal overlay"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header Block */}
              <div className="text-center space-y-2 mt-4 sm:mt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sovereign Security Decree</span>
                </div>
                <h3 className="font-serif text-2xl font-black text-[#FDFBF7] tracking-wider uppercase">
                  LEGAL & PRIVACY <span className="text-[#D4AF37]">CHAMBER</span>
                </h3>
                <p className="text-[10px] font-mono tracking-widest text-[#D4AF37]/60 uppercase">
                  Aqeelah Small Chops Kano • Traditional Sovereign Guarantee
                </p>
              </div>

              {/* Interactive Tabs Header Row */}
              <div className="flex border-b border-[#D4AF37]/15 mt-6 mb-6 overflow-x-auto custom-scrollbar whitespace-nowrap">
                {[
                  { id: 'terms', name: 'Terms of Service', icon: FileText },
                  { id: 'privacy', name: 'Data Privacy Policy', icon: Lock },
                  { id: 'legal', name: 'Halal & Licencings', icon: Scale },
                  { id: 'cookie', name: 'Cookie Policy', icon: Cookie }
                ].map((tab) => {
                  const isActive = activeLegalTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveLegalTab(tab.id as any);
                        luxuryAudio.playPaymentSuccessSound();
                      }}
                      className={`flex-1 pb-3 pt-1 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border-b-2 select-none ${
                        isActive
                          ? 'border-[#D4AF37] text-[#D4AF37]'
                          : 'border-transparent text-emerald-100/40 hover:text-emerald-100/70 hover:border-[#D4AF37]/20'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Sub-Tab Text Chamber */}
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 my-2 py-1 space-y-4 text-xs leading-relaxed text-emerald-100/80 font-sans text-left">
                {activeLegalTab === 'terms' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">1. Gourmet Orchestration Timelines</h4>
                      <p>
                        Aqeelah Small Chops trays are customized live upon order clearing. Trays require at least 2 hours of continuous culinary orchestration and baking before hand-off, safeguarding perfect crispness profiles. Larger caterings require 48 hours notice.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">2. Fulfilment & Delivery Logistics</h4>
                      <p>
                        We offer premium climate-insulated delivery spanning Gwale, BUK coordinates, Nassarawa, Tarauni, and central Kano metropolitan addresses. If the provided drop coordinates are faulty, patrons must reschedule, which may attract supplementary logistics fees.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">3. Refund & Cancellation Restraints</h4>
                      <p>
                        Since ingredients undergo immediate live preparation (including meat spices and fresh dough rise), cancellations are ineligible for refunds once Zainab’s kitchen marks the order status as "Kitchen active" or "Order Received."
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">4. Loyalty Star Accumulations</h4>
                      <p>
                        Loyalty Stars hold zero absolute physical fiat value and are non-transferable. Star points expire only if consecutive regional boutique activity remains silent for over 18 calendar months.
                      </p>
                    </div>
                  </div>
                )}

                {activeLegalTab === 'privacy' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">1. Zero Exploitative Advertisement</h4>
                      <p>
                        We guarantee never to rent or lease your credentials (specifically names, secure emails, or phone routes) to external market aggregates or local marketing ad networks. Your profiles belong strictly in our secure, private Kano local directory.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">2. High-Fidelity Transactions</h4>
                      <p>
                        Your banking and ATM card credentials bypass our servers entirely. Secure sandboxes managed by Paystack and Flutterwave process all checks, sending back only tokenized status nods. No credit-card details are permanently logged locally.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">3. Clean Storage Policy</h4>
                      <p>
                        We use standard client-side storage keys exclusively to remember your preferred dialect index, active shopping bags, and secure concierge chat contexts, providing frictionless return sessions.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">4. Direct Communications Guarantee</h4>
                      <p>
                        All outbound delivery templates or notification updates dispatch directly from Zainab's verified hotline lines. You can request record purging at any moment by visiting Janbulo Headquarters.
                      </p>
                    </div>
                  </div>
                )}

                {activeLegalTab === 'legal' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">1. Absolute Halal Assurance</h4>
                      <p>
                        All meats (tender beef fillet, succulent chicken, liver fillings) are sourced exclusively from traditional, licensed halal butchers inside Kano municipal borders. Freshness, hygiene, and strict dietary alignments are scrutinized under personal expert inspections.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">2. Municipal Licensing Compliance</h4>
                      <p>
                        We operate in conformity with municipal environmental sanitation policies outlined under Gwale LGA and Kano State culinary workspace safety standards.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">3. Allergen Declarations</h4>
                      <p>
                        Warning: Our signature spring rolls, samosas, gizzard kebabs, and puffs are prepared in single-kitchen chambers containing wheat, eggs, tree nuts, and groundnut extractions. Please declare sensitivity concerns directly to our staff prior to checkout.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">4. Trademark & Proprietary Assets</h4>
                      <p>
                        Spice formulations, the structural Aqeelah digital brand identity, handcrafted gourmet images, and Zainab's signature presentation timber layout designs are fully reserved under global trademark codes of Aqeelah Group.
                      </p>
                    </div>
                  </div>
                )}

                {activeLegalTab === 'cookie' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">1. Use of Local Essential Keys</h4>
                      <p>
                        This boutique digital portal utilizes essential local keys to remember your shopping cart configurations, language dialect toggles, activity status flags, and ongoing concierge chat strings. No third-party analytical cross-tracking cookies are deployed.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">2. Consent & Absolute Control</h4>
                      <p>
                        By choosing to place an order or saving anniversary trackers with us, you consent to our lightweight operational browser caching mechanics. This data rests locally inside your physical workstation and can be purged immediately at your discretion by clearing your browser cache.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">3. Safe Transaction Tokens</h4>
                      <p>
                        When paying securely via credit card, encrypted transaction status keys (cookies/tokens) are passed temporarily between secure gateway portals (Paystack, Flutterwave) and this app to confirm payment. These keys are temporary and terminate upon completing your order.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#FDFBF7] text-left">4. Third-Party Restrictions</h4>
                      <p>
                        We reject intrusive social media tracking pixels, marketing telemetry, and third-party advertising cookie bundles. Your culinary privacy and web browsing efficiency are treated with absolute prestige.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Backing Footer Row */}
              <div className="border-t border-[#D4AF37]/15 pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-emerald-100/50">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Sovereign Certifications Active • Kano, Nigeria</span>
                </span>
                <button
                  onClick={() => {
                    setLegalModalOpen(false);
                    luxuryAudio.playPaymentSuccessSound();
                  }}
                  className="px-5 py-2 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer select-none"
                >
                  I Understand & Acknowledge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Toast Notification System Overlay */}
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3 max-w-sm w-[#90vw] sm:w-80 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-emerald-950 border border-[#D4AF37]/50 text-[#FDFBF7] p-4 rounded-xl shadow-2xl flex items-start gap-3 pointer-events-auto cursor-pointer"
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            >
              <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5 animate-pulse">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-[9px] font-mono tracking-widest text-[#D4AF37]/80 uppercase font-black">Royal Notification</div>
                <div className="text-[11px] text-[#FDFBF7]/90 leading-tight font-sans text-left">
                  {toast.message}
                </div>
              </div>
              <button 
                className="text-emerald-100/40 hover:text-white text-[10px] font-mono select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setToasts(prev => prev.filter(t => t.id !== toast.id));
                }}
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Interactive Zainab Chatbot */}
      <ZainabChatBot currentTab={currentTab} setCurrentTab={setCurrentTab} />

    </div>
  );
}
