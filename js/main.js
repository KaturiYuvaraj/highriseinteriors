/**
 * HIGH RISE INTERIORS - MAIN JAVASCRIPT CONTROLLER
 * Architecture: Vanilla ES6+, Modular Structure, CDN-backed Integrations
 * Features: Lenis Smooth Scroll, GSAP ScrollTrigger, Swiper, GLightbox,
 *           Interactive Cost Estimator, Rule-based Intelligent Chatbot,
 *           Universal WhatsApp Lead Router.
 */

// =============================================================================
// 1. GLOBAL CONFIGURATION & EASY CUSTOMIZATION
// =============================================================================
const CONFIG = {
  // Official Business WhatsApp Number (International format without '+' sign)
  WHATSAPP_NUMBER: "917569826055",

  // Client Notification Email (for silent background lead submissions)
  CLIENT_EMAIL: "info@highriseinteriors.com",

  // Business Profile Details
  COMPANY_NAME: "High Rise Interiors",
  EXPERIENCE_YEARS: "6+",
  CORE_TEAM_COUNT: 6,
  CRAFTSMEN_COUNT: "80+",
  PARTNER_BRANDS: ["Rajapushpa", "Aparna", "My Home", "EIPL", "GHM"],
  SCALE_RANGE: "2,500 to 10,000 sq. ft.",

  // Base Pricing Matrix (Per Square Foot in INR)
  PRICING: {
    standard: { min: 1000, max: 1400, label: "Medium / Standard", typical: 1000 },
    luxury: { min: 1200, max: 2000, label: "Luxury (Most Popular)", typical: 1350 },
    ultraLuxury: { min: 2000, max: 3500, label: "Ultra Luxury", typical: 2500 }
  },

  // Furniture Multipliers
  FURNITURE_MULTIPLIERS: {
    "Manual / Custom": 1.00,
    "Semi-modular": 1.05,
    "Modular": 1.12,
    "Imported": 1.25
  },

  // Property Type Adjustments
  PROPERTY_MULTIPLIERS: {
    "Villa": 1.05,
    "Apartment in Gated Community": 1.00
  }
};

// =============================================================================
// 2. REUSABLE WHATSAPP ROUTER
// =============================================================================
/**
 * Opens official WhatsApp chat with cleanly formatted, URL-encoded payload.
 * @param {Object} data - Information to compile into message
 */
