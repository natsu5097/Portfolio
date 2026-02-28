// ------------------ GLOBAL MOCK DATA ------------------
// Comprehensive mock data for search and display functionality
const allItems = [
  // Fruits
  { id: 1, name: "Dragon", category: "Fruits", type: "Mythical", image_url: "https://via.placeholder.com/100?text=Dragon", price_money: 5000000, price_robux: 2500, description: "Legendary mythical zoan fruit with devastating fire abilities", rarity: "Legendary" },
  { id: 2, name: "Venom", category: "Fruits", type: "Natural", image_url: "https://via.placeholder.com/100?text=Venom", price_money: 4500000, price_robux: 2300, description: "Deadly poison-based fruit with area damage effects", rarity: "Legendary" },
  { id: 3, name: "Control", category: "Fruits", type: "Natural", image_url: "https://via.placeholder.com/100?text=Control", price_money: 4200000, price_robux: 2100, description: "Manipulate objects and enemies with telekinetic powers", rarity: "Legendary" },
  
  // Swords
  { id: 4, name: "Yama", category: "Swords", type: "Weapon", image_url: "https://via.placeholder.com/100?text=Yama", price_money: 3000000, price_robux: 0, description: "Legendary sword with exceptional range and damage", rarity: "Mythical" },
  { id: 5, name: "Tushita", category: "Swords", type: "Weapon", image_url: "https://via.placeholder.com/100?text=Tushita", price_money: 2800000, price_robux: 0, description: "Ancient blade with powerful aerial combos", rarity: "Mythical" },
  { id: 6, name: "Rengoku", category: "Swords", type: "Weapon", image_url: "https://via.placeholder.com/100?text=Rengoku", price_money: 1500000, price_robux: 0, description: "Flame-imbued sword with burning damage", rarity: "Legendary" },
  
  // Guns
  { id: 7, name: "Kabucha", category: "Guns", type: "Ranged", image_url: "https://via.placeholder.com/100?text=Kabucha", price_money: 1800000, price_robux: 0, description: "Powerful cannon with explosive projectiles", rarity: "Legendary" },
  { id: 8, name: "Acidum Rifle", category: "Guns", type: "Ranged", image_url: "https://via.placeholder.com/100?text=Acidum", price_money: 1500000, price_robux: 0, description: "Rifle that fires corrosive acid bullets", rarity: "Legendary" },
  
  // Fighting Styles
  { id: 9, name: "Godhuman", category: "FightingStyles", type: "Melee", image_url: "https://via.placeholder.com/100?text=Godhuman", description: "Ultimate fighting style combining multiple techniques", rarity: "Mythical" },
  { id: 10, name: "Electric Claw", category: "FightingStyles", type: "Melee", image_url: "https://via.placeholder.com/100?text=Electric", description: "Lightning-fast attacks with electric damage", rarity: "Legendary" },
  
  // Accessories
  { id: 11, name: "Dark Coat", category: "Accessories", type: "Accessory", image_url: "https://via.placeholder.com/100?text=DarkCoat", description: "Increases defense and provides style", rarity: "Rare" },
  { id: 12, name: "Ghoul Mask", category: "Accessories", type: "Accessory", image_url: "https://via.placeholder.com/100?text=GhoulMask", description: "Intimidating mask that boosts attack power", rarity: "Epic" },
  
  // Bosses & NPCs
  { id: 13, name: "Dough King", category: "Bosses", type: "Boss", image_url: "https://via.placeholder.com/100?text=DoughKing", description: "Powerful raid boss with dough-based abilities", rarity: "Raid Boss" },
  { id: 14, name: "Blox Fruit Dealer", category: "NPCs", type: "Vendor", image_url: "https://via.placeholder.com/100?text=Dealer", description: "Sells random fruits on rotation", location: "First Sea" }
];


document.addEventListener("DOMContentLoaded", () => {
  // Build global header/nav/footer first so controls exist across all pages
  renderGlobalChrome();

  // Ensure head has title and favicon
  ensureHeadMeta();

  // Fix legacy/broken links and images before initializing UI
  normalizeLinksAndImages();
  initializeImageFallback();

  // Initialize all components
  initializeDarkMode();
  initializeSearch();
  initializeScrollTop();
  initializeCollapsibles();
  initializeCategoryFilter();
  initializePagination();
  initializeBreadcrumbs();
  initializeLightbox();
  initializeTooltips();
  initializeComparisonTool();
  initializeRatingSystem();
  initializeAnimatedStats();
  initializeBackToTop();
  initializeSortableTables();
  initializeDropdownNavigation();
  upgradeLegacyItemPages();
  loadPageContent();
  
  // Add smooth scrolling for better UX
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// ================= GLOBAL CHROME (Header/Nav/Footer) =================
function getBasePrefix() {
  const path = window.location.pathname.replace(/\\\\/g, "/");
  // Compute depth from site root for robust asset/link resolution
  const parts = path.split('/').filter(Boolean);
  const repoIdx = parts.indexOf('Bloxtreck');
  let after = repoIdx >= 0 ? parts.slice(repoIdx + 1) : parts.slice();
  // If last segment looks like a file (has a dot), drop it
  if (after.length && /\./.test(after[after.length - 1])) {
    after = after.slice(0, -1);
  }
  const depth = after.length;
  return depth ? '../'.repeat(depth) : '';
}

function renderGlobalChrome() {
  const base = getBasePrefix();

  // Remove any pre-existing duplicate search results containers to avoid ID conflicts
  document.querySelectorAll('#search-results').forEach(el => el.remove());

  const headerHtml = `
<header class="site-header">
  <div class="logo-title">
    <a href="${base}index.html">
      <img src="${base}assets/images/sitelogo/bloxtrex.png" alt="Blox Fruits Wiki Logo" class="site-logo">
    </a>
    <h1><a href="${base}index.html" style="color:inherit; text-decoration:none;">Blox Fruits Fan Wiki</a></h1>
  </div>
  <div class="header-controls">
    <div class="search-wrapper">
      <input type="text" id="search-box" placeholder="Search items..." aria-label="Search items">
      <div id="search-results" class="search-results"></div>
    </div>
    <button id="darkModeToggle" title="Toggle dark mode"><span class="icon">🌙</span></button>
  </div>
</header>`;

  const navHtml = `
<nav>
  <a href="${base}index.html">Home</a>
  
  <!-- Game Content Dropdown -->
  <div class="nav-dropdown">
    <a href="#" class="dropdown-toggle">Game Content <span class="dropdown-arrow">▼</span></a>
    <div class="dropdown-menu">
      <a href="${base}game-content/fruits/fruits.html">🍎 Fruits</a>
      <a href="${base}game-content/swords/swords.html">⚔️ Swords</a>
      <a href="${base}game-content/guns/guns.html">🔫 Guns</a>
      <a href="${base}game-content/fighting-styles/fighting-styles.html">🥋 Fighting Styles</a>
      <a href="${base}game-content/accessories/accessories.html">💎 Accessories</a>
      <a href="${base}game-content/islands/islands.html">🏝️ Islands</a>
      <a href="${base}game-content/bosses/bosses.html">👹 Bosses</a>
      <a href="${base}game-content/npcs/npcs.html">👤 NPCs</a>
    </div>
  </div>
  
  <!-- Community Dropdown -->
  <div class="nav-dropdown">
    <a href="#" class="dropdown-toggle">Community <span class="dropdown-arrow">▼</span></a>
    <div class="dropdown-menu">
      <a href="${base}content/about.html">📖 About</a>
      <a href="${base}content/tierlist.html">📊 Tier Lists</a>
      <a href="${base}community/quiz.html">🎮 Quiz</a>
      <a href="${base}blog/blog.html">📝 Blog</a>
    </div>
  </div>
  
  <!-- Blog Link -->
  <a href="${base}blog/blog.html">📝 Blog</a>
  
  <!-- Tools Dropdown -->
  <div class="nav-dropdown">
    <a href="#" class="dropdown-toggle">🛠️ Tools <span class="dropdown-arrow">▼</span></a>
    <div class="dropdown-menu">
      <a href="${base}tools-utilities/calculators/bounty-calculator.html">💰 Bounty Calculator</a>
      <a href="${base}tools-utilities/calculators/damage-calculator.html">⚡ Damage Calculator</a>
      <a href="${base}tools-utilities/calculators/material-calculator.html">🔧 Material Calculator</a>
      <a href="${base}tools-utilities/calculators/xp-calculator.html">📈 XP Calculator</a>
      <a href="${base}tools-utilities/maps/interactive-map.html">🗺️ Interactive Map</a>
      <a href="${base}tools-utilities/planners/build-planner.html">🏗️ Build Planner</a>
      <a href="${base}tools-utilities/planners/combo-builder.html">🥊 Combo Builder</a>
      <a href="${base}tools-utilities/simulators/drop-simulator.html">🎲 Drop Simulator</a>
      <a href="${base}tools-utilities/trackers/trading-values.html">💱 Trading Values</a>
    </div>
  </div>
</nav>`;

  const footerHtml = `
<footer>
  <p>Fan-made Blox Fruits Wiki &copy; Natsu</p>
</footer>`;

  // Replace or insert header
  const existingHeader = document.querySelector('header');
  if (existingHeader) {
    existingHeader.outerHTML = headerHtml;
  } else if (document.body.firstElementChild) {
    document.body.insertAdjacentHTML('afterbegin', headerHtml);
  } else {
    document.body.innerHTML = headerHtml + (document.body.innerHTML || '');
  }

  // Replace or insert nav
  const existingNav = document.querySelector('nav');
  const headerEl = document.querySelector('header.site-header');
  if (existingNav) {
    // If nav exists, replace it. This handles all cases.
    existingNav.outerHTML = navHtml; 
  } else if (headerEl) {
    // If no nav exists, insert it after the header.
    headerEl.insertAdjacentHTML('afterend', navHtml);
  }


  // Replace or insert footer
  const existingFooter = document.querySelector('footer');
  if (existingFooter) {
    existingFooter.outerHTML = footerHtml;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHtml);
  }

  // Ensure a single scroll-to-top button exists
  const existingBtns = document.querySelectorAll('#scrollTopBtn');
  existingBtns.forEach((btn, idx) => { if (idx > 0) btn.remove(); });
  if (!document.getElementById('scrollTopBtn')) {
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.className = 'scroll-top-btn';
    btn.textContent = '⬆️ Top';
    document.body.appendChild(btn);
  }
}

// ================= HEAD META (Title + Favicon) =================
function ensureHeadMeta() {
  const head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return;

  const base = getBasePrefix();
  // Ensure favicon points to repo assets regardless of depth
  const desiredIconHref = `${base}assets/images/sitelogo/bloxtrex.png`;

  // Favicon: add or enforce
  let iconLink = head.querySelector('link[rel="icon"]');
  if (!iconLink) {
    iconLink = document.createElement('link');
    iconLink.setAttribute('rel', 'icon');
    iconLink.setAttribute('type', 'image/png');
    head.appendChild(iconLink);
  }
  iconLink.setAttribute('href', desiredIconHref);

  // Bust CSS cache for style.css once after deploy
  try {
    const links = Array.from(head.querySelectorAll('link[rel="stylesheet"]'));
    links.forEach(l => {
      const href = l.getAttribute('href') || '';
      if (/\bstyle\.css(\?.*)?$/i.test(href) && !/[?&]v=/.test(href)) {
        const sep = href.includes('?') ? '&' : '?';
        l.setAttribute('href', href + sep + 'v=2');
      }
    });
  } catch (_) {}

  // Title: ensure there is a meaningful title and brand suffix
  const brand = 'Blox Fruits Fan Wiki';
  const title = document.title || '';
  const hasBrand = /Blox\s*Fruits|Bloxtreck|BloxTreck/i.test(title);

  function derivePageName() {
    const candidate = document.querySelector('main h1, main h2, .blox-fruits-info h2, .logo-title h1');
    return candidate ? candidate.textContent.trim() : '';
  }

  if (!title || /^\s*$/.test(title) || /^Document$/i.test(title)) {
    const name = derivePageName();
    document.title = name ? `${name} — ${brand}` : brand;
  } else if (!hasBrand) {
    document.title = `${title} — ${brand}`;
  }
}

// ================= LINK & IMAGE NORMALIZATION =================
function normalizeLinksAndImages() {
  const base = getBasePrefix();
  const path = window.location.pathname.replace(/\\\\/g, '/');
  const inCategory = /game-content\/(fruits|swords|guns|accessories)\//.test(path);

  // 1) Fix legacy *_pages links
  document.querySelectorAll('a[href*="_pages/"]').forEach(a => {
    const href = a.getAttribute('href') || '';
    const m = href.match(/^(fruits|swords|guns|accessories)_pages\/(.+)$/);
    if (m) {
      const category = m[1];
      const file = m[2];
      const newHref = inCategory ? `pages/${file}` : `${base}game-content/${category}/pages/${file}`;
      a.setAttribute('href', newHref);
    }
  });

  // 2) Fix Back to Tools links inside tool subfolders
  document.querySelectorAll('a').forEach(a => {
    const txt = (a.textContent || '').trim().toLowerCase();
    const href = a.getAttribute('href') || '';
    if (txt.includes('back to tools') && (href === 'tools.html' || /\.\.\/tools\/tools\.html$/.test(href))) {
      a.setAttribute('href', `${base}tools-utilities/tools.html`);
    }
  });

  // 3) Normalize image src paths for assets and repo images
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    // images/... at root should be assets/images/...
    if (/^images\//.test(src)) {
      img.setAttribute('src', `${base}assets/${src}`.replace('/images/images/', '/images/'));
      return;
    }
    // ../assets/images/... inside nested pages should be corrected to the proper base
    const m2 = src.match(/^\.\.\/assets\/(.+)$/);
    if (m2) {
      img.setAttribute('src', `${base}assets/${m2[1]}`);
      return;
    }
  });
}

