/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  category: 'small-chops' | 'desserts' | 'drinks' | 'party-trays' | 'gift-boxes' | 'corporate';
  price: number; // in NGN (Naira)
  image: string;
  description: string;
  ingredients: string[];
  portionSizes: string[];
  availability: 'Instantly Available' | '24h Notice' | '48h Notice';
  isBestSeller?: boolean;
  isSeasonal?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface CartItem {
  id: string;
  product: MenuItem;
  selectedPortion: string;
  quantity: number;
  customMessage?: string; // For gifts
  scheduledDate?: string; // For scheduled deliveries
}

export interface CelebrationReminder {
  id: string;
  celebrantName: string;
  relationship: string;
  date: string;
  eventType: 'Birthday' | 'Anniversary' | 'Graduation' | 'Corporate' | 'Other';
  customMessage: string;
  selectedPackageId?: string;
}

export interface EventBooking {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  estimatedBudget: number;
  selectedThemeColor: string;
  specialRequests: string;
  menuPackageSelected: string;
  status: 'Pending Review' | 'Consultation Scheduled' | 'Contract Sent' | 'Deposit Paid' | 'Fully Booked';
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Recipes' | 'Party Planning' | 'Event Inspiration' | 'Food Trends' | 'Celebration Ideas';
  readTime: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export interface TrayItemPlacement {
  id: string;
  name: string;
  x: number; // percentage coordinate 0-100 on tray
  y: number; // percentage coordinate 0-100 on tray
  color: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'Order Received' | 'Preparing' | 'Packaging' | 'Out for Delivery' | 'Delivered';
  customerName: string;
  customerEmail: string;
  deliveryAddress: string;
  paymentMethod: 'Paystack' | 'Flutterwave' | 'Bank Transfer';
  date: string;
  archived?: boolean;
  receivedAt?: string;
  preparingAt?: string;
  packagingAt?: string;
  outForDeliveryAt?: string;
  deliveredAt?: string;
}