function openWhatsApp(data = {}) {
  const greeting = "Hello High Rise Interiors, I would like to enquire about your interior design services.";
  
  let lines = [greeting];
  lines.push("──────────────────────");

  if (data.source) lines.push(`Source: ${data.source}`);
  if (data.name) lines.push(`Name: ${data.name}`);
  if (data.phone) lines.push(`Phone: ${data.phone}`);
  if (data.property) lines.push(`Property Type: ${data.property}`);
  if (data.area) lines.push(`Carpet Area: ${data.area} sq. ft.`);
  if (data.category) lines.push(`Design Tier: ${data.category}`);
  if (data.furniture) lines.push(`Furniture Type: ${data.furniture}`);
  if (data.budget) lines.push(`Estimated Budget: ${data.budget}`);
  if (data.plan) lines.push(`Selected Plan: ${data.plan}`);
  if (data.message) lines.push(`Notes: ${data.message}`);

  lines.push("──────────────────────");
  lines.push("Looking forward to your consultation and project proposal.");

  const formattedText = lines.join("\n");
  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedText)}`;

  // Open in new window/tab safely
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

/**
 * Format currency number to Indian comma standard (e.g. 2400000 -> 24,00,000)
 */
function formatIndianCurrency(amount) {
  const rounded = Math.round(amount);
  const str = rounded.toString();
  if (str.length <= 3) return "₹" + str;
  
  const lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  return "₹" + formatted;
}

/**
 * Convert INR amount into human readable Lakhs or Crores
 */
function formatLakhCrore(amount) {
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return cr.replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1") + " Crore";
  } else {
    const lk = (amount / 100000).toFixed(1);
    return lk.replace(/\.0$/, "") + " Lakh";
  }
}

// =============================================================================
// 3. APPLICATION INITIALIZATION (DOM CONTENT LOADED)
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Initialize AOS (Animate On Scroll) immediately so content is never hidden
  if (typeof AOS !== "undefined") {
    try {
      AOS.init({
        duration: prefersReducedMotion ? 0 : 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 30
      });
    } catch (e) {
      console.warn("AOS init notice:", e);
    }
  }

  // Safe executor to protect against any component error halting the rest
  const safeInit = (name, fn) => {
    try {
      if (typeof fn === "function") fn();
    } catch (err) {
      console.warn(`Error initializing ${name}:`, err);
    }
  };

  safeInit("initThemeToggle", initThemeToggle);
  safeInit("initPreloader", initPreloader);
  safeInit("initLenisSmoothScroll", () => initLenisSmoothScroll(prefersReducedMotion));
  safeInit("initScrollProgressBar", initScrollProgressBar);
  safeInit("initNavigation", initNavigation);
  safeInit("initHeroSwiper", initHeroSwiper);
  safeInit("initStatsCounters", initStatsCounters);
  safeInit("initCostEstimator", initCostEstimator);
  safeInit("initPortfolioGallery", initPortfolioGallery);
  safeInit("initTestimonialsSwiper", initTestimonialsSwiper);
  safeInit("initPhoneNumberInputs", initPhoneNumberInputs);
  safeInit("initContactForm", initContactForm);
  safeInit("initQuickQuoteModal", initQuickQuoteModal);
  safeInit("initChatbot", initChatbot);
  safeInit("initWhatsAppTriggers", initWhatsAppTriggers);
  safeInit("initLuxuryFilters", initLuxuryFilters);
  safeInit("initBestsellersFilter", initBestsellersFilter);
  safeInit("initProductCatalogue", initProductCatalogue);
  safeInit("initBackToTop", initBackToTop);
  safeInit("handleUrlHashScroll", handleUrlHashScroll);
  safeInit("initMegaMenuToggle", initMegaMenuToggle);
  safeInit("initCollectionsNavbarDropdown", initCollectionsNavbarDropdown);
  safeInit("initBalancedLuxurySwatches", initBalancedLuxurySwatches);
});

// =============================================================================
// 4. PRELOADER & SCROLL PROGRESS
// =============================================================================
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.classList.add("fade-out");
  setTimeout(() => {
    preloader.remove();
  }, 200);
}

function initScrollProgressBar() {
  const progressBar = document.getElementById("scrollProgressBar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

// =============================================================================
// 5. LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER SYNC
// =============================================================================
let lenisInstance = null;

function initLenisSmoothScroll(reducedMotion) {
  // On mobile screens (<= 768px), use native momentum scrolling for 120Hz responsiveness and seamless address bar behavior
  if (reducedMotion || typeof Lenis === "undefined" || window.innerWidth <= 768) return;

  try {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false
    });

    // Synchronize Lenis with GSAP ScrollTrigger if available
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      lenisInstance.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  } catch (err) {
    console.warn("Lenis initialization skipped:", err);
  }
}

// =============================================================================
// 6. NAVBAR INTERACTIONS & SCROLLSPY
// =============================================================================
function initNavigation() {
  const navbar = document.getElementById("mainNavbar");
  const header = document.getElementById("mainHeader") || navbar;
  if (!navbar) return;

  // Toggle scrolled state on scroll
  const handleScrollState = () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    if (scrollPos > 15) {
      if (header) header.classList.add("scrolled");
      navbar.classList.add("scrolled");
    } else {
      if (header) header.classList.remove("scrolled");
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScrollState, { passive: true });
  document.addEventListener("scroll", handleScrollState, { passive: true });
  if (typeof lenisInstance !== "undefined" && lenisInstance) {
    lenisInstance.on("scroll", handleScrollState);
  }
  handleScrollState(); // Run once on initialization

  // Robust anchor scrolling via Lenis with navbar height offset
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#" || href.length <= 1) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const path = href.substring(0, hashIndex);
      const targetId = href.substring(hashIndex);
      const currentPath = window.location.pathname.split("/").pop() || "index.html";

      // If it points to another file that is not the current page, let regular navigation happen
      if (path && path !== currentPath && !(path === "index.html" && (currentPath === "" || currentPath === "index.html"))) {
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerEl = document.querySelector(".header-nav-wrapper") || header;
        const navHeight = (headerEl ? headerEl.offsetHeight : 80) + 10;

        if (lenisInstance) {
          lenisInstance.scrollTo(targetEl, { offset: -navHeight });
        } else {
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: "smooth"
          });
        }

        history.pushState(null, null, targetId);

        // Close luxxu drawer or mobile offcanvas if open
        const luxxuDrawer = document.getElementById("luxxuMenuDrawer");
        if (luxxuDrawer && typeof bootstrap !== "undefined") {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(luxxuDrawer);
          if (bsOffcanvas) bsOffcanvas.hide();
        }

        // Trigger room card pulse animation if target is a room
        if (targetId.startsWith("#room-")) {
          const card = targetEl.querySelector(".luxxu-room-card") || targetEl;
          if (card) {
            setTimeout(() => {
              card.classList.add("room-highlight-pulse");
              setTimeout(() => card.classList.remove("room-highlight-pulse"), 2000);
            }, 600);
          }
        }
      }
    });
  });

  // Manage Side Drawer & Lenis Smooth Scroll Lifecycle
  const luxxuDrawer = document.getElementById("luxxuMenuDrawer");
  if (luxxuDrawer) {
    luxxuDrawer.addEventListener("show.bs.offcanvas", () => {
      if (lenisInstance) lenisInstance.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    });

    luxxuDrawer.addEventListener("hidden.bs.offcanvas", () => {
      if (lenisInstance) lenisInstance.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    });

    // Isolate wheel scrolling inside drawer from background window
    luxxuDrawer.addEventListener("wheel", (e) => {
      e.stopPropagation();
    }, { passive: true });
  }

  // Manage Modals & Lenis Smooth Scroll Lifecycle
  document.querySelectorAll(".modal").forEach((modalEl) => {
    modalEl.addEventListener("show.bs.modal", () => {
      if (lenisInstance) lenisInstance.stop();
    });
    modalEl.addEventListener("hidden.bs.modal", () => {
      if (lenisInstance) lenisInstance.start();
    });
    modalEl.addEventListener("wheel", (e) => {
      e.stopPropagation();
    }, { passive: true });
  });
}

// =============================================================================
// 7. HERO SWIPER SLIDER
// =============================================================================
function initHeroSwiper() {
  if (typeof Swiper === "undefined") return;

  new Swiper(".hero-swiper", {
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 1200,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false
    },
    loop: true,
    navigation: {
      nextEl: ".hero-swiper-btn-next",
      prevEl: ".hero-swiper-btn-prev"
    },
    keyboard: { enabled: true }
  });
}

// =============================================================================
// 8. STATS COUNTERS (COUNT-UP ON SCROLL)
// =============================================================================
function initStatsCounters() {
  const counters = document.querySelectorAll(".stat-counter");
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersectObserver && hasAnimated) return;

      if (entry.isIntersecting) {
        hasAnimated = true;
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
          animateCount(counter, target);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById("stats");
  if (statsSection) {
    observer.observe(statsSection);
  }

  function animateCount(el, target) {
    let start = 0;
    const duration = 1800; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start);
      }
    }, stepTime);
  }
}

// =============================================================================
// 9. INTERACTIVE COST ESTIMATOR
// =============================================================================
function initCostEstimator() {
  const areaSlider = document.getElementById("areaSlider");
  const areaInput = document.getElementById("areaInput");
  const propertyRadios = document.querySelectorAll('input[name="propertyType"]');
  const categoryRadios = document.querySelectorAll('input[name="designCategory"]');
  const furnitureRadios = document.querySelectorAll('input[name="furnitureType"]');

  const estimatedLakhRangeEl = document.getElementById("estimatedLakhRange");
  const estimatedExactRangeEl = document.getElementById("estimatedExactRange");
  const summaryPropertyEl = document.getElementById("summaryProperty");
  const summaryAreaEl = document.getElementById("summaryArea");
  const summaryCategoryEl = document.getElementById("summaryCategory");
  const summaryRateEl = document.getElementById("summaryRate");
  const summaryScopeEl = document.getElementById("summaryScope");
  const summaryTimelineEl = document.getElementById("summaryTimeline");
  const summaryFurnitureEl = document.getElementById("summaryFurniture");
  const selectedPropertyBadge = document.getElementById("selectedPropertyBadge");
  const sendEstimateWhatsAppBtn = document.getElementById("sendEstimateWhatsAppBtn");

  if (!areaSlider || !areaInput) return;

  // Category Configuration: Min/Max sq. ft. & specification details
  const CATEGORY_DATA = {
    "Standard": {
      minSqft: 1000,
      maxSqft: 2000,
      defaultSqft: 1000,
      scaleLabels: ["1,000 sq. ft.", "1,500 sq. ft.", "2,000 sq. ft."],
      minRate: 1700,
      maxRate: 2300,
      rateLabel: "₹1,700 – ₹2,300 / sq. ft.",
      scope: "IS:303 MR Ply • Matte Laminates",
      timeline: "45 Working Days"
    },
    "Luxury": {
      minSqft: 1200,
      maxSqft: 2000,
      defaultSqft: 1200,
      scaleLabels: ["1,200 sq. ft.", "1,600 sq. ft.", "2,000 sq. ft."],
      minRate: 1800,
      maxRate: 2600,
      rateLabel: "₹1,800 – ₹2,600 / sq. ft.",
      scope: "Marine BWR Ply • Acrylic/PU • Hafele/Hettich",
      timeline: "60 Working Days"
    },
    "Ultra Luxury": {
      minSqft: 2000,
      maxSqft: 5000,
      defaultSqft: 2000,
      scaleLabels: ["2,000 sq. ft.", "3,500 sq. ft.", "5,000 sq. ft."],
      minRate: 1800,
      maxRate: 3400,
      rateLabel: "₹1,800 – ₹3,400 / sq. ft.",
      scope: "PU Veneers & Marble • Blum Servo-Drive",
      timeline: "75–90 Working Days"
    }
  };

  function updateAreaBounds(category, forceDefault = false) {
    const catData = CATEGORY_DATA[category] || CATEGORY_DATA["Standard"];
    areaSlider.min = catData.minSqft;
    areaSlider.max = catData.maxSqft;
    areaInput.min = catData.minSqft;
    areaInput.max = catData.maxSqft;

    let currentVal = parseInt(areaInput.value, 10);
    if (forceDefault || isNaN(currentVal) || currentVal < catData.minSqft || currentVal > catData.maxSqft) {
      currentVal = catData.defaultSqft;
    }
    areaSlider.value = currentVal;
    areaInput.value = currentVal;

    const labelsContainer = document.getElementById("areaScaleLabels");
    if (labelsContainer && catData.scaleLabels) {
      labelsContainer.innerHTML = catData.scaleLabels.map((l) => `<span>${l}</span>`).join("");
    }
  }

  // Sync Slider and Input
  areaSlider.addEventListener("input", () => {
    areaInput.value = areaSlider.value;
    calculateEstimate();
  });

  areaInput.addEventListener("input", () => {
    const category = getSelectedValue("designCategory", "Standard");
    const catData = CATEGORY_DATA[category] || CATEGORY_DATA["Standard"];
    let val = parseInt(areaInput.value, 10);
    if (isNaN(val)) val = catData.minSqft;
    if (val < catData.minSqft) val = catData.minSqft;
    if (val > catData.maxSqft) val = catData.maxSqft;
    areaSlider.value = val;
    calculateEstimate();
  });

  // When clicking design categories (Standard, Luxury, Ultra Luxury), automatically update bounds & starting sqft
  categoryRadios.forEach((r) => {
    r.addEventListener("change", (e) => {
      const selected = e.target.value;
      updateAreaBounds(selected, true);
      calculateEstimate();
    });
  });

  // Watch property type changes
  propertyRadios.forEach((r) => {
    r.addEventListener("change", (e) => {
      if (selectedPropertyBadge) {
        selectedPropertyBadge.textContent = e.target.value === "Villa" ? "Villa" : "Apartment";
      }
      calculateEstimate();
    });
  });

  // Watch furniture making changes
  furnitureRadios.forEach((r) => r.addEventListener("change", calculateEstimate));

  function getSelectedValue(name, defaultVal) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : defaultVal;
  }

  function calculateEstimate() {
    const area = parseInt(areaSlider.value, 10) || 1000;
    const propertyType = getSelectedValue("propertyType", "Villa");
    const category = getSelectedValue("designCategory", "Standard");
    const furniture = getSelectedValue("furnitureType", "Modular");

    const catData = CATEGORY_DATA[category] || CATEGORY_DATA["Standard"];
    const minRate = catData.minRate;
    const maxRate = catData.maxRate;

    // Multipliers
    const furnMultiplier = CONFIG.FURNITURE_MULTIPLIERS[furniture] || 1.12;
    const propMultiplier = CONFIG.PROPERTY_MULTIPLIERS[propertyType] || 1.0;

    // Calculate Final Investment Range
    const totalMin = Math.round(area * minRate * furnMultiplier * propMultiplier);
    const totalMax = Math.round(area * maxRate * furnMultiplier * propMultiplier);

    // Format for Lakh/Crore
    const minLakhStr = formatLakhCrore(totalMin);
    const maxLakhStr = formatLakhCrore(totalMax);

    // Update Result Display
    if (estimatedLakhRangeEl) {
      estimatedLakhRangeEl.textContent = `₹${minLakhStr} – ₹${maxLakhStr}`;
    }
    if (estimatedExactRangeEl) {
      estimatedExactRangeEl.textContent = `(${formatIndianCurrency(totalMin)} – ${formatIndianCurrency(totalMax)})`;
    }

    // Update Summary Details
    if (summaryPropertyEl) {
      summaryPropertyEl.textContent = propertyType === "Villa" ? "Villa / Independent House" : "Gated Community Apartment";
    }
    if (summaryAreaEl) {
      summaryAreaEl.textContent = `${area.toLocaleString("en-IN")} sq. ft.`;
    }
    if (summaryCategoryEl) {
      summaryCategoryEl.textContent = `${category} Plan`;
    }
    if (summaryRateEl) {
      summaryRateEl.textContent = catData.rateLabel;
      summaryRateEl.className = "badge ";
      if (category === "Standard") {
        summaryRateEl.className += "badge-slate";
      } else if (category === "Ultra Luxury") {
        summaryRateEl.className += "badge-sage";
      } else {
        summaryRateEl.className += "badge-gold";
      }
    }
    if (summaryScopeEl) {
      summaryScopeEl.textContent = catData.scope;
    }
    if (summaryTimelineEl) {
      summaryTimelineEl.textContent = catData.timeline;
    }
    if (summaryFurnitureEl) {
      summaryFurnitureEl.textContent = furniture;
    }
  }

  // Initial Setup on Load
  updateAreaBounds(getSelectedValue("designCategory", "Standard"), false);
  calculateEstimate();

  // WhatsApp Button Click
  if (sendEstimateWhatsAppBtn) {
    sendEstimateWhatsAppBtn.addEventListener("click", () => {
      const area = areaSlider.value;
      const property = getSelectedValue("propertyType", "Villa");
      const category = getSelectedValue("designCategory", "Standard");
      const furniture = getSelectedValue("furnitureType", "Modular");
      const budgetText = estimatedLakhRangeEl ? estimatedLakhRangeEl.textContent : "";

      openWhatsApp({
        source: "Interactive Cost Estimator",
        property: property,
        area: area,
        category: category,
        furniture: furniture,
        budget: budgetText
      });
    });
  }
}

// =============================================================================
// 10. PORTFOLIO GALLERY (FILTERING + GLIGHTBOX)
// =============================================================================
function initPortfolioGallery() {
  // GLightbox setup
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      zoomable: true
    });
  }

  // Gallery Filter Tabs
  const filterBtns = document.querySelectorAll(".btn-filter");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle active filter button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const itemCategories = item.getAttribute("data-category") || "";

        if (filterVal === "all" || itemCategories.includes(filterVal)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 20);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => {
            item.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

// =============================================================================
// 10B. LUXXU-STYLE FILTER CONTROLLER (ESTATES & COLLECTIONS)
// =============================================================================
function initLuxuryFilters() {
  const filterBtns = document.querySelectorAll(".luxury-filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const btnGroup = btn.closest(".d-flex") || btn.parentElement;
      const siblingBtns = btnGroup ? btnGroup.querySelectorAll(".luxury-filter-btn") : [];
      siblingBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");
      const section = btn.closest("section");
      let targetItems = section ? section.querySelectorAll("[data-category]:not(.product-item-col)") : [];
      if (!targetItems || targetItems.length === 0) {
        targetItems = document.querySelectorAll(".luxury-house-card[data-category], [data-category]:not(.product-item-col)");
      }
      if (!targetItems.length) return;

      targetItems.forEach((item) => {
        const itemCategories = item.getAttribute("data-category") || "";
        if (filterVal === "all" || itemCategories.includes(filterVal)) {
          item.style.display = "";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 20);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.96)";
          setTimeout(() => {
            item.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

// =============================================================================
// 11. TESTIMONIALS SWIPER CAROUSEL
// =============================================================================
function initTestimonialsSwiper() {
  if (typeof Swiper === "undefined") return;

  new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".testimonials-pagination",
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });
}


// =============================================================================
// SILENT BACKGROUND EMAIL DISPATCH (FORMSUBMIT AJAX API)
// =============================================================================
/**
 * Silently sends lead information to client email in the background without interrupting WhatsApp redirect.
 * @param {Object} data - Lead form data
 */
function silentSendEmail(data = {}) {
  const targetEmail = CONFIG.CLIENT_EMAIL || "info@highriseinteriors.com";
  const endpoint = `https://formsubmit.co/ajax/${targetEmail}`;

  const submissionDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short"
  });

  const payload = {
    _subject: data.subject || `New High Rise Interiors Enquiry: ${data.name || "Client"} (${data.phone || ""})`,
    _template: "table",
    _captcha: "false",
    "Client Name": data.name || "N/A",
    "Mobile Number": data.phone || "N/A",
    "Email Address": data.email || "Not Provided",
    "Property Type": data.property || "N/A",
    "Carpet Area": data.area ? `${data.area} sq. ft.` : "N/A",
    "Design Tier / Plan": data.category || data.plan || "N/A",
    "Furniture Craft": data.furniture || "N/A",
    "Special Requirements / Notes": data.message || "None",
    "Lead Source": data.source || "Website Form",
    "Date & Time (IST)": submissionDate
  };

  // 1. Local Storage Logging Archive (Safe fallback)
  try {
    const archive = JSON.parse(localStorage.getItem("hri_lead_submissions") || "[]");
    archive.unshift({ ...payload, loggedAt: new Date().toISOString() });
    localStorage.setItem("hri_lead_submissions", JSON.stringify(archive.slice(0, 50)));
  } catch (e) {
    // Non-blocking
  }

  // 2. Asynchronous Silent POST Request
  try {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
      keepalive: true
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log("[HRI Lead Engine] Lead notification email dispatched silently to client:", resData);
      })
      .catch((err) => {
        // Silent failure - ensures user is never blocked or alerted
        console.warn("[HRI Lead Engine] Background dispatch queued locally:", err.message);
      });
  } catch (err) {
    console.warn("[HRI Lead Engine] Background dispatch notice:", err.message);
  }
}