function initializeImageFallback() {
  const PLACEHOLDER = 'https://via.placeholder.com/150?text=Image+Missing';
  document.querySelectorAll('img').forEach(img => {
    if (!img.getAttribute('onerror')) {
      const handler = () => { img.onerror = null; img.src = PLACEHOLDER; };
      img.addEventListener('error', handler, { once: true });
    }
  });
}

// ================= DROPDOWN NAVIGATION =================
function initializeDropdownNavigation() {
  // Handle dropdown toggle clicks
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-toggle')) {
      e.preventDefault();
      const dropdown = e.target.closest('.nav-dropdown');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      // Close other dropdowns
      document.querySelectorAll('.nav-dropdown').forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('active');
        }
      });
      
      // Toggle current dropdown
      dropdown.classList.toggle('active');
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Add CSS for active dropdown state
  const style = document.createElement('style');
  style.textContent = `
    .nav-dropdown.active .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .nav-dropdown.active .dropdown-arrow {
      transform: rotate(180deg);
    }
  `;
  document.head.appendChild(style);
}

// ================= DARK MODE =================
function initializeDarkMode() {
  // support either ID used across pages: darkModeToggle or darkToggle
  const darkToggle = document.getElementById("darkModeToggle") || document.getElementById("darkToggle");
  if (!darkToggle) return;

  const icon = darkToggle.querySelector(".icon");
  const body = document.body;
  
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  
  // Apply the theme
  applyTheme(currentTheme);
  
  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  darkToggle.addEventListener("click", () => {
    const isDark = body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Show theme change notification
    showThemeNotification(newTheme);
  });
  
  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark");
      if (icon) {
        icon.textContent = "☀️";
        icon.setAttribute("aria-label", "Switch to light mode");
      }
      updateMetaThemeColor("#1a1a1a");
    } else {
      body.classList.remove("dark");
      if (icon) {
        icon.textContent = "🌙";
        icon.setAttribute("aria-label", "Switch to dark mode");
      }
      updateMetaThemeColor("#ffffff");
    }
  }
  
  function updateMetaThemeColor(color) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = color;
  }
  
  function showThemeNotification(theme) {
    const notification = document.createElement("div");
    notification.className = "theme-notification";
    notification.innerHTML = `
      <div class="theme-notification-content">
        <span class="theme-icon">${theme === "dark" ? "🌙" : "☀️"}</span>
        <span class="theme-text">Switched to ${theme} mode</span>
      </div>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--bg-color);
      color: var(--text-color);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: var(--card-shadow-hover);
      z-index: 10000;
      border: 1px solid var(--border-color);
      animation: themeNotification 3s ease forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Add theme notification animation
const themeStyle = document.createElement("style");
themeStyle.textContent = `
  @keyframes themeNotification {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    10% {
      opacity: 1;
      transform: translateX(0);
    }
    90% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  .theme-notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .theme-icon {
    font-size: 1.2rem;
  }
  
  .theme-text {
    font-weight: var(--font-medium);
  }
`;
document.head.appendChild(themeStyle);

// ================= CATEGORY PAGE FILTERING =================
function initializeCategoryFilter() {
  // Generic filter for any category page (fruits, swords, guns, etc.)
  const filterInput = document.querySelector('.item-filter-input');
  const itemsGrid = document.querySelector('.item-grid');
  const countElement = document.querySelector('.item-count-display');

  if (!filterInput || !itemsGrid || !countElement) {
    return; // Don't run if the necessary elements aren't on the page
  }

  const cards = Array.from(itemsGrid.querySelectorAll('.category-card'));
  const total = cards.length;
  let currentRarityFilter = '';

  const applyFilter = () => {
    const query = filterInput.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const name = (card.textContent || '').trim().toLowerCase();
      const rarityBadge = card.querySelector('.rarity-badge');
      const rarity = rarityBadge ? rarityBadge.textContent.toLowerCase() : '';
      
      const matchesText = !query || name.includes(query);
      const matchesRarity = !currentRarityFilter || rarity.includes(currentRarityFilter);
      
      const isVisible = matchesText && matchesRarity;
      card.style.display = isVisible ? '' : 'none';
      if (isVisible) shown++;
    });
    countElement.textContent = `${shown} / ${total}`;
  };

  filterInput.addEventListener('input', applyFilter);
  
  // Sidebar rarity filtering
  const sidebarLinks = document.querySelectorAll('.sidebar a[data-filter]');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentRarityFilter = e.target.dataset.filter;
      
      // Update active state
      sidebarLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
      
      applyFilter();
    });
  });
  
  applyFilter(); // Initial call to set the count
}

// ================= SEARCH FUNCTIONALITY =================
function initializeSearch() {
  // accept inputs like <input id="search-box"> or inputs named search-*
  const searchInputs = document.querySelectorAll('input[id*="search"]');
  const searchResults = document.getElementById("search-results");
  const clearSearchBtn = document.getElementById("clear-search");
  
  if (!searchInputs.length) return;

  // Enhanced search data with more comprehensive information
  const enhancedSearchData = [
    ...allItems,
    // Add more specific search terms
    { id: 100, name: "Flame Fruit", category: "Fruits", type: "Natural", description: "Fire-based attacks and immunity", rarity: "Rare", searchTerms: ["fire", "burn", "heat"] },
    { id: 101, name: "Ice Fruit", category: "Fruits", type: "Natural", description: "Ice attacks and freezing abilities", rarity: "Rare", searchTerms: ["freeze", "cold", "snow"] },
    { id: 102, name: "Lightning Fruit", category: "Fruits", type: "Natural", description: "Electric attacks and speed boost", rarity: "Legendary", searchTerms: ["electric", "thunder", "speed"] },
    { id: 103, name: "Dark Blade", category: "Swords", type: "Weapon", description: "Ultimate dark weapon with immense power", rarity: "Mythical", searchTerms: ["darkness", "shadow", "evil"] },
    { id: 104, name: "Dragon Fruit", category: "Fruits", type: "Mythical", description: "Ultimate mythical dragon transformation", rarity: "Mythical", searchTerms: ["dragon", "mythical", "ultimate"] }
  ];

  // Initialize Fuse.js for fuzzy search if available, otherwise create a tiny fallback
  let fuse = null;
  if (typeof Fuse === 'function') {
    fuse = new Fuse(enhancedSearchData, {
      keys: [
        { name: "name", weight: 0.4 },
        { name: "description", weight: 0.2 },
        { name: "category", weight: 0.2 },
        { name: "type", weight: 0.1 },
        { name: "rarity", weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true,
      shouldSort: true,
      minMatchCharLength: 1,
      findAllMatches: true
    });
  } else {
    // Enhanced fallback with weighted scoring
    fuse = {
      search: (q, opts) => {
        const s = String(q || '').trim().toLowerCase();
        if (!s) return [];
        
        // Calculate relevance score for better sorting
        const matches = enhancedSearchData
          .map(item => {
            let score = 0;
            // Name match (highest priority)
            if ((item.name || '').toLowerCase().includes(s)) {
              score += 10;
              // Exact match or starts with gets higher score
              if ((item.name || '').toLowerCase() === s) score += 5;
              if ((item.name || '').toLowerCase().startsWith(s)) score += 3;
            }
            // Search terms match
            if (item.searchTerms) {
              item.searchTerms.forEach(term => {
                if (term.toLowerCase().includes(s)) score += 8;
              });
            }
            // Category match
            if ((item.category || '').toLowerCase().includes(s)) score += 5;
            // Type match
            if ((item.type || '').toLowerCase().includes(s)) score += 4;
            // Description match (lowest priority)
            if ((item.description || '').toLowerCase().includes(s)) score += 2;
            // Rarity match
            if ((item.rarity || '').toLowerCase().includes(s)) score += 3;
            
            return { item, score };
          })
          .filter(result => result.score > 0)
          .sort((a, b) => b.score - a.score);
          
        return matches.map(match => ({ item: match.item, score: match.score }));
      }
    };
  }

  let selectedIndex = -1;

  function renderSearchResults(results, query = '') {
    if (!searchResults) return;
    searchResults.innerHTML = "";
    
    if (!results || results.length === 0) {
      searchResults.classList.remove("active");
      return;
    }
    
    // Add header with result count and close button
    const header = document.createElement("div");
    header.className = "search-results-header";
    header.innerHTML = `
      <span>${results.length} result${results.length > 1 ? 's' : ''} found</span>
      <button class="close-search" aria-label="Close search results">×</button>
    `;
    searchResults.appendChild(header);
    
    // Add results container
    const resultsContainer = document.createElement("div");
    resultsContainer.className = "search-results-content";
    searchResults.appendChild(resultsContainer);
    
    // Group results by category for better organization
    const groupedResults = {};
    results.forEach((r, i) => {
      const item = r.item || r;
      const category = item.category || 'Other';
      if (!groupedResults[category]) {
        groupedResults[category] = [];
      }
      groupedResults[category].push({ ...r, originalIndex: i });
    });
    
    // Render grouped results
    Object.keys(groupedResults).forEach(category => {
      const categoryHeader = document.createElement("div");
      categoryHeader.className = "search-category-header";
      categoryHeader.textContent = category;
      resultsContainer.appendChild(categoryHeader);
      
      groupedResults[category].forEach((r, i) => {
        const item = r.item || r;
        const card = document.createElement("div");
        card.className = "result-card";
        card.dataset.index = r.originalIndex;
        card.setAttribute("tabindex", "0");
        
        // Format price if available
        const priceDisplay = item.price_money ? 
          `<span class="result-price">${Number(item.price_money).toLocaleString()} $</span>` : '';
        
        // Show rarity badge if available
        const rarityBadge = item.rarity ? 
          `<span class="rarity-badge ${(item.rarity || '').toLowerCase()}">${item.rarity}</span>` : '';
        
        // Highlight search terms in the name
        const highlightedName = highlightSearchTerms(safeText(item.name), query);
        const highlightedDescription = highlightSearchTerms(safeText(item.description || ""), query);
        
        card.innerHTML = `
          <img src="${safeText(item.image_url) || getPlaceholderImage(item.category)}" 
               alt="${safeText(item.name)}" 
               loading="lazy" 
               onerror="this.onerror=null;this.src='${getPlaceholderImage(item.category)}'"/>
          <div class="meta">
            <div class="result-header">
              <h3>${highlightedName}</h3>
              ${rarityBadge}
            </div>
            <p class="result-category">${safeText(item.category)} • ${safeText(item.type)}</p>
            <p class="result-description">${highlightedDescription.substring(0, 70)}${highlightedDescription.length > 70 ? '...' : ''}</p>
            ${priceDisplay}
          </div>
        `;
        
        card.addEventListener("click", () => {
          navigateToItem(item);
        });
        
        // Add keyboard accessibility
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigateToItem(item);
          }
        });
        
        resultsContainer.appendChild(card);
      });
    });
    
    searchResults.classList.add("active");
    selectedIndex = -1;
    
    // Add click event to close button
    const closeButton = searchResults.querySelector('.close-search');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        searchResults.classList.remove("active");
      });
    }
    
    if (clearSearchBtn) {
      clearSearchBtn.style.display = "block";
    }
  }

  // Helper function to highlight search terms
  function highlightSearchTerms(text, query) {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function performSearch(query) {
    if (!searchResults) return;
    if (!query || !String(query).trim()) {
      searchResults.classList.remove("active");
      if (clearSearchBtn) clearSearchBtn.style.display = "none";
      return;
    }
    
    const results = fuse.search(query, { limit: 20 });
    
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-results-header">
          <span>No results found</span>
          <button class="close-search" aria-label="Close search results">×</button>
        </div>
        <div class="no-results">
          <p>No items match your search for "${query}"</p>
          <p>Try using different keywords or check for typos</p>
          <div class="search-suggestions">
            <p>Popular searches:</p>
            <div class="suggestion-tags">
              <span class="suggestion-tag" data-search="dragon">Dragon</span>
              <span class="suggestion-tag" data-search="flame">Flame</span>
              <span class="suggestion-tag" data-search="ice">Ice</span>
              <span class="suggestion-tag" data-search="legendary">Legendary</span>
              <span class="suggestion-tag" data-search="mythical">Mythical</span>
            </div>
          </div>
        </div>
      `;
      searchResults.classList.add("active");
      
      // Add click event to close button
      const closeButton = searchResults.querySelector('.close-search');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          searchResults.classList.remove("active");
        });
      }
      
      // Add click events to suggestion tags
      const suggestionTags = searchResults.querySelectorAll('.suggestion-tag');
      suggestionTags.forEach(tag => {
        tag.addEventListener('click', () => {
          const searchInput = document.querySelector('input[id*="search"]');
          if (searchInput) {
            searchInput.value = tag.dataset.search;
            performSearch(tag.dataset.search);
          }
        });
      });
      return;
    }
    
    renderSearchResults(results, query);
  }

  function navigateToItem(item) {
    // Enhanced navigation with better URL handling
    const pageMap = {
      "Fruits": "game-content/fruits/fruits.html",
      "Swords": "game-content/swords/swords.html",
      "Guns": "game-content/guns/guns.html",
      "FightingStyles": "game-content/fighting-styles/fighting-styles.html",
      "Accessories": "game-content/accessories/accessories.html",
      "Bosses": "game-content/bosses/bosses.html",
      "Islands": "game-content/islands/islands.html",
      "NPCs": "game-content/npcs/npcs.html"
    };
    
    // Create URL-safe slug from item name
    const itemNameSlug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    // Determine if we should navigate to detail page or category page
    let targetPage = '';
    switch(item.category) {
      case "Fruits":
        targetPage = `${getBasePrefix()}game-content/fruits/pages/${itemNameSlug}.html`;
        break;
      case "Swords":
        targetPage = `${getBasePrefix()}game-content/swords/pages/${itemNameSlug}.html`;
        break;
      case "Guns":
        targetPage = `${getBasePrefix()}game-content/guns/pages/${itemNameSlug}.html`;
        break;
      case "FightingStyles":
        targetPage = `${getBasePrefix()}game-content/fighting-styles/pages/${itemNameSlug}.html`;
        break;
      case "Accessories":
        targetPage = `${getBasePrefix()}game-content/accessories/pages/${itemNameSlug}.html`;
        break;
      default:
        targetPage = `${getBasePrefix()}${pageMap[item.category] || "index.html"}`;
    }
    
    window.location.href = targetPage;
  }

  // Add event listeners to all search inputs
  searchInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      performSearch(e.target.value);
    });
    
    input.addEventListener("keydown", (e) => {
      const cards = searchResults ? searchResults.querySelectorAll(".result-card") : [];
      if (!cards.length) return;

      if (e.key === "ArrowDown") {
        selectedIndex = (selectedIndex + 1) % cards.length;
        updateSelectedCard(cards);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        selectedIndex = (selectedIndex - 1 + cards.length) % cards.length;
        updateSelectedCard(cards);
        e.preventDefault();
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        cards[selectedIndex].click();
      } else if (e.key === "Escape") {
        if (searchResults) searchResults.classList.remove("active");
        input.value = "";
        selectedIndex = -1;
      }
    });
    
    // Close search results when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchResults) return;
      if (!searchResults.contains(e.target) && !input.contains(e.target)) {
        searchResults.classList.remove("active");
      }
    });
  });

  function updateSelectedCard(cards) {
    cards.forEach(c => c.classList.remove("selected"));
    if (selectedIndex >= 0) {
      cards[selectedIndex].classList.add("selected");
      cards[selectedIndex].scrollIntoView({ block: "nearest" });
    }
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInputs.forEach(input => input.value = "");
      if (searchResults) searchResults.classList.remove("active");
      clearSearchBtn.style.display = "none";
      selectedIndex = -1;
    });
  }
}

