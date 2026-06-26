// ============ SS TAXY — ADMIN ============
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

let allBookings = [];

// LOGIN
function login(){
  const email = document.getElementById('adminEmail').value;
  const pass = document.getElementById('adminPass').value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(u => {
      if(!ADMIN_EMAILS.includes(u.user.email)){
        document.getElementById('loginErr').textContent = 'Unauthorized';
        auth.signOut(); return;
      }
      showApp();
    })
    .catch(e => document.getElementById('loginErr').textContent = e.message);
}
function logout(){ auth.signOut().then(() => location.reload()); }

auth.onAuthStateChanged(u => {
  if(u && ADMIN_EMAILS.includes(u.email)) showApp();
});

function showApp(){
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('adminApp').classList.remove('hidden');
  loadBookings();
}

// NAV
document.querySelectorAll('.nav-item[data-view]').forEach(n => {
  n.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    n.classList.add('active');
    document.getElementById(n.dataset.view).classList.add('active');
  });
});

// REAL-TIME BOOKINGS
function loadBookings(){
  db.collection('bookings').orderBy('createdAt','desc').onSnapshot(snap => {
    allBookings = [];
    snap.forEach(d => allBookings.push({id:d.id, ...d.data()}));
    renderDashboard();
    renderBookings();
    renderPayments();
    renderCustomers();
  });
}

function renderDashboard(){
  const today = new Date().toISOString().split('T')[0];
  const todayCount = allBookings.filter(b => b.date === today).length;
  const revenue = allBookings.filter(b => b.paymentStatus !== 'Pending').reduce((s,b) => s + (b.paidAmount || b.amount || 0), 0);
  const pending = allBookings.filter(b => b.bookingStatus === 'Pending').length;
  const confirmed = allBookings.filter(b => b.bookingStatus === 'Confirmed').length;

  statTotal.textContent = allBookings.length;
  statToday.textContent = todayCount;
  statRevenue.textContent = '₹' + revenue.toLocaleString('en-IN');
  statPending.textContent = pending;
  statConfirmed.textContent = confirmed;

  // notification on new booking
  if(window._lastCount !== undefined && allBookings.length > window._lastCount){
    notify('🚖 New Booking Received!');
  }
  window._lastCount = allBookings.length;
}

function renderBookings(filter=''){
  const body = document.getElementById('bookingBody');
  body.innerHTML = '';
  allBookings
    .filter(b => !filter || (b.name+b.phone+b.id).toLowerCase().includes(filter.toLowerCase()))
    .forEach(b => {
      body.innerHTML += `<tr>
        <td>${b.id.slice(0,8).toUpperCase()}</td>
        <td>${b.name}</td><td>${b.phone}</td>
        <td>${b.pickup}</td><td>${b.drop}</td>
        <td>${b.date} ${b.time||''}</td>
        <td>${b.vehicle}</td>
        <td>₹${b.amount}</td>
        <td><span class="badge ${b.paymentStatus==='Paid'?'paid':b.paymentStatus==='Partial Paid'?'partial':'pending'}">${b.paymentStatus}</span></td>
        <td><span class="badge ${b.bookingStatus.toLowerCase()}">${b.bookingStatus}</span></td>
        <td>
          <button class="action-btn btn-confirm" onclick="updateBooking('${b.id}','Confirmed')">✓</button>
          <button class="action-btn btn-complete" onclick="updateBooking('${b.id}','Completed')">✔✔</button>
          <button class="action-btn btn-cancel" onclick="updateBooking('${b.id}','Cancelled')">✕</button>
       <button onclick="deleteBooking('${b.id}')">🗑</button>
        </td>
      </tr>`;
    });
}

function renderPayments(){
  const body = document.getElementById('paymentBody');
  body.innerHTML = '';
  allBookings.forEach(b => {
    body.innerHTML += `<tr>
      <td>${b.id.slice(0,8).toUpperCase()}</td>
      <td>${b.name}</td>
      <td>₹${b.amount}</td>
      <td>₹${b.paidAmount || 0}</td>
      <td><span class="badge ${b.paymentStatus==='Paid'?'paid':b.paymentStatus==='Partial Paid'?'partial':'pending'}">${b.paymentStatus}</span></td>
    </tr>`;
  });
}

function renderCustomers(){
  const map = {};
  allBookings.forEach(b => {
    if(!map[b.phone]) map[b.phone] = {name:b.name, phone:b.phone, email:b.email, count:0, spent:0};
    map[b.phone].count++;
    map[b.phone].spent += b.paidAmount || 0;
  });
  const body = document.getElementById('customerBody');
  body.innerHTML = '';
  Object.values(map).forEach(c => {
    body.innerHTML += `<tr><td>${c.name}</td><td>${c.phone}</td><td>${c.email||''}</td><td>${c.count}</td><td>₹${c.spent.toLocaleString('en-IN')}</td></tr>`;
  });
}

function updateBooking(id, status){

  db.collection('bookings').doc(id).update({
    bookingStatus: status
  }).then(() => {

    db.collection('bookings').doc(id).get().then(doc => {
      const d = doc.data();

      let msg = "";

      // CONFIRMED
      if(status === "Confirmed"){
        msg =
`🚖 *SS TAXY Booking Confirmed*

👤 Name: ${d.name}
📞 Phone: ${d.phone}
📍 Pickup: ${d.pickup}
📍 Drop: ${d.drop}
📅 Date: ${d.date}
🚗 Vehicle: ${d.vehicle}

🙏 Thank you for booking with SS TAXY`;
      }

      // CANCELLED
      else if(status === "Cancelled"){
        msg =
`❌ *SS TAXY Booking Cancelled*

👤 Name: ${d.name}
📍 Pickup: ${d.pickup}
📍 Drop: ${d.drop}

Sorry for inconvenience. You can book again anytime.`;
      }

      // COMPLETED
      else if(status === "Completed"){
        msg =
`✅ *SS TAXY Ride Completed*

👤 Name: ${d.name}
🚗 Vehicle: ${d.vehicle}
💰 Amount Paid: ₹${d.amount}

🙏 Thank you for choosing SS TAXY`;
      }

      // WhatsApp send
      if(msg){
        const url = `https://wa.me/${d.phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, "_blank");
      }

      // Notification sound (optional)
      try {
        const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
        audio.play();
      } catch(e){}

    });

  });

}
document.getElementById('searchBox').addEventListener('input', e => renderBookings(e.target.value));

// CSV Export
function exportCSV(){
  const headers = ['ID','Name','Phone','Pickup','Drop','Date','Vehicle','Amount','Payment','Status'];
  const rows = allBookings.map(b => [b.id, b.name, b.phone, b.pickup, b.drop, b.date, b.vehicle, b.amount, b.paymentStatus, b.bookingStatus]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c||''}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'sstaxy-bookings.csv';
  a.click();
}

function notify(msg){
  if(Notification.permission === 'granted') new Notification('SS TAXY', {body:msg});
  else if(Notification.permission !== 'denied') Notification.requestPermission();
    }