// =============================================================================
// MOBILE NUMBER VALIDATION (+91 STRICT 10-DIGIT NUMERIC ONLY)
// =============================================================================
function initPhoneNumberInputs() {
  const phoneInputs = document.querySelectorAll(".phone-number-input, #contactPhone, #modalPhone");
  if (!phoneInputs.length) return;

  phoneInputs.forEach((input) => {
    // 1. Prevent typing any alpha, space, or special characters
    input.addEventListener("keydown", (e) => {
      // Allowed control and navigation keys
      const allowedKeys = [
        "Backspace", "Delete", "ArrowLeft", "ArrowRight", 
        "ArrowUp", "ArrowDown", "Tab", "Home", "End", "Escape", "Enter"
      ];
      
      // Allow Ctrl / Cmd combinations (Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z)
      if (e.ctrlKey || e.metaKey) return;

      // Allow navigation/editing keys
      if (allowedKeys.includes(e.key)) return;

      // If key is not a digit (0-9), block it immediately!
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        return;
      }

      // If already 10 digits and user is not replacing selected text, block extra digits
      const selectedLength = input.selectionEnd - input.selectionStart;
      if (input.value.length >= 10 && selectedLength === 0) {
        e.preventDefault();
      }
    });

    // 2. Intercept paste to sanitize clipboard data (strip non-digits, strip +91/0 prefix, limit to 10)
    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData("text") || "";
      let digits = pasteData.replace(/\D/g, "");

      // If user copied full number with +91 or 0 prefix
      if (digits.length > 10 && digits.startsWith("91")) {
        digits = digits.substring(2);
      } else if (digits.length > 10 && digits.startsWith("0")) {
        digits = digits.substring(1);
      }

      // Take max 10 digits
      digits = digits.slice(0, 10);

      // Insert at current cursor position
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const currentVal = input.value;
      const nextVal = (currentVal.substring(0, start) + digits + currentVal.substring(end)).replace(/\D/g, "").slice(0, 10);

      input.value = nextVal;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });

    // 3. Handle live input events (handles mobile dictation, autocomplete, etc.)
    input.addEventListener("input", () => {
      let val = input.value.replace(/\D/g, "");

      if (val.length > 10 && val.startsWith("91")) {
        val = val.substring(2);
      } else if (val.length > 10 && val.startsWith("0")) {
        val = val.substring(1);
      }

      if (val.length > 10) {
        val = val.slice(0, 10);
      }

      if (input.value !== val) {
        input.value = val;
      }

      // Live validation state
      if (val.length === 10) {
        input.setCustomValidity("");
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        if (val.length > 0) {
          input.setCustomValidity("Please enter a valid 10-digit mobile number.");
        } else {
          input.setCustomValidity("Please fill out this field.");
        }
      }
    });

    // 4. Blur event - validate length if user touched the input
    input.addEventListener("blur", () => {
      const val = input.value.replace(/\D/g, "");
      if (val.length > 0 && val.length < 10) {
        input.classList.add("is-invalid");
      }
    });
  });
}