// ================= SCROLL TO TOP =================
function initializeScrollTop() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================= COLLAPSIBLE SECTIONS =================
function initializeCollapsibles() {
  const collapsibleHeaders = document.querySelectorAll(".collapsible-header");
  
  collapsibleHeaders.forEach(header => {
    // Add keyboard accessibility
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    
    const content = header.nextElementSibling;
    if (!content) return;
    
    // Set initial state
    content.style.maxHeight = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    
    header.addEventListener("click", () => {
      toggleCollapsible(header, content);
    });
    
    // Keyboard support
    header.addEventListener("keydown", (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCollapsible(header, content);
      }
    });
  });
  
  function toggleCollapsible(header, content) {
    const isActive = content.classList.contains("active");
    
    // Close all other sections if this is being opened (accordion behavior)
    if (!isActive) {
      document.querySelectorAll(".collapsible-content.active").forEach(activeContent => {
        if (activeContent !== content) {
          const activeHeader = activeContent.previousElementSibling;
          closeCollapsible(activeHeader, activeContent);
        }
      });
    }
    
    if (isActive) {
      closeCollapsible(header, content);
    } else {
      openCollapsible(header, content);
    }
  }
  
  function openCollapsible(header, content) {
    content.classList.add("active");
    header.classList.add("active");
    header.setAttribute('aria-expanded', 'true');
    
    // Calculate the full height
    const fullHeight = content.scrollHeight;
    content.style.maxHeight = fullHeight + 'px';
    
    // Add a small delay to ensure smooth animation
    setTimeout(() => {
      content.style.maxHeight = 'none';
    }, 300);
  }
  
  function closeCollapsible(header, content) {
    content.classList.remove("active");
    header.classList.remove("active");
    header.setAttribute('aria-expanded', 'false');
    
    // Set to current height first, then animate to 0
    const currentHeight = content.scrollHeight;
    content.style.maxHeight = currentHeight + 'px';
    
    // Force reflow
    content.offsetHeight;
    
    // Animate to 0
    content.style.maxHeight = '0';
  }
}

