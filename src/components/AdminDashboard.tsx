/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Clock, Users, ArrowUpRight, TrendingUp, Check, RefreshCw, Star, Play, Ban, Lock, ShieldAlert, Key, LogOut, Mail, ExternalLink, Trash2, UserPlus, Edit3, Save, RotateCcw, ShieldCheck, Settings, Activity, Volume2, VolumeX, BarChart3 } from 'lucide-react';
import { Order, Review } from '../types';
import { luxuryAudio } from '../utils/audio';

interface AdminDashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onArchiveOrder: (orderId: string, archived: boolean) => void;
  reviews: Review[];
  onToggleReviewVerify: (id: string) => void;
  couponCodes: { code: string; discount: number }[];
  onAddCoupon: (code: string, discount: number) => void;
}

export default function AdminDashboard({
  orders,
  onUpdateOrderStatus,
  onArchiveOrder,
  reviews,
  onToggleReviewVerify,
  couponCodes,
  onAddCoupon
}: AdminDashboardProps) {
  const [newCouponCode, setNewCouponCode] = React.useState('');
  const [newCouponPct, setNewCouponPct] = React.useState(15);
  const [simulationState, setSimulationState] = React.useState('Monitoring System');
  const [orderFilter, setOrderFilter] = React.useState<'active' | 'archived' | 'all'>('active');

  // Sovereign Staff Credentials & Multi-User Access Registry
  interface StaffMember {
    id: string;
    username: string;
    passwordKey: string;
    fullName: string;
    role: string;
    createdAt: string;
  }

  const [staffList, setStaffList] = React.useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('aqeelah_staff_registry');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed reading staff database', e);
      }
    }
    const defaultStaff: StaffMember[] = [
      {
        id: 'zainab-main',
        username: 'zainab',
        passwordKey: 'aqeelah2026',
        fullName: 'Chef Zainab Bello Sule',
        role: 'Master Chef & Owner',
        createdAt: '2026-06-01'
      },
      {
        id: 'staff-bello',
        username: 'bello',
        passwordKey: 'bello2026',
        fullName: 'Bello Dan-Kano',
        role: 'Logistics Manager',
        createdAt: '2026-06-05'
      },
      {
        id: 'staff-aminu',
        username: 'aminu',
        passwordKey: 'aminu2026',
        fullName: 'Aminu Maitama',
        role: 'Sous Chef',
        createdAt: '2026-06-07'
      }
    ];
    localStorage.setItem('aqeelah_staff_registry', JSON.stringify(defaultStaff));
    return defaultStaff;
  });

  React.useEffect(() => {
    localStorage.setItem('aqeelah_staff_registry', JSON.stringify(staffList));
  }, [staffList]);

  // Audio Mute and Live Orders notification system for staff
  const [isMutedState, setIsMutedState] = React.useState(() => luxuryAudio.getMuteStatus());
  const prevOrdersCount = React.useRef(orders.length);

  React.useEffect(() => {
    // If a new order is received, trigger the Royal Staff Fanfare Alert
    if (orders.length > prevOrdersCount.current) {
      luxuryAudio.playNewOrderStaffSound();
    }
    prevOrdersCount.current = orders.length;
  }, [orders]);

  // Session Authentication & Logged in user tracker
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return sessionStorage.getItem('aqeelah_admin_authed') === 'true';
  });

  const [loggedInStaff, setLoggedInStaff] = React.useState<StaffMember | null>(() => {
    const saved = sessionStorage.getItem('aqeelah_active_staff_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Login Form states
  const [loginUsername, setLoginUsername] = React.useState('');
  const [loginKey, setLoginKey] = React.useState('');
  const [authError, setAuthError] = React.useState('');

  // CRUD Interface states for Zainab
  const [newStaffName, setNewStaffName] = React.useState('');
  const [newStaffUsername, setNewStaffUsername] = React.useState('');
  const [newStaffKey, setNewStaffKey] = React.useState('');
  const [newStaffRole, setNewStaffRole] = React.useState('Chef Assistant');
  const [staffActionMessage, setStaffActionMessage] = React.useState('');

  // Editing staff inline states
  const [editingStaffId, setEditingStaffId] = React.useState<string | null>(null);
  const [editStaffName, setEditStaffName] = React.useState('');
  const [editStaffKey, setEditStaffKey] = React.useState('');
  const [editStaffRole, setEditStaffRole] = React.useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = loginUsername.trim().toLowerCase();
    const cleanKey = loginKey.trim();

    const matchedStaff = staffList.find(s => s.username.toLowerCase() === cleanUser);
    if (matchedStaff && matchedStaff.passwordKey === cleanKey) {
      setLoggedInStaff(matchedStaff);
      setIsAuthenticated(true);
      sessionStorage.setItem('aqeelah_admin_authed', 'true');
      sessionStorage.setItem('aqeelah_active_staff_user', JSON.stringify(matchedStaff));
      setAuthError('');
      setLoginUsername('');
      setLoginKey('');
    } else {
      setAuthError('Access denied: Invalid Secure Username/ID or access key mismatch. Verification failure.');
    }
  };

  const handleSignOut = React.useCallback(() => {
    setIsAuthenticated(false);
    setLoggedInStaff(null);
    sessionStorage.removeItem('aqeelah_admin_authed');
    sessionStorage.removeItem('aqeelah_active_staff_user');
    setLoginUsername('');
    setLoginKey('');
  }, []);

  // Automatic Session Security Control (Inactivity & Tab Visibility Protection)
  React.useEffect(() => {
    if (!isAuthenticated) return;

    const AUTO_LOGOUT_DURATION = 120000; // 2 minutes in milliseconds
    let logoutTimer: any = null;
    let lastActiveTime = Date.now();

    const doLogout = () => {
      handleSignOut();
    };

    const resetTimer = () => {
      lastActiveTime = Date.now();
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(doLogout, AUTO_LOGOUT_DURATION);
    };

    // Initialize the idle monitoring timer
    resetTimer();

    // Human activity events to track presence
    const activeEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    const handleActivity = () => {
      resetTimer();
    };

    activeEvents.forEach(evt => window.addEventListener(evt, handleActivity, { passive: true }));

    // Visibility transition check to instantly catch background tab drift
    const checkSessionActivity = () => {
      if (!document.hidden) {
        const elapsed = Date.now() - lastActiveTime;
        if (elapsed >= AUTO_LOGOUT_DURATION) {
          doLogout();
        } else {
          resetTimer();
        }
      }
    };

    document.addEventListener('visibilitychange', checkSessionActivity);
    window.addEventListener('focus', checkSessionActivity);

    // Safeguard interval to ensure background throttling doesn't bypass timeout
    const fallbackTicker = setInterval(() => {
      const elapsed = Date.now() - lastActiveTime;
      if (elapsed >= AUTO_LOGOUT_DURATION) {
        doLogout();
      }
    }, 10000);

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      clearInterval(fallbackTicker);
      activeEvents.forEach(evt => window.removeEventListener(evt, handleActivity));
      document.removeEventListener('visibilitychange', checkSessionActivity);
      window.removeEventListener('focus', checkSessionActivity);
    };
  }, [isAuthenticated, handleSignOut]);

  // Staff CRUD Handlers (Only for Chef Zainab)
  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = newStaffUsername.trim().toLowerCase();
    if (!cleanUser || !newStaffName.trim() || !newStaffKey.trim()) {
      setStaffActionMessage('All fields are mandatory to establish credentials.');
      return;
    }

    if (staffList.some(s => s.username.toLowerCase() === cleanUser)) {
      setStaffActionMessage(`Security Conflict: Username "${cleanUser}" is already configured.`);
      return;
    }

    const created: StaffMember = {
      id: 'staff-' + Date.now(),
      fullName: newStaffName.trim(),
      username: cleanUser,
      passwordKey: newStaffKey.trim(),
      role: newStaffRole,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setStaffList([...staffList, created]);
    setNewStaffName('');
    setNewStaffUsername('');
    setNewStaffKey('');
    setNewStaffRole('Chef Assistant');
    setStaffActionMessage(`Authorized: Configured profile for ${created.fullName}.`);
    setTimeout(() => setStaffActionMessage(''), 4000);
  };

  const handleSaveStaffEdit = (id: string) => {
    if (!editStaffName.trim() || !editStaffKey.trim()) {
      alert('Credentials cannot be empty.');
      return;
    }
    const updatedList = staffList.map(s => {
      if (s.id === id) {
        const updated = {
          ...s,
          fullName: editStaffName.trim(),
          passwordKey: editStaffKey.trim(),
          role: editStaffRole
        };
        // Synchronize active session if the logged in user is editing themselves
        if (loggedInStaff && loggedInStaff.id === id) {
          setLoggedInStaff(updated);
          sessionStorage.setItem('aqeelah_active_staff_user', JSON.stringify(updated));
        }
        return updated;
      }
      return s;
    });
    setStaffList(updatedList);
    setEditingStaffId(null);
    setStaffActionMessage('Staff profile credentials updated.');
    setTimeout(() => setStaffActionMessage(''), 4000);
  };

  const handleDeleteStaff = (id: string, name: string) => {
    if (id === 'zainab-main') {
      alert('Security Protocol: Chef Zainab Bello Sule cannot revoke her own master clearance.');
      return;
    }
    if (confirm(`Sovereign Override: Revoke credentials and delete login keys for ${name}?`)) {
      setStaffList(staffList.filter(s => s.id !== id));
      setStaffActionMessage(`Revoked clearance protocols for ${name}.`);
      setTimeout(() => setStaffActionMessage(''), 4000);
    }
  };

  const handleGenerateKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'AQEELAH-';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewStaffKey(result);
  };

  const statisticsSummary = React.useMemo(() => {
    const totalOrdersCompleted = orders.filter(o => o.status === 'Delivered').length;
    const grossRev = orders.reduce((sum, o) => sum + o.total, 0);
    const activeKitchenLoad = orders.filter(o => o.status !== 'Delivered').length;
    const aov = orders.length > 0 ? grossRev / orders.length : 0;

    return {
      grossRev,
      activeKitchenLoad,
      totalOrdersCompleted,
      aov
    };
  }, [orders]);

  const filteredOrders = React.useMemo(() => {
    return orders.filter(o => {
      const isArchived = !!o.archived;
      if (orderFilter === 'active') {
        return !isArchived;
      } else if (orderFilter === 'archived') {
        return isArchived;
      }
      return true; // 'all'
    });
  }, [orders, orderFilter]);

  // Counting orders by status for the chart
  const statusCounts = React.useMemo(() => {
    const counts = {
      'Order Received': 0,
      'Preparing': 0,
      'Packaging': 0,
      'Out for Delivery': 0,
      'Delivered': 0
    };
    orders.forEach(o => {
      if (counts[o.status] !== undefined) {
        counts[o.status]++;
      }
    });
    return counts;
  }, [orders]);

  const maxCount = React.useMemo(() => {
    const values = Object.values(statusCounts) as number[];
    return Math.max(...values, 1);
  }, [statusCounts]);

  const triggerStepSimulation = () => {
    setSimulationState('Advancing active queues...');
    setTimeout(() => {
      orders.forEach((ord) => {
        if (ord.status === 'Order Received') onUpdateOrderStatus(ord.id, 'Preparing');
        else if (ord.status === 'Preparing') onUpdateOrderStatus(ord.id, 'Packaging');
        else if (ord.status === 'Packaging') onUpdateOrderStatus(ord.id, 'Out for Delivery');
        else if (ord.status === 'Out for Delivery') onUpdateOrderStatus(ord.id, 'Delivered');
      });
      setSimulationState('Active queues simulated successfully!');
    }, 1500);
  };

  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    onAddCoupon(newCouponCode.toUpperCase().replace(/\s+/g, ''), newCouponPct);
    setNewCouponCode('');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-950/80 border-2 border-[#D4AF37]/35 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md space-y-6"
        >
          {/* Lock icon ornament */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-900/55 border border-[#D4AF37]/45 flex items-center justify-center text-[#D4AF37] relative shadow-lg shadow-[#D4AF37]/10">
              <Lock className="w-6 h-6" />
              <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-25" style={{ animationDuration: '4s' }} />
            </div>
          </div>

          <div className="text-center space-y-2">
            <span className="text-[#D4AF37] uppercase text-[9px] font-mono tracking-widest block font-bold">Identity Verification Required</span>
            <h3 className="text-2xl font-serif text-[#FDFBF7] font-bold">Staff Access Portal</h3>
            <p className="text-[11px] text-emerald-100/60 leading-relaxed font-sans">
              Enter your authorized staff credentials to authenticate terminal session.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 font-sans">
            <div className="space-y-1">
              <label className="text-[9px] font-mono uppercase text-[#D4AF37] font-bold tracking-wider block">Username ID</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => {
                  setLoginUsername(e.target.value);
                  setAuthError('');
                }}
                required
                placeholder="e.g. aminu"
                className="w-full bg-emerald-900 text-[#FDFBF7] text-sm py-2.5 px-4 rounded-xl placeholder-emerald-100/20 outline-none border border-[#D4AF37]/25 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/35 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono uppercase text-[#D4AF37] font-bold tracking-wider block">Assigned Access Key</label>
              <input
                type="password"
                value={loginKey}
                onChange={(e) => {
                  setLoginKey(e.target.value);
                  setAuthError('');
                }}
                required
                placeholder="••••••••"
                className="w-full bg-emerald-900 text-[#FDFBF7] text-sm py-2.5 px-4 rounded-xl placeholder-emerald-100/20 outline-none border border-[#D4AF37]/25 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/35 transition-all text-center tracking-widest"
              />
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-950/30 border border-red-500/25 text-red-200 rounded-xl p-3 text-[10px] flex items-start gap-2 font-mono leading-relaxed"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F3D06D] hover:from-[#C5A028] hover:to-[#E5BD52] text-emerald-950 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-[#D4AF37]/15 select-none"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Sign In Terminal</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="admin-office">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 relative">
        <div className="absolute right-0 top-0 sm:right-2 flex items-center gap-2">
          {/* Audio Chime Sovereign Toggle */}
          <button
            onClick={() => {
              const nextMuted = !luxuryAudio.getMuteStatus();
              luxuryAudio.setMuteStatus(nextMuted);
              setIsMutedState(nextMuted);
              // Small premium chime sample on activation
              if (!nextMuted) {
                luxuryAudio.playNewOrderStaffSound();
              }
            }}
            className="flex items-center gap-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-2.5 rounded-lg border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-all cursor-pointer select-none"
            title={isMutedState ? "Unmute Premium Sound Effects" : "Mute Sound Effects"}
          >
            {isMutedState ? <VolumeX className="w-3.5 h-3.5 text-red-400 shrink-0" /> : <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
            <span className="hidden md:inline">{isMutedState ? "Muted" : "Audio On"}</span>
          </button>

          {/* Test Sound trigger */}
          {!isMutedState && (
            <button
              onClick={() => luxuryAudio.playNewOrderStaffSound()}
              className="hidden sm:flex items-center gap-1 bg-[#052E16] hover:bg-[#032e16] text-[#D4AF37] text-[10px] font-mono font-bold uppercase py-1.5 px-2.5 rounded-lg border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-all cursor-pointer select-none"
              title="Test Royal Staff Chimes"
            >
              <Play className="w-3 h-3 text-[#D4AF37]" />
              <span className="hidden lg:inline">Test Sound</span>
            </button>
          )}

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-all cursor-pointer select-none"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock Terminal</span>
            <span className="inline sm:hidden">Lock</span>
          </button>
        </div>
        <span className="text-[#D4AF37] uppercase text-[10px] sm:text-xs font-mono tracking-wider block font-black">
          STAFF SYSTEM PORTAL • ACTIVE TERMINAL: <span className="text-[#FDFBF7] underline decoration-[#D4AF37]/45 underline-offset-4">{loggedInStaff?.fullName.toUpperCase()} ({loggedInStaff?.role.toUpperCase()})</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#FDFBF7] font-semibold">Kano Administrative Office</h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 max-w-lg mx-auto leading-relaxed font-sans">
          Monitor real-time fulfillment queues, generate active client coupon vectors, and moderate testimonies.
        </p>
      </div>

      {/* Floating Active Punctual Live Order Tracker Console */}
      {(() => {
        const activeTrackedOrder = orders.find(o => o.status !== 'Delivered');
        if (!activeTrackedOrder) return null;
        return (
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-4 flex flex-col xl:flex-row items-center justify-between gap-4 text-xs font-sans" id="live-punctual-tracker">
            <div className="flex flex-col gap-1 items-start">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <Activity className="w-4 h-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '4s' }} />
                <span className="font-mono text-[#FDFBF7]">
                  <strong>ACTIVE COURIER CONSOLE:</strong> Reference <strong>{activeTrackedOrder.id}</strong> ({activeTrackedOrder.customerName})
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37]/90 block">
                🗺️ Received: {activeTrackedOrder.receivedAt || 'Unmarked'} {activeTrackedOrder.deliveredAt && ` | Delivered: ${activeTrackedOrder.deliveredAt}`}
              </span>
            </div>

            {/* Stepped Progress path nodes */}
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] text-emerald-100/70 flex-wrap justify-center">
              <span className={`px-2 py-0.5 rounded ${activeTrackedOrder.status === 'Order Received' ? 'bg-[#D4AF37] text-[#052E16] font-bold' : ''}`}>Received</span>
              <span>➔</span>
              <span className={`px-2 py-0.5 rounded ${activeTrackedOrder.status === 'Preparing' ? 'bg-[#D4AF37] text-[#052E16] font-bold' : ''}`}>Preparing</span>
              <span>➔</span>
              <span className={`px-2 py-0.5 rounded ${activeTrackedOrder.status === 'Packaging' ? 'bg-[#D4AF37] text-[#052E16] font-bold' : ''}`}>Packaging</span>
              <span>➔</span>
              <span className={`px-2 py-0.5 rounded ${activeTrackedOrder.status === 'Out for Delivery' ? 'bg-[#D4AF37] text-[#052E16] font-bold' : ''}`}>Out Enroute</span>
              <span>➔</span>
              <span className={`px-2 py-0.5 rounded ${activeTrackedOrder.status === 'Delivered' ? 'bg-emerald-800 text-white font-bold' : ''}`}>Arrived</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (activeTrackedOrder.status === 'Order Received') onUpdateOrderStatus(activeTrackedOrder.id, 'Preparing');
                  else if (activeTrackedOrder.status === 'Preparing') onUpdateOrderStatus(activeTrackedOrder.id, 'Packaging');
                  else if (activeTrackedOrder.status === 'Packaging') onUpdateOrderStatus(activeTrackedOrder.id, 'Out for Delivery');
                  else if (activeTrackedOrder.status === 'Out for Delivery') onUpdateOrderStatus(activeTrackedOrder.id, 'Delivered');
                }}
                className="bg-[#D4AF37] text-[#052E16] px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold hover:bg-[#C5A028] transition-all cursor-pointer select-none uppercase tracking-wider"
              >
                Advance State
              </button>
            </div>
          </div>
        );
      })()}

      {/* Grid of 4 beautiful statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
        
        {/* Revenue */}
        <div className="bg-emerald-950/40 p-6 rounded-2xl border border-[#D4AF37]/20 shadow-sm space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-emerald-100/60 font-black">Gross Sales Revenue</span>
            <span className="text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded text-[9px] font-mono font-bold flex items-center border border-[#D4AF37]/15">
              +14.8% <TrendingUp className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <h4 className="font-serif text-2xl font-black text-[#D4AF37]">
            ₦{statisticsSummary.grossRev.toLocaleString()}
          </h4>
          <span className="block text-[8px] font-mono text-emerald-100/40">Live Lekki & Maitama terminals</span>
        </div>

        {/* Kitchen workload */}
        <div className="bg-emerald-950/40 p-6 rounded-2xl border border-[#D4AF37]/20 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-emerald-100/60 font-black">Active Kitchen Queue</span>
            <span className="bg-red-950/35 text-red-300 border border-red-500/20 px-2.5 py-1 rounded text-[9px] font-mono font-bold animate-pulse">
              Fulfillment load
            </span>
          </div>
          <h4 className="font-serif text-2xl font-black text-red-400">
            {statisticsSummary.activeKitchenLoad} orders
          </h4>
          <span className="block text-[8px] font-mono text-emerald-100/40">Peak hour warning limits active</span>
        </div>

        {/* Completed volume */}
        <div className="bg-[#D4AF37]/10 text-[#FDFBF7] p-6 rounded-2xl border border-[#D4AF37]/35 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-emerald-100/60 font-black">Locker Shipments delivered</span>
            <Check className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          </div>
          <h4 className="font-serif text-2xl font-black text-[#D4AF37]">
            {statisticsSummary.totalOrdersCompleted} deliveries
          </h4>
          <span className="block text-[8px] font-mono text-emerald-100/40">Successful completions</span>
        </div>

        {/* AOV */}
        <div className="bg-emerald-950/40 p-6 rounded-2xl border border-[#D4AF37]/20 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-emerald-100/60 font-black">Average Basket Value</span>
            <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-100/45">AOV Stat</span>
          </div>
          <h4 className="font-serif text-2xl font-black text-[#FDFBF7]">
            ₦{Math.round(statisticsSummary.aov).toLocaleString()}
          </h4>
          <span className="block text-[8px] font-mono text-emerald-100/40">Target metrics standard: ₦25,000+</span>
        </div>

      </div>

      {/* Sovereign Order Status Bar Chart Card */}
      <div className="bg-[#052E16]/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/25 shadow-xl space-y-6" id="sovereign-order-chart">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D4AF37]/15 pb-4 gap-2">
          <div>
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">Fulfillment Analytics</span>
            <h3 className="font-serif text-lg text-[#FDFBF7] font-bold flex items-center gap-2 mt-0.5">
              <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
              <span>Order Status Summary Chart</span>
            </h3>
          </div>
          <p className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
            Total of <strong className="font-black text-white">{orders.length}</strong> loaded ledger entries
          </p>
        </div>

        {/* Lightweight Responsive Bar Chart Containers */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-end pt-6 min-h-[200px]">
          {[
            { key: 'Order Received', label: 'Received', color: 'from-amber-400 to-[#D4AF37]', desc: 'Sabon Shiga' },
            { key: 'Preparing', label: 'Preparing', color: 'from-orange-500 to-amber-500', desc: 'Akan Girki' },
            { key: 'Packaging', label: 'Packaging', color: 'from-yellow-400 to-[#D4AF37]', desc: 'Kullawa' },
            { key: 'Out for Delivery', label: 'Out Enroute', color: 'from-emerald-400 to-teal-500', desc: 'Fita Kaiwa' },
            { key: 'Delivered', label: 'Delivered', color: 'from-green-500 to-emerald-600', desc: 'An Karba' }
          ].map((item) => {
            const count = statusCounts[item.key as keyof typeof statusCounts] || 0;
            const percentage = (count / maxCount) * 100;
            
            return (
              <div key={item.key} className="space-y-3 group select-none flex flex-col items-stretch">
                {/* Bar Value Count & Bubble */}
                <div className="text-center">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-[#D4AF37]/25 text-[10px] font-mono font-bold text-[#D4AF37] group-hover:border-[#D4AF37] transition-all">
                    {count} {count === 1 ? 'order' : 'orders'}
                  </span>
                </div>

                {/* Vertical Bar pillar with animation */}
                <div className="h-32 w-full bg-emerald-950/40 rounded-xl overflow-hidden border border-[#D4AF37]/15 flex items-end relative shadow-inner p-1">
                  {/* Subtle Grid reference line */}
                  <div className="absolute inset-x-0 top-1/2 border-t border-[#D4AF37]/5 pointer-events-none" />
                  <div className="absolute inset-x-0 top-1/4 border-t border-[#D4AF37]/5 pointer-events-none" />
                  
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${percentage}%` }}
                    transition={{ type: 'spring', stiffness: 70, damping: 15 }}
                    className={`w-full bg-gradient-to-t ${item.color} rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)] relative min-h-[4px]`}
                  >
                    {/* Visual Light glare overlay on the bar */}
                    <div className="absolute inset-y-0 left-0 w-[40%] bg-white/10" />
                  </motion.div>
                </div>

                {/* Sub-label indicators */}
                <div className="text-center space-y-0.5">
                  <span className="block text-xs font-serif font-black text-[#FDFBF7] tracking-wide">
                    {item.label}
                  </span>
                  <span className="block text-[9px] font-mono text-emerald-100/40 uppercase tracking-wider font-bold">
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side Table: Active Orders List tracking */}
        <div className="lg:col-span-8 bg-[#052E16]/40 p-6 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-4">
            <div className="space-y-2">
              <h3 className="font-serif text-lg text-[#FDFBF7] font-bold">Secure Order Ledger</h3>
              <p className="text-xs text-emerald-100/60 font-sans">Toggle partitions below to isolate active culinary orders from archived accounts.</p>
              
              {/* Order State Tab Filters Row */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-emerald-950/65 rounded-xl border border-[#D4AF37]/20 max-w-fit" id="admin-order-ledger-tabs">
                {[
                  { id: 'active', label: 'Active Pipeline', count: orders.filter(o => !o.archived).length },
                  { id: 'archived', label: 'Archived Ledger', count: orders.filter(o => o.archived).length },
                  { id: 'all', label: 'All Loaded Logs', count: orders.length }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setOrderFilter(t.id as any)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase font-bold transition-all cursor-pointer outline-none select-none ${
                      orderFilter === t.id 
                        ? 'bg-[#D4AF37] text-[#052E16] shadow-md font-black' 
                        : 'text-emerald-100/60 hover:text-white hover:bg-[#D4AF37]/10'
                    }`}
                  >
                    {t.label} ({t.count})
                  </button>
                ))}
              </div>
            </div>
            
            {/* Simulation trigger */}
            <div className="flex flex-col items-stretch sm:items-end gap-1">
              <button
                onClick={triggerStepSimulation}
                className="bg-[#D4AF37]/15 border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#052E16] text-[#D4AF37] px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-wider font-bold transition-all flex items-center justify-center gap-1 cursor-pointer outline-none select-none"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{simulationState}</span>
              </button>
              <span className="text-[9px] font-mono text-emerald-100/30 text-center sm:text-right">Auto-simulation adds tracking times</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-emerald-950 text-emerald-100/50 border-b border-[#D4AF37]/15 font-mono text-[9px] uppercase tracking-widest">
                  <th className="p-3">Reference</th>
                  <th className="p-3">Patron Info</th>
                  <th className="p-3 text-right">Sum paid</th>
                  <th className="p-3 text-center">Zainab Kitchen Sync</th>
                  <th className="p-3 text-center">Fulfillment Status & History</th>
                  <th className="p-3 text-center">Ledger Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/15 text-[#FDFBF7]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-emerald-100/40 italic font-mono">
                      No customer transactions logged currently matching the selected partition. Put items in the cart and perform standard checkout to simulate.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-emerald-50/5">
                      <td className="p-3 font-mono font-bold text-[#D4AF37]">{ord.id}</td>
                      <td className="p-3 min-w-[140px]">
                        <strong className="text-[#FDFBF7] block font-serif">{ord.customerName}</strong>
                        <span className="text-[10px] text-emerald-100/50 block font-sans">{ord.deliveryAddress}</span>
                        {ord.date && <span className="text-[9px] font-mono text-[#D4AF37]/70 block mt-1">Sovereign Date: {ord.date}</span>}
                      </td>
                      <td className="p-3 text-right font-mono font-bold">₦{ord.total.toLocaleString()}</td>
                      <td className="p-3 min-w-[180px]">
                        <div className="flex flex-col gap-1 text-[10px] items-stretch max-w-[200px] mx-auto font-sans">
                          {/* WhatsApp alert status pill */}
                          <div className="flex items-center gap-1.5 justify-between bg-emerald-950/60 border border-[#D4AF37]/15 rounded-lg px-2 py-1">
                            <span className="text-emerald-300 font-mono text-[9px] font-bold flex items-center gap-1 shrink-0">
                              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                              WA Sent
                            </span>
                            <a
                              href={`https://wa.me/2348037629012?text=${encodeURIComponent(
                                `✦ NEW ORDER ALERT [${ord.id}] ✦\n\nPatron: ${ord.customerName}\nAddress: ${ord.deliveryAddress}\nTotal Amount: ₦${ord.total.toLocaleString()}\nItems Checked out:\n${ord.items.map(i => `• ${i.product.name} (${i.selectedPortion}) x${i.quantity}`).join('\n')}\n\nGenerated automatically via Aqeelah Small Chops Kano Administrative Terminal.`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[9px] font-mono font-bold text-[#D4AF37] hover:text-[#F3D06D] flex items-center gap-0.5 border-b border-dashed border-[#D4AF37]/45 pb-0.5 transition-all outline-none cursor-pointer"
                              title="Sync order breakdown template directly to Zainab's official WhatsApp line"
                            >
                              <span>Send raw text</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>

                          {/* Email status pill */}
                          <div className="flex items-center gap-1.5 justify-between bg-emerald-950/60 border border-[#D4AF37]/15 rounded-lg px-2 py-1">
                            <span className="text-[#D4AF37] font-mono text-[9px] font-bold flex items-center gap-1 shrink-0">
                              <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                              Email Sent
                            </span>
                            <a
                              href={`mailto:chef.zainab@aqeelah.com?subject=Aqeelah Chops Order Alert [${ord.id}]&body=${encodeURIComponent(
                                `Dear Chef Zainab,\n\nA new customer order has been paid and received on Aqeelah Chops.\n\nORDER SUMMARY:\n----------------------\nOrder Ref: ${ord.id}\nCustomer: ${ord.customerName}\nDelivery Address: ${ord.deliveryAddress}\nDate: ${ord.date}\nPayment Method: ${ord.paymentMethod}\n\nITEMS ORDERED:\n${ord.items.map(i => `- ${i.product.name} (${i.selectedPortion}) x${i.quantity}`).join('\n')}\n\n----------------------\nTotal sum paid: ₦${ord.total.toLocaleString()}\n\nPlease proceed with kitchen orchestration and delivery logistics.\n\nBest regards,\nAqeelah Automated Notification System.`
                              )}`}
                              className="text-[9px] font-mono font-bold text-[#D4AF37] hover:text-[#F3D06D] flex items-center gap-0.5 border-b border-dashed border-[#D4AF37]/45 pb-0.5 transition-all outline-none cursor-pointer"
                              title="Examine raw details template dispatch email"
                            >
                              <span>Send email</span>
                              <Mail className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center min-w-[200px]">
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-emerald-950 border border-[#D4AF37]/25 py-1 px-2.5 rounded-lg text-[10px] font-mono font-bold focus:outline-none focus:border-[#D4AF37] text-[#FDFBF7] mb-2 cursor-pointer"
                        >
                          <option value="Order Received">Order Received</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Packaging">Packaging</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>

                        {/* High fidelity track history timestamps directory */}
                        <div className="text-[9px] font-mono text-left space-y-1 bg-emerald-950/70 p-2 rounded-xl border border-[#D4AF37]/15">
                          <div className="flex items-center justify-between border-b border-emerald-900/50 pb-0.5">
                            <span className="text-emerald-300">📥 Received:</span>
                            <span className="text-[#D4AF37] font-bold ml-1">{ord.receivedAt || 'Unspecified'}</span>
                          </div>
                          {ord.preparingAt && (
                            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-0.5">
                              <span className="text-orange-300">🍳 Preparing:</span>
                              <span className="text-emerald-100/90 ml-1">{ord.preparingAt}</span>
                            </div>
                          )}
                          {ord.packagingAt && (
                            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-0.5">
                              <span className="text-amber-300">📦 Packaging:</span>
                              <span className="text-emerald-100/90 ml-1">{ord.packagingAt}</span>
                            </div>
                          )}
                          {ord.outForDeliveryAt && (
                            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-0.5">
                              <span className="text-emerald-300 font-bold">🚚 Out:</span>
                              <span className="text-emerald-100/90 ml-1">{ord.outForDeliveryAt}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className={ord.deliveredAt ? "text-green-300 font-bold" : "text-emerald-100/40"}>
                              {ord.deliveredAt ? "🎖️ Delivered:" : "⏳ Delivered:"}
                            </span>
                            <span className={`font-bold ml-1 ${ord.deliveredAt ? "text-green-400 font-black" : "text-emerald-100/40"}`}>
                              {ord.deliveredAt || 'In Transit'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            onArchiveOrder(ord.id, !ord.archived);
                            luxuryAudio.playPaymentSuccessSound();
                          }}
                          className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold tracking-wider uppercase border cursor-pointer select-none outline-none transition-all ${
                            ord.archived
                              ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/35 hover:bg-[#D4AF37]/25'
                              : 'bg-emerald-950/40 text-emerald-100/60 border-[#D4AF37]/15 hover:border-[#D4AF37]/45 hover:text-[#D4AF37]'
                          }`}
                          title={ord.archived ? "Restore order to active pipeline list" : "Archive order safely into saved ledger records"}
                        >
                          {ord.archived ? '📤 Restore' : '📥 Archive'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side Column: Moderate Reviews and Coupons codes Generation */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-8">
          
          {/* Create Coupons cards */}
          <div className="bg-emerald-950/50 border border-[#D4AF37]/25 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold text-[#FDFBF7]">Coupon Generator</h3>
              <p className="text-[10px] text-emerald-100/60 leading-relaxed font-sans">Establish active discount coordinates for standard clients.</p>
            </div>

            <form onSubmit={handleCreateCouponSubmit} className="space-y-3 font-sans">
              <div>
                <label className="block text-[8px] font-mono text-[#D4AF37] mb-1 font-bold uppercase">Coupon Name Code</label>
                <input 
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full px-3 py-2 bg-emerald-950/60 border border-[#D4AF37]/20 rounded text-xs text-[#FDFBF7] outline-none focus:border-[#D4AF37]"
                  placeholder="e.g. SULE15"
                />
              </div>

              <div>
                <label className="block text-[8px] font-mono text-[#D4AF37] mb-1 font-bold uppercase">Discount Percentage %</label>
                <input 
                  type="number"
                  min="5"
                  max="60"
                  required
                  value={newCouponPct}
                  onChange={(e) => setNewCouponPct(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-emerald-950/60 border border-[#D4AF37]/20 rounded text-xs text-[#FDFBF7] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] py-2.5 rounded text-xs font-mono uppercase tracking-widest font-black cursor-pointer"
              >
                Assemble Coupon
              </button>
            </form>

            {/* List current codes */}
            <div className="border-t border-[#D4AF37]/15 pt-3 space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar pr-1 font-mono">
              <span className="block text-[8px] text-emerald-100/40 font-bold uppercase">Active coupon arrays:</span>
              {couponCodes.map((cp, idx) => (
                <div key={idx} className="flex justify-between text-[10px] text-emerald-100/80">
                  <span className="font-bold text-[#D4AF37]">{cp.code}</span>
                  <span>{cp.discount}% Discount</span>
                </div>
              ))}
            </div>
          </div>

          {/* Moderate Reviews panel */}
          <div className="bg-[#052E16]/40 p-6 rounded-3xl border border-[#D4AF37]/20 shadow-sm space-y-4">
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold text-[#FDFBF7]">Testimonial Moderator</h3>
              <p className="text-[10px] text-emerald-100/60 leading-relaxed font-sans">Moderate customer reviews before displaying on Elegance Home.</p>
            </div>

            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-2.5 bg-emerald-950/60 border border-[#D4AF37]/15 rounded-lg text-[10px] space-y-1.5 relative text-emerald-100/80">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#FDFBF7] font-serif font-black">{rev.author}</strong>
                    <div className="flex items-center gap-0.5 text-[#D4AF37]">
                      <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span className="font-mono text-[9px] font-bold text-[#D4AF37]">{rev.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-emerald-100/70 leading-normal font-sans">"{rev.comment}"</p>
                  
                  <div className="border-t border-[#D4AF37]/10 pt-1.5 flex justify-between items-center bg-transparent mt-1 font-sans">
                    <span className="font-mono text-[80%] text-emerald-100/40 font-bold uppercase">Status: {rev.verified ? "verified content" : "unverified"}</span>
                    <button
                      onClick={() => onToggleReviewVerify(rev.id)}
                      className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-mono font-bold cursor-pointer ${
                        rev.verified 
                          ? 'bg-red-950/40 text-red-400 hover:bg-red-950/60 border border-red-500/20' 
                          : 'bg-[#D4AF37]/12 text-[#D4AF37] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/35'
                      }`}
                    >
                      {rev.verified ? 'Lock verification' : 'Authorize verification'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chef Zainab's Live Gateways Monitor panel */}
          <div className="bg-[#052E16]/40 p-6 rounded-3xl border border-[#D4AF37]/25 shadow-sm space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-serif text-base font-bold text-[#FDFBF7]">Zainab Kitchen Gateway</h3>
              </div>
              <p className="text-[10px] text-emerald-100/60 leading-relaxed font-sans">
                Real-time monitors capturing instant dispatch logs sent to Chef Zainab's WhatsApp line and primary administrative mailbox.
              </p>
            </div>

            <div className="space-y-2 text-[10px]">
              {/* WhatsApp Live status */}
              <div className="p-3 bg-emerald-950/70 border border-[#D4AF37]/20 rounded-xl space-y-1.5 font-sans">
                <div className="flex items-center justify-between font-mono text-[9px] text-[#D4AF37] font-bold uppercase">
                  <span>WhatsApp API</span>
                  <span className="text-emerald-400 font-bold">● ONLINE FEED</span>
                </div>
                <div className="text-emerald-100/80 space-y-1 leading-normal font-sans">
                  <p><strong>Primary Line:</strong> +234 803 762 9012</p>
                  <p><strong>Auto-Templates:</strong> Active for Checkout & Cart Actions</p>
                </div>
              </div>

              {/* Email Gateway status */}
              <div className="p-3 bg-emerald-950/70 border border-[#D4AF37]/20 rounded-xl space-y-1.5 font-sans">
                <div className="flex items-center justify-between font-mono text-[9px] text-[#D4AF37] font-bold uppercase">
                  <span>Sule Mail Handlers</span>
                  <span className="text-emerald-400 font-bold">● GATEWAY VERIFIED</span>
                </div>
                <div className="text-emerald-100/80 space-y-1 leading-normal font-sans">
                  <p><strong>Primary Inbox:</strong> chef.zainab@aqeelah.com</p>
                  <p><strong>DKIM Node:</strong> Verified Safe Core Secure</p>
                </div>
              </div>

              {/* Simulated Live Alert Audit Streams */}
              <div className="border-t border-[#D4AF37]/15 pt-2 mt-2 space-y-1 font-mono text-[9px] text-emerald-100/50">
                <span className="block text-[#D4AF37] font-bold uppercase mb-1">Live Notifications Audit Stream:</span>
                <div className="bg-[#031d0e] p-2 rounded-xl space-y-1 max-h-[120px] overflow-y-auto custom-scrollbar leading-relaxed font-mono text-[8.5px]">
                  <p className="text-emerald-400">🔋 [SYS-DAEMON] Gateway listening on port 3000...</p>
                  <p className="text-[#D4AF37]">✦ [CONNECTIVITY] Core pipeline securely connected to +2348037629012</p>
                  {orders.map((o) => (
                    <React.Fragment key={o.id}>
                      <p className="text-amber-200 font-semibold">✉ [EMAIL-DISPATCH] Client {o.customerName} checked out {o.id}. Sent notification packet to chef.zainab@aqeelah.com</p>
                      <p className="text-emerald-400 font-semibold">📲 [WHATSAPP-DISPATCH] Ref {o.id} - WhatsApp API push succeeded for phone +2348037629012</p>
                    </React.Fragment>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-emerald-100/30 font-sans italic py-1 block text-center">No transaction records generated in active sandbox session.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Royal Staff Registry & Secure Keys Cabinet */}
      <div className="bg-[#052E16]/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/25 shadow-xl space-y-6 mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] font-bold">Royal Staff & Keys Registry</h3>
            </div>
            <p className="text-xs text-emerald-100/60 font-sans">
              Centralized security credential controls. Only the business owner has authority to provision logins, audit keys or revoke clearance.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest">
            <span>Security Gate: Active</span>
          </div>
        </div>

        {staffActionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-emerald-950 text-[#D4AF37] border border-[#D4AF37]/35 rounded-xl text-xs font-mono font-bold flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>{staffActionMessage}</span>
          </motion.div>
        )}

        {loggedInStaff?.username === 'zainab' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Table of Staff - Column Span 7 */}
            <div className="lg:col-span-7 bg-emerald-950/55 rounded-2xl border border-[#D4AF37]/15 p-4 sm:p-6 space-y-4">
              <h4 className="font-serif text-sm font-bold text-[#D4AF37] uppercase tracking-wider font-bold">Authorized Team Directory</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-emerald-950/80 text-emerald-100/55 border-b border-[#D4AF37]/20 font-mono text-[9px] uppercase tracking-widest">
                      <th className="p-2 sm:p-3">Full Name</th>
                      <th className="p-2 sm:p-3">Username ID</th>
                      <th className="p-2 sm:p-3">Role Status</th>
                      <th className="p-2 sm:p-3 text-center">Assigned Access Key</th>
                      <th className="p-2 sm:p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4AF37]/10 text-[#FDFBF7] font-sans">
                    {staffList.map((st) => (
                      <tr key={st.id} className="hover:bg-emerald-900/40">
                        {editingStaffId === st.id ? (
                          // Edit Mode Row
                          <>
                            <td className="p-3">
                              <input
                                type="text"
                                value={editStaffName}
                                onChange={(e) => setEditStaffName(e.target.value)}
                                className="bg-emerald-900 text-[#FDFBF7] text-xs px-2 py-1 rounded border border-[#D4AF37]/30 focus:outline-none w-full"
                              />
                            </td>
                            <td className="p-3 font-mono text-emerald-100/50">
                              {st.username}
                            </td>
                            <td className="p-3">
                              <select
                                value={editStaffRole}
                                onChange={(e) => setEditStaffRole(e.target.value)}
                                className="bg-emerald-900 text-[#FDFBF7] text-xs px-1.5 py-1 rounded border border-[#D4AF37]/35 outline-none font-sans"
                              >
                                <option value="Sous Chef">Sous Chef</option>
                                <option value="Logistics Manager">Logistics Manager</option>
                                <option value="Kitchen Courier">Kitchen Courier</option>
                                <option value="Chef Assistant">Chef Assistant</option>
                                <option value="Executive Assistant">Executive Assistant</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <input
                                type="text"
                                value={editStaffKey}
                                onChange={(e) => setEditStaffKey(e.target.value)}
                                className="bg-emerald-900 text-[#D4AF37] font-mono text-xs px-2 py-1 rounded border border-[#D4AF37]/30 focus:outline-none w-full text-center"
                              />
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleSaveStaffEdit(st.id)}
                                  className="p-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-emerald-950 rounded cursor-pointer flex items-center justify-center"
                                  title="Save Profile"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingStaffId(null)}
                                  className="p-1.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded cursor-pointer flex items-center justify-center"
                                  title="Cancel changes"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          // Normal Read Row
                          <>
                            <td className="p-3 font-serif font-semibold">{st.fullName}</td>
                            <td className="p-3 font-mono font-medium text-amber-100/90">{st.username}</td>
                            <td className="p-3 text-[10px]">
                              <span className="px-2 py-0.5 bg-[#032e16] text-emerald-200 border border-emerald-500/10 rounded-full font-sans tracking-wide">
                                {st.role}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              <span className="bg-emerald-950 border border-[#D4AF37]/30 px-2.5 py-1 rounded-md text-xs font-mono font-bold text-[#D4AF37] tracking-widest block bg-emerald-900/60 select-all">
                                {st.passwordKey}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingStaffId(st.id);
                                    setEditStaffName(st.fullName);
                                    setEditStaffKey(st.passwordKey);
                                    setEditStaffRole(st.role);
                                  }}
                                  className="p-1.5 bg-emerald-900 text-emerald-200 border border-[#D4AF37]/15 hover:border-[#D4AF37]/45 rounded shadow-sm hover:text-[#D4AF37] transition-all cursor-pointer inline-flex items-center"
                                  title="Edit staff settings"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                {st.username !== 'zainab' && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteStaff(st.id, st.fullName)}
                                    className="p-1.5 bg-emerald-900 text-red-300 border border-red-500/10 hover:border-red-500/40 rounded transition-all hover:text-red-400 cursor-pointer inline-flex items-center"
                                    title="Revoke access"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Form to Create Staff - Column Span 5 */}
            <div className="lg:col-span-5 bg-emerald-950/50 rounded-2xl border border-[#D4AF37]/15 p-6 space-y-4 font-sans">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#D4AF37]">
                  <UserPlus className="w-4 h-4" />
                  <h4 className="font-serif text-sm font-bold uppercase tracking-wider font-bold">Configure New Team Access</h4>
                </div>
                <p className="text-[10px] text-emerald-100/50 leading-relaxed">
                  Instantly provision credentials for kitchen or logistics staff. Provide them with unique access keys.
                </p>
              </div>

              <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">Staff Member Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    placeholder="e.g. Amina Garba"
                    className="w-full bg-emerald-950/80 border border-[#D4AF37]/20 rounded-lg p-2.5 text-white placeholder-emerald-100/20 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">Sovereign Username ID</label>
                  <input
                    type="text"
                    required
                    value={newStaffUsername}
                    onChange={(e) => setNewStaffUsername(e.target.value)}
                    placeholder="e.g. amina"
                    className="w-full bg-emerald-950/80 border border-[#D4AF37]/20 rounded-lg p-2.5 text-white placeholder-emerald-100/30 focus:outline-none focus:border-[#D4AF37] font-mono lowercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">Security Role Assumed</label>
                  <select
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value)}
                    className="w-full bg-emerald-950/80 border border-[#D4AF37]/20 rounded-lg p-2.5 text-white outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="Sous Chef">Sous Chef</option>
                    <option value="Logistics Manager">Logistics Manager</option>
                    <option value="Kitchen Courier">Kitchen Courier</option>
                    <option value="Chef Assistant">Chef Assistant</option>
                    <option value="Executive Assistant">Executive Assistant</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">Secure Key / Password</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={newStaffKey}
                      onChange={(e) => setNewStaffKey(e.target.value)}
                      placeholder="e.g. secret456"
                      className="w-full bg-emerald-950/80 border border-[#D4AF37]/20 rounded-lg p-2 text-white placeholder-emerald-100/30 focus:outline-none focus:border-[#D4AF37] font-mono text-center tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateKey}
                      className="px-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/35 rounded-lg font-mono text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer select-none"
                    >
                      Crypto Spark
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-emerald-950 py-3 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer select-none"
                >
                  Authorize Access Key
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-[#032e16] border border-[#D4AF37]/20 rounded-2xl p-6 text-center max-w-2xl mx-auto space-y-3 font-sans">
            <Lock className="w-8 h-8 text-[#D4AF37] mx-auto animate-pulse" />
            <h4 className="font-serif text-base font-bold text-[#FDFBF7]">Authorized Personnel Only</h4>
            <p className="text-xs text-emerald-100/60 leading-relaxed max-w-sm mx-auto">
              You are currently authenticated as <strong className="text-[#D4AF37]">{loggedInStaff?.fullName}</strong> ({loggedInStaff?.role}). Only Chef Zainab Bello Sule (Master Chef & Owner) holds global cryptographic clearance to manage security keys or delete personnel databases.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