// =============================================================================
// 12. CONTACT FORM VALIDATION & WHATSAPP REDIRECTION + SILENT EMAIL
// =============================================================================
function initContactForm() {
  const form = document.getElementById("contactEnquiryForm");
  if (!form) return;

  const areaInputEl = document.getElementById("contactArea");
  if (areaInputEl) {
    areaInputEl.addEventListener("input", () => {
      const num = parseInt(areaInputEl.value, 10);
      if (!isNaN(num) && num >= 1000) {
        areaInputEl.setCustomValidity("");
        areaInputEl.classList.remove("is-invalid");
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const phoneInput = document.getElementById("contactPhone");
    const phoneVal = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";

    // Strictly validate 10 numeric digits
    if (phoneVal.length !== 10) {
      if (phoneInput) {
        phoneInput.classList.add("is-invalid");
        phoneInput.focus();
      }
      form.classList.add("was-validated");
      return;
    }

    // Strictly validate minimum 1000 sq ft area
    const areaInput = document.getElementById("contactArea");
    const numArea = parseInt(areaInput ? areaInput.value : "0", 10);
    if (isNaN(numArea) || numArea < 1000) {
      if (areaInput) {
        areaInput.setCustomValidity("Minimum area must be 1,000 sq. ft.");
        areaInput.classList.add("is-invalid");
        const feedback = areaInput.nextElementSibling;
        if (feedback && feedback.classList.contains("invalid-feedback")) {
          feedback.textContent = "Minimum area is 1,000 sq. ft.";
        }
        areaInput.focus();
      }
      form.classList.add("was-validated");
      return;
    } else if (areaInput) {
      areaInput.setCustomValidity("");
      areaInput.classList.remove("is-invalid");
    }

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    const name = document.getElementById("contactName").value.trim();
    const phone = `+91 ${phoneVal}`;
    const email = document.getElementById("contactEmail").value.trim();
    const property = document.getElementById("contactPropertyType").value;
    const area = document.getElementById("contactArea").value.trim();
    const category = document.getElementById("contactCategory").value;
    const furniture = document.getElementById("contactFurniture").value;
    const message = document.getElementById("contactMessage").value.trim();

    // 1. Silent Background Email Dispatch to Client
    silentSendEmail({
      subject: `New Interior Consultation Lead: ${name} (${phone})`,
      name: name,
      phone: phone,
      email: email,
      property: property,
      area: area,
      category: category,
      furniture: furniture,
      message: message,
      source: "Contact Page Form"
    });

    // 2. Open WhatsApp as usual
    openWhatsApp({
      source: "Contact Page Form",
      name: name,
      phone: phone,
      property: property,
      area: area,
      category: category,
      furniture: furniture,
      message: message + (email ? ` (Email: ${email})` : "")
    });

    form.reset();
    form.classList.remove("was-validated");
    if (phoneInput) {
      phoneInput.classList.remove("is-valid", "is-invalid");
    }
  });
}

// =============================================================================
// 13. QUICK QUOTE MODAL (BOOTSTRAP 5) + SILENT EMAIL
// =============================================================================
function initQuickQuoteModal() {
  const form = document.getElementById("quickModalForm");
  const modalEl = document.getElementById("quoteModal");
  if (!form || !modalEl) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const phoneInput = document.getElementById("modalPhone");
    const phoneVal = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";

    // Strictly validate 10 numeric digits if phone input present
    if (phoneInput && phoneVal.length !== 10) {
      phoneInput.classList.add("is-invalid");
      phoneInput.focus();
      form.classList.add("was-validated");
      return;
    }

    // Strictly validate minimum 1000 sq ft area if modalArea input exists
    const areaInput = document.getElementById("modalArea");
    if (areaInput) {
      const numArea = parseInt(areaInput.value, 10);
      if (isNaN(numArea) || numArea < 1000) {
        areaInput.setCustomValidity("Minimum area must be 1,000 sq. ft.");
        areaInput.classList.add("is-invalid");
        areaInput.focus();
        form.classList.add("was-validated");
        return;
      } else {
        areaInput.setCustomValidity("");
        areaInput.classList.remove("is-invalid");
      }
    }

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    const name = document.getElementById("modalName").value.trim();
    const phone = phoneVal ? `+91 ${phoneVal}` : "";
    const property = document.getElementById("modalProperty").value;
    const area = document.getElementById("modalArea").value.trim();
    const plan = document.getElementById("modalPlan").value;

    // 1. Silent Background Email Dispatch to Client
    silentSendEmail({
      subject: `Quick Quote Modal Lead: ${name} (${phone})`,
      name: name,
      phone: phone,
      property: property,
      area: area,
      plan: plan,
      source: "Quick Quote Modal"
    });

    // 2. Open WhatsApp as usual
    openWhatsApp({
      source: "Quick Quote Modal",
      name: name,
      phone: phone,
      property: property,
      area: area,
      plan: plan
    });

    form.reset();
    form.classList.remove("was-validated");
    if (phoneInput) {
      phoneInput.classList.remove("is-valid", "is-invalid");
    }

    if (typeof bootstrap !== "undefined") {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
    }
  });
}

// =============================================================================
// 14. UNIVERSAL WHATSAPP BUTTON TRIGGERS
// =============================================================================
function initWhatsAppTriggers() {
  // Plan Buttons on Pricing Cards
  document.querySelectorAll(".whatsapp-plan-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const planName = this.getAttribute("data-plan") || "Custom Plan";
      openWhatsApp({
        source: "Pricing Card Table",
        plan: planName
      });
    });
  });

  // Generic WhatsApp Trigger Buttons
  document.querySelectorAll(".whatsapp-trigger-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const source = this.getAttribute("data-source") || "Website CTA";
      const category = this.getAttribute("data-category") || "";
      openWhatsApp({
        source: source,
        category: category
      });
    });
  });
}