// ================= PAGE CONTENT LOADING =================
function loadPageContent() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  
  // Set active nav link
  setActiveNavLink(page);
  
  // Load content based on page
  if (page === "index.html" || page === "" || page === "/") {
    loadHomePage();
  } 
  // Removed loadCategoryPage as we are now using static HTML with client-side filtering.
  // The logic is now handled by initializeCategoryFilter().
}

function setActiveNavLink(currentPage) {
  const navLinks = document.querySelectorAll("nav a");
  const normalize = (p) => String(p || "").split("/").pop();
  const current = normalize(currentPage);
  
  navLinks.forEach(link => {
    link.classList.remove("active");
    const linkPage = normalize(link.getAttribute("href"));
    if (linkPage === current) {
      link.classList.add("active");
    }
  });
  
  // Also check dropdown links and mark parent dropdown as active if needed
  const dropdownLinks = document.querySelectorAll(".dropdown-menu a");
  dropdownLinks.forEach(link => {
    const linkPage = normalize(link.getAttribute("href"));
    if (linkPage === current) {
      link.classList.add("active");
      // Mark parent dropdown as active
      const dropdown = link.closest('.nav-dropdown');
      if (dropdown) {
        dropdown.classList.add('active');
      }
    }
  });
}

function loadHomePage() {
  // Home page specific initialization
  // console.log("Loading home page content");
}

// ================= LEGACY ITEM PAGE UPGRADE =================
function upgradeLegacyItemPages() {
  const path = window.location.pathname.replace(/\\/g, '/');
  const isItemDetail = /(game-content\/fruits\/pages|game-content\/swords\/pages)\/.+\.html$/i.test(path);
  if (!isItemDetail) return;

  const hasNewLayout = document.querySelector('.collapsible-section');
  if (hasNewLayout) return; // already upgraded or using new layout

  const mainEl = document.querySelector('main');
  if (!mainEl) return;

  // Extract legacy sections if present
  const title = (mainEl.querySelector('h2') || mainEl.querySelector('h1'))?.textContent || document.title.replace(/\s*—.*$/, '');
  const descriptionEl = mainEl.querySelector('.description');
  const movesEl = mainEl.querySelector('.moves');
  const statsEl = mainEl.querySelector('.stats, .small-info ul');
  const prosConsEl = mainEl.querySelector('.pros-cons');

  // Gather stats as pairs if possible
  function buildStatsRows() {
    const rows = [];
    // Prefer explicit .stats list
    const statsList = mainEl.querySelector('.stats ul');
    const smallInfoList = mainEl.querySelector('.small-info ul');
    const list = statsList || smallInfoList;
    if (list) {
      list.querySelectorAll('li').forEach(li => {
        const html = li.innerHTML || '';
        const match = html.match(/<strong>([^<:]+):<\/strong>\s*(.*)/i);
        if (match) {
          rows.push(`<tr><td>${match[1].trim()}</td><td>${match[2].trim()}</td></tr>`);
        } else {
          rows.push(`<tr><td>Info</td><td>${li.textContent.trim()}</td></tr>`);
        }
      });
    }
    return rows.join('');
  }

  function buildMovesRows() {
    const list = movesEl ? movesEl.querySelector('ul') : null;
    const rows = [];
    if (list) {
      list.querySelectorAll('li').forEach(li => {
        const text = li.textContent || '';
        const keyMatch = text.match(/^(?:\s*[A-Z]\s*[:\-]\s*)?([A-Z])\b/i);
        const key = keyMatch ? keyMatch[1].toUpperCase() : '';
        const nameMatch = text.replace(/^[^:]*:\s*/,'');
        rows.push(`<tr><td>${nameMatch}</td><td>${key}</td><td></td></tr>`);
      });
    }
    return rows.join('');
  }

  function buildProsConsTable() {
    const pros = [];
    const cons = [];
    if (prosConsEl) {
      const headings = prosConsEl.querySelectorAll('h3');
      headings.forEach(h => {
        const ul = h.nextElementSibling && h.nextElementSibling.tagName === 'UL' ? h.nextElementSibling : null;
        if (!ul) return;
        const items = Array.from(ul.querySelectorAll('li')).map(li => `<li>${li.innerHTML}</li>`).join('');
        if (/pros/i.test(h.textContent)) pros.push(items);
        if (/cons/i.test(h.textContent)) cons.push(items);
      });
    }
    const prosHtml = pros.join('') || '<li>N/A</li>';
    const consHtml = cons.join('') || '<li>N/A</li>';
    return `<table class="dataTable"><tr><th>Pros</th><th>Cons</th></tr><tr><td><ul>${prosHtml}</ul></td><td><ul>${consHtml}</ul></td></tr></table>`;
  }

  const categoryLabel = /game-content\/fruits\/pages\//i.test(path) ? 'Fruit' : 'Sword';
  const descriptionHtml = descriptionEl ? descriptionEl.innerHTML.replace(/^[\s\S]*?<p>/,'<p>') : '<p></p>';
  const newHtml = `
    <section class="style-overview">
      <h2>${title} — ${categoryLabel}</h2>
      ${descriptionHtml}
    </section>
    <section class="blox-contents">
      <h3>Contents</h3>
      <ul>
        <li><a href="#stats">Stats</a></li>
        <li><a href="#moves">Moveset</a></li>
        <li><a href="#obtainment">Obtainment</a></li>
        <li><a href="#proscons">Pros & Cons</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </section>
    <div class="collapsible-section" id="stats">
      <h3 class="collapsible-header">Stats</h3>
      <div class="collapsible-content">
        <table class="dataTable"><tr><th>Attribute</th><th>Value</th></tr>${buildStatsRows()}</table>
      </div>
    </div>
    <div class="collapsible-section" id="moves">
      <h3 class="collapsible-header">Moveset</h3>
      <div class="collapsible-content">
        <table class="dataTable"><tr><th>Move</th><th>Key</th><th>Description</th></tr>${buildMovesRows()}</table>
      </div>
    </div>
    <div class="collapsible-section" id="obtainment">
      <h3 class="collapsible-header">Obtainment</h3>
      <div class="collapsible-content">
        <p></p>
      </div>
    </div>
    <div class="collapsible-section" id="proscons">
      <h3 class="collapsible-header">Pros & Cons</h3>
      <div class="collapsible-content">${buildProsConsTable()}</div>
    </div>
    <div class="collapsible-section" id="notes">
      <h3 class="collapsible-header">Notes</h3>
      <div class="collapsible-content"><ul></ul></div>
    </div>`;

  // Replace legacy content under <main>
  mainEl.innerHTML = newHtml;

  // Re-init collapsibles for the new content
  initializeCollapsibles();
}

