/* ============================================================
   SS TAXI — ADMIN DASHBOARD SCRIPT
   Firebase Auth + Firestore + Analytics + Export
   ============================================================ */

// ── Firebase SDK (loaded in admin.html) ─────────────────────
// All Firebase calls wrapped in try/catch for graceful fallback

let isFirebaseReady = false;
let db = null;
let auth = null;
let allBookings = [];

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  try {
    const cfg = window.CONFIG?.firebase;
    if (cfg && cfg.apiKey !== 'YOUR_API_KEY') {
      firebase.initializeApp(cfg);
      db   = firebase.firestore();
      auth = firebase.auth();
      isFirebaseReady = true;
      checkAuthState();
    } else {
      // Demo mode — use localStorage
      console.info('Firebase not configured. Running in demo/local mode.');
      showDemoLoginForm();
    }
  } catch (e) {
    console.warn('Firebase init error:', e);
    showDemoLoginForm();
  }
});

// ── Auth ───────────────────────────────────────────────────
function checkAuthState() {
  if (!isFirebaseReady) return;
  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById('admin-login').classList.add('hidden');
      document.getElementById('admin-dashboard').classList.remove('hidden');
      loadDashboard(user.email);
    } else {
      document.getElementById('admin-login').classList.remove('hidden');
      document.getElementById('admin-dashboard').classList.add('hidden');
    }
  });
}

function showDemoLoginForm() {
  // Already shown by default
}

async function adminLogin() {
  const email = document.getElementById('admin-email').value.trim();
  const pass  = document.getElementById('admin-pass').value;
  const btn   = document.getElementById('login-btn');

  if (!email || !pass) return showAdminToast('Please enter email and password', 'error');

  btn.textContent = 'Logging in…';
  btn.disabled = true;

  if (isFirebaseReady) {
    try {
      await auth.signInWithEmailAndPassword(email, pass);
    } catch (e) {
      showAdminToast(e.message || 'Login failed', 'error');
      btn.textContent = 'Login'; btn.disabled = false;
    }
  } else {
    // Demo mode fallback
    const demoEmail = window.CONFIG?.admin?.email || 'aiabhi02@gmail.com';
    if (email === demoEmail && pass === 'aiabhi02') {
      document.getElementById('admin-login').classList.add('hidden');
      document.getElementById('admin-dashboard').classList.remove('hidden');
      loadDashboard(email);
    } else {
      showAdminToast('Invalid credentials (demo: use config email + admin123)', 'error');
      btn.textContent = 'Login'; btn.disabled = false;
    }
  }
}

function adminLogout() {
  if (isFirebaseReady) { auth.signOut(); }
  document.getElementById('admin-login').classList.remove('hidden');
  document.getElementById('admin-dashboard').classList.add('hidden');
  document.getElementById('admin-email').value = '';
  document.getElementById('admin-pass').value = '';
}

