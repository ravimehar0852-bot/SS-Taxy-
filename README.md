# SS Taxi — Premium Cab Booking Website

**Owner:** Vinay Shukla  
**Contact:** +91 8881999828  
**Tech:** Pure HTML + CSS + JS (no build step required) · Firebase Firestore · WhatsApp API

---

## 📁 Project Structure

```
sstaxi/
├── index.html              ← Main 5-page SPA
├── robots.txt
├── sitemap.xml
├── css/
│   ├── styles.css          ← All styles (Black/White/Gold theme)
│   └── admin.css           ← Admin dashboard styles
├── js/
│   ├── config.js           ← ⭐ CENTRAL CONFIG — edit all content here
│   ├── app.js              ← Main app logic (pages, booking, WhatsApp)
│   └── admin.js            ← Admin dashboard logic (Firebase, auth, export)
└── pages/
    └── admin.html          ← Admin dashboard page
```

---

## 🚀 Quick Start

1. **Open `index.html`** in any browser — works immediately with local storage booking.
2. **Edit `js/config.js`** to update company info, routes, fleet, testimonials, FAQs.
3. **Connect Firebase** (see below) to persist bookings server-side.

---

## 🔥 Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Enable **Firestore Database**
4. Copy your config into `js/config.js` → `firebase` section
5. In Firebase Auth, create your admin user with the email in `config.admin.email`
6. Set Firestore rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{id} {
      allow create: if true;  // anyone can submit a booking
      allow read, update, delete: if request.auth != null; // admin only
    }
  }
}
```

---

## 💬 WhatsApp Integration

Every booking auto-generates a formatted WhatsApp message and opens it directly — no API key needed. The message is sent to `+91 8881999828`.

**Booking confirmation format:**
```
🚖 New Booking — SS Taxi
👤 Name: ...
📞 Mobile: ...
📍 Pickup: ...
🏁 Drop: ...
📅 Date: ...
⏰ Time: ...
🚗 Vehicle: ...
```

---

## 🔐 Admin Dashboard

URL: `/pages/admin.html`

**Demo mode** (no Firebase): email from config + password `admin123`  
**With Firebase**: use Firebase Auth credentials

Features:
- View & search all bookings
- Confirm / cancel / delete bookings
- Confirm → auto-sends WhatsApp to customer
- Export all data as CSV
- Analytics: vehicle popularity, journey types

---

## ☁️ Deployment (Vercel / GitHub Pages / Firebase Hosting)

**Vercel:**
1. Push to GitHub
2. Import project on vercel.com
3. Deploy — no build step needed (static files)

**Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## ✏️ Customization

All content is in **`js/config.js`**. No need to touch HTML or JS:

| What to change | Where |
|---|---|
| Company name, phone, WhatsApp | `config.company` |
| Firebase config | `config.firebase` |
| Services list | `config.services` |
| Fleet / vehicles | `config.fleet` |
| Routes & prices | `config.routes` |
| Testimonials | `config.testimonials` |
| FAQs | `config.faqs` |
| Google Maps embed | `config.mapEmbedUrl` |

---

## 📱 Features

- ✅ 5-page SPA (Home, About, Services, Routes, Contact)
- ✅ Advanced 4-step booking form
- ✅ Quick booking tabs (One Way, Round Trip, Airport, Local)
- ✅ WhatsApp integration (no API key)
- ✅ Admin dashboard with Firebase
- ✅ Booking export to CSV
- ✅ Customer review submission
- ✅ Route search
- ✅ Floating Call + WhatsApp + Back-to-top buttons
- ✅ Responsive down to 320px
- ✅ SEO meta tags + Schema markup + sitemap
- ✅ Black + White + Gold premium theme
- ✅ Lazy-loaded images
- ✅ Local storage fallback (works without Firebase)

---

*Built for SS Taxi — Lucknow's Premium Cab Service*
