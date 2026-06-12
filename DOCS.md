# PRODUCT REQUIREMENTS & PLATFORM ARCHITECTURE DESIGN
## BRAND: SMALL CHOPS BY AQEELAH (LAGOS & ABUJA)
### Founder: Zainab Bello Sule
### Version 2.0 (Production Blueprint - June 2026)

---

## 1. Executive Product Strategy (Investor-Ready Vision)

Small Chops by Aqeelah is a premium, mobile-first, luxury transactional catering platform and Progressive Web Application (PWA). It elevates Nigerian street food, artisanal pastry bites, and custom drinks into high-culture culinary luxury. By combining Zainab Bello Sule's master food formulation with frictionless digital ordering, live tracking, and celebration scheduling, the platform transforms food logistics into a "Celebration Commerce Hub."

### Business Performance Matrices
* **Target Return on Investment (ROI):** 4.5x in Year 1.
* **Average Order Value (AOV) Boost:** Aiming for +45% via the interactive Visual Tray Builder and Smart Recommendation Carousel.
* **Customer Retention Target:** 70%+ Year-over-Year driven by the automated **Celebration Reminder System** and persistent **Loyalty Hub**.

---

## 2. Information Architecture (IA)

```
[Main Landing Navigation Home]
  │
  ├──► [Interactive Menu Cabinet] (With sorting, portion sizes, smart pairing carousel)
  │
  ├──► [Elite Party Planner Tool] (Inputs guest count, event type, budget -> outputs customized proposal)
  │
  ├──► [Interactive PLatter/Tray Builder] (Drag items visually onto an SVG platter display with real-time weights and price counters)
  │
  ├──► [Celebration Reminder Center] (Input birthdays/anniversaries -> sends notifications & offers pre-scheduled deliveries)
  │
  ├──► [Corporate & Event Booking Engine] (Instant quote generator, custom form fields for large weddings & boardrooms)
  │
  ├──► [Corporate Dashboard] (Invoice downloads, recurring deliveries scheduler, expense chart)
  │
  ├──► [Loyalty & Referrals Area] (VIP statuses, point tracking, refer-a-friend bonuses)
  │
  └──► [Admin Control Center] (Analytics dashboard, active order fulfillment queue, review moderation)
```

---

## 3. Database Schema Blueprint

### A. Persistent NoSQL Architecture (Firestore Proposal)

#### Collection: `users`
```json
{
  "uid": "USER_ID_AUTH_GEN",
  "displayName": "Zainab Bello",
  "email": "zainab@aqeelah.com",
  "phoneNumber": "+2348031234567",
  "createdAt": "2026-06-06T10:00:00Z",
  "userType": "Corporate" | "Individual" | "Staff" | "Admin",
  "loyaltyPoints": 420,
  "loyaltyTier": "Gold VIP",
  "savedAddresses": [
    {
      "label": "Home",
      "address": "12B Alfred Rewane Road, Ikoyi, Lagos"
    }
  ],
  "referralCode": "AQEELAH_ZAINAB5"
}
```

#### Collection: `orders`
```json
{
  "orderId": "AQE-2026-0606-993",
  "userId": "USER_ID_AUTH_GEN",
  "items": [
    {
      "productId": "sc-01",
      "name": "Royal Signature Samosa Box",
      "quantity": 2,
      "selectedPortion": "Box of 24",
      "price": 22000
    }
  ],
  "subtotal": 44000,
  "deliveryFee": 3500,
  "discount": 4400,
  "total": 43100,
  "status": "Order Received" | "Preparing" | "Packaging" | "Out for Delivery" | "Delivered",
  "lastUpdated": "2026-06-06T12:30:15Z",
  "paymentDetails": {
    "provider": "Paystack",
    "reference": "pstk_live_9a82bbd88372",
    "status": "Success"
  },
  "recipientName": "Musa Alao",
  "recipientPhone": "+234803998877",
  "deliveryAddress": "Maitama General District, Abuja",
  "scheduledDate": "2026-06-12",
  "giftMessage": "Congratulations on the wedding!"
}
```

#### Collection: `reminders`
```json
{
  "reminderId": "RM-7729103",
  "userId": "USER_ID",
  "celebrantName": "Zainab Bello Sule",
  "relationship": "Founder / Spouse",
  "date": "10-24", // MM-DD for recurring
  "eventType": "Anniversary",
  "customMessage": "Happy Anniversary love, your favorite Chops from Aqeelah are on their way!",
  "autoPlaceOrder": true,
  "selectedPackageId": "pt-01"
}
```

---

## 4. API Integration Architectures

### Paystack / Flutterwave Standard Checkout Lifecycle

1. **Transaction Initialization:**
   - Client sends total payload to server API `POST /api/payment/initialize` to secure pricing logic.
   - Server registers transaction via Paystack REST API `https://api.paystack.co/transaction/initialize` with header `Authorization: Bearer SECRET_KEY`.
   - Paystack returns `authorization_url` and a transaction `reference`.
   - Client redirects customer to payment gateway or starts inline iframe.

2. **Web verification Webhook (`POST /api/payment/webhook`):**
   - Wait for secure Paystack IPN.
   - Decrypt signature `x-paystack-signature` using SHA512 HMAC and the local Webhook Secret.
   - Validate metadata, change order database status to `"Preparing"`, and trigger automated push notification or WhatsApp message via Twilio API.

---

## 5. Advanced PWA Caching Strategy

The Progressive Web App handles spotty Nigerian mobile networks elegantly.

```typescript
// sw.ts - Service Worker Cache First Strategy
const CACHE_NAME = 'aqeelah-luxury-v2';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/assets/logo.png',
  '/offline.html'
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached item if available, otherwise fetch from internet
      return response || fetch(event.request).catch(() => caches.match('/offline.html'));
    })
  );
});
```

---

## 6. Security Architecture & Advanced Technical SEO
* **ISO 27001 Compliance guidelines** are respected inside Firestore by denying public access to `orders/*` and enforcing `request.auth != null` rules.
* **Perfect Indexing:** Fully rendered JSON-LD Structured Food Schema markup is dynamically loaded, enabling the brand's premium samosas to display rich metadata snippet carousels in Google Nigeria search rankings instantly.
