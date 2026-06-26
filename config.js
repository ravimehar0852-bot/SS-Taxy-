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
  { from: "Lucknow", to: "Varanasi", km: 320, price: 4500 },
  { from: "Prayagraj", to: "Buxar", km: 140, price: 2200 },
  { from: "Prayagraj", to: "Roorkee", km: 720, price: 9800 },
  { from: "Prayagraj", to: "Manglaur", km: 730, price: 9900 },
  { from: "Prayagraj", to: "Jaspur", km: 650, price: 8900 },
  { from: "Prayagraj", to: "Azamgarh", km: 170, price: 2800 },
  { from: "Prayagraj", to: "Sitapur", km: 260, price: 3900 },
  { from: "Varanasi", to: "Mau", km: 125, price: 2200 },
  { from: "Varanasi", to: "Jaunpur", km: 65, price: 1500 },
  { from: "Varanasi", to: "Ballia", km: 145, price: 2400 },
  { from: "Lucknow", to: "Mau", km: 305, price: 4300 },
  { from: "Varanasi", to: "Bareilly", km: 610, price: 8500 },
  { from: "Varanasi", to: "Lakhimpur Kheri", km: 470, price: 6900 },
  { from: "Noida", to: "Mohali", km: 290, price: 4500 },
  { from: "Noida", to: "Patiala", km: 250, price: 4100 },
  { from: "Noida", to: "Amritsar", km: 470, price: 6900 },
  { from: "Noida", to: "Jalandhar", km: 390, price: 5900 },
  { from: "Noida", to: "Pathankot", km: 500, price: 7600 },
  { from: "Noida", to: "Dharamshala", km: 510, price: 7900 }
];
