// ============================================================
// SS TAXI — CENTRAL CONFIGURATION FILE
// Edit this file to update all content across the website.
// ============================================================

const CONFIG = {

  // ── Company Info ──────────────────────────────────────────
  company: {
    name: "SS Taxi",
    tagline: "Premium Rides. Every Time.",
    description: "Lucknow's most trusted premium cab service. Safe, reliable, and always on time.",
    owner: "Vinay Shukla",
    phone: "+91 8881999828",
    whatsapp: "+91 8881999828",
    email: "info@sstaxiservice.com",
    address: "Lucknow, Uttar Pradesh, India",
    instagram: "vinay_shukla_x000x",
    established: "2018",
    totalRides: "50,000+",
    totalCities: "120+",
    rating: "4.9",
  },

  // ── Firebase Config ────────────────────────────────────────
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  },

  // ── Admin Credentials (change before deploy) ───────────────
  admin: {
    email: "admin@sstaxiservice.com",
    // Password is managed via Firebase Auth
  },

  // ── Services ───────────────────────────────────────────────
  services: [
    { id: "outstation", icon: "🛣️", title: "Outstation Taxi", desc: "Comfortable long-distance travel across India with experienced drivers." },
    { id: "oneway",     icon: "➡️", title: "One Way Taxi",    desc: "Pay only for the distance you travel. No return fare hassle." },
    { id: "roundtrip",  icon: "🔄", title: "Round Trip",      desc: "Best rates for planned round trips with flexible scheduling." },
    { id: "airport",    icon: "✈️", title: "Airport Transfer", desc: "Punctual airport pickups and drops, 24/7, flight-tracked." },
    { id: "corporate",  icon: "💼", title: "Corporate Taxi",  desc: "Dedicated corporate accounts with monthly billing and GST invoices." },
    { id: "local",      icon: "🏙️", title: "Local Taxi",      desc: "Hourly packages for local sightseeing and city errands." },
  ],

  // ── Fleet ──────────────────────────────────────────────────
  fleet: [
    { name: "Sedan",           model: "Swift Dzire / Honda Amaze",     seats: 4, price: "₹11/km", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80", tag: "Economy" },
    { name: "SUV",             model: "Ertiga / Marazzo",               seats: 6, price: "₹15/km", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", tag: "Comfort" },
    { name: "Innova",          model: "Toyota Innova",                  seats: 7, price: "₹17/km", img: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&q=80", tag: "Popular" },
    { name: "Innova Crysta",   model: "Toyota Innova Crysta",           seats: 7, price: "₹19/km", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80", tag: "Premium" },
    { name: "Tempo Traveller", model: "Force Tempo Traveller 12-Seat", seats: 12, price: "₹25/km", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80", tag: "Group" },
  ],

  // ── Popular Routes ─────────────────────────────────────────
  routes: [
    { from: "Lucknow", to: "Agra",       distance: "336 km", time: "~5.5 hrs", price: "₹3,700", popular: true },
    { from: "Lucknow", to: "Varanasi",   distance: "297 km", time: "~5 hrs",   price: "₹3,270", popular: true },
    { from: "Lucknow", to: "Delhi",      distance: "555 km", time: "~8.5 hrs", price: "₹6,100", popular: true },
    { from: "Lucknow", to: "Ayodhya",    distance: "135 km", time: "~2.5 hrs", price: "₹1,485", popular: false },
    { from: "Lucknow", to: "Kanpur",     distance: "80 km",  time: "~1.5 hrs", price: "₹880",   popular: false },
    { from: "Lucknow", to: "Prayagraj",  distance: "200 km", time: "~3.5 hrs", price: "₹2,200", popular: true },
    { from: "Lucknow", to: "Mathura",    distance: "400 km", time: "~6.5 hrs", price: "₹4,400", popular: false },
    { from: "Lucknow", to: "Nainital",   distance: "325 km", time: "~6 hrs",   price: "₹3,575", popular: false },
  ],

  // ── Testimonials ───────────────────────────────────────────
  testimonials: [
    { name: "Rohit Mishra",   role: "Business Traveller", rating: 5, text: "Used SS Taxi for my Delhi trip. The Innova Crysta was immaculate and the driver was professional throughout.", avatar: "RM" },
    { name: "Priya Gupta",    role: "Frequent Flyer",     rating: 5, text: "Always use SS Taxi for airport transfers. Never missed a flight in 2 years. Highly recommended.", avatar: "PG" },
    { name: "Aman Srivastava",role: "Family Traveller",   rating: 5, text: "Booked for Varanasi with family. Spacious vehicle, transparent pricing, zero hassle. Will book again.", avatar: "AS" },
    { name: "Neha Sharma",    role: "Corporate Client",   rating: 5, text: "Our company's go-to cab partner. GST invoices, professional drivers, on-time every single time.", avatar: "NS" },
  ],

  // ── FAQs ───────────────────────────────────────────────────
  faqs: [
    { q: "How do I book a cab?",                  a: "Use our booking form above, call us, or WhatsApp us. We confirm within 5 minutes." },
    { q: "Do you offer airport pickup at night?", a: "Yes! We operate 24/7. All airport transfers are flight-tracked at no extra charge." },
    { q: "What is your cancellation policy?",     a: "Free cancellation up to 2 hours before pickup. After that, a nominal fee applies." },
    { q: "Is GST invoice available?",             a: "Yes. Corporate clients and individuals both receive a proper GST tax invoice." },
    { q: "Do you cover outstation trips?",        a: "We cover 120+ cities. Call us for any route not listed — we'll arrange it." },
    { q: "Are your drivers verified?",            a: "All drivers are police-verified, trained, and have 3+ years of experience." },
  ],

  // ── Map Embed (replace src with your Google Maps embed URL) ─
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14374.94!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1623456789",

};

// Make globally available
window.CONFIG = CONFIG;