// =============================================================================
// 15. BACK TO TOP BUTTON
// =============================================================================
function initBackToTop() {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

// =============================================================================
// 16. HIGH RISE ASSISTANT - RULE-BASED INTELLIGENT CHATBOT
// =============================================================================
function initChatbot() {
  const toggleBtn = document.getElementById("chatWidgetToggle");
  const chatWindow = document.getElementById("chatWidgetWindow");
  const closeBtn = document.getElementById("chatCloseBtn");
  const minimizeBtn = document.getElementById("chatMinimizeBtn");
  const form = document.getElementById("chatWidgetForm");
  const input = document.getElementById("chatUserInput");
  const messagesContainer = document.getElementById("chatWidgetMessages");
  const typingIndicator = document.getElementById("chatTypingIndicator");
  const quickChips = document.querySelectorAll(".btn-chat-chip");

  if (!toggleBtn || !chatWindow || !messagesContainer) return;

  // Chatbot State in sessionStorage
  const STORAGE_KEY = "hri_chat_state_v1";
  let chatState = {
    isOpen: false,
    history: [],
    quoteFlow: {
      active: false,
      step: 0,
      data: {}
    }
  };

  // Restore saved state if exists
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      chatState = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("SessionStorage not available");
  }

  // Toggle Window Visibility
  function setChatOpen(open) {
    chatState.isOpen = open;
    if (open) {
      chatWindow.classList.remove("d-none");
      toggleBtn.querySelector(".chat-icon-open")?.classList.add("d-none");
      toggleBtn.querySelector(".chat-icon-close")?.classList.remove("d-none");
      input?.focus();
      scrollChatToBottom();
    } else {
      chatWindow.classList.add("d-none");
      toggleBtn.querySelector(".chat-icon-open")?.classList.remove("d-none");
      toggleBtn.querySelector(".chat-icon-close")?.classList.add("d-none");
    }
    saveChatState();
  }

  toggleBtn.addEventListener("click", () => {
    setChatOpen(chatWindow.classList.contains("d-none"));
  });

  closeBtn?.addEventListener("click", () => setChatOpen(false));
  minimizeBtn?.addEventListener("click", () => setChatOpen(false));

  function saveChatState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(chatState));
    } catch (e) {}
  }

  function scrollChatToBottom() {
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 50);
  }

  // Render a message bubble
  function appendMessage(sender, text, htmlContent = "") {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`;

    if (htmlContent) {
      bubble.innerHTML = htmlContent;
    } else {
      bubble.textContent = text;
    }

    messagesContainer.appendChild(bubble);
    scrollChatToBottom();

    chatState.history.push({ sender, text, htmlContent });
    saveChatState();
  }

  // Simulate typing delay
  function showTyping(callback, delay = 600) {
    if (typingIndicator) typingIndicator.classList.remove("d-none");
    scrollChatToBottom();

    setTimeout(() => {
      if (typingIndicator) typingIndicator.classList.add("d-none");
      callback();
    }, delay);
  }

  // Render initial welcome if empty
  if (!chatState.history.length) {
    appendMessage(
      "bot",
      "",
      `<strong>Welcome to High Rise Interiors!</strong> ✨<br>
       I'm your design assistant. How can I help you elevate your home today? Feel free to pick a topic below or type your question.`
    );
  } else {
    // Replay saved history
    messagesContainer.innerHTML = "";
    chatState.history.forEach((msg) => {
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`;
      if (msg.htmlContent) bubble.innerHTML = msg.htmlContent;
      else bubble.textContent = msg.text;
      messagesContainer.appendChild(bubble);
    });
  }

  // Handle Form Submission
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    input.value = "";
    appendMessage("user", query);

    // Process Response
    showTyping(() => {
      handleUserQuery(query);
    });
  });

  // Handle Quick Chips
  quickChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const query = chip.getAttribute("data-query");
      appendMessage("user", query);
      showTyping(() => {
        handleUserQuery(query);
      });
    });
  });

  // ===========================================================================
  // CHATBOT DECISION ENGINE & GUIDED QUOTE FLOW
  // ===========================================================================
  function handleUserQuery(query) {
    const lower = query.toLowerCase().trim();

    // Check if user is currently inside the interactive Quote Flow
    if (chatState.quoteFlow.active) {
      processQuoteFlowStep(query);
      return;
    }

    // Trigger Quote Flow if requested
    if (lower.includes("get a quote") || lower.includes("quote") || lower.includes("estimate my")) {
      startQuoteFlow();
      return;
    }

    // Generate response using business rules
    const botReply = getBotReply(query);
    appendMessage("bot", "", botReply);
  }

  /**
   * PLUGGABLE BOT LOGIC:
   * Rule-based keyword matching grounded in High Rise Interiors company data.
   * Can be swapped with an API call to Gemini/Claude/OpenAI later.
   */
  function getBotReply(userText) {
    const text = userText.toLowerCase();

    // 1. Pricing & Costs
    if (text.includes("pricing") || text.includes("cost") || text.includes("rate") || text.includes("budget") || text.includes("package")) {
      return `Our transparent interior pricing packages per square foot:<br><br>
        • <strong>Medium / Standard:</strong> ₹1,000 – ₹2,000 / sq. ft. (e.g. ₹20 Lakh for 2,000 sq. ft.)<br>
        • <strong>Luxury (Most Popular):</strong> ₹1,200 – ₹2,000 / sq. ft. (typical ₹1,200–₹1,500)<br>
        • <strong>Ultra Luxury:</strong> ₹2,000 – ₹5,000 / sq. ft. (typical ₹2,000–₹3,500)<br><br>
        Would you like an instant estimate? Click <strong>Get a Quote</strong> or chat directly on WhatsApp.`;
    }

    // 2. Villa Interiors
    if (text.includes("villa") || text.includes("independent house") || text.includes("duplex")) {
      return `We specialize in luxury independent villas ranging from <strong>3,500 to 10,000+ sq. ft.</strong> across Hyderabad.<br><br>
        Our villa packages feature double-height living feature walls, imported Italian marble styling, modular island kitchens, walk-in closets with LED sensors, and turnkey civil supervision.`;
    }

    // 3. Gated Community Apartments
    if (text.includes("apartment") || text.includes("gated community") || text.includes("flat") || text.includes("society") || text.includes("penthouse")) {
      return `We are an established contractor across premier gated communities including <strong>Rajapushpa, Aparna, My Home, EIPL, and GHM</strong>.<br><br>
        We provide turnkey 45-day apartment solutions with space-saving ergonomics, zero-nuisance society protocol adherence, and modular precision.`;
    }

    // 4. Materials & Furniture Making Options
    if (text.includes("material") || text.includes("furniture") || text.includes("modular") || text.includes("carpenter") || text.includes("plywood")) {
      return `We offer 4 distinct furniture fabrication methods:<br><br>
        1. <strong>Manual / Custom:</strong> Handcrafted on-site by skilled carpenters for unique alcoves and teak accents.<br>
        2. <strong>Semi-Modular:</strong> Hybrid build pairing factory carcass boxes with on-site custom carpenter trims.<br>
        3. <strong>Modular:</strong> 100% factory precision with machine edge-banding and rapid assembly.<br>
        4. <strong>Imported European:</strong> Luxury Italian/German hardware (Blum, Hafele, Salice) and exclusive lacquered glass.`;
    }

    // 5. Experience, Team & Track Record
    if (text.includes("experience") || text.includes("team") || text.includes("about") || text.includes("who are you") || text.includes("craftsmen")) {
      return `<strong>High Rise Interiors Experience:</strong><br><br>
        • <strong>6+ Years</strong> of excellence in interior architecture.<br>
        • <strong>6 Core Team Members:</strong> Senior architects, interior designers & project engineers.<br>
        • <strong>80+ Contract Craftsmen:</strong> Master carpenters, electricians, polishers & installers.<br>
        • <strong>5 Premier Partner Brands:</strong> Trusted for projects from 2,500 to 10,000 sq. ft.`;
    }

    // 6. Partner Brands
    if (text.includes("partner") || text.includes("brands") || text.includes("rajapushpa") || text.includes("aparna") || text.includes("rajputana") || text.includes("my home") || text.includes("eipl")) {
      return `Our signature work spans premier developer communities such as <strong>Rajapushpa, Aparna, My Home, EIPL, and GHM</strong> across projects from 2,500 to 10,000 sq. ft.`;
    }

    // 7. Timeline & Execution
    if (text.includes("timeline") || text.includes("how long") || text.includes("duration") || text.includes("days")) {
      return `Our turnkey execution timelines:<br><br>
        • Apartments (2,000–3,500 sq. ft.): <strong>45 to 60 working days</strong>.<br>
        • Independent Villas (4,000–10,000 sq. ft.): <strong>75 to 90 working days</strong>.<br>
        Every site is supervised by our core engineering team to ensure zero delays.`;
    }

    // 8. Warranty
    if (text.includes("warranty") || text.includes("guarantee")) {
      return `We provide up to a <strong>10-year warranty</strong> on modular hardware (Hafele, Blum) and BWP marine-grade plywood against borers and moisture, plus 1-year complimentary maintenance support.`;
    }

    // 9. Contact / WhatsApp
    if (text.includes("contact") || text.includes("phone") || text.includes("call") || text.includes("number") || text.includes("location") || text.includes("address")) {
      return `You can reach our design studio directly:<br><br>
        📞 <strong>WhatsApp / Phone:</strong> +91 7569826055<br>
        📍 <strong>Location:</strong> Hyderabad, Telangana<br>
        ⏰ <strong>Hours:</strong> Mon – Sat: 9:30 AM – 7:30 PM<br><br>
        <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-gold mt-1">
          <i class="bi bi-whatsapp me-1"></i> Open WhatsApp Chat
        </a>`;
    }

    // Default Fallback
    return `Thank you for your question! We'd love to assist you with tailored details for your property.<br><br>
      You can type <strong>"Get a Quote"</strong> for an instant estimate, or chat with our design team directly on WhatsApp:<br><br>
      <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello High Rise Interiors, I was chatting with your assistant: ' + userText)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-gold mt-1">
        <i class="bi bi-whatsapp me-1"></i> Continue on WhatsApp
      </a>`;
  }

  // ===========================================================================
  // GUIDED INTERACTIVE QUOTE FLOW ENGINE
  // ===========================================================================
  function startQuoteFlow() {
    chatState.quoteFlow = {
      active: true,
      step: 1,
      data: {}
    };
    saveChatState();

    appendMessage(
      "bot",
      "",
      `Let's build your instant interior quote! 📐<br><br>
       <strong>Step 1 of 5:</strong> What is your name?`
    );
  }

  function processQuoteFlowStep(answer) {
    const flow = chatState.quoteFlow;

    switch (flow.step) {
      case 1:
        flow.data.name = answer;
        flow.step = 2;
        saveChatState();
        appendMessage(
          "bot",
          "",
          `Nice to meet you, <strong>${answer}</strong>!<br><br>
           <strong>Step 2 of 5:</strong> What is your property type?<br>
           <em>(Type: Villa or Apartment)</em>`
        );
        break;

      case 2:
        const propAnswer = answer.toLowerCase().includes("villa") ? "Villa" : "Apartment in Gated Community";
        flow.data.property = propAnswer;
        flow.step = 3;
        saveChatState();
        appendMessage(
          "bot",
          "",
          `Got it! <strong>${propAnswer}</strong>.<br><br>
           <strong>Step 3 of 5:</strong> What is the approximate area in sq. ft.?<br>
           <em>(e.g., 2000, 3200, 5000)</em>`
        );
        break;

      case 3:
        let numArea = parseInt(answer.replace(/\D/g, ""), 10);
        if (isNaN(numArea) || numArea <= 0) numArea = 2500;
        flow.data.area = numArea;
        flow.step = 4;
        saveChatState();
        appendMessage(
          "bot",
          "",
          `Noted: <strong>${numArea.toLocaleString("en-IN")} sq. ft.</strong><br><br>
           <strong>Step 4 of 5:</strong> Which design tier interests you?<br>
           <em>1. Standard (₹1,000–₹1,400/sqft)<br>
           2. Luxury (₹1,200–₹2,000/sqft) [Most Popular]<br>
           3. Ultra Luxury (₹2,000–₹3,500/sqft)</em>`
        );
        break;

      case 4:
        let category = "Luxury";
        const catLower = answer.toLowerCase();
        if (catLower.includes("ultra")) category = "Ultra Luxury";
        else if (catLower.includes("standard") || catLower === "1") category = "Standard";
        else category = "Luxury";

        flow.data.category = category;
        flow.step = 5;
        saveChatState();
        appendMessage(
          "bot",
          "",
          `Selected: <strong>${category} Tier</strong>.<br><br>
           <strong>Step 5 of 5:</strong> What furniture craft do you prefer?<br>
           <em>(Manual / Semi-modular / Modular / Imported)</em>`
        );
        break;

      case 5:
        let furniture = "Modular";
        const furnLower = answer.toLowerCase();
        if (furnLower.includes("manual") || furnLower.includes("custom")) furniture = "Manual / Custom";
        else if (furnLower.includes("semi")) furniture = "Semi-modular";
        else if (furnLower.includes("import")) furniture = "Imported";
        else furniture = "Modular";

        flow.data.furniture = furniture;

        // Perform Calculation
        const area = flow.data.area;
        let minRate = 1200, maxRate = 2000;
        if (flow.data.category === "Standard") { minRate = 1000; maxRate = 1400; }
        else if (flow.data.category === "Ultra Luxury") { minRate = 2000; maxRate = 3500; }

        const furnMultiplier = CONFIG.FURNITURE_MULTIPLIERS[furniture] || 1.12;
        const propMultiplier = CONFIG.PROPERTY_MULTIPLIERS[flow.data.property] || 1.0;

        const totalMin = Math.round(area * minRate * furnMultiplier * propMultiplier);
        const totalMax = Math.round(area * maxRate * furnMultiplier * propMultiplier);

        const budgetRangeStr = `₹${formatLakhCrore(totalMin)} – ₹${formatLakhCrore(totalMax)}`;
        flow.data.budget = budgetRangeStr;

        // End flow
        flow.active = false;
        flow.step = 0;
        saveChatState();

        const summaryHtml = `
          <div class="chat-quick-quote-card">
            <h5 class="h6 font-serif fw-bold text-charcoal mb-2">🎉 Estimated Quote Summary</h5>
            <p class="small mb-1"><strong>Client:</strong> ${flow.data.name}</p>
            <p class="small mb-1"><strong>Property:</strong> ${flow.data.property}</p>
            <p class="small mb-1"><strong>Area:</strong> ${area.toLocaleString("en-IN")} sq. ft.</p>
            <p class="small mb-1"><strong>Tier:</strong> ${flow.data.category}</p>
            <p class="small mb-2"><strong>Furniture:</strong> ${furniture}</p>
            <div class="p-2 bg-white rounded border border-gold-light mb-2 text-center">
              <span class="small text-muted d-block">Indicative Budget:</span>
              <strong class="text-gold-dark font-serif fs-5">${budgetRangeStr}</strong>
            </div>
            <button type="button" class="btn btn-gold btn-sm w-100 py-2 shadow-sm" id="chatSendQuoteWhatsAppBtn">
              <i class="bi bi-whatsapp me-1"></i> Send on WhatsApp
            </button>
          </div>
        `;

        appendMessage("bot", "", summaryHtml);

        // Bind WhatsApp click handler on the dynamically created button
        setTimeout(() => {
          const btn = document.getElementById("chatSendQuoteWhatsAppBtn");
          if (btn) {
            btn.addEventListener("click", () => {
              openWhatsApp({
                source: "High Rise Assistant Chatbot",
                name: flow.data.name,
                property: flow.data.property,
                area: flow.data.area,
                category: flow.data.category,
                furniture: flow.data.furniture,
                budget: flow.data.budget
              });
            });
          }
        }, 100);
        break;

      default:
        flow.active = false;
        saveChatState();
        appendMessage("bot", "", "How else may I help you today?");
        break;
    }
  }
}

// =============================================================================
// 19. LUXXU BEST SELLERS FILTER & ACTIONS
// =============================================================================
function initBestsellersFilter() {
  const sidebarLinks = document.querySelectorAll(".luxxu-sidebar-link");
  const items = document.querySelectorAll(".bestseller-item");
  if (!sidebarLinks.length || !items.length) return;

  sidebarLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const filter = link.getAttribute("data-filter") || "all";

      sidebarLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      items.forEach(item => {
        const cat = item.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          item.style.display = "";
          item.style.opacity = "1";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Pre-fill modal on GET INFO +
  const infoButtons = document.querySelectorAll(".luxxu-btn-info");
  infoButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.getAttribute("data-product") || "Curated Piece";
      const nameInput = document.getElementById("modalName");
      if (nameInput) {
        nameInput.placeholder = `Enquiring for: ${product}`;
      }
    });
  });
}

// =============================================================================
// 19. LUXURY THEME TOGGLE (DARK / LIGHT MODE)
// =============================================================================
function initThemeToggle() {
  const getPreferredTheme = () => {
    const saved = localStorage.getItem("hri_theme");
    if (saved) return saved;
    return "light";
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hri_theme", theme);

    // Update moon/sun icons on all toggles
    const moonIcons = document.querySelectorAll(".theme-icon-moon");
    const sunIcons = document.querySelectorAll(".theme-icon-sun");
    const switches = document.querySelectorAll(".theme-switch-input");

    if (theme === "dark") {
      moonIcons.forEach(el => el.classList.add("d-none"));
      sunIcons.forEach(el => el.classList.remove("d-none"));
      switches.forEach(sw => sw.checked = true);
    } else {
      moonIcons.forEach(el => el.classList.remove("d-none"));
      sunIcons.forEach(el => el.classList.add("d-none"));
      switches.forEach(sw => sw.checked = false);
    }
  };

  // Initial set
  setTheme(getPreferredTheme());

  // Listeners for navbar toggle buttons
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
    });
  });

  // Listeners for drawer switches
  document.querySelectorAll(".theme-switch-input").forEach(sw => {
    sw.addEventListener("change", (e) => {
      setTheme(e.target.checked ? "dark" : "light");
    });
  });
}

// =============================================================================
// Mapping of all subcategories to their parent category for top-navbar sync
const SUBCAT_TO_MAIN_NAV = {
  // Furniture
  'furniture': 'furniture',
  'casegoods': 'furniture',
  'upholstery': 'furniture',
  'sofas': 'furniture',
  'armchairs': 'furniture',
  'dining-tables': 'furniture',
  'dining-chairs': 'furniture',
  'center-tables': 'furniture',
  'consoles': 'furniture',
  'desks': 'furniture',
  'beds': 'furniture',
  'nightstands': 'furniture',
  'sideboards': 'furniture',
  'bar-cabinets': 'furniture',
  'bookcases': 'furniture',
  'chaise-longues': 'furniture',
  'bar-chairs': 'furniture',
  // Lighting
  'lighting': 'lighting',
  'chandeliers': 'lighting',
  'suspensions': 'lighting',
  'pendants': 'lighting',
  'wall-lamps': 'lighting',
  'floor-lamps': 'lighting',
  'table-lamps': 'lighting',
  'plafonds': 'lighting',
  'outdoor': 'lighting',
  // Complements
  'complements': 'complements',
  'clocks': 'complements',
  'rugs': 'complements',
  'mirrors': 'complements',
  'pillows': 'complements',
  'decor': 'complements',
  'vases': 'complements',
  'others': 'complements',
  'accessories': 'complements'
};

let currentPinnedCategory = 'all';

// Helper to sync top navbar active link and persistent sub-bar
function syncNavbarCategoryState(category, subcategory = 'all') {
  const isCollectionsPage = window.location.pathname.endsWith('collections.html') || 
                            window.location.pathname === '/collections.html';
  if (!isCollectionsPage) return;

  const navLinks = document.querySelectorAll('.luxxu-nav-list .nav-link');
  const megaParents = document.querySelectorAll('.has-mega-menu');
  const subLinks = document.querySelectorAll('.luxxu-subbar-link');

  // Normalize category
  let normCat = category || 'all';
  if (normCat === 'casegoods' || normCat === 'upholstery') normCat = 'furniture';

  currentPinnedCategory = normCat;

  // Clear states
  navLinks.forEach((l) => l.classList.remove('active'));
  megaParents.forEach((p) => {
    p.classList.remove('is-open');
    p.classList.remove('is-pinned');
  });
  subLinks.forEach((sl) => sl.classList.remove('active'));

  if (normCat === 'lighting' || normCat === 'furniture' || normCat === 'complements') {
    const trigger = document.getElementById(`${normCat}MegaTrigger`);
    if (trigger) {
      trigger.classList.add('active');
      const parent = trigger.closest('.has-mega-menu');
      if (parent) {
        parent.classList.add('is-open');
        parent.classList.add('is-pinned');
      }
    }

    // Highlight active subbar link if subcategory specified
    if (subcategory && subcategory !== 'all') {
      const activeSubLink = document.querySelector(`.luxxu-subbar-panel a[href="#${subcategory}"], .luxxu-subbar-panel a[href$="#${subcategory}"]`);
      if (activeSubLink) {
        activeSubLink.classList.add('active');
      }
    }
  } else {
    // Default to ALL PRODUCTS
    const allLink = document.getElementById('allProductsTrigger') ||
                    document.querySelector('.luxxu-nav-list a[href*="collections.html"]');
    if (allLink) allLink.classList.add('active');
  }
}

// 20. URL HASH SCROLL & COLLECTION FILTER SYNC (Fixes Navbar Links)
// =============================================================================
function handleUrlHashScroll() {
  const isCollectionsPage = window.location.pathname.endsWith('collections.html') || 
                            window.location.pathname === '/collections.html';
  const hash = window.location.hash;

  if (!hash || hash.length <= 1) {
    if (isCollectionsPage) {
      syncNavbarCategoryState('all');
    }
    return;
  }

  const cleanHash = hash.replace("#", "");

  // Alias for Press / Blog
  if (cleanHash === "press") {
    const editorialSection = document.getElementById("editorial") || document.getElementById("catalogues");
    if (editorialSection) {
      setTimeout(() => {
        const header = document.querySelector(".header-nav-wrapper");
        const navOffset = (header ? header.offsetHeight : 80) + 15;
        if (lenisInstance) {
          lenisInstance.scrollTo(editorialSection, { offset: -navOffset });
        } else {
          const top = editorialSection.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 350);
      return;
    }
  }

  // 1. If on collections.html, activate matching luxury room filter if applicable
  if (isCollectionsPage) {
    const targetFilterBtn = document.querySelector(`.luxury-filter-btn[data-filter="${cleanHash}"]`);
    if (targetFilterBtn) {
      targetFilterBtn.click();
    }

    // 2. Activate matching product catalogue category or subcategory & sync navbar
    if (cleanHash === "furniture") {
      const furnTab = document.querySelector('.product-main-tab-btn[data-tab="furniture"]') ||
                      document.querySelector('.product-main-tab-btn[data-tab="all"]');
      if (furnTab) furnTab.click();
      syncNavbarCategoryState("furniture");
    } else if (cleanHash === "lighting") {
      const lightTab = document.querySelector('.product-main-tab-btn[data-tab="lighting"]');
      if (lightTab) lightTab.click();
      syncNavbarCategoryState("lighting");
    } else if (cleanHash === "complements") {
      const compTab = document.querySelector('.product-main-tab-btn[data-tab="complements"]');
      if (compTab) compTab.click();
      syncNavbarCategoryState("complements");
    } else if (cleanHash === "all") {
      const allTab = document.querySelector('.product-main-tab-btn[data-tab="all"]');
      if (allTab) allTab.click();
      syncNavbarCategoryState("all");
    } else if (cleanHash === "beds") {
      const bedBtn = document.querySelector('.product-sub-btn[data-sub="nightstands"]');
      if (bedBtn) bedBtn.click();
      syncNavbarCategoryState("furniture", "beds");
    } else if (cleanHash === "plafonds" || cleanHash === "outdoor") {
      const lightTab = document.querySelector('.product-main-tab-btn[data-tab="lighting"]');
      if (lightTab) lightTab.click();
      syncNavbarCategoryState("lighting", cleanHash);
    } else if (["pillows", "decor", "vases", "others", "accessories"].includes(cleanHash)) {
      const compTab = document.querySelector('.product-main-tab-btn[data-tab="complements"]');
      if (compTab) compTab.click();
      syncNavbarCategoryState("complements", cleanHash);
    } else {
      const mainCat = SUBCAT_TO_MAIN_NAV[cleanHash] || "all";
      const subCategoryBtn = document.querySelector(`.product-sub-btn[data-sub="${cleanHash}"]`);
      const mainTabBtn = document.querySelector(`.product-main-tab-btn[data-tab="${cleanHash}"]`);
      if (subCategoryBtn) {
        subCategoryBtn.click();
      } else if (mainTabBtn) {
        mainTabBtn.click();
      }
      syncNavbarCategoryState(mainCat, cleanHash);
    }
  }

  // 3. Smoothly scroll to the target element with proper offset
  setTimeout(() => {
    let targetEl = document.querySelector(hash);
    if (!targetEl && (document.querySelector(`.product-sub-btn[data-sub="${cleanHash}"]`) || document.querySelector(`.product-main-tab-btn[data-tab="${cleanHash}"]`) || cleanHash === "furniture" || cleanHash === "lighting" || cleanHash === "complements" || cleanHash === "all" || SUBCAT_TO_MAIN_NAV[cleanHash])) {
      targetEl = document.getElementById("productCatalogue");
    }
    if (targetEl) {
      const header = document.querySelector(".header-nav-wrapper");
      const subbar = document.querySelector(".has-mega-menu.is-pinned > .luxxu-mega-panel, .has-mega-menu.is-open > .luxxu-mega-panel");
      const subbarH = (subbar && window.getComputedStyle(subbar).visibility === 'visible') ? subbar.offsetHeight : 0;
      const navOffset = (header ? header.offsetHeight : 80) + subbarH + 15;
      if (lenisInstance) {
        lenisInstance.scrollTo(targetEl, { offset: -navOffset });
      } else {
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, 400);
}

window.addEventListener("load", handleUrlHashScroll);
window.addEventListener("hashchange", handleUrlHashScroll);

// =============================================================================
// 21. LARGE PRODUCT CATALOGUE INTERACTIVE FILTERING & LIVE SEARCH
// =============================================================================
function initProductCatalogue() {
  const searchInput = document.getElementById("productSearchInput");
  const mainTabBtns = document.querySelectorAll(".product-main-tab-btn");
  const subFilterBtns = document.querySelectorAll(".product-sub-btn");
  const productCols = document.querySelectorAll(".product-item-col");
  const noProductsMsg = document.getElementById("noProductsFoundMsg");
  const resetBtn = document.getElementById("resetProductFiltersBtn");

  // Quick View Modal elements
  const quickViewModalEl = document.getElementById("productQuickViewModal");
  const modalImg = document.getElementById("modalProductImg");
  const modalSubcat = document.getElementById("modalProductSubcat");
  const modalTitle = document.getElementById("productQuickViewLabel");
  const modalMaterials = document.getElementById("modalProductMaterials");
  const modalDimensions = document.getElementById("modalProductDimensions");
  const modalDesc = document.getElementById("modalProductDesc");
  const modalWhatsApp = document.getElementById("modalProductWhatsApp");

  let activeMainCategory = "all";
  let activeSubcategory = "all";
  let searchQuery = "";

  function applyProductFilters() {
    let visibleCount = 0;

    productCols.forEach((col) => {
      const colCat = col.getAttribute("data-category") || "";
      const colSub = col.getAttribute("data-subcategory") || "";
      const colTitle = col.getAttribute("data-title") || "";
      const colMaterials = col.getAttribute("data-materials") || "";

      const isFurniture =
        colCat.includes("furniture") || colCat.includes("casegoods") || colCat.includes("upholstery");
      const isComplements =
        colCat.includes("complements") || colSub === "mirrors";

      const matchesCategory =
        activeMainCategory === "all" ||
        colCat === activeMainCategory ||
        colCat.split(/\s+/).includes(activeMainCategory) ||
        (activeMainCategory === "furniture" && isFurniture) ||
        (activeMainCategory === "complements" && isComplements);

      const matchesSubcategory =
        activeSubcategory === "all" || colSub === activeSubcategory;

      const matchesSearch =
        !searchQuery ||
        colTitle.includes(searchQuery) ||
        colMaterials.includes(searchQuery) ||
        colSub.includes(searchQuery);

      if (matchesCategory && matchesSubcategory && matchesSearch) {
        col.style.display = "";
        col.classList.remove("d-none");
        visibleCount++;
      } else {
        col.style.display = "none";
        col.classList.add("d-none");
      }
    });

    if (noProductsMsg) {
      if (visibleCount === 0) {
        noProductsMsg.classList.remove("d-none");
      } else {
        noProductsMsg.classList.add("d-none");
      }
    }
  }

  // Main Category Tabs
  mainTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      mainTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeMainCategory = btn.getAttribute("data-tab");

      // Sync top navbar active state and subbar
      syncNavbarCategoryState(activeMainCategory);

      // Reset subcategory to 'all' on main tab change
      activeSubcategory = "all";
      subFilterBtns.forEach((sb) => sb.classList.remove("active"));
      const allSub = document.querySelector('.product-sub-btn[data-sub="all"]');
      if (allSub) allSub.classList.add("active");

      applyProductFilters();
    });
  });

  // Subcategory Filter Pills
  subFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      subFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeSubcategory = btn.getAttribute("data-sub");

      // Auto-reconcile category if current subcategory belongs to another category
      if (activeSubcategory !== "all") {
        const sampleCol = Array.from(productCols).find(
          (c) => c.getAttribute("data-subcategory") === activeSubcategory
        );
        if (sampleCol) {
          const colCat = sampleCol.getAttribute("data-category") || "";
          const isFurn = colCat.includes("casegoods") || colCat.includes("upholstery") || colCat.includes("furniture");
          const targetTabVal = isFurn ? "furniture" : (colCat.includes("lighting") ? "lighting" : (colCat.includes("complements") ? "complements" : colCat));

          if (activeMainCategory !== "all" && activeMainCategory !== targetTabVal) {
            mainTabBtns.forEach((b) => b.classList.remove("active"));
            const targetTab = document.querySelector(`.product-main-tab-btn[data-tab="${targetTabVal}"]`) ||
                              document.querySelector('.product-main-tab-btn[data-tab="all"]');
            if (targetTab) {
              targetTab.classList.add("active");
              activeMainCategory = targetTab.getAttribute("data-tab");
            }
          }
        }
        const parentMainNav = SUBCAT_TO_MAIN_NAV[activeSubcategory] || activeMainCategory;
        syncNavbarCategoryState(parentMainNav, activeSubcategory);
      } else {
        syncNavbarCategoryState(activeMainCategory);
      }

      applyProductFilters();
    });
  });

  // Live Instant Search Bar
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyProductFilters();
    });
  }

  // Reset Filters Button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      activeMainCategory = "all";
      activeSubcategory = "all";
      searchQuery = "";
      if (searchInput) searchInput.value = "";

      mainTabBtns.forEach((b) => b.classList.remove("active"));
      const allMain = document.querySelector('.product-main-tab-btn[data-tab="all"]');
      if (allMain) allMain.classList.add("active");

      subFilterBtns.forEach((b) => b.classList.remove("active"));
      const allSub = document.querySelector('.product-sub-btn[data-sub="all"]');
      if (allSub) allSub.classList.add("active");

      syncNavbarCategoryState("all");
      applyProductFilters();
    });
  }

  // Quick View Modal Triggers
  document.querySelectorAll(".open-product-quickview").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!quickViewModalEl) return;
      const title = btn.getAttribute("data-title") || "";
      const subcat = btn.getAttribute("data-subcat") || "";
      const materials = btn.getAttribute("data-materials") || "";
      const dimensions = btn.getAttribute("data-dimensions") || "";
      const desc = btn.getAttribute("data-desc") || "";
      const img = btn.getAttribute("data-image") || "";

      if (modalTitle) modalTitle.textContent = title;
      if (modalSubcat) modalSubcat.textContent = subcat;
      if (modalMaterials) modalMaterials.textContent = materials;
      if (modalDimensions) modalDimensions.textContent = dimensions;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalImg) {
        modalImg.src = img;
        modalImg.alt = title;
      }
      if (modalWhatsApp) {
        modalWhatsApp.href = `https://wa.me/917569826055?text=Hello%20High%20Rise%20Interiors,%20I%20would%20like%20to%20inquire%20about%20customizing%20the%20${encodeURIComponent(title)}%20(${encodeURIComponent(materials)}).`;
      }

      if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(quickViewModalEl);
        modalInstance.show();
      }
    });
  });
}