// ── Dashboard ──────────────────────────────────────────────
async function loadDashboard(email) {
  const userEmail = document.getElementById('admin-user-email');
if(userEmail){
   userEmail.textContent = email;
  await loadBookings();
  renderStats();
  renderBookingsTable(allBookings);
  renderAnalytics();
  showAdminTab('bookings');
}

async function loadBookings() {
  if (isFirebaseReady && db) {
    try {
      const snap = await db.collection('bookings').orderBy('createdAt', 'desc').limit(200).get();
      allBookings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      return;
    } catch (e) {
      console.warn('Firestore read error:', e);
    }
  }
  // Fallback to localStorage
  try {
    allBookings = JSON.parse(localStorage.getItem('ss_bookings') || '[]');
  } catch (e) {
    allBookings = getSampleBookings();
  }
  if (!allBookings.length) allBookings = getSampleBookings();
}

function getSampleBookings() {
  return [
    { id: '1001', name: 'Rohit Mishra',    phone: '+91 9876543210', type: 'One Way',          pickup: 'Lucknow',       drop: 'Agra',      date: '2024-07-15', time: '06:00', vehicle: 'Innova Crysta', status: 'confirmed', createdAt: new Date().toISOString() },
    { id: '1002', name: 'Priya Gupta',     phone: '+91 9876543211', type: 'Airport Transfer', pickup: 'Indira Nagar',  drop: 'LKO Airport',date: '2024-07-16', time: '03:30', vehicle: 'Sedan',         status: 'confirmed', createdAt: new Date().toISOString() },
    { id: '1003', name: 'Aman Srivastava', phone: '+91 9876543212', type: 'Round Trip',        pickup: 'Lucknow',       drop: 'Varanasi',  date: '2024-07-18', time: '07:00', vehicle: 'Innova',        status: 'pending',   createdAt: new Date().toISOString() },
    { id: '1004', name: 'Neha Sharma',     phone: '+91 9876543213', type: 'Corporate',         pickup: 'Hazratganj',    drop: 'Kanpur',    date: '2024-07-19', time: '09:00', vehicle: 'Sedan',         status: 'pending',   createdAt: new Date().toISOString() },
    { id: '1005', name: 'Vivek Kumar',     phone: '+91 9876543214', type: 'Local Package',     pickup: 'Lucknow City',  drop: 'Lucknow',   date: '2024-07-20', time: '10:00', vehicle: 'SUV',           status: 'cancelled', createdAt: new Date().toISOString() },
  ];
}

// ── Stats ──────────────────────────────────────────────────
function renderStats() {
  const total     = allBookings.length;
  const confirmed = allBookings.filter(b => b.status === 'confirmed').length;
  const pending   = allBookings.filter(b => b.status === 'pending').length;
  const cancelled = allBookings.filter(b => b.status === 'cancelled').length;

  document.getElementById('stat-total').textContent     = total;
  document.getElementById('stat-confirmed').textContent  = confirmed;
  document.getElementById('stat-pending').textContent    = pending;
  document.getElementById('stat-cancelled').textContent  = cancelled;
}

// ── Table ──────────────────────────────────────────────────
function renderBookingsTable(bookings) {
  const tbody = document.getElementById('bookings-tbody');
  if (!bookings.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--white-muted);">No bookings found.</td></tr>`;
    return;
  }
  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td style="font-size:0.8rem;color:var(--white-muted);">#${String(b.id).slice(-4)}</td>
      <td>${b.name || '—'}</td>
      <td>${b.phone || '—'}</td>
      <td>${b.pickup || '—'} → ${b.drop || '—'}</td>
      <td>${b.date || '—'} ${b.time ? '@ '+b.time : ''}</td>
      <td>${b.vehicle || '—'}</td>
      <td><span class="status-badge status-${b.status || 'pending'}">${b.status || 'pending'}</span></td>
      <td style="display:flex;gap:0.4rem;flex-wrap:wrap;">
        <button class="action-btn action-confirm" onclick="updateStatus('${b.id}','confirmed')">✓</button>
        <button class="action-btn action-cancel"  onclick="updateStatus('${b.id}','cancelled')">✗</button>
        <button class="action-btn action-delete"  onclick="deleteBooking('${b.id}')">🗑</button>
        <button class="action-btn" style="background:rgba(255,255,255,0.05);color:var(--white-muted);" onclick="viewBooking('${b.id}')">👁</button>
      </td>
    </tr>
  `).join('');
}

function searchBookings() {
  const q = document.getElementById('booking-search').value.toLowerCase();
  const filtered = allBookings.filter(b =>
    (b.name||'').toLowerCase().includes(q) ||
    (b.phone||'').toLowerCase().includes(q) ||
    (b.pickup||'').toLowerCase().includes(q) ||
    (b.drop||'').toLowerCase().includes(q) ||
    (b.vehicle||'').toLowerCase().includes(q)
  );
  renderBookingsTable(filtered);
}

async function updateStatus(id, status) {
  // Update locally
  const booking = allBookings.find(b => String(b.id) === String(id));
  if (booking) booking.status = status;

  // Update in Firestore
  if (isFirebaseReady && db) {
    try { await db.collection('bookings').doc(String(id)).update({ status }); } catch(e) {}
  } else {
    // Update localStorage
    try {
      localStorage.setItem('ss_bookings', JSON.stringify(allBookings));
    } catch(e) {}
  }

  renderBookingsTable(allBookings);
  renderStats();

  // Send WhatsApp notification if confirmed
  if (status === 'confirmed' && booking) {
    const wn  = CONFIG.company.whatsapp.replace(/\D/g,'');
    const msg = `✅ *Booking Confirmed — SS Taxi*\n\n👤 ${booking.name}\n📞 ${booking.phone}\n📍 ${booking.pickup} → ${booking.drop}\n📅 ${booking.date} @ ${booking.time}\n🚗 ${booking.vehicle}\n\n_Your ride is confirmed! We'll contact you before pickup._`;
    window.open(`https://wa.me/${booking.phone?.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`, '_blank');
  }
  showAdminToast(`Booking ${status}`, 'success');
}

