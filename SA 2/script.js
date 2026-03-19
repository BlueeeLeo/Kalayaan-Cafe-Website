/* ===========================
   KALAYAAN CAFE - script.js
   =========================== */

// --- NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', function () {
  const nav = document.getElementById('mainNav');
  if (nav) {
    if (window.scrollY > 50) {
      nav.style.padding = '8px 0';
    } else {
      nav.style.padding = '14px 0';
    }
  }
});

// --- IMAGE MAP TOOLTIP ---
function showMapInfo(title, desc) {
  const tooltip = document.getElementById('mapTooltip');
  const titleEl = document.getElementById('mapTitle');
  const descEl  = document.getElementById('mapDesc');
  if (!tooltip) return;
  titleEl.textContent = title;
  descEl.textContent  = desc;
  tooltip.style.display = 'block';
  setTimeout(() => { tooltip.style.display = 'none'; }, 4000);
}

// --- LIGHTBOX (Pop-up Images) ---
function openLightbox(src, caption) {
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!img) return;
  img.src = src;
  img.alt = caption || '';
  if (cap) cap.textContent = caption || '';
  const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
  modal.show();
}

// Also allow clicking any img with data-lightbox attribute
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () {
      openLightbox(el.src, el.alt);
    });
  });

  // --- ORDER FORM VALIDATION & SUBMIT ---
  const form = document.getElementById('orderForm');
  if (form) {
    // Show/hide delivery address
    const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
    const deliverySection  = document.getElementById('deliveryAddress');
    orderTypeRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        if (deliverySection) {
          deliverySection.style.display = this.value === 'delivery' ? 'block' : 'none';
        }
      });
    });

    // Form submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
      }
      // Show success
      form.style.display = 'none';
      const success = document.getElementById('orderSuccess');
      if (success) {
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- SET TODAY'S DATE AS MIN DATE IN ORDER FORM ---
  const orderDate = document.getElementById('orderDate');
  if (orderDate) {
    const today = new Date().toISOString().split('T')[0];
    orderDate.min = today;
    orderDate.value = today;
  }
});

// --- ADD ORDER ROW ---
function addOrderRow() {
  const container = document.getElementById('orderItems');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'order-item-row row g-2 mb-2';
  row.innerHTML = `
    <div class="col-md-6">
      <select class="form-select custom-input item-select">
        <option value="">-- Select Item --</option>
        <optgroup label="☕ Coffee">
          <option>Sagada Latte</option>
          <option>Kapeng Barako Americano</option>
          <option>Benguet Cold Brew</option>
          <option>Caramel Macchiato</option>
          <option>Flat White</option>
          <option>Kapeng Kalayaan</option>
        </optgroup>
        <optgroup label="🥤 Non-Coffee">
          <option>Ube Milk Tea</option>
          <option>Matcha Latte</option>
          <option>Dalandan Fizz</option>
          <option>Hot Chocolate</option>
        </optgroup>
        <optgroup label="🥐 Pastries">
          <option>Ube Croissant</option>
          <option>Barako Brownie</option>
          <option>Pandan Loaf Slice</option>
          <option>Quezo de Bola Roll</option>
        </optgroup>
        <optgroup label="🍽️ Light Meals">
          <option>Avocado Toast</option>
          <option>Longsilog Wrap</option>
          <option>Tuna Melt Panini</option>
          <option>Classic BLT</option>
        </optgroup>
      </select>
    </div>
    <div class="col-md-3">
      <select class="form-select custom-input size-select">
        <option>Regular</option>
        <option>Small</option>
        <option>Large</option>
      </select>
    </div>
    <div class="col-md-2">
      <input type="number" class="form-control custom-input qty-input" value="1" min="1" max="20"/>
    </div>
    <div class="col-md-1 d-flex align-items-center">
      <button type="button" class="btn btn-remove-item" onclick="removeOrderRow(this)">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  container.appendChild(row);
}

// --- REMOVE ORDER ROW ---
function removeOrderRow(btn) {
  const row = btn.closest('.order-item-row');
  if (row) {
    row.style.transition = 'opacity 0.3s, transform 0.3s';
    row.style.opacity = '0';
    row.style.transform = 'translateX(20px)';
    setTimeout(() => row.remove(), 300);
  }
}

// --- SMOOTH SCROLL for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 90; // navbar height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- SCROLL REVEAL (simple intersection observer) ---
const revealEls = document.querySelectorAll(
  '.menu-card, .value-card, .team-card, .pastry-card, .stat-item, .testimonial-card, .sidebar-card'
);
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealEls.forEach(function (el) {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