// =============================================================================
// 22. LUXXU MEGA MENU HOVER & CLICK-TO-TOGGLE HANDLER
// =============================================================================

// =============================================================================
// COLLECTIONS NAVBAR DROPDOWN DIRECT CLICK HANDLER (Desktop Navigation)
// =============================================================================
function initCollectionsNavbarDropdown() {
  const collDropdownLinks = document.querySelectorAll('.collections-dropdown-item > a.nav-link');
  collDropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth >= 1200) {
        window.location.href = 'collections.html';
      }
    });
  });
}

function initMegaMenuToggle() {
  const megaItems = document.querySelectorAll(".has-mega-menu");
  if (!megaItems.length) return;

  const isCollectionsPage = window.location.pathname.endsWith('collections.html') || 
                            window.location.pathname === '/collections.html';

  megaItems.forEach((item) => {
    const trigger = item.querySelector("> .nav-link");
    const panel = item.querySelector(".luxxu-mega-panel");
    if (!trigger || !panel) return;

    let closeTimeout = null;

    // Desktop Mouseover / Hover Support
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 1200) {
        if (closeTimeout) clearTimeout(closeTimeout);

        // Close other non-hovered menus
        megaItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            const otherTrigger = other.querySelector("> .nav-link");
            if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          }
        });

        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });

    item.addEventListener("mouseleave", () => {
      if (window.innerWidth >= 1200) {
        closeTimeout = setTimeout(() => {
          // If this item is not the pinned active category, close it
          if (!item.classList.contains("is-pinned")) {
            item.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
          }

          // Restore open state on the pinned item if another exists
          const pinnedItem = document.querySelector(".has-mega-menu.is-pinned");
          if (pinnedItem && pinnedItem !== item) {
            pinnedItem.classList.add("is-open");
            const pinnedTrigger = pinnedItem.querySelector("> .nav-link");
            if (pinnedTrigger) pinnedTrigger.setAttribute("aria-expanded", "true");
          }
        }, 120);
      }
    });

    // Toggle on click
    trigger.addEventListener("click", (e) => {
      const isMobile = window.innerWidth < 1200;
      if (isMobile) return;

      const href = trigger.getAttribute("href") || "";

      // Allow natural cross-page navigation if link points to another page
      const currentFile = window.location.pathname.split("/").pop() || "index.html";
      if (href.includes(".html") && !href.startsWith(currentFile)) {
        return; // Allow browser to follow link
      }

      // If we are on collections.html and clicking a category trigger:
      if (isCollectionsPage) {
        e.preventDefault();
        let targetHash = "";
        if (trigger.id === "furnitureMegaTrigger") targetHash = "#furniture";
        else if (trigger.id === "lightingMegaTrigger") targetHash = "#lighting";
        else if (trigger.id === "complementsMegaTrigger") targetHash = "#complements";
        else if (href.startsWith("#")) targetHash = href;

        if (targetHash) {
          if (window.location.hash === targetHash) {
            handleUrlHashScroll();
          } else {
            window.location.hash = targetHash;
          }
        }
        return;
      }

      // If on index.html and clicking INSPIRATIONS (#rooms):
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          const header = document.querySelector(".header-nav-wrapper");
          const navOffset = (header ? header.offsetHeight : 80) + 15;
          if (lenisInstance) {
            lenisInstance.scrollTo(targetEl, { offset: -navOffset });
          } else {
            const top = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }
    });

    // Subbar link clicked inside the panel
    panel.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const subHref = link.getAttribute("href") || "";

      // If on collections.html and clicking a subbar hash link (#chandeliers, #sofas, etc.):
      if (isCollectionsPage && subHref.startsWith("#")) {
        e.preventDefault();
        if (window.location.hash === subHref) {
          handleUrlHashScroll();
        } else {
          window.location.hash = subHref;
        }
        // Subbar stays open and pinned!
      } else {
        // Cross-page link, allow natural navigation
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Handle ALL PRODUCTS link on collections.html
  const allProductsLink = document.getElementById("allProductsTrigger");
  if (allProductsLink && isCollectionsPage) {
    allProductsLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.location.hash === "#all") {
        handleUrlHashScroll();
      } else {
        window.location.hash = "#all";
      }
    });
  }

  // Close when clicking outside anywhere on the document (unless pinned)
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-mega-menu") && !e.target.closest(".luxxu-nav-list")) {
      megaItems.forEach((item) => {
        if (!item.classList.contains("is-pinned")) {
          item.classList.remove("is-open");
          const trigger = item.querySelector("> .nav-link");
          if (trigger) trigger.setAttribute("aria-expanded", "false");
        }
      });
      // Ensure pinned item stays open
      const pinnedItem = document.querySelector(".has-mega-menu.is-pinned");
      if (pinnedItem) {
        pinnedItem.classList.add("is-open");
        const pinnedTrigger = pinnedItem.querySelector("> .nav-link");
        if (pinnedTrigger) pinnedTrigger.setAttribute("aria-expanded", "true");
      }
    }
  });

  // Close on Escape key (closes temporary unpinned hovers)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      megaItems.forEach((item) => {
        if (!item.classList.contains("is-pinned")) {
          item.classList.remove("is-open");
          const trigger = item.querySelector("> .nav-link");
          if (trigger) trigger.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
}




// =============================================================================
// 23. BALANCED LUXURY 5-COLOR SWATCH INTERACTION
// =============================================================================
function initBalancedLuxurySwatches() {
  const swatches = document.querySelectorAll(".palette-swatch-item[data-target]");
  if (!swatches.length) return;

  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      const targetSelector = swatch.getAttribute("data-target");
      if (!targetSelector) return;
      const targetEl = document.querySelector(targetSelector);
      if (!targetEl) return;

      const header = document.querySelector(".header-nav-wrapper") || document.getElementById("mainHeader");
      const navHeight = (header ? header.offsetHeight : 80) + 15;

      if (lenisInstance) {
        lenisInstance.scrollTo(targetEl, { offset: -navHeight });
      } else {
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }

      // Visual feedback: pulse the target element
      const pulseTarget = targetEl.querySelector(".category-card, .luxxu-room-card, .stat-card, .material-card") || targetEl;
      if (pulseTarget) {
        pulseTarget.classList.add("room-highlight-pulse");
        setTimeout(() => pulseTarget.classList.remove("room-highlight-pulse"), 2000);
      }
    });
  });
}