async function deleteBooking(id) {
  if (!confirm('Delete this booking? This cannot be undone.')) return;

  allBookings = allBookings.filter(b => String(b.id) !== String(id));

  if (isFirebaseReady && db) {
    try { await db.collection('bookings').doc(String(id)).delete(); } catch(e) {}
  } else {
    try { localStorage.setItem('ss_bookings', JSON.stringify(allBookings)); } catch(e) {}
  }

  renderBookingsTable(allBookings);
  renderStats();
  showAdminToast('Booking deleted', 'error');
}

function viewBooking(id) {
  const b = allBookings.find(b => String(b.id) === String(id));
  if (!b) return;
  const modal = document.createElement('div');
  modal.className = 'booking-detail-modal';
  modal.innerHTML = `
    <div class="modal-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <h3>Booking #${String(b.id).slice(-4)}</h3>
        <button onclick="this.closest('.booking-detail-modal').remove()" style="background:none;border:none;color:var(--white-muted);font-size:1.5rem;cursor:pointer;">×</button>
      </div>
      ${Object.entries({
        'Customer Name': b.name, 'Phone': b.phone, 'Email': b.email || '—',
        'Journey Type': b.type, 'Pickup': b.pickup, 'Drop': b.drop,
        'Date': b.date, 'Time': b.time, 'Vehicle': b.vehicle,
        'Status': b.status, 'Notes': b.notes || '—',
        'Booked At': b.createdAt ? new Date(b.createdAt).toLocaleString() : '—'
      }).map(([k,v]) => `
        <div class="detail-row">
          <span class="detail-key">${k}</span>
          <span class="detail-val">${v || '—'}</span>
        </div>
      `).join('')}
      <div style="margin-top:1.5rem;display:flex;gap:0.75rem;">
        <a href="https://wa.me/${(b.phone||'').replace(/\D/g,'')}" target="_blank" class="btn btn-green" style="flex:1;justify-content:center;">💬 WhatsApp</a>
        <a href="tel:${b.phone}" class="btn btn-gold" style="flex:1;justify-content:center;">📞 Call</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

// ── Analytics ──────────────────────────────────────────────
function renderAnalytics() {
  // Vehicle popularity
  const vehicleCounts = {};
  allBookings.forEach(b => {
    vehicleCounts[b.vehicle] = (vehicleCounts[b.vehicle] || 0) + 1;
  });
  const maxCount = Math.max(...Object.values(vehicleCounts), 1);
  const chartEl = document.getElementById('vehicle-chart');
  if (chartEl) {
    chartEl.innerHTML = Object.entries(vehicleCounts).map(([v, n]) => `
      <div class="bar-col">
        <div class="bar" style="height:${(n/maxCount)*120}px;" title="${v}: ${n}"></div>
        <div class="bar-label">${v.split(' ')[0]}</div>
      </div>
    `).join('');
  }

  // Journey type breakdown
  const typeCounts = {};
  allBookings.forEach(b => { typeCounts[b.type||'Other'] = (typeCounts[b.type||'Other'] || 0) + 1; });
  const typeEl = document.getElementById('type-breakdown');
  if (typeEl) {
    typeEl.innerHTML = Object.entries(typeCounts).map(([t, n]) => `
      <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--black-border);font-size:0.88rem;">
        <span style="color:var(--white-muted);">${t}</span>
        <span style="font-weight:600;color:var(--gold);">${n}</span>
      </div>
    `).join('');
  }
}

// ── Export ─────────────────────────────────────────────────
function exportBookings() {
  const headers = ['ID','Name','Phone','Type','Pickup','Drop','Date','Time','Vehicle','Status','Created At'];
  const rows = allBookings.map(b => [
    b.id, b.name, b.phone, b.type, b.pickup, b.drop, b.date, b.time, b.vehicle, b.status,
    b.createdAt ? new Date(b.createdAt).toLocaleString() : ''
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${(v||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ss-taxi-bookings-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  showAdminToast('Exported successfully!', 'success');
}

// ── Tab Management ─────────────────────────────────────────
function showAdminTab(id) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
  document.querySelectorAll('.admin-section').forEach(s => s.classList.toggle('active', s.id === 'admin-' + id));
}

// ── Toast ──────────────────────────────────────────────────
function showAdminToast(msg, type = 'success') {
  const t = document.getElementById('admin-toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'show ' + type;
  setTimeout(() => t.className = '', 3000);
}
