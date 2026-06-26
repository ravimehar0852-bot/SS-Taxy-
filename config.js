const ADMIN_EMAILS = ["ravimehar0852@gmail.com"];
// ============================================
// SS TAXY - CONFIG (Firebase + Razorpay + Business)
// ============================================

// 🔥 Firebase Config — replace with your own
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  phone: "+917412910208",
  whatsapp: "917412910208",
  email: "aiabhi263@gmail.com",
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
  { from: "Lucknow", to: "Varanasi", km: 315, price: 4100 },
  { from: "Prayagraj", to: "Buxar", km: 125, price: 1800 },
  { from: "Prayagraj", to: "Roorkee", km: 690, price: 8550 },
  { from: "Prayagraj", to: "Manglaur", km: 700, price: 8700 },
  { from: "Prayagraj", to: "Jaspur", km: 630, price: 7900 },
  { from: "Prayagraj", to: "Azamgarh", km: 165, price: 2300 },
  { from: "Prayagraj", to: "Sitapur", km: 265, price: 3500 },
  { from: "Varanasi", to: "Mau", km: 120, price: 1700 },
  { from: "Varanasi", to: "Jaunpur", km: 65, price: 1200 },
  { from: "Varanasi", to: "Ballia", km: 140, price: 2000 },
  { from: "Lucknow", to: "Mau", km: 305, price: 4000 },
  { from: "Varanasi", to: "Bareilly", km: 610, price: 7600 },
  { from: "Varanasi", to: "Lakhimpur Kheri", km: 465, price: 5900 },
  { from: "Noida", to: "Mohali", km: 285, price: 3900 },
  { from: "Noida", to: "Patiala", km: 255, price: 3500 },
  { from: "Noida", to: "Amritsar", km: 455, price: 5900 },
  { from: "Noida", to: "Jalandhar", km: 385, price: 5100 },
  { from: "Noida", to: "Pathankot", km: 490, price: 6400 },
  { from: "Noida", to: "Dharamshala", km: 500, price: 6700 }
];
