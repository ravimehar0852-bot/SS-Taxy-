// ============================================
// SS TAXY - CONFIG (Firebase + Razorpay + Business)
// ============================================

// 🔥 Firebase Config — replace with your own
const firebaseConfig = {
  apiKey: "AIzaSyAl7-tAOewVjkzD3F2F9VgkpNhWE1yRutI",
  authDomain: "ss-taxy-89c26.firebaseapp.com",
  projectId: "ss-taxy-89c26",
  storageBucket: "ss-taxy-89c26.firebasestorage.app",
  messagingSenderId: "183826358274",
  appId: "1:183826358274:web:da9c476b9f3d88bdaa871b",
  measurementId: "G-BEP931XFGJ"
};
// 💳 Razorpay Key (use rzp_live_xxx in production)
const RAZORPAY_KEY_ID = "rzp_test_YOUR_KEY_ID";

// 🏢 Business info
const BUSINESS = {
  name: "SS TAXY",
  phone: "+919876543210",
  whatsapp: "919876543210",
  email: "booking@sstaxy.com",
  address: "Connaught Place, New Delhi, India - 110001"
};

// 🚗 Vehicles & pricing
const VEHICLES = {
  sedan:         { name: "Sedan",            seats: 4,  perKm: 12, baseFare: 250,  image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800" },
  suv:           { name: "SUV",              seats: 6,  perKm: 16, baseFare: 350,  image: "https://images.unsplash.com/photo-1519440689458-bba6f6e26b56?w=800" },
  ertiga:        { name: "Ertiga",           seats: 6,  perKm: 14, baseFare: 300,  image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800" },
  innova:        { name: "Innova",           seats: 7,  perKm: 17, baseFare: 400,  image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800" },
  innovaCrysta:  { name: "Innova Crysta",    seats: 7,  perKm: 20, baseFare: 500,  image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800" },
  tempo:         { name: "Tempo Traveller",  seats: 12, perKm: 25, baseFare: 800,  image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" }
};

// 🛣 Popular routes (extend to 100+ for SEO)
const ROUTES = [
  { from: "Delhi", to: "Jaipur",      km: 280, price: 3500 },
  { from: "Delhi", to: "Agra",        km: 230, price: 3000 },
  { from: "Delhi", to: "Chandigarh",  km: 250, price: 3200 },
  { from: "Delhi", to: "Manali",      km: 540, price: 7500 },
  { from: "Delhi", to: "Shimla",      km: 360, price: 5000 },
  { from: "Delhi", to: "Haridwar",    km: 220, price: 2900 },
  { from: "Delhi", to: "Rishikesh",   km: 240, price: 3100 },
  { from: "Delhi", to: "Dehradun",    km: 260, price: 3400 },
  { from: "Delhi", to: "Mathura",     km: 180, price: 2400 },
  { from: "Delhi", to: "Vrindavan",   km: 185, price: 2500 },
  { from: "Delhi", to: "Ajmer",       km: 390, price: 5200 },
  { from: "Delhi", to: "Pushkar",     km: 400, price: 5300 },
  { from: "Gurgaon", to: "Delhi Airport", km: 30, price: 800 },
  { from: "Noida", to: "Delhi Airport",   km: 40, price: 1000 },
  { from: "Faridabad", to: "Delhi Airport", km: 45, price: 1100 }
];

const ADMIN_EMAILS = ["admin@sstaxy.com"]; // allowed admin logins