// ================= UTILITY FUNCTIONS =================
function safeText(value) {
  return (value === undefined || value === null) ? "" : String(value);
}

function getPlaceholderImage(category = "") {
  // In a real app, you would have actual placeholder images
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZDNlM2ZmIi8+CjxwYXRoIGQ9Ik01MCAzMEM1My44MTM3IDMwIDU3IDMzLjE4NjMgNTcgMzdDNTcgNDAuODEzNyA1My44MTM3IDQ0IDUwIDQ0QzQ2LjE4NjMgNDQgNDMgNDAuODEzNyA0MyAzN0M0MyAzMy4xODYzIDQ2LjE4NjMgMzAgNTAgMzBaIiBmaWxsPSIjNzE5MWZmIi8+CjxwYXRoIGQ9Ik0zNSA2NUMzNSA2NSAzNSA2MCAzNSA1NUMzNSA1MCA0MCA0MCA1MCA0MEM2MCA0MCA2NSA1MCA2NSA1NUM2NSA2MCA2NSA2NSAzNSA2NVoiIGZpbGw9IiM3MTkxZmYiLz4KPC9zdmc+Cg==";
}

// ================= PAGINATION =================
function initializePagination() {
  const itemsPerPage = 12;
  const itemGrid = document.querySelector('.item-grid');
  if (!itemGrid) return;

  const allItems = Array.from(itemGrid.querySelectorAll('.category-card'));
  const totalItems = allItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return;

  let currentPage = 1;

  function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    allItems.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
    
    updatePaginationControls(page);
  }

  function updatePaginationControls(page) {
    let paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) {
      paginationContainer = document.createElement('div');
      paginationContainer.className = 'pagination';
      itemGrid.parentNode.insertBefore(paginationContainer, itemGrid.nextSibling);
    }

    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
    prevBtn.disabled = page === 1;
    prevBtn.addEventListener('click', () => {
      if (page > 1) showPage(page - 1);
    });
    paginationContainer.appendChild(prevBtn);

    // Page numbers
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      const firstBtn = document.createElement('button');
      firstBtn.textContent = '1';
      firstBtn.addEventListener('click', () => showPage(1));
      paginationContainer.appendChild(firstBtn);
      
      if (startPage > 2) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.className = 'page-info';
        paginationContainer.appendChild(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      pageBtn.className = i === page ? 'active' : '';
      pageBtn.addEventListener('click', () => showPage(i));
      paginationContainer.appendChild(pageBtn);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.className = 'page-info';
        paginationContainer.appendChild(ellipsis);
      }
      
      const lastBtn = document.createElement('button');
      lastBtn.textContent = totalPages;
      lastBtn.addEventListener('click', () => showPage(totalPages));
      paginationContainer.appendChild(lastBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.disabled = page === totalPages;
    nextBtn.addEventListener('click', () => {
      if (page < totalPages) showPage(page + 1);
    });
    paginationContainer.appendChild(nextBtn);

    // Page info
    const pageInfo = document.createElement('span');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    paginationContainer.appendChild(pageInfo);
  }

  showPage(1);
}

// ================= BREADCRUMBS =================
function initializeBreadcrumbs() {
  const path = window.location.pathname.replace(/\\/g, '/');
  const parts = path.split('/').filter(p => p && p !== 'main');

  const breadcrumb = document.createElement('div');
  breadcrumb.className = 'breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');

  // Home link
  const homeLink = document.createElement('a');
  homeLink.href = getBasePrefix() + 'index.html';
  homeLink.textContent = 'Home';
  breadcrumb.appendChild(homeLink);

  // Always show current page chip without intermediate folders
  const currentSeparator = document.createElement('span');
  currentSeparator.className = 'separator';
  currentSeparator.textContent = '›';
  breadcrumb.appendChild(currentSeparator);

  const current = document.createElement('span');
  current.className = 'current';
  const file = parts[parts.length - 1] || 'index.html';
  current.textContent = file.replace('.html', '').replace(/[-_]/g, ' ') || 'Home';
  breadcrumb.appendChild(current);

  // Insert breadcrumb inside the sticky nav so they are combined
  const nav = document.querySelector('nav');
  if (nav) {
    nav.appendChild(breadcrumb);
  }
}

