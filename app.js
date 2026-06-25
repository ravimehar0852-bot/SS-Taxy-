// ============ SS TAXY - MAIN APP ============
// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Loader hide
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    l.style.opacity = 0;
    setTimeout(() => l.style.display = 'none', 500);
  }, 600);
});

// Mobile menu
function toggleMenu(){ document.getElementById('navLinks').classList.toggle('open'); }
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open')));

// Tabs
document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
  });
});

// Render vehicles
const vGrid = document.getElementById('vehicleGrid');
Object.entries(VEHICLES).forEach(([key, v]) => {
  vGrid.innerHTML += `
    <div class="vehicle-card">
      <img src="${v.image}" alt="${v.name}" loading="lazy"/>
      <div class="vehicle-info">
        <h3>${v.name}</h3>
        <div class="vehicle-meta">
          <span><i class="fas fa-users"></i> ${v.seats} Seats</span>
          <span><i class="fas fa-rupee-sign"></i> ${v.perKm}/km</span>
        </div>
        <button class="btn-gold" onclick="selectVehicle('${key}')"><i class="fas fa-calendar-check"></i> Book Now</button>
      </div>
    </div>`;
});

function selectVehicle(key){
  document.getElementById('vehicle').value = key;
  document.getElementById('booking').scrollIntoView({behavior:'smooth'});
  calcFare();
}

// Render routes
const rGrid = document.getElementById('routeGrid');
ROUTES.forEach(r => {
  rGrid.innerHTML += `
    <div class="route-card" onclick="bookRoute('${r.from}','${r.to}',${r.km})">
      <h4>${r.from} → ${r.to}</h4>
      <p>₹${r.price}</p>
      <span>${r.km} km · Sedan</span>
    </div>`;
});

function bookRoute(from, to, km){
  document.getElementById('pickup').value = from;
  document.getElementById('drop').value = to;
  document.getElementById('distance').value = km;
  document.getElementById('booking').scrollIntoView({behavior:'smooth'});
  calcFare();
}

// Fare calculation
function calcFare(){
  const vk = document.getElementById('vehicle').value;
  const dist = parseFloat(document.getElementById('distance').value) || 0;
  if(!vk || dist <= 0){ document.getElementById('fareEstimate').textContent = '₹ 0'; return 0; }
  const v = VEHICLES[vk];
  const fare = Math.round(v.baseFare + (dist * v.perKm));
  document.getElementById('fareEstimate').textContent = '₹ ' + fare.toLocaleString('en-IN');
  return fare;
}
['vehicle','distance'].forEach(id => document.getElementById(id).addEventListener('input', calcFare));

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('active'));
});

// Validate
function validateForm(){
  const phone = document.getElementById('phone').value;
  if(!/^[0-9]{10}$/.test(phone)){ alert('Enter valid 10-digit mobile'); return false; }
  return true;
}

// Submit Booking
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!validateForm()) return;
  const fare = calcFare();
  if(fare <= 0){ alert('Enter valid distance'); return; }

  const data = {
    name: name.value, phone: phone.value, email: email.value,
    pickup: pickup.value, drop: drop.value,
    date: date.value, time: time.value,
    vehicle: VEHICLES[vehicle.value].name, amount: fare,
    paymentStatus: 'Pending', bookingStatus: 'Pending',
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  // Choose payment option
  const opt = prompt("Choose Payment:\n1 = Pay Full ₹"+fare+"\n2 = Pay ₹500 Advance\n3 = Pay 25% Advance ₹"+Math.round(fare*0.25));
  let payAmount;
  if(opt === '1') payAmount = fare;
  else if(opt === '2') payAmount = 500;
  else if(opt === '3') payAmount = Math.round(fare * 0.25);
  else return;

  // Razorpay
  const options = {
    key: RAZORPAY_KEY_ID, amount: payAmount * 100, currency: 'INR',
    name: 'SS TAXY', description: 'Cab Booking — ' + data.vehicle,
    handler: async function(resp){
      data.paymentStatus = payAmount === fare ? 'Paid' : 'Partial Paid';
      data.paidAmount = payAmount;
      data.paymentId = resp.razorpay_payment_id;
      const docRef = await db.collection('bookings').add(data);
      showSuccess(docRef.id, data);
    },
    prefill: { name: data.name, email: data.email, contact: data.phone },
    theme: { color: '#d4af37' }
  };
  const rzp = new Razorpay(options);
  rzp.open();
});

function showSuccess(id, data){
  document.getElementById('bookingIdOut').textContent = id.toUpperCase().slice(0,10);
  document.getElementById('successModal').classList.remove('hidden');
  // WhatsApp confirmation
  const msg = `🚖 *SS TAXY Booking Confirmed*%0A%0A` +
              `Name: ${data.name}%0APhone: ${data.phone}%0A` +
              `Pickup: ${data.pickup}%0ADrop: ${data.drop}%0A` +
              `Date: ${data.date} ${data.time}%0A` +
              `Vehicle: ${data.vehicle}%0AAmount: ₹${data.amount}%0A` +
              `Booking ID: ${id.slice(0,10).toUpperCase()}`;
  setTimeout(() => window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${msg}`, '_blank'), 1500);
  document.getElementById('bookingForm').reset();
}
function closeModal(){ document.getElementById('successModal').classList.add('hidden'); }

// Set min date = today
document.getElementById('date').min = new Date().toISOString().split('T')[0];
