/* ============================================================
   SS TAXI — MAIN APPLICATION SCRIPT
   Handles: Navigation, Page rendering, Booking, WhatsApp
   ============================================================ */

// ── Wait for DOM + Config ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  renderFloatingButtons();
  initScrollBehavior();
  showPage('home');
});

// ── Page Router ────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0 });
    // Lazily render page content
    if (!page.dataset.rendered) {
      page.dataset.rendered = '1';
      if (id === 'home')     renderHome();
      if (id === 'about')    renderAbout();
      if (id === 'services') renderServices();
      if (id === 'routes')   renderRoutes();
      if (id === 'contact')  renderContact();
    }
  }
  // Update nav active state
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });
  // Close mobile menu
  const mobileMenu = document.getElementById('nav-mobile');
  const toggle = document.getElementById('nav-toggle');
  if (mobileMenu) { mobileMenu.classList.remove('open'); toggle.classList.remove('open'); }
}

// ── Navigation Render ──────────────────────────────────────
function renderNav() {
  const c = window.CONFIG.company;
  const pages = [
    { id: 'home',     label: 'Home' },
    { id: 'about',    label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'routes',   label: 'Routes' },
    { id: 'contact',  label: 'Contact' },
  ];

  const linksHtml = pages.map(p =>
    `<li><a href="#" data-page="${p.id}" onclick="showPage('${p.id}');return false;">${p.label}</a></li>`
  ).join('');

  const mobileLinks = pages.map(p =>
    `<a href="#" data-page="${p.id}" onclick="showPage('${p.id}');return false;">${p.label}</a>`
  ).join('');

  document.getElementById('navbar').innerHTML = `
    <div class="nav-inner">
      <a href="#" class="nav-logo" onclick="showPage('home');return false;">
        <div class="logo-mark">SS</div>
        <span class="logo-text">SS <span>Taxi</span></span>
      </a>
      <ul class="nav-links">${linksHtml}</ul>
      <div class="nav-cta">
        <a href="tel:${c.phone}" class="nav-phone">${c.phone}</a>
        <a href="pages/admin.html" class="btn btn-outline">Login</a>
        <a href="#" class="btn btn-gold" onclick="document.getElementById('booking-section')?.scrollIntoView({behavior:'smooth'});return false;">Book Now</a>
      </div>
      <button class="nav-toggle" id="nav-toggle" onclick="toggleMobileNav()" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <nav class="nav-mobile" id="nav-mobile">
      ${mobileLinks}
      <a href="tel:${c.phone}" class="btn btn-gold" style="text-align:center;">📞 ${c.phone}</a>
      <a href="https://wa.me/${c.whatsapp.replace(/\D/g,'')}" target="_blank" class="btn btn-green">💬 WhatsApp</a>
    </nav>
  `;
}

function toggleMobileNav() {
  document.getElementById('nav-mobile').classList.toggle('open');
  document.getElementById('nav-toggle').classList.toggle('open');
}

// ── Footer Render ──────────────────────────────────────────
function renderFooter() {
  const c = window.CONFIG.company;
  document.getElementById('footer').innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-logo" style="margin-bottom:0.5rem;">
            <div class="logo-mark">SS</div>
            <span class="logo-text">SS <span>Taxi</span></span>
          </div>
          <p class="footer-tagline">${c.description}</p>
          <div class="social-links">
            <a href="https://instagram.com/${c.instagram}" target="_blank" class="social-link" title="Instagram">📸</a>
            <a href="https://wa.me/${c.whatsapp.replace(/\D/g,'')}" target="_blank" class="social-link" title="WhatsApp">💬</a>
            <a href="tel:${c.phone}" class="social-link" title="Call">📞</a>
          </div>
        </div>
        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#" onclick="showPage('home');return false;">Home</a></li>
            <li><a href="#" onclick="showPage('about');return false;">About Us</a></li>
            <li><a href="#" onclick="showPage('services');return false;">Services</a></li>
            <li><a href="#" onclick="showPage('routes');return false;">Routes</a></li>
            <li><a href="#" onclick="showPage('contact');return false;">Contact</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Services</h4>
          <ul>
            ${CONFIG.services.slice(0,5).map(s => `<li><a href="#" onclick="showPage('services');return false;">${s.title}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-links">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:${c.phone}">${c.phone}</a></li>
            <li><a href="https://wa.me/${c.whatsapp.replace(/\D/g,'')}" target="_blank">WhatsApp</a></li>
            <li><a href="mailto:${c.email}">${c.email}</a></li>
            <li><a href="pages/admin.html">Admin Login</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© ${new Date().getFullYear()} ${c.name}. All rights reserved. Owner: ${c.owner}</p>
        <p class="footer-copy" style="font-size:0.78rem;">Designed with ♥ for Premium Travel</p>
      </div>
    </div>
  `;
}

// ── Floating Buttons ───────────────────────────────────────
function renderFloatingButtons() {
  const c = window.CONFIG.company;
  const el = document.getElementById('float-btns');
  el.innerHTML = `
    <a href="tel:${c.phone}" class="float-btn float-call" title="Call Now">📞</a>
    <a href="https://wa.me/${c.whatsapp.replace(/\D/g,'')}" target="_blank" class="float-btn float-wa" title="WhatsApp">💬</a>
    <button class="float-btn float-top" id="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" title="Back to top">↑</button>
  `;
}

// ── Scroll Behavior ────────────────────────────────────────
function initScrollBehavior() {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.getElementById('navbar')?.classList.toggle('scrolled', y > 80);
    document.getElementById('back-to-top')?.classList.toggle('visible', y > 400);
  });
}

// ══════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════
function renderHome() {
  const c = window.CONFIG.company;
  const el = document.getElementById('page-home');
  el.innerHTML = `
    ${renderHeroSection()}
    ${renderBookingSection()}
    ${renderServicesSection()}
    ${renderFleetSection()}
    ${renderWhyUsSection()}
    ${renderTestimonialsSection()}
    ${renderFAQSection()}
    ${renderGallerySection()}
  `;
  initBookingTabs();
  initBookingSteps();
  initFAQ();
}