// ================= LIGHTBOX =================
function initializeLightbox() {
  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="close">&times;</span>
    <img src="" alt="">
  `;
  document.body.appendChild(lightbox);

  // Add click handlers to images
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.closest('.category-card')) {
      e.preventDefault();
      const img = lightbox.querySelector('img');
      img.src = e.target.src;
      img.alt = e.target.alt;
      lightbox.classList.add('active');
    }
  });

  // Close lightbox
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('close')) {
      lightbox.classList.remove('active');
    }
  });

  // Close with escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
}

// ================= TOOLTIPS =================
function initializeTooltips() {
  // Add tooltips to category cards
  document.querySelectorAll('.category-card').forEach(card => {
    const title = card.querySelector('h3 a');
    if (title) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      
      const tooltipText = document.createElement('span');
      tooltipText.className = 'tooltiptext';
      tooltipText.textContent = `Click to view details about ${title.textContent}`;
      
      tooltip.appendChild(title.cloneNode(true));
      tooltip.appendChild(tooltipText);
      
      title.parentNode.replaceChild(tooltip, title);
    }
  });
}

// ================= COMPARISON TOOL =================
function initializeComparisonTool() {
  // Create comparison modal if it doesn't exist
  let comparisonModal = document.getElementById('comparison-modal');
  if (!comparisonModal) {
    comparisonModal = document.createElement('div');
    comparisonModal.id = 'comparison-modal';
    comparisonModal.className = 'comparison-modal';
    comparisonModal.innerHTML = `
      <div class="comparison-modal-content">
        <div class="comparison-header">
          <h3>Item Comparison</h3>
          <button class="close-comparison" aria-label="Close comparison">&times;</button>
        </div>
        <div class="comparison-grid" id="comparison-grid">
          <!-- Comparison items will be populated here -->
        </div>
        <div class="comparison-actions">
          <button class="btn btn-secondary" id="clear-comparison">Clear All</button>
          <button class="btn btn-primary" id="export-comparison">Export Comparison</button>
        </div>
      </div>
    `;
    document.body.appendChild(comparisonModal);
  }

  const items = Array.from(document.querySelectorAll('.category-card'));
  const selectedItems = [];
  const maxSelections = 3; // Allow up to 3 items for comparison

  // Add comparison buttons to items
  items.forEach(item => {
    const comparisonBtn = document.createElement('button');
    comparisonBtn.className = 'compare-btn';
    comparisonBtn.innerHTML = '⚖️';
    comparisonBtn.title = 'Add to comparison';
    comparisonBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleItemSelection(item);
    });
    item.appendChild(comparisonBtn);
  });

  function toggleItemSelection(item) {
    const itemName = item.querySelector('h3 a')?.textContent || 'Unknown Item';
    
    if (selectedItems.includes(item)) {
      // Remove from selection
      selectedItems.splice(selectedItems.indexOf(item), 1);
      item.classList.remove('selected');
      item.querySelector('.compare-btn').textContent = '⚖️';
    } else if (selectedItems.length < maxSelections) {
      // Add to selection
      selectedItems.push(item);
      item.classList.add('selected');
      item.querySelector('.compare-btn').textContent = '✓';
    } else {
      // Show limit reached message
      showNotification(`Maximum ${maxSelections} items can be compared at once.`);
      return;
    }

    updateComparisonDisplay();
  }

  function updateComparisonDisplay() {
    const comparisonGrid = document.getElementById('comparison-grid');
    comparisonGrid.innerHTML = '';

    if (selectedItems.length === 0) {
      comparisonModal.style.display = 'none';
      return;
    }

    selectedItems.forEach((item, index) => {
      const itemName = item.querySelector('h3 a')?.textContent || 'Unknown Item';
      const itemImage = item.querySelector('img')?.src || '';
      const itemDescription = item.querySelector('p')?.textContent || '';
      const rarityBadge = item.querySelector('.rarity-badge');
      const rarity = rarityBadge ? rarityBadge.textContent.toLowerCase() : 'unknown';

      // Get sample stats (in a real app, this would come from a database)
      const stats = getItemStats(itemName);

      const comparisonItem = document.createElement('div');
      comparisonItem.className = 'comparison-item';
      comparisonItem.innerHTML = `
        <div class="comparison-item-header">
          <img src="${itemImage}" alt="${itemName}" onerror="this.onerror=null; this.src='https://via.placeholder.com/100?text=${itemName}'">
          <h4>${itemName}</h4>
          <button class="remove-from-comparison" data-index="${index}">&times;</button>
        </div>
        <div class="comparison-stats">
          <div class="stat-row">
            <span class="stat-label">Rarity:</span>
            <span class="rarity-badge ${rarity}">${rarity}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Damage:</span>
            <span class="stat-value">${stats.damage}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Level Req:</span>
            <span class="stat-value">${stats.level}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Price:</span>
            <span class="stat-value">${stats.price.toLocaleString()} $</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Type:</span>
            <span class="stat-value">${stats.type}</span>
          </div>
        </div>
        <div class="comparison-description">
          <p>${itemDescription}</p>
        </div>
      `;
      comparisonGrid.appendChild(comparisonItem);
    });

    // Show modal if items are selected
    if (selectedItems.length > 0) {
      comparisonModal.style.display = 'flex';
    }
  }

  function getItemStats(itemName) {
    // Sample stats - in a real app, this would come from a database
    const statsMap = {
      'Dragon': { damage: 95, level: 1000, price: 3500000, type: 'Zoan' },
      'Kitsune': { damage: 90, level: 1000, price: 3200000, type: 'Zoan' },
      'Leopard': { damage: 88, level: 1000, price: 3000000, type: 'Zoan' },
      'Phoenix': { damage: 85, level: 1000, price: 2800000, type: 'Zoan' },
      'Venom': { damage: 82, level: 1000, price: 2500000, type: 'Paramecia' },
      'Dough': { damage: 80, level: 1000, price: 2400000, type: 'Paramecia' },
      'Shadow': { damage: 78, level: 1000, price: 2300000, type: 'Paramecia' },
      'Spirit': { damage: 75, level: 1000, price: 2200000, type: 'Paramecia' },
      'Control': { damage: 72, level: 1000, price: 2100000, type: 'Paramecia' },
      'Gravity': { damage: 70, level: 1000, price: 2000000, type: 'Paramecia' },
      'Pain': { damage: 68, level: 1000, price: 1900000, type: 'Paramecia' },
      'Love': { damage: 65, level: 1000, price: 1800000, type: 'Paramecia' },
      'Buddha': { damage: 62, level: 1000, price: 1700000, type: 'Zoan' },
      'Lightning': { damage: 85, level: 700, price: 1500000, type: 'Logia' },
      'Light': { damage: 82, level: 700, price: 1400000, type: 'Logia' },
      'Dark': { damage: 80, level: 700, price: 1300000, type: 'Logia' },
      'Flame': { damage: 78, level: 700, price: 1200000, type: 'Logia' },
      'Ice': { damage: 75, level: 700, price: 1100000, type: 'Logia' },
      'Magma': { damage: 72, level: 700, price: 1000000, type: 'Logia' },
      'Sand': { damage: 70, level: 700, price: 900000, type: 'Logia' },
      'Smoke': { damage: 68, level: 700, price: 800000, type: 'Logia' },
      'Gas': { damage: 65, level: 700, price: 700000, type: 'Logia' },
      'Quake': { damage: 88, level: 700, price: 1600000, type: 'Paramecia' },
      'String': { damage: 75, level: 700, price: 1000000, type: 'Paramecia' },
      'Rumble': { damage: 72, level: 700, price: 900000, type: 'Paramecia' },
      'Diamond': { damage: 70, level: 700, price: 800000, type: 'Paramecia' },
      'Door': { damage: 68, level: 700, price: 700000, type: 'Paramecia' },
      'Rubber': { damage: 65, level: 700, price: 600000, type: 'Paramecia' },
      'Barrier': { damage: 62, level: 700, price: 500000, type: 'Paramecia' }
    };

    return statsMap[itemName] || { damage: 50, level: 100, price: 1000, type: 'Unknown' };
  }

  function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--primary-color);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: var(--card-shadow);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Event listeners
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-comparison') || e.target === comparisonModal) {
      comparisonModal.style.display = 'none';
    }

    if (e.target.classList.contains('remove-from-comparison')) {
      const index = parseInt(e.target.dataset.index);
      const item = selectedItems[index];
      if (item) {
        toggleItemSelection(item);
      }
    }

    if (e.target.id === 'clear-comparison') {
      selectedItems.forEach(item => {
        item.classList.remove('selected');
        item.querySelector('.compare-btn').textContent = '⚖️';
      });
      selectedItems.length = 0;
      updateComparisonDisplay();
    }

    if (e.target.id === 'export-comparison') {
      exportComparison();
    }
  });

  function exportComparison() {
    const comparisonData = selectedItems.map(item => {
      const itemName = item.querySelector('h3 a')?.textContent || 'Unknown Item';
      const stats = getItemStats(itemName);
      return {
        name: itemName,
        ...stats
      };
    });

    const dataStr = JSON.stringify(comparisonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blox-fruits-comparison.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Comparison exported successfully!');
  }
}

// Global function for comparison (called from table)
function compareFruit(fruitName) {
  const fruitCard = document.querySelector(`.category-card:has(h3 a:contains("${fruitName}"))`);
  if (fruitCard) {
    const comparisonBtn = fruitCard.querySelector('.compare-btn');
    if (comparisonBtn) {
      comparisonBtn.click();
    }
  }
}

// ================= RATING SYSTEM =================
function initializeRatingSystem() {
  // Add rating systems to category cards
  document.querySelectorAll('.category-card').forEach(card => {
    addRatingSystemToCard(card);
  });

  // Initialize existing rating systems
  document.querySelectorAll('.rating-system').forEach(ratingContainer => {
    initializeRatingContainer(ratingContainer);
  });
}

function addRatingSystemToCard(card) {
  const itemName = card.querySelector('h3 a')?.textContent || 'Unknown Item';
  const itemId = itemName.toLowerCase().replace(/\s+/g, '-');
  
  // Check if rating system already exists
  if (card.querySelector('.rating-system')) return;

  // Create rating system
  const ratingSystem = document.createElement('div');
  ratingSystem.className = 'rating-system';
  ratingSystem.dataset.itemId = itemId;
  ratingSystem.innerHTML = `
    <div class="rating-stars">
      <span class="star" data-rating="1">★</span>
      <span class="star" data-rating="2">★</span>
      <span class="star" data-rating="3">★</span>
      <span class="star" data-rating="4">★</span>
      <span class="star" data-rating="5">★</span>
    </div>
    <div class="rating-info">
      <span class="rating-average">0.0</span>
      <span class="rating-count">(0 votes)</span>
    </div>
  `;

  // Insert after the description
  const description = card.querySelector('p');
  if (description) {
    description.parentNode.insertBefore(ratingSystem, description.nextSibling);
  } else {
    card.appendChild(ratingSystem);
  }

  initializeRatingContainer(ratingSystem);
  loadRatingData(ratingSystem);
}

function initializeRatingContainer(ratingContainer) {
  const stars = ratingContainer.querySelectorAll('.star');
  const itemId = ratingContainer.dataset.itemId;
  let currentRating = 0;
  let isHovering = false;

  // Load saved rating
  const savedRating = localStorage.getItem(`user_rating_${itemId}`);
  if (savedRating) {
    currentRating = parseInt(savedRating);
  }

  stars.forEach((star, index) => {
    star.addEventListener('click', (e) => {
      e.stopPropagation();
      const rating = parseInt(star.dataset.rating);
      currentRating = rating;
      updateStars();
      saveUserRating(itemId, rating);
      updateRatingData(ratingContainer);
      showRatingFeedback(rating);
    });

    star.addEventListener('mouseenter', () => {
      isHovering = true;
      const rating = parseInt(star.dataset.rating);
      highlightStars(rating);
    });
  });

  ratingContainer.addEventListener('mouseleave', () => {
    isHovering = false;
    updateStars();
  });

  function updateStars() {
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < currentRating);
    });
  }

  function highlightStars(rating) {
    if (isHovering) {
      stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
      });
    }
  }

  // Initial update
  updateStars();
}

function saveUserRating(itemId, rating) {
  localStorage.setItem(`user_rating_${itemId}`, rating);
  
  // Update global rating data
  const ratingData = getRatingData();
  if (!ratingData[itemId]) {
    ratingData[itemId] = { total: 0, count: 0, ratings: [] };
  }
  
  // Check if user already rated this item
  const existingRating = localStorage.getItem(`user_rating_${itemId}`);
  if (existingRating) {
    // Update existing rating
    const oldRating = parseInt(existingRating);
    ratingData[itemId].total = ratingData[itemId].total - oldRating + rating;
  } else {
    // Add new rating
    ratingData[itemId].total += rating;
    ratingData[itemId].count += 1;
    ratingData[itemId].ratings.push(rating);
  }
  
  localStorage.setItem('rating_data', JSON.stringify(ratingData));
}

function getRatingData() {
  const data = localStorage.getItem('rating_data');
  return data ? JSON.parse(data) : {};
}

function loadRatingData(ratingContainer) {
  const itemId = ratingContainer.dataset.itemId;
  const ratingData = getRatingData();
  
  if (ratingData[itemId]) {
    const average = ratingData[itemId].count > 0 ? 
      (ratingData[itemId].total / ratingData[itemId].count).toFixed(1) : '0.0';
    const count = ratingData[itemId].count;
    
    const averageElement = ratingContainer.querySelector('.rating-average');
    const countElement = ratingContainer.querySelector('.rating-count');
    
    if (averageElement) averageElement.textContent = average;
    if (countElement) countElement.textContent = `(${count} vote${count !== 1 ? 's' : ''})`;
  }
}

function updateRatingData(ratingContainer) {
  const itemId = ratingContainer.dataset.itemId;
  const ratingData = getRatingData();
  
  if (ratingData[itemId]) {
    const average = ratingData[itemId].count > 0 ? 
      (ratingData[itemId].total / ratingData[itemId].count).toFixed(1) : '0.0';
    const count = ratingData[itemId].count;
    
    const averageElement = ratingContainer.querySelector('.rating-average');
    const countElement = ratingContainer.querySelector('.rating-count');
    
    if (averageElement) averageElement.textContent = average;
    if (countElement) countElement.textContent = `(${count} vote${count !== 1 ? 's' : ''})`;
  }
}

function showRatingFeedback(rating) {
  const messages = [
    'Terrible!',
    'Poor',
    'Average',
    'Good!',
    'Excellent!'
  ];
  
  const message = messages[rating - 1] || 'Thanks for rating!';
  
  // Create feedback notification
  const feedback = document.createElement('div');
  feedback.className = 'rating-feedback';
  feedback.textContent = message;
  feedback.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: var(--card-shadow-hover);
    z-index: 10000;
    font-weight: var(--font-semibold);
    animation: ratingFeedback 2s ease forwards;
  `;
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.remove();
  }, 2000);
}

// Add rating feedback animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ratingFeedback {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    20% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.1);
    }
    80% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
  }
`;
document.head.appendChild(style);

// ================= ANIMATED STATS =================
function initializeAnimatedStats() {
  // Animate hero stats
  animateHeroStats();
  
  // Animate stat bars
  animateStatBars();
  
  // Animate counter numbers
  animateCounters();
}

function animateHeroStats() {
  const heroStats = document.querySelectorAll('.hero-stats .stat-number');
  if (heroStats.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target;
        const finalValue = statNumber.textContent;
        const isPlus = finalValue.includes('+');
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (numericValue > 0) {
          animateNumber(statNumber, 0, numericValue, 2000, isPlus);
          observer.unobserve(statNumber);
        }
      }
    });
  }, { threshold: 0.5 });

  heroStats.forEach(stat => observer.observe(stat));
}

function animateStatBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statFill = entry.target.querySelector('.stat-fill');
        if (statFill && !statFill.classList.contains('animate')) {
          const targetWidth = statFill.dataset.width || '0%';
          statFill.style.setProperty('--target-width', targetWidth);
          statFill.classList.add('animate');
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.animated-stat').forEach(stat => {
    observer.observe(stat);
  });
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const finalValue = parseInt(counter.dataset.count || counter.textContent);
        const suffix = counter.dataset.suffix || '';
        
        animateNumber(counter, 0, finalValue, 2000, false, suffix);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateNumber(element, start, end, duration, isPlus = false, suffix = '') {
  const startTime = performance.now();
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(start + (end - start) * easeOutQuart);
    
    let displayValue = currentValue.toString();
    if (isPlus && currentValue === end) {
      displayValue += '+';
    }
    if (suffix) {
      displayValue += suffix;
    }
    
    element.textContent = displayValue;
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  
  requestAnimationFrame(updateNumber);
}

// Add animated stats to featured section
function addAnimatedStatsToFeatured() {
  const featuredItems = document.querySelectorAll('.featured-item');
  
  featuredItems.forEach(item => {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'featured-stats';
    statsContainer.innerHTML = `
      <div class="stat-item">
        <div class="stat-label">Damage</div>
        <div class="stat-bar">
          <div class="stat-fill" data-width="85%" style="--target-width: 0%;"></div>
        </div>
        <div class="stat-value">85</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Speed</div>
        <div class="stat-bar">
          <div class="stat-fill" data-width="72%" style="--target-width: 0%;"></div>
        </div>
        <div class="stat-value">72</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Range</div>
        <div class="stat-bar">
          <div class="stat-fill" data-width="68%" style="--target-width: 0%;"></div>
        </div>
        <div class="stat-value">68</div>
      </div>
    `;
    
    item.appendChild(statsContainer);
  });
}

// Initialize animated stats when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  addAnimatedStatsToFeatured();
});

// ================= BACK TO TOP BUTTON =================
function initializeBackToTop() {
  // Create back to top button if it doesn't exist
  let backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.setAttribute('title', 'Back to top');
    document.body.appendChild(backToTopBtn);
  }
  
  // Show/hide button based on scroll position
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
  
  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Add event listeners
  window.addEventListener('scroll', toggleBackToTop);
  backToTopBtn.addEventListener('click', scrollToTop);
  
  // Initial check
  toggleBackToTop();
}

// ================= SORTABLE TABLES =================
function initializeSortableTables() {
  const table = document.getElementById('fruits-table');
  if (!table) return;

  // Sample fruit data
  const fruitsData = [
    { name: 'Dragon', rarity: 'mythical', type: 'zoan', damage: 95, level: 1000, price: 3500000, link: 'game-content/fruits/pages/dragon.html' },
    { name: 'Kitsune', rarity: 'mythical', type: 'zoan', damage: 90, level: 1000, price: 3200000, link: 'game-content/fruits/pages/kitsune.html' },
    { name: 'Leopard', rarity: 'mythical', type: 'zoan', damage: 88, level: 1000, price: 3000000, link: 'game-content/fruits/pages/leopard.html' },
    { name: 'Phoenix', rarity: 'mythical', type: 'zoan', damage: 85, level: 1000, price: 2800000, link: 'game-content/fruits/pages/phoenix.html' },
    { name: 'Venom', rarity: 'mythical', type: 'paramecia', damage: 82, level: 1000, price: 2500000, link: 'game-content/fruits/pages/venom.html' },
    { name: 'Dough', rarity: 'mythical', type: 'paramecia', damage: 80, level: 1000, price: 2400000, link: 'game-content/fruits/pages/dough.html' },
    { name: 'Shadow', rarity: 'mythical', type: 'paramecia', damage: 78, level: 1000, price: 2300000, link: 'game-content/fruits/pages/shadow.html' },
    { name: 'Spirit', rarity: 'mythical', type: 'paramecia', damage: 75, level: 1000, price: 2200000, link: 'game-content/fruits/pages/spirit.html' },
    { name: 'Control', rarity: 'mythical', type: 'paramecia', damage: 72, level: 1000, price: 2100000, link: 'game-content/fruits/pages/control.html' },
    { name: 'Gravity', rarity: 'mythical', type: 'paramecia', damage: 70, level: 1000, price: 2000000, link: 'game-content/fruits/pages/gravity.html' },
    { name: 'Pain', rarity: 'mythical', type: 'paramecia', damage: 68, level: 1000, price: 1900000, link: 'game-content/fruits/pages/pain.html' },
    { name: 'Love', rarity: 'mythical', type: 'paramecia', damage: 65, level: 1000, price: 1800000, link: 'game-content/fruits/pages/love.html' },
    { name: 'Buddha', rarity: 'mythical', type: 'zoan', damage: 62, level: 1000, price: 1700000, link: 'game-content/fruits/pages/buddha.html' },
    { name: 'Lightning', rarity: 'legendary', type: 'logia', damage: 85, level: 700, price: 1500000, link: 'game-content/fruits/pages/lightning.html' },
    { name: 'Light', rarity: 'legendary', type: 'logia', damage: 82, level: 700, price: 1400000, link: 'game-content/fruits/pages/light.html' },
    { name: 'Dark', rarity: 'legendary', type: 'logia', damage: 80, level: 700, price: 1300000, link: 'game-content/fruits/pages/dark.html' },
    { name: 'Flame', rarity: 'legendary', type: 'logia', damage: 78, level: 700, price: 1200000, link: 'game-content/fruits/pages/flame.html' },
    { name: 'Ice', rarity: 'legendary', type: 'logia', damage: 75, level: 700, price: 1100000, link: 'game-content/fruits/pages/ice.html' },
    { name: 'Magma', rarity: 'legendary', type: 'logia', damage: 72, level: 700, price: 1000000, link: 'game-content/fruits/pages/magma.html' },
    { name: 'Sand', rarity: 'legendary', type: 'logia', damage: 70, level: 700, price: 900000, link: 'game-content/fruits/pages/sand.html' },
    { name: 'Smoke', rarity: 'legendary', type: 'logia', damage: 68, level: 700, price: 800000, link: 'game-content/fruits/pages/smoke.html' },
    { name: 'Gas', rarity: 'legendary', type: 'logia', damage: 65, level: 700, price: 700000, link: 'game-content/fruits/pages/gas.html' },
    { name: 'Quake', rarity: 'legendary', type: 'paramecia', damage: 88, level: 700, price: 1600000, link: 'game-content/fruits/pages/quake.html' },
    { name: 'String', rarity: 'legendary', type: 'paramecia', damage: 75, level: 700, price: 1000000, link: 'game-content/fruits/pages/string.html' },
    { name: 'Rumble', rarity: 'legendary', type: 'paramecia', damage: 72, level: 700, price: 900000, link: 'game-content/fruits/pages/rumble.html' },
    { name: 'Diamond', rarity: 'legendary', type: 'paramecia', damage: 70, level: 700, price: 800000, link: 'game-content/fruits/pages/diamond.html' },
    { name: 'Door', rarity: 'legendary', type: 'paramecia', damage: 68, level: 700, price: 700000, link: 'game-content/fruits/pages/door.html' },
    { name: 'Rubber', rarity: 'legendary', type: 'paramecia', damage: 65, level: 700, price: 600000, link: 'game-content/fruits/pages/rubber.html' },
    { name: 'Barrier', rarity: 'legendary', type: 'paramecia', damage: 62, level: 700, price: 500000, link: 'game-content/fruits/pages/barrier.html' },
    { name: 'Bomb', rarity: 'rare', type: 'paramecia', damage: 60, level: 400, price: 300000, link: 'game-content/fruits/pages/bomb.html' },
    { name: 'Spike', rarity: 'rare', type: 'paramecia', damage: 58, level: 400, price: 280000, link: 'game-content/fruits/pages/spike.html' },
    { name: 'Chop', rarity: 'rare', type: 'paramecia', damage: 55, level: 400, price: 250000, link: 'game-content/fruits/pages/chop.html' },
    { name: 'Spring', rarity: 'rare', type: 'paramecia', damage: 52, level: 400, price: 220000, link: 'game-content/fruits/pages/spring.html' },
    { name: 'Kilogram', rarity: 'rare', type: 'paramecia', damage: 50, level: 400, price: 200000, link: 'game-content/fruits/pages/kilogram.html' },
    { name: 'Spin', rarity: 'rare', type: 'paramecia', damage: 48, level: 400, price: 180000, link: 'game-content/fruits/pages/spin.html' },
    { name: 'Bird: Falcon', rarity: 'rare', type: 'zoan', damage: 45, level: 400, price: 150000, link: 'game-content/fruits/pages/falcon.html' },
    { name: 'Smoke', rarity: 'rare', type: 'logia', damage: 42, level: 400, price: 120000, link: 'game-content/fruits/pages/smoke.html' },
    { name: 'Spike', rarity: 'rare', type: 'paramecia', damage: 40, level: 400, price: 100000, link: 'game-content/fruits/pages/spike.html' },
    { name: 'Flame', rarity: 'rare', type: 'logia', damage: 38, level: 400, price: 80000, link: 'game-content/fruits/pages/flame.html' },
    { name: 'Ice', rarity: 'rare', type: 'logia', damage: 35, level: 400, price: 60000, link: 'game-content/fruits/pages/ice.html' },
    { name: 'Sand', rarity: 'rare', type: 'logia', damage: 32, level: 400, price: 40000, link: 'game-content/fruits/pages/sand.html' },
    { name: 'Dark', rarity: 'rare', type: 'logia', damage: 30, level: 400, price: 20000, link: 'game-content/fruits/pages/dark.html' },
    { name: 'Light', rarity: 'rare', type: 'logia', damage: 28, level: 400, price: 10000, link: 'game-content/fruits/pages/light.html' },
    { name: 'Rocket', rarity: 'common', type: 'paramecia', damage: 25, level: 100, price: 5000, link: 'game-content/fruits/pages/rocket.html' },
    { name: 'Spin', rarity: 'common', type: 'paramecia', damage: 22, level: 100, price: 4000, link: 'game-content/fruits/pages/spin.html' },
    { name: 'Chop', rarity: 'common', type: 'paramecia', damage: 20, level: 100, price: 3000, link: 'game-content/fruits/pages/chop.html' },
    { name: 'Spring', rarity: 'common', type: 'paramecia', damage: 18, level: 100, price: 2000, link: 'game-content/fruits/pages/spring.html' },
    { name: 'Bomb', rarity: 'common', type: 'paramecia', damage: 15, level: 100, price: 1000, link: 'game-content/fruits/pages/bomb.html' },
    { name: 'Smoke', rarity: 'common', type: 'logia', damage: 12, level: 100, price: 500, link: 'game-content/fruits/pages/smoke.html' },
    { name: 'Spike', rarity: 'common', type: 'paramecia', damage: 10, level: 100, price: 250, link: 'game-content/fruits/pages/spike.html' }
  ];

  let currentData = [...fruitsData];
  let currentSort = { column: null, direction: 'asc' };

  // Populate table
  function populateTable(data) {
    const tbody = document.getElementById('fruits-table-body');
    tbody.innerHTML = '';

    data.forEach(fruit => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><a href="${fruit.link}" style="color: var(--primary-color); text-decoration: none;">${fruit.name}</a></td>
        <td><span class="rarity-badge ${fruit.rarity}">${fruit.rarity}</span></td>
        <td>${fruit.type}</td>
        <td>${fruit.damage}</td>
        <td>${fruit.level}</td>
        <td>${fruit.price.toLocaleString()} $</td>
        <td>
          <div class="table-actions">
            <button onclick="window.open('${fruit.link}', '_blank')">View</button>
            <button onclick="compareFruit('${fruit.name}')">Compare</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  // Sort table
  function sortTable(column, direction) {
    currentData.sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];

      if (column === 'name') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    populateTable(currentData);
  }

  // Filter table
  function filterTable() {
    const rarityFilter = document.getElementById('rarity-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    const searchFilter = document.getElementById('table-search').value.toLowerCase();

    currentData = fruitsData.filter(fruit => {
      const matchesRarity = !rarityFilter || fruit.rarity === rarityFilter;
      const matchesType = !typeFilter || fruit.type === typeFilter;
      const matchesSearch = !searchFilter || fruit.name.toLowerCase().includes(searchFilter);

      return matchesRarity && matchesType && matchesSearch;
    });

    populateTable(currentData);
  }

  // Add event listeners
  document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', () => {
      const column = header.dataset.sort;
      let direction = 'asc';

      if (currentSort.column === column) {
        direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
      }

      // Update sort indicators
      document.querySelectorAll('.sortable').forEach(h => {
        h.classList.remove('sort-asc', 'sort-desc');
      });
      header.classList.add(`sort-${direction}`);

      currentSort = { column, direction };
      sortTable(column, direction);
    });
  });

  document.getElementById('rarity-filter').addEventListener('change', filterTable);
  document.getElementById('type-filter').addEventListener('change', filterTable);
  document.getElementById('table-search').addEventListener('input', filterTable);

  // Initial population
  populateTable(currentData);
}

// Global function for comparison
function compareFruit(fruitName) {
  console.log(`Comparing fruit: ${fruitName}`);
  // This would integrate with the comparison tool
}