function renderHeroSection() {
  const c = window.CONFIG.company;
  return `
  <section id="hero">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">⭐ Rated ${c.rating}/5 · ${c.totalRides} Happy Rides</div>
        <h1 class="hero-title">Lucknow's <em>Premium</em><br>Taxi Service</h1>
        <p class="hero-subtitle">${c.description} Book your ride in seconds — outstation, airport, local, or corporate.</p>
        <div class="hero-actions">
          <a href="#booking-section" class="btn btn-gold btn-lg" onclick="document.getElementById('booking-section').scrollIntoView({behavior:'smooth'});return false;">
            🚗 Book a Ride
          </a>
          <a href="https://wa.me/${c.whatsapp.replace(/\D/g,'')}" target="_blank" class="btn btn-outline btn-lg">
            💬 WhatsApp Us
          </a>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-num">${c.totalRides}</div>
            <div class="stat-label">Rides Completed</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${c.totalCities}</div>
            <div class="stat-label">Cities Covered</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${c.rating}★</div>
            <div class="stat-label">Average Rating</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${new Date().getFullYear() - parseInt(c.established)}+</div>
            <div class="stat-label">Years of Trust</div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-scroll">
      <div class="scroll-line"></div>
      Scroll
    </div>
  </section>
  `;
}

function renderBookingSection() {
  return `
  <section id="booking-section" class="section-sm" style="background:var(--black-soft); border-top:1px solid var(--black-border); border-bottom:1px solid var(--black-border);">
    <div class="container">
      <div class="text-center" style="margin-bottom:2rem;">
        <span class="section-label">Quick Booking</span>
        <h2 class="section-title">Reserve Your <span>Premium Ride</span></h2>
      </div>
      <div class="booking-card">
        <div class="booking-tabs" id="booking-tabs">
          <button class="tab-btn active" data-tab="oneway">➡️ One Way</button>
          <button class="tab-btn" data-tab="roundtrip">🔄 Round Trip</button>
          <button class="tab-btn" data-tab="airport">✈️ Airport</button>
          <button class="tab-btn" data-tab="local">🏙️ Local</button>
          <button class="tab-btn" data-tab="advanced">📋 Full Booking</button>
        </div>
        <div class="booking-form" id="booking-form-area">

          <!-- ONE WAY -->
          <div class="tab-content active" id="tab-oneway">
            <div class="form-grid">
              <div class="form-group"><label>Pickup City / Location</label><input type="text" placeholder="e.g. Lucknow" id="ow-pickup"></div>
              <div class="form-group"><label>Drop City / Location</label><input type="text" placeholder="e.g. Agra" id="ow-drop"></div>
              <div class="form-group"><label>Travel Date</label><input type="date" id="ow-date"></div>
              <div class="form-group"><label>Pickup Time</label><input type="time" id="ow-time" value="10:00"></div>
              <div class="form-group"><label>Vehicle Type</label>
                <select id="ow-vehicle">
                  ${CONFIG.fleet.map(f => `<option value="${f.name}">${f.name} — ${f.price}</option>`).join('')}
                </select>
              </div>
              <div class="form-group"><label>Mobile Number</label><input type="tel" placeholder="+91 XXXXX XXXXX" id="ow-phone"></div>
            </div>
            <div class="booking-submit">
              <p class="booking-note">✅ Confirmation within 5 minutes · Free cancellation up to 2 hrs</p>
              <button class="btn btn-gold" onclick="submitQuickBooking('oneway')">Book Now →</button>
            </div>
          </div>

          <!-- ROUND TRIP -->
          <div class="tab-content" id="tab-roundtrip">
            <div class="form-grid">
              <div class="form-group"><label>Pickup City</label><input type="text" placeholder="e.g. Lucknow" id="rt-pickup"></div>
              <div class="form-group"><label>Drop City</label><input type="text" placeholder="e.g. Delhi" id="rt-drop"></div>
              <div class="form-group"><label>Departure Date</label><input type="date" id="rt-date1"></div>
              <div class="form-group"><label>Return Date</label><input type="date" id="rt-date2"></div>
              <div class="form-group"><label>Pickup Time</label><input type="time" id="rt-time" value="08:00"></div>
              <div class="form-group"><label>Vehicle Type</label>
                <select id="rt-vehicle">
                  ${CONFIG.fleet.map(f => `<option value="${f.name}">${f.name} — ${f.price}</option>`).join('')}
                </select>
              </div>
              <div class="form-group"><label>Mobile Number</label><input type="tel" placeholder="+91 XXXXX XXXXX" id="rt-phone"></div>
            </div>
            <div class="booking-submit">
              <p class="booking-note">✅ Round trip discounts available · Dedicated driver</p>
              <button class="btn btn-gold" onclick="submitQuickBooking('roundtrip')">Book Now →</button>
            </div>
          </div>

          <!-- AIRPORT -->
          <div class="tab-content" id="tab-airport">
            <div class="form-grid">
              <div class="form-group"><label>Airport</label>
                <select id="ap-airport">
                  <option>Lucknow — Chaudhary Charan Singh Int'l</option>
                  <option>Delhi — Indira Gandhi Int'l</option>
                  <option>Varanasi — Lal Bahadur Shastri</option>
                  <option>Other (mention in notes)</option>
                </select>
              </div>
              <div class="form-group"><label>Transfer Type</label>
                <select id="ap-type">
                  <option value="pickup">Airport Pickup</option>
                  <option value="drop">Airport Drop</option>
                </select>
              </div>
              <div class="form-group"><label>Your Address</label><input type="text" placeholder="Your pickup address" id="ap-address"></div>
              <div class="form-group"><label>Flight Date</label><input type="date" id="ap-date"></div>
              <div class="form-group"><label>Flight Time</label><input type="time" id="ap-time"></div>
              <div class="form-group"><label>Vehicle Type</label>
                <select id="ap-vehicle">
                  ${CONFIG.fleet.map(f => `<option value="${f.name}">${f.name} — ${f.price}</option>`).join('')}
                </select>
              </div>
              <div class="form-group"><label>Mobile Number</label><input type="tel" placeholder="+91 XXXXX XXXXX" id="ap-phone"></div>
            </div>
            <div class="booking-submit">
              <p class="booking-note">✈️ Flight-tracked · Meet & greet service · 24/7 available</p>
              <button class="btn btn-gold" onclick="submitQuickBooking('airport')">Book Now →</button>
            </div>
          </div>

          <!-- LOCAL -->
          <div class="tab-content" id="tab-local">
            <div class="form-grid">
              <div class="form-group"><label>City</label><input type="text" placeholder="e.g. Lucknow" id="lc-city" value="Lucknow"></div>
              <div class="form-group"><label>Package</label>
                <select id="lc-package">
                  <option>4 Hours / 40 KM</option>
                  <option>8 Hours / 80 KM</option>
                  <option>12 Hours / 120 KM</option>
                </select>
              </div>
              <div class="form-group"><label>Date</label><input type="date" id="lc-date"></div>
              <div class="form-group"><label>Start Time</label><input type="time" id="lc-time" value="09:00"></div>
              <div class="form-group"><label>Vehicle Type</label>
                <select id="lc-vehicle">
                  ${CONFIG.fleet.map(f => `<option value="${f.name}">${f.name} — ${f.price}</option>`).join('')}
                </select>
              </div>
              <div class="form-group"><label>Mobile Number</label><input type="tel" placeholder="+91 XXXXX XXXXX" id="lc-phone"></div>
            </div>
            <div class="booking-submit">
              <p class="booking-note">🏙️ Local sightseeing · Shopping runs · City transfers</p>
              <button class="btn btn-gold" onclick="submitQuickBooking('local')">Book Now →</button>
            </div>
          </div>

          <!-- ADVANCED MULTI-STEP -->
          <div class="tab-content" id="tab-advanced">
            <div class="step-indicators">
              ${['Personal', 'Route', 'Travel', 'Review'].map((s,i) => `
                <div class="step-dot ${i===0?'active':''}" id="step-dot-${i}">
                  <div class="step-num">${i+1}</div>
                  <div class="step-label">${s}</div>
                </div>
              `).join('')}
            </div>

            <!-- Step 1 -->
            <div class="booking-step active" id="adv-step-0">
              <div class="form-grid">
                <div class="form-group"><label>Your Name</label><input type="text" id="adv-name" placeholder="Full name"></div>
                <div class="form-group"><label>Mobile Number</label><input type="tel" id="adv-mobile" placeholder="+91 XXXXX XXXXX"></div>
                <div class="form-group"><label>Email (optional)</label><input type="email" id="adv-email" placeholder="email@example.com"></div>
              </div>
              <div class="step-nav">
                <span></span>
                <button class="btn btn-gold" onclick="advStep(1)">Next →</button>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="booking-step" id="adv-step-1">
              <div class="form-grid">
                <div class="form-group"><label>Pickup Location</label><input type="text" id="adv-pickup" placeholder="Full address or city"></div>
                <div class="form-group"><label>Drop Location</label><input type="text" id="adv-drop" placeholder="Destination address or city"></div>
                <div class="form-group"><label>Journey Type</label>
                  <select id="adv-journey">
                    <option>One Way</option><option>Round Trip</option>
                    <option>Airport Transfer</option><option>Local Package</option>
                  </select>
                </div>
              </div>
              <div class="step-nav">
                <button class="btn btn-outline" onclick="advStep(0)">← Back</button>
                <button class="btn btn-gold" onclick="advStep(2)">Next →</button>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="booking-step" id="adv-step-2">
              <div class="form-grid">
                <div class="form-group"><label>Travel Date</label><input type="date" id="adv-date"></div>
                <div class="form-group"><label>Pickup Time</label><input type="time" id="adv-time" value="10:00"></div>
                <div class="form-group"><label>Vehicle Type</label>
                  <select id="adv-vehicle">
                    ${CONFIG.fleet.map(f => `<option value="${f.name}">${f.name} (${f.seats} seats) — ${f.price}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group" style="grid-column:1/-1;"><label>Special Requests</label>
                  <textarea id="adv-notes" rows="2" placeholder="Any special requirements..."></textarea>
                </div>
              </div>
              <div class="step-nav">
                <button class="btn btn-outline" onclick="advStep(1)">← Back</button>
                <button class="btn btn-gold" onclick="advStep(3)">Review →</button>
              </div>
            </div>

            <!-- Step 4 Review -->
            <div class="booking-step" id="adv-step-3">
              <div id="booking-review" style="background:var(--black-soft);border-radius:var(--radius);padding:1.5rem;margin-bottom:1rem;"></div>
              <div class="step-nav">
                <button class="btn btn-outline" onclick="advStep(2)">← Edit</button>
                <button class="btn btn-gold btn-lg" onclick="submitAdvancedBooking()">Confirm & Book →</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

function renderServicesSection() {
  return `
  <section class="section">
    <div class="container">
      <div class="text-center">
        <span class="section-label">What We Offer</span>
        <h2 class="section-title">Our <span>Services</span></h2>
        <div class="divider"></div>
        <p class="section-subtitle">From airport transfers to multi-day outstation trips — we have the perfect ride for every journey.</p>
      </div>
      <div class="services-grid">
        ${CONFIG.services.map(s => `
          <div class="service-card">
            <span class="service-icon">${s.icon}</span>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-desc">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

function renderFleetSection() {
  return `
  <section class="section" style="background:var(--black-soft);">
    <div class="container">
      <div class="text-center">
        <span class="section-label">Our Fleet</span>
        <h2 class="section-title">Choose Your <span>Ride</span></h2>
        <div class="divider"></div>
        <p class="section-subtitle">Modern, well-maintained vehicles for every group size and budget.</p>
      </div>
      <div class="fleet-grid">
        ${CONFIG.fleet.map(f => `
          <div class="fleet-card">
            <div class="card-img-wrap">
              <img class="fleet-img" src="${f.img}" alt="${f.name}" loading="lazy">
            </div>
            <div class="fleet-body">
              <span class="card-tag">${f.tag}</span>
              <div class="fleet-name">${f.name}</div>
              <div class="fleet-model">${f.model}</div>
              <div class="fleet-meta">
                <span class="fleet-seats">👥 ${f.seats} Seats</span>
                <span class="fleet-price">${f.price}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

function renderWhyUsSection() {
  const c = window.CONFIG.company;
  const reasons = [
    { icon: '🛡️', title: 'Verified Drivers',     desc: 'Police-verified, trained professionals with 3+ years of experience.' },
    { icon: '⏰', title: '24/7 Service',          desc: 'Available around the clock, every day of the year including holidays.' },
    { icon: '💰', title: 'Transparent Pricing',   desc: 'No hidden charges. Price you see is the price you pay.' },
    { icon: '✈️', title: 'Flight Tracking',       desc: 'We track your flight and adjust pickup time automatically.' },
    { icon: '📄', title: 'GST Invoices',           desc: 'Proper tax invoices for corporate clients and individuals.' },
    { icon: '⭐', title: `${c.rating}★ Rated`,     desc: 'Consistently rated top by thousands of satisfied passengers.' },
  ];
  return `
  <section class="section">
    <div class="container">
      <div class="text-center">
        <span class="section-label">Why SS Taxi</span>
        <h2 class="section-title">The <span>Difference</span> You Feel</h2>
        <div class="divider"></div>
      </div>
      <div class="why-grid">
        ${reasons.map(r => `
          <div class="why-card">
            <span class="why-icon">${r.icon}</span>
            <h3 class="why-title">${r.title}</h3>
            <p style="font-size:0.88rem;">${r.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

function renderTestimonialsSection() {
  return `
  <section class="section" style="background:var(--black-soft);">
    <div class="container">
      <div class="text-center">
        <span class="section-label">Reviews</span>
        <h2 class="section-title">What Passengers <span>Say</span></h2>
        <div class="divider"></div>
      </div>
      <div class="testimonials-grid">
        ${CONFIG.testimonials.map(t => `
          <div class="testimonial-card">
            <div class="stars">${'★'.repeat(t.rating)}</div>
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author">
              <div class="author-avatar">${t.avatar}</div>
              <div>
                <div class="author-name">${t.name}</div>
                <div class="author-role">${t.role}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Review Form -->
      <div style="max-width:560px;margin:3rem auto 0;">
        <div class="booking-card">
          <div style="padding:1.5rem;">
            <h3 style="margin-bottom:1.25rem;">Leave Your Review</h3>
            <div class="star-picker" id="star-picker">
              ${[1,2,3,4,5].map(n => `<span data-val="${n}" onclick="setRating(${n})">★</span>`).join('')}
            </div>
            <div class="form-group" style="margin-bottom:1rem;">
              <label>Your Name</label>
              <input type="text" id="rev-name" placeholder="Full name">
            </div>
            <div class="form-group" style="margin-bottom:1rem;">
              <label>Your Review</label>
              <textarea id="rev-text" rows="3" placeholder="Share your experience..."></textarea>
            </div>
            <button class="btn btn-gold" onclick="submitReview()">Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

function renderFAQSection() {
  return `
  <section class="section">
    <div class="container">
      <div class="text-center">
        <span class="section-label">FAQ</span>
        <h2 class="section-title">Common <span>Questions</span></h2>
        <div class="divider"></div>
      </div>
      <div class="faq-list">
        ${CONFIG.faqs.map((f,i) => `
          <div class="faq-item" id="faq-${i}">
            <button class="faq-question" onclick="toggleFAQ(${i})">
              <span>${f.q}</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer"><p>${f.a}</p></div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

function renderGallerySection() {
  const imgs = [
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80',
    'https://images.unsplash.com/photo-1570521462033-3015e76e7432?w=600&q=80',
    'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&q=80',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
  ];
  return `
  <section class="section" style="background:var(--black-soft);">
    <div class="container">
      <div class="text-center">
        <span class="section-label">Gallery</span>
        <h2 class="section-title">Our <span>Fleet in Action</span></h2>
        <div class="divider"></div>
      </div>
      <div class="gallery-grid">
        ${imgs.map((src,i) => `
          <div class="gallery-item">
            <img src="${src}" alt="SS Taxi fleet ${i+1}" loading="lazy">
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

// ══════════════════════════════════════════════════════════
// ABOUT PAGE
// ══════════════════════════════════════════════════════════
function renderAbout() {
  const c = window.CONFIG.company;
  document.getElementById('page-about').innerHTML = `
    <section class="about-hero">
      <div class="container">
        <span class="section-label">About Us</span>
        <h1>Trusted Since <span class="gold">${c.established}</span></h1>
        <p style="max-width:500px;margin-top:1rem;">Built on reliability, safety, and passenger-first values.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="about-story-grid">
          <div>
            <span class="section-label">Our Story</span>
            <h2 class="section-title">From Lucknow,<br>To <span>Everywhere</span></h2>
            <div class="divider" style="margin:1rem 0;"></div>
            <p style="margin-bottom:1rem;">SS Taxi was founded in ${c.established} by <strong style="color:var(--white);">${c.owner}</strong> with a simple mission: make premium cab travel accessible, reliable, and stress-free for every passenger in Lucknow and beyond.</p>
            <p style="margin-bottom:1rem;">What started as a small fleet of 2 cars has grown into one of Lucknow's most trusted travel brands — with a fleet of ${CONFIG.fleet.length}+ vehicle types, coverage across ${c.totalCities} cities, and ${c.totalRides} completed rides.</p>
            <p>We believe every journey deserves the same level of care: a clean vehicle, a professional driver, and transparent pricing. That's the SS Taxi promise.</p>
            <div style="margin-top:2rem;display:flex;gap:1rem;flex-wrap:wrap;">
              <a href="tel:${c.phone}" class="btn btn-gold">📞 Call ${c.owner}</a>
              <a href="https://wa.me/${c.whatsapp.replace(/\D/g,'')}" target="_blank" class="btn btn-outline">💬 WhatsApp</a>
            </div>
          </div>
          <div class="about-img">
            <img src="https://images.unsplash.com/photo-1590674899484-13da1c23a0b5?w=700&q=80" alt="SS Taxi founder" loading="lazy">
          </div>
        </div>
        <div class="about-milestones">
          <div><div class="milestone-num">${c.established}</div><div class="milestone-label">Founded</div></div>
          <div><div class="milestone-num">${c.totalRides}</div><div class="milestone-label">Happy Rides</div></div>
          <div><div class="milestone-num">${c.totalCities}</div><div class="milestone-label">Cities Served</div></div>
          <div><div class="milestone-num">${c.rating}★</div><div class="milestone-label">Average Rating</div></div>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--black-soft);">
      <div class="container">
        <div class="text-center">
          <span class="section-label">Our Values</span>
          <h2 class="section-title">How We <span>Operate</span></h2>
          <div class="divider"></div>
        </div>
        <div class="why-grid">
          ${[
            { icon:'🤝', title:'Integrity',    desc:'We never charge hidden fees. What is quoted is what you pay.' },
            { icon:'🧠', title:'Expertise',    desc:'10+ years in Uttar Pradesh travel. We know every route, every road.' },
            { icon:'💯', title:'Reliability',  desc:'${c.totalRides} rides — never a no-show. We show up, every single time.' },
            { icon:'🌿', title:'Responsibility', desc:'Maintained vehicles, responsible driving, zero tolerance for unsafe behavior.' },
          ].map(v => `
            <div class="why-card">
              <span class="why-icon">${v.icon}</span>
              <h3 class="why-title">${v.title}</h3>
              <p style="font-size:0.88rem;">${v.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// ══════════════════════════════════════════════════════════
// SERVICES PAGE
// ══════════════════════════════════════════════════════════
function renderServices() {
  document.getElementById('page-services').innerHTML = `
    <section style="min-height:40vh;display:flex;align-items:center;background:url('https://images.unsplash.com/photo-1570521462033-3015e76e7432?w=1600&q=80') center/cover;position:relative;padding-top:80px;">
      <div style="position:absolute;inset:0;background:rgba(10,10,10,0.88);"></div>
      <div class="container" style="position:relative;z-index:1;">
        <span class="section-label">Services</span>
        <h1>Everything You <span class="gold">Need</span> to Travel</h1>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="services-grid">
          ${CONFIG.services.map(s => `
            <div class="service-card">
              <span class="service-icon">${s.icon}</span>
              <h3 class="service-title">${s.title}</h3>
              <p class="service-desc">${s.desc}</p>
              <div style="margin-top:1.25rem;">
                <a href="#" class="btn btn-outline" style="font-size:0.82rem;padding:0.5rem 1rem;" onclick="showPage('home');setTimeout(()=>document.getElementById('booking-section').scrollIntoView({behavior:'smooth'}),100);return false;">
                  Book This →
                </a>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Fleet on services page -->
        <div style="margin-top:4rem;">
          <div class="text-center">
            <span class="section-label">Fleet</span>
            <h2 class="section-title">Available <span>Vehicles</span></h2>
            <div class="divider"></div>
          </div>
          <div class="fleet-grid">
            ${CONFIG.fleet.map(f => `
              <div class="fleet-card">
                <div class="card-img-wrap"><img class="fleet-img" src="${f.img}" alt="${f.name}" loading="lazy"></div>
                <div class="fleet-body">
                  <span class="card-tag">${f.tag}</span>
                  <div class="fleet-name">${f.name}</div>
                  <div class="fleet-model">${f.model}</div>
                  <div class="fleet-meta">
                    <span class="fleet-seats">👥 ${f.seats} Seats</span>
                    <span class="fleet-price">${f.price}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

// ══════════════════════════════════════════════════════════
// ROUTES PAGE
// ══════════════════════════════════════════════════════════
function renderRoutes() {
  document.getElementById('page-routes').innerHTML = `
    <section style="min-height:40vh;display:flex;align-items:center;background:url('https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=1600&q=80') center/cover;position:relative;padding-top:80px;">
      <div style="position:absolute;inset:0;background:rgba(10,10,10,0.88);"></div>
      <div class="container" style="position:relative;z-index:1;">
        <span class="section-label">Routes</span>
        <h1>Popular <span class="gold">Destinations</span></h1>
        <p style="margin-top:1rem;max-width:500px;">Transparent pricing for all major routes from Lucknow. No surprises.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Route Search -->
        <div style="background:var(--black-card);border:1px solid var(--black-border);border-radius:var(--radius-lg);padding:1.5rem;margin-bottom:3rem;">
          <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-end;">
            <div class="form-group" style="flex:1;min-width:180px;">
              <label>From</label>
              <input type="text" id="route-from" placeholder="e.g. Lucknow" value="Lucknow">
            </div>
            <div class="form-group" style="flex:1;min-width:180px;">
              <label>To</label>
              <input type="text" id="route-to" placeholder="e.g. Agra" oninput="filterRoutes()">
            </div>
            <button class="btn btn-gold" onclick="filterRoutes()">Search Routes</button>
          </div>
        </div>

        <div class="routes-grid" id="routes-container">
          ${renderRouteCards(CONFIG.routes)}
        </div>
      </div>
    </section>
  `;
}

function renderRouteCards(routes) {
  return routes.map(r => `
    <div class="route-card">
      ${r.popular ? '<span class="card-tag">Popular</span>' : ''}
      <div class="route-cities">
        <span>${r.from}</span>
        <span class="route-arrow">→</span>
        <span>${r.to}</span>
      </div>
      <div class="route-meta">
        <span>📍 ${r.distance}</span>
        <span>⏱ ${r.time}</span>
      </div>
      <div class="route-footer">
        <span class="route-price">From ${r.price}</span>
        <a href="https://wa.me/${CONFIG.company.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(`Hi! I want to book a cab from ${r.from} to ${r.to}. Distance: ${r.distance}. Please share availability and price.`)}" target="_blank" class="btn btn-outline" style="font-size:0.8rem;padding:0.45rem 0.9rem;">
          Get Quote
        </a>
      </div>
    </div>
  `).join('');
}

function filterRoutes() {
  const to = document.getElementById('route-to')?.value.toLowerCase() || '';
  const filtered = CONFIG.routes.filter(r => !to || r.to.toLowerCase().includes(to) || r.from.toLowerCase().includes(to));
  document.getElementById('routes-container').innerHTML = renderRouteCards(filtered.length ? filtered : CONFIG.routes);
}

// ══════════════════════════════════════════════════════════
// CONTACT PAGE
// ══════════════════════════════════════════════════════════
function renderContact() {
  const c = window.CONFIG.company;
  document.getElementById('page-contact').innerHTML = `
    <section style="padding:120px 0 3rem;">
      <div class="container">
        <div class="text-center" style="margin-bottom:3rem;">
          <span class="section-label">Contact</span>
          <h1>Get In <span class="gold">Touch</span></h1>
          <div class="divider"></div>
          <p>We respond within 5 minutes during business hours.</p>
        </div>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div>
                <div class="contact-label">Call Us</div>
                <a href="tel:${c.phone}" class="contact-val">${c.phone}</a>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">💬</div>
              <div>
                <div class="contact-label">WhatsApp</div>
                <a href="https://wa.me/${c.whatsapp.replace(/\D/g,'')}" target="_blank" class="contact-val">${c.whatsapp}</a>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div>
                <div class="contact-label">Email</div>
                <a href="mailto:${c.email}" class="contact-val">${c.email}</a>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📸</div>
              <div>
                <div class="contact-label">Instagram</div>
                <a href="https://instagram.com/${c.instagram}" target="_blank" class="contact-val">@${c.instagram}</a>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div>
                <div class="contact-label">Base Location</div>
                <div class="contact-val">${c.address}</div>
              </div>
            </div>
            <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem;">
              <a href="tel:${c.phone}" class="btn btn-gold">📞 Call Now</a>
              <a href="https://wa.me/${c.whatsapp.replace(/\D/g,'')}" target="_blank" class="btn btn-green">💬 WhatsApp</a>
            </div>
          </div>

          <div class="contact-form-card">
            <h3 style="margin-bottom:1.5rem;">Send a Message</h3>
            <div class="form-group" style="margin-bottom:1rem;">
              <label>Your Name</label>
              <input type="text" id="cf-name" placeholder="Full name">
            </div>
            <div class="form-group" style="margin-bottom:1rem;">
              <label>Mobile Number</label>
              <input type="tel" id="cf-phone" placeholder="+91 XXXXX XXXXX">
            </div>
            <div class="form-group" style="margin-bottom:1rem;">
              <label>Subject</label>
              <select id="cf-subject">
                <option>Booking Inquiry</option>
                <option>Price Quote</option>
                <option>Corporate Account</option>
                <option>Complaint / Feedback</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom:1.25rem;">
              <label>Message</label>
              <textarea id="cf-message" rows="4" placeholder="How can we help you?"></textarea>
            </div>
            <button class="btn btn-gold" style="width:100%;" onclick="submitContactForm()">
              Send Message →
            </button>
          </div>
        </div>

        <div class="map-embed">
          <iframe src="${CONFIG.mapEmbedUrl}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  `;
}

// ══════════════════════════════════════════════════════════
// BOOKING LOGIC
// ══════════════════════════════════════════════════════════
function initBookingTabs() {
  document.querySelectorAll('#booking-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#booking-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab)?.classList.add('active');
    });
  });
}

let currentStep = 0;

function initBookingSteps() {
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(d => d.min = today);
}

function advStep(n) {
  // Validate current step
  if (n > currentStep && !validateStep(currentStep)) return;

  // If moving to review, populate it
  if (n === 3) buildReview();

  document.querySelectorAll('.booking-step').forEach((s, i) => s.classList.toggle('active', i === n));
  document.querySelectorAll('.step-dot').forEach((d, i) => {
    d.classList.toggle('active', i === n);
    d.classList.toggle('done', i < n);
  });
  currentStep = n;
}

function validateStep(step) {
  if (step === 0) {
    const name = document.getElementById('adv-name')?.value.trim();
    const phone = document.getElementById('adv-mobile')?.value.trim();
    if (!name) { showToast('Please enter your name', 'error'); return false; }
    if (!phone) { showToast('Please enter your mobile number', 'error'); return false; }
  }
  if (step === 1) {
    const pickup = document.getElementById('adv-pickup')?.value.trim();
    const drop   = document.getElementById('adv-drop')?.value.trim();
    if (!pickup || !drop) { showToast('Please enter pickup and drop locations', 'error'); return false; }
  }
  if (step === 2) {
    const date = document.getElementById('adv-date')?.value;
    if (!date) { showToast('Please select a travel date', 'error'); return false; }
  }
  return true;
}

function buildReview() {
  const data = {
    'Name':          document.getElementById('adv-name')?.value,
    'Mobile':        document.getElementById('adv-mobile')?.value,
    'Email':         document.getElementById('adv-email')?.value || '—',
    'Pickup':        document.getElementById('adv-pickup')?.value,
    'Drop':          document.getElementById('adv-drop')?.value,
    'Journey Type':  document.getElementById('adv-journey')?.value,
    'Travel Date':   document.getElementById('adv-date')?.value,
    'Pickup Time':   document.getElementById('adv-time')?.value,
    'Vehicle':       document.getElementById('adv-vehicle')?.value,
    'Notes':         document.getElementById('adv-notes')?.value || '—',
  };
  document.getElementById('booking-review').innerHTML = `
    <h4 style="margin-bottom:1rem;color:var(--gold);">Booking Summary</h4>
    ${Object.entries(data).map(([k,v]) => `
      <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--black-border);font-size:0.88rem;">
        <span style="color:var(--white-muted);">${k}</span>
        <span style="font-weight:500;">${v}</span>
      </div>
    `).join('')}
  `;
}

function getBookingData(type) {
  const map = {
    oneway:    { pickup: 'ow-pickup', drop: 'ow-drop', date: 'ow-date', time: 'ow-time', vehicle: 'ow-vehicle', phone: 'ow-phone' },
    roundtrip: { pickup: 'rt-pickup', drop: 'rt-drop', date: 'rt-date1', time: 'rt-time', vehicle: 'rt-vehicle', phone: 'rt-phone' },
    airport:   { pickup: 'ap-address', drop: 'ap-airport', date: 'ap-date', time: 'ap-time', vehicle: 'ap-vehicle', phone: 'ap-phone' },
    local:     { pickup: 'lc-city', drop: 'lc-city', date: 'lc-date', time: 'lc-time', vehicle: 'lc-vehicle', phone: 'lc-phone' },
  };
  const ids = map[type];
  if (!ids) return null;
  return {
    type,
    pickup:  document.getElementById(ids.pickup)?.value,
    drop:    document.getElementById(ids.drop)?.value,
    date:    document.getElementById(ids.date)?.value,
    time:    document.getElementById(ids.time)?.value,
    vehicle: document.getElementById(ids.vehicle)?.value,
    phone:   document.getElementById(ids.phone)?.value,
  };
}

function submitQuickBooking(type) {
  const d = getBookingData(type);
  if (!d.pickup || !d.drop) return showToast('Please fill in pickup and drop locations', 'error');
  if (!d.phone)             return showToast('Please enter your mobile number', 'error');
  if (!d.date)              return showToast('Please select a travel date', 'error');

  const booking = { ...d, name: 'Customer', id: Date.now() };
  saveBookingLocally(booking);
  sendWhatsApp(booking);
}

function submitAdvancedBooking() {
  const booking = {
    id:      Date.now(),
    type:    document.getElementById('adv-journey')?.value,
    name:    document.getElementById('adv-name')?.value,
    phone:   document.getElementById('adv-mobile')?.value,
    email:   document.getElementById('adv-email')?.value,
    pickup:  document.getElementById('adv-pickup')?.value,
    drop:    document.getElementById('adv-drop')?.value,
    date:    document.getElementById('adv-date')?.value,
    time:    document.getElementById('adv-time')?.value,
    vehicle: document.getElementById('adv-vehicle')?.value,
    notes:   document.getElementById('adv-notes')?.value,
    status:  'pending',
    createdAt: new Date().toISOString(),
  };
  saveBookingLocally(booking);
  sendWhatsApp(booking);
}

function saveBookingLocally(booking) {
  try {
    const all = JSON.parse(localStorage.getItem('ss_bookings') || '[]');
    all.unshift({ ...booking, status: booking.status || 'pending', createdAt: booking.createdAt || new Date().toISOString() });
    localStorage.setItem('ss_bookings', JSON.stringify(all));
  } catch(e) {}
}

function sendWhatsApp(b) {
  const wn = CONFIG.company.whatsapp.replace(/\D/g,'');
  const msg = `🚖 *New Booking — SS Taxi*\n\n` +
    `👤 *Name:* ${b.name || 'Customer'}\n` +
    `📞 *Mobile:* ${b.phone}\n` +
    `🗺 *Type:* ${b.type || 'Taxi'}\n` +
    `📍 *Pickup:* ${b.pickup}\n` +
    `🏁 *Drop:* ${b.drop}\n` +
    `📅 *Date:* ${b.date}\n` +
    `⏰ *Time:* ${b.time}\n` +
    `🚗 *Vehicle:* ${b.vehicle}\n` +
    (b.notes ? `📝 *Notes:* ${b.notes}\n` : '') +
    `\n_Booking ID: ${b.id}_`;

  window.open(`https://wa.me/${wn}?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('Booking sent! Redirecting to WhatsApp...', 'success');
}

function submitContactForm() {
  const name    = document.getElementById('cf-name')?.value.trim();
  const phone   = document.getElementById('cf-phone')?.value.trim();
  const subject = document.getElementById('cf-subject')?.value;
  const message = document.getElementById('cf-message')?.value.trim();
  if (!name || !phone || !message) return showToast('Please fill in all fields', 'error');

  const wn  = CONFIG.company.whatsapp.replace(/\D/g,'');
  const msg = `📩 *Contact Form — SS Taxi*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📋 *Subject:* ${subject}\n💬 *Message:* ${message}`;
  window.open(`https://wa.me/${wn}?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('Message sent via WhatsApp!', 'success');
}

// ── FAQ ────────────────────────────────────────────────────
function initFAQ() {}

function toggleFAQ(i) {
  const item = document.getElementById('faq-' + i);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Review ─────────────────────────────────────────────────
let selectedRating = 0;

function setRating(n) {
  selectedRating = n;
  document.querySelectorAll('#star-picker span').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
}

function submitReview() {
  const name = document.getElementById('rev-name')?.value.trim();
  const text = document.getElementById('rev-text')?.value.trim();
  if (!name || !text || !selectedRating) return showToast('Please fill in name, review, and select a rating', 'error');

  const wn  = CONFIG.company.whatsapp.replace(/\D/g,'');
  const msg = `⭐ *New Review — SS Taxi*\n\n👤 *Name:* ${name}\n🌟 *Rating:* ${'★'.repeat(selectedRating)}\n💬 *Review:* ${text}`;
  window.open(`https://wa.me/${wn}?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('Thank you for your review!', 'success');
  document.getElementById('rev-name').value = '';
  document.getElementById('rev-text').value = '';
  setRating(0);
}

// ── Toast ──────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'show ' + type;
  setTimeout(() => t.className = '', 3000);
}
function renderAbout() {
  const container = document.getElementById('page-about');
  if (!container) return;

  const company = CONFIG.company || {};
  const testimonials = CONFIG.testimonials || [];

  container.innerHTML = `
    <section class="about-hero section-padding">
      <div class="container">
        <h1 class="section-title">About ${company.name || 'Us'}</h1>
        <p class="section-subtitle">${company.tagline || ''}</p>
        <p class="about-description">${company.about || company.description || ''}</p>
      </div>
    </section>

    <section class="about-stats section-padding">
      <div class="container stats-grid">
        <div class="stat-card">
          <h3 class="stat-number">${company.yearsExperience || company.experience || '0'}+</h3>
          <p class="stat-label">Years of Experience</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-number">${(CONFIG.fleet || []).length}</h3>
          <p class="stat-label">Fleet Vehicles</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-number">${(CONFIG.routes || []).length}</h3>
          <p class="stat-label">Routes Covered</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-number">${testimonials.length}+</h3>
          <p class="stat-label">Happy Customers</p>
        </div>
      </div>
    </section>

    ${testimonials.length ? `
    <section class="testimonials-section section-padding">
      <div class="container">
        <h2 class="section-title">What Our Customers Say</h2>
        <div class="testimonials-grid">
          ${testimonials.map(t => `
            <div class="testimonial-card">
              <div class="testimonial-rating">${'★'.repeat(t.rating || 5)}</div>
              <p class="testimonial-text">"${t.text || t.message || ''}"</p>
              <h4 class="testimonial-name">${t.name || 'Customer'}</h4>
              <span class="testimonial-location">${t.location || ''}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    ${(CONFIG.faqs || []).length ? `
    <section class="faq-section section-padding">
      <div class="container">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <div class="faq-list">
          ${CONFIG.faqs.map((faq, i) => `
            <div class="faq-item">
              <button class="faq-question" onclick="toggleFAQ(${i})">
                ${faq.question || faq.q || ''}
                <span class="faq-icon" id="faq-icon-${i}">+</span>
              </button>
              <div class="faq-answer" id="faq-answer-${i}" style="display:none;">
                <p>${faq.answer || faq.a || ''}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}
  `;
}

function toggleFAQ(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!answer) return;
  const isOpen = answer.style.display === 'block';
  answer.style.display = isOpen ? 'none' : 'block';
  if (icon) icon.textContent = isOpen ? '+' : '−';
}

function renderServices() {
  const container = document.getElementById('page-services');
  if (!container) return;

  const company = CONFIG.company || {};
  const services = CONFIG.services || [];
  const fleet = CONFIG.fleet || [];

  container.innerHTML = `
    <section class="services-hero section-padding">
      <div class="container">
        <h1 class="section-title">Our Services</h1>
        <p class="section-subtitle">Reliable transport solutions tailored for you</p>
      </div>
    </section>

    <section class="services-grid-section section-padding">
      <div class="container">
        <div class="services-grid">
          ${services.map(service => `
            <div class="service-card">
              ${service.icon ? `<div class="service-icon"><i class="${service.icon}"></i></div>` : ''}
              <h3 class="service-title">${service.title || service.name || ''}</h3>
              <p class="service-description">${service.description || ''}</p>
              ${service.price ? `<p class="service-price">${service.price}</p>` : ''}
              ${service.features ? `
                <ul class="service-features">
                  ${service.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                </ul>
              ` : ''}
              <button class="btn btn-outline" onclick="openWhatsAppEnquiry('${(service.title || service.name || '').replace(/'/g, "\\'")}')">
                Enquire Now
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    ${fleet.length ? `
    <section class="fleet-section section-padding">
      <div class="container">
        <h2 class="section-title">Our Fleet</h2>
        <div class="fleet-grid">
          ${fleet.map(vehicle => `
            <div class="fleet-card">
              ${vehicle.image ? `<img src="${vehicle.image}" alt="${vehicle.name || 'Vehicle'}" class="fleet-image">` : ''}
              <h3 class="fleet-name">${vehicle.name || vehicle.model || ''}</h3>
              <p class="fleet-capacity">${vehicle.capacity ? `Seating: ${vehicle.capacity}` : ''}</p>
              <p class="fleet-description">${vehicle.description || ''}</p>
              ${vehicle.amenities ? `
                <div class="fleet-amenities">
                  ${vehicle.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    <section class="services-cta section-padding">
      <div class="container">
        <h2>Need a Custom Quote?</h2>
        <p>Contact us on WhatsApp for instant assistance</p>
        <button class="btn btn-primary" onclick="openWhatsAppEnquiry('General Enquiry')">
          <i class="fab fa-whatsapp"></i> Chat With Us
        </button>
      </div>
    </section>
  `;
}

function openWhatsAppEnquiry(serviceName) {
  const company = CONFIG.company || {};
  const phone = (company.whatsapp || company.phone || '').replace(/[^0-9]/g, '');
  const message = encodeURIComponent(`Hi, I'm interested in your ${serviceName} service. Please share more details.`);
  if (phone) {
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }
}

function renderRoutes() {
  const container = document.getElementById('page-routes');
  if (!container) return;

  const routes = CONFIG.routes || [];
  const company = CONFIG.company || {};

  container.innerHTML = `
    <section class="routes-hero section-padding">
      <div class="container">
        <h1 class="section-title">Our Routes</h1>
        <p class="section-subtitle">Connecting you to your destination, safely and on time</p>
      </div>
    </section>

    <section class="routes-filter-section section-padding">
      <div class="container">
        <div class="routes-search">
          <input type="text" id="routeSearchInput" placeholder="Search by city or route..." oninput="filterRoutes()">
        </div>
        <div class="routes-grid" id="routesGrid">
          ${routes.map((route, i) => `
            <div class="route-card" data-route-name="${(route.from || '') + ' ' + (route.to || '') + ' ' + (route.name || '')}">
              <div class="route-header">
                <span class="route-from">${route.from || ''}</span>
                <i class="fas fa-arrow-right route-arrow"></i>
                <span class="route-to">${route.to || ''}</span>
              </div>
              ${route.distance ? `<p class="route-distance"><i class="fas fa-road"></i> ${route.distance}</p>` : ''}
              ${route.duration ? `<p class="route-duration"><i class="fas fa-clock"></i> ${route.duration}</p>` : ''}
              ${route.price ? `<p class="route-price">${route.price}</p>` : ''}
              ${route.frequency ? `<p class="route-frequency">${route.frequency}</p>` : ''}
              <button class="btn btn-outline" onclick="openWhatsAppEnquiry('${(route.from || '')} to ${(route.to || '')} route'.replace(/'/g, '')">
                Book This Route
              </button>
            </div>
          `).join('')}
        </div>
        <p id="noRoutesMessage" style="display:none; text-align:center; margin-top:20px;">
          No routes found matching your search.
        </p>
      </div>
    </section>
  `;
}

function filterRoutes() {
  const input = document.getElementById('routeSearchInput');
  const query = (input.value || '').toLowerCase();
  const cards = document.querySelectorAll('#routesGrid .route-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const routeName = (card.getAttribute('data-route-name') || '').toLowerCase();
    if (routeName.includes(query)) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const noResults = document.getElementById('noRoutesMessage');
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

function renderContact() {
  const container = document.getElementById('page-contact');
  if (!container) return;

  const company = CONFIG.company || {};
  const phone = company.phone || '';
  const whatsapp = company.whatsapp || company.phone || '';
  const email = company.email || '';
  const address = company.address || '';

  container.innerHTML = `
    <section class="contact-hero section-padding">
      <div class="container">
        <h1 class="section-title">Contact Us</h1>
        <p class="section-subtitle">We're here to help with your travel needs</p>
      </div>
    </section>

    <section class="contact-section section-padding">
      <div class="container contact-grid">
        <div class="contact-info">
          <h2>Get In Touch</h2>
          ${phone ? `
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <a href="tel:${phone}">${phone}</a>
            </div>
          ` : ''}
          ${email ? `
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:${email}">${email}</a>
            </div>
          ` : ''}
          ${address ? `
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>${address}</span>
            </div>
          ` : ''}
          ${whatsapp ? `
            <button class="btn btn-primary whatsapp-btn" onclick="openWhatsAppEnquiry('General Enquiry')">
              <i class="fab fa-whatsapp"></i> Chat on WhatsApp
            </button>
          ` : ''}
          ${company.mapEmbedUrl ? `
            <div class="contact-map">
              <iframe src="${company.mapEmbedUrl}" width="100%" height="300" style="border:0;" loading="lazy"></iframe>
            </div>
          ` : ''}
        </div>

        <div class="contact-form-wrapper">
          <h2>Send Us a Message</h2>
          <div class="contact-form">
            <div class="form-group">
              <label for="contactName">Name</label>
              <input type="text" id="contactName" placeholder="Your Name">
            </div>
            <div class="form-group">
              <label for="contactPhone">Phone</label>
              <input type="tel" id="contactPhone" placeholder="Your Phone Number">
            </div>
            <div class="form-group">
              <label for="contactMessage">Message</label>
              <textarea id="contactMessage" rows="4" placeholder="How can we help you?"></textarea>
            </div>
            <button class="btn btn-primary" onclick="submitContactForm()">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function submitContactForm() {
  const name = document.getElementById('contactName').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const company = CONFIG.company || {};
  const whatsapp = (company.whatsapp || company.phone || '').replace(/[^0-9]/g, '');

  if (!name || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }

  const text = encodeURIComponent(
    `Hi, my name is ${name}.\nPhone: ${phone}\nMessage: ${message || 'I would like to know more about your services.'}`
  );

  if (whatsapp) {
    window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank');
  } else {
    alert('Thank you! We will get back to you shortly.');
  }
    }
