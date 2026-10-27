/**
 * Equinest Global Sticky Navigation Bar & Authentication Gateway
 * Handles dynamic user sessions, login/signup modal, role switching, and notifications
 */

let authModalOptions = {
  tab: "signup",
  intentMessage: "",
  onSuccessRedirect: null,
  onSuccessCallback: null
};

function renderEquinestNavbar(activePage = "home") {
  const mountEl = document.getElementById("equinest-navbar");
  if (!mountEl) return;

  const isAuth = EquinestState.isAuthenticated();
  const currentUser = EquinestState.getCurrentUser();
  const unreadCount = EquinestState.getUnreadNotificationCount();

  const isHomePage = (
    activePage === "home" || 
    (typeof document !== "undefined" && document.body && document.body.dataset && document.body.dataset.page === "home")
  );

  const allLinks = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "marketplace", label: "Marketplace", href: "marketplace.html", badge: "Page 1" },
    { id: "partner", label: "Find Partner", href: "partner.html", badge: "Page 2" },
    { id: "pricing", label: "Pricing", href: "pricing.html" },
    { id: "inbox", label: "Inbox Portal", href: "inbox.html", hasBadge: true }
  ];

  // On home page only: remove Marketplace (Page 1) and Find Partner (Page 2)
  const links = isHomePage 
    ? allLinks.filter(l => l.id !== "marketplace" && l.id !== "partner")
    : allLinks;

  mountEl.innerHTML = `
    <header class="sticky top-0 z-50 w-full border-b border-[#222222] nav-blur">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-18 py-3">
          
          <!-- Left: Brand Logo & Create Profile -->
          <div class="flex items-center space-x-6">
            <a href="index.html" class="flex items-center space-x-2 group">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2D2D] to-[#990000] flex items-center justify-center font-bold text-white text-lg shadow-md group-hover:scale-105 transition-transform">
                E
              </div>
              <span class="text-xl font-extrabold tracking-tight text-white flex items-center">
                Equinest<span class="w-2 h-2 rounded-full bg-[#FF2D2D] inline-block ml-0.5 animate-pulse-red"></span>
              </span>
            </a>

            <!-- Quick Create Profile Button (Protected by Auth) -->
            <button 
              onclick="handleCreateProfileNavClick()" 
              class="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#1c1c1c] hover:bg-[#252525] text-white border border-[#333333] hover:border-[#FF2D2D] transition-all"
            >
              <svg class="w-3.5 h-3.5 text-[#FF2D2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Create Profile</span>
            </button>
          </div>

          <!-- Middle: Navigation Links -->
          <nav class="hidden lg:flex items-center space-x-1">
            ${links.map(link => {
              const isActive = activePage === link.id;
              // Pricing and Inbox always require login before navigating
              const authRequired = (link.id === "pricing" || link.id === "inbox");
              const linkHref = authRequired ? "javascript:void(0)" : link.href;
              const clickHandler = authRequired
                ? `onclick="EquinestAuth.requireAuth(function(){ window.location.href='${link.href}'; }, 'Please sign in to access ${link.label}.', '${link.href}'); return false;"`
                : "";
              return `
                <a href="${linkHref}" ${clickHandler} class="relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  isActive 
                    ? "text-[#FF2D2D] bg-[#1a0a0a]" 
                    : "text-[#A0A0A0] hover:text-white hover:bg-[#141414]"
                }">
                  ${link.label}
                  ${authRequired && !isAuth ? `<span class="ml-1 text-[9px] px-1 py-0.5 rounded bg-[#1e1e1e] text-[#FF5555] border border-[#333] align-middle">🔒</span>` : ""}
                  ${link.badge ? `<span class="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#222222] text-[#888888]">${link.badge}</span>` : ""}
                  ${link.hasBadge ? `
                    <span id="nav-unread-badge" class="${unreadCount > 0 ? 'inline-flex' : 'hidden'} ml-1.5 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-[#FF2D2D] text-white">
                      ${unreadCount}
                    </span>
                  ` : ""}
                  ${isActive ? `<span class="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FF2D2D] rounded-full"></span>` : ""}
                </a>
              `;
            }).join("")}
          </nav>

          <!-- Right: Search Bar & Auth / User Session -->
          <div class="flex items-center space-x-3">
            
            <!-- Quick Search Bar Trigger (Hidden on Home Page only) -->
            ${!isHomePage ? `
              <div class="relative hidden sm:block">
                <div class="flex items-center bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-xs text-[#888888] focus-within:border-[#FF2D2D] focus-within:text-white transition-colors">
                  <svg class="w-3.5 h-3.5 mr-2 text-[#777777]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input 
                    type="text" 
                    id="nav-quick-search"
                    placeholder="Search startups, partners..." 
                    class="bg-transparent border-none outline-none text-white text-xs placeholder-[#666666] w-32 xl:w-40"
                    onkeydown="if(event.key==='Enter'){ window.location.href = 'marketplace.html?search=' + encodeURIComponent(this.value); }"
                  />
                  <kbd class="hidden xl:inline-block ml-1 text-[10px] px-1 bg-[#222222] text-[#666666] rounded border border-[#333333]">↵</kbd>
                </div>
              </div>
            ` : ''}

            <!-- Conditional: Logged-in User Card vs Login/Signup Buttons -->
            ${isAuth ? (
              !isHomePage ? `
                <!-- Logged-in User Session Card with Dropdown (Hidden on Home Page only) -->
                <div class="relative" id="user-session-container">
                  <button 
                    id="user-session-btn"
                    class="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] border border-[#2e2e2e] text-left transition-all group"
                    aria-haspopup="true"
                  >
                  <img src="${currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}" alt="${currentUser.displayName}" class="w-7 h-7 rounded-full object-cover border border-[#444444]" />
                  <div class="hidden sm:block text-left">
                    <div class="text-[11px] font-semibold text-white leading-tight flex items-center">
                      <span class="text-[#888888] font-normal mr-1">Welcome,</span>
                      <span class="truncate max-w-[100px] text-white font-bold">${currentUser.displayName.split(" ")[0]}</span>
                      <span class="ml-1.5 text-[9px] px-1.5 py-0.2 rounded font-mono ${currentUser.canInvest ? 'bg-red-950/70 text-[#FF5555] border border-red-900/50' : 'bg-gray-800 text-gray-300'}">
                        ${(currentUser.roleType || 'USER').toUpperCase()}
                      </span>
                    </div>
                    <div class="text-[9px] text-[#888888] truncate max-w-[130px] font-mono">${currentUser.email}</div>
                  </div>
                  <svg class="w-3 h-3 text-[#777777] group-hover:text-white transition-colors ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <!-- User Dropdown Menu -->
                <div 
                  id="user-session-menu" 
                  class="hidden absolute right-0 mt-2 w-72 rounded-xl bg-[#141414] border border-[#2b2b2b] shadow-2xl p-2 z-50 text-xs"
                >
                  <div class="px-3 py-2.5 border-b border-[#222222] mb-1">
                    <div class="text-[10px] uppercase font-bold tracking-wider text-[#777777]">Authenticated Session</div>
                    <div class="font-bold text-white text-sm mt-0.5">${currentUser.displayName}</div>
                    <div class="text-[11px] text-[#A0A0A0] font-mono">${currentUser.email}</div>
                    ${currentUser.phone ? `<div class="text-[10px] text-[#777777] font-mono mt-0.5">📞 ${currentUser.phone}</div>` : ''}
                    <div class="mt-1.5 inline-block text-[9px] px-2 py-0.5 rounded bg-[#1e1e1e] text-[#FF5555] border border-[#333333]">
                      Plan: ${currentUser.plan || 'Standard'}
                    </div>
                  </div>

                  <!-- Quick Demo Role Switcher section -->
                  <div class="px-2 pt-1 pb-1">
                    <div class="text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1.5">Switch Persona (Demo)</div>
                    ${MOCK_CURRENT_USERS.filter(u => u.roleType !== "visitor").map(u => `
                      <button 
                        onclick="handleRoleSwitch('${u.roleId}')" 
                        class="w-full flex items-center justify-between p-1.5 rounded-lg text-left text-[11px] hover:bg-[#1a1a1a] transition-colors ${u.email === currentUser.email ? 'text-[#FF2D2D] font-bold' : 'text-[#A0A0A0] hover:text-white'}"
                      >
                        <span class="truncate">${u.displayName} (${u.roleType})</span>
                        ${u.email === currentUser.email ? '<span>✓</span>' : ''}
                      </button>
                    `).join("")}
                  </div>

                  <!-- Action Links & Logout Button -->
                  <div class="pt-2 border-t border-[#222222] mt-1 space-y-1">
                    <a href="inbox.html" class="flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] text-[#A0A0A0] hover:text-white hover:bg-[#1a1a1a]">
                      <span>Open Inbox Portal</span>
                      <span class="text-xs px-1.5 py-0.2 rounded-full bg-[#FF2D2D] text-white font-bold">${unreadCount}</span>
                    </a>
                    <button 
                      onclick="EquinestAuth.handleLogout()" 
                      class="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-[11px] text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors font-semibold"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ` : '') : `
              <!-- Unauthenticated State: Log In & Sign Up Buttons -->
              <div class="flex items-center space-x-2">
                <button 
                  onclick="EquinestAuth.openAuthModal({ tab: 'login' })"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#D0D0D0] hover:text-white bg-[#161616] hover:bg-[#202020] border border-[#2e2e2e] transition-all"
                >
                  Log In
                </button>
                <button 
                  onclick="EquinestAuth.openAuthModal({ tab: 'signup' })"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white btn-red shadow-sm shadow-red-950/50 transition-all flex items-center space-x-1"
                >
                  <span>Sign Up</span>
                  <span class="text-[10px] opacity-75">🇳🇵</span>
                </button>
              </div>
            `}

            <!-- Mobile Menu Toggle Button -->
            <button 
              id="mobile-menu-btn" 
              class="lg:hidden p-2 rounded-lg bg-[#161616] text-[#A0A0A0] hover:text-white border border-[#2a2a2a]"
              aria-label="Toggle mobile menu"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>

          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-menu-drawer" class="hidden lg:hidden border-t border-[#222222] bg-[#0c0c0c] px-4 pt-3 pb-5 space-y-2">
        <button onclick="handleCreateProfileNavClick()" class="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg btn-red text-xs font-semibold mb-3">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Create New Profile</span>
        </button>

        ${!isAuth ? `
          <div class="grid grid-cols-2 gap-2 pb-2 mb-2 border-b border-[#222222]">
            <button onclick="EquinestAuth.openAuthModal({ tab: 'login' })" class="w-full py-2 rounded-lg text-xs font-semibold btn-secondary text-center">Log In</button>
            <button onclick="EquinestAuth.openAuthModal({ tab: 'signup' })" class="w-full py-2 rounded-lg text-xs font-bold btn-red text-center">Sign Up</button>
          </div>
        ` : (
          !isHomePage ? `
            <div class="p-3 rounded-xl bg-[#141414] border border-[#242424] mb-3 flex items-center justify-between">
              <div class="flex items-center space-x-2.5">
                <img src="${currentUser.avatar}" class="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div class="text-xs font-bold text-white">Welcome, ${currentUser.displayName}</div>
                  <div class="text-[10px] text-[#888888] font-mono">${currentUser.email}</div>
                </div>
              </div>
              <button onclick="EquinestAuth.handleLogout()" class="text-xs text-red-400 font-semibold">Log Out</button>
            </div>
          ` : ''
        )}

        ${links.map(link => {
          const isActive = activePage === link.id;
          const authRequired = (link.id === "pricing" || link.id === "inbox");
          const linkHref = authRequired ? "javascript:void(0)" : link.href;
          const clickHandler = authRequired
            ? `onclick="EquinestAuth.requireAuth(function(){ window.location.href='${link.href}'; }, 'Please sign in to access ${link.label}.', '${link.href}'); return false;"`
            : "";
          return `
            <a href="${linkHref}" ${clickHandler} class="flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer ${
              isActive ? 'bg-[#1e0a0a] text-[#FF2D2D] font-bold' : 'text-[#A0A0A0] hover:bg-[#161616] hover:text-white'
            }">
              <span>${link.label}${authRequired && !isAuth ? ' 🔒' : ''}</span>
              ${link.hasBadge && unreadCount > 0 ? `<span class="px-2 py-0.5 text-xs font-bold rounded-full bg-[#FF2D2D] text-white">${unreadCount}</span>` : ''}
            </a>
          `;
        }).join("")}
      </div>
    </header>
  `;

  // Ensure Global Auth Modal is mounted in body
  ensureAuthModalMounted();

  // Attach Event Listeners
  setupNavbarEvents();
}

function setupNavbarEvents() {
  const sessionBtn = document.getElementById("user-session-btn");
  const sessionMenu = document.getElementById("user-session-menu");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-menu-drawer");

  if (sessionBtn && sessionMenu) {
    sessionBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sessionMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!sessionMenu.contains(e.target) && !sessionBtn.contains(e.target)) {
        sessionMenu.classList.add("hidden");
      }
    });
  }

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener("click", () => {
      mobileDrawer.classList.toggle("hidden");
    });
  }

  // Update badge on notification changes
  window.addEventListener("equinest:notifications_changed", () => {
    const unread = EquinestState.getUnreadNotificationCount();
    const badge = document.getElementById("nav-unread-badge");
    if (badge) {
      badge.textContent = unread;
      if (unread > 0) {
        badge.classList.remove("hidden");
        badge.classList.add("inline-flex");
      } else {
        badge.classList.add("hidden");
        badge.classList.remove("inline-flex");
      }
    }
  });

  // Re-render navbar on auth or user change
  window.addEventListener("equinest:auth_changed", () => {
    const activeMeta = document.body.dataset.page || "home";
    renderEquinestNavbar(activeMeta);
  });
}

function handleCreateProfileNavClick() {
  EquinestAuth.requireAuth(
    () => { window.location.href = "create-profile.html"; },
    "Please log in or create an account to publish your startup or investor profile.",
    "create-profile.html"
  );
}

function handleRoleSwitch(roleId) {
  const newUser = EquinestState.switchRole(roleId);
  if (newUser) {
    showToast(`Switched active session to ${newUser.displayName} (${newUser.subtitle})`, "info");
    const activeMeta = document.body.dataset.page || "home";
    renderEquinestNavbar(activeMeta);
    if (window.onRoleChanged) {
      window.onRoleChanged(newUser);
    } else {
      setTimeout(() => window.location.reload(), 400);
    }
  }
}

// ==========================================
// SLEEK DARK AUTHENTICATION MODAL SYSTEM
// ==========================================
function ensureAuthModalMounted() {
  if (document.getElementById("equinest-auth-modal")) return;

  const modalHtml = `
    <div id="equinest-auth-modal" class="hidden fixed inset-0 z-[200] flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-[#111111] border border-[#2b2b2b] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Close Button -->
        <button onclick="EquinestAuth.closeAuthModal()" class="absolute top-5 right-5 text-[#777777] hover:text-white text-xl">✕</button>

        <!-- Brand Icon & Header -->
        <div class="text-center mb-6">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF2D2D] to-[#990000] text-white font-extrabold text-xl shadow-lg shadow-red-950/60 mb-3">
            E
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center">
            Equinest Identity<span class="w-2 h-2 rounded-full bg-[#FF2D2D] inline-block ml-1 animate-pulse-red"></span>
          </h2>
          <p id="auth-modal-subtitle" class="text-xs text-[#888888] mt-1">
            Access startup equity & silent partner marketplace
          </p>

          <!-- Intent Alert Banner (Shows when triggered by a gated action) -->
          <div id="auth-intent-banner" class="hidden mt-3 p-2.5 rounded-xl bg-red-950/40 border border-red-900/50 text-left text-xs text-red-300 flex items-start space-x-2">
            <span class="text-sm">🔒</span>
            <div id="auth-intent-text" class="leading-tight">Authentication required to proceed.</div>
          </div>
        </div>

        <!-- Toggle Tabs: [Sign Up] vs [Log In] -->
        <div class="flex rounded-xl bg-[#181818] border border-[#262626] p-1 mb-6">
          <button 
            id="auth-tab-signup-btn" 
            onclick="EquinestAuth.switchAuthTab('signup')" 
            class="w-1/2 py-2 rounded-lg text-xs font-bold transition-all bg-[#FF2D2D] text-white shadow-md shadow-red-950/40"
          >
            Sign Up
          </button>
          <button 
            id="auth-tab-login-btn" 
            onclick="EquinestAuth.switchAuthTab('login')" 
            class="w-1/2 py-2 rounded-lg text-xs font-semibold text-[#888888] hover:text-white transition-all"
          >
            Log In
          </button>
        </div>

        <!-- Error Message Alert -->
        <div id="auth-error-msg" class="hidden mb-4 p-3 rounded-xl bg-[#250d0d] border border-red-700/60 text-xs text-red-300">
        </div>

        <!-- SIGN UP FORM -->
        <form id="auth-signup-form" onsubmit="EquinestAuth.handleSignUp(event)" class="space-y-4">
          <div>
            <label class="block text-[11px] font-semibold text-[#888888] uppercase mb-1">Full Legal Name *</label>
            <input 
              type="text" 
              id="auth-signup-name" 
              required 
              placeholder="e.g. Rameshwar Neupane" 
              class="w-full px-3.5 py-2.5 text-xs input-dark" 
            />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-[#888888] uppercase mb-1">Email Address *</label>
            <input 
              type="email" 
              id="auth-signup-email" 
              required 
              placeholder="name@gmail.com" 
              class="w-full px-3.5 py-2.5 text-xs input-dark font-mono" 
            />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-[#888888] uppercase mb-1">Phone Number (Nepal +977) *</label>
            <div class="flex items-center space-x-2">
              <span class="px-3 py-2.5 rounded-lg bg-[#181818] border border-[#333333] text-xs text-[#CCCCCC] font-mono flex items-center space-x-1 flex-shrink-0">
                <span>🇳🇵</span>
                <span>+977</span>
              </span>
              <input 
                type="tel" 
                id="auth-signup-phone" 
                required 
                placeholder="9841234567" 
                class="w-full px-3.5 py-2.5 text-xs input-dark font-mono" 
              />
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-[#888888] uppercase mb-1">Password *</label>
            <div class="relative">
              <input 
                type="password" 
                id="auth-signup-password" 
                required 
                placeholder="At least 6 characters" 
                class="w-full px-3.5 py-2.5 text-xs input-dark pr-10" 
              />
              <button 
                type="button" 
                onclick="EquinestAuth.togglePasswordVisibility('auth-signup-password')" 
                class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#777777] hover:text-white"
              >👁️</button>
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-[#888888] uppercase mb-1">Primary Role *</label>
            <select id="auth-signup-role" class="w-full px-3.5 py-2 text-xs input-dark">
              <option value="investor">Angel / Retail Investor (Can invest in deals)</option>
              <option value="founder">Startup Founder (Raising capital)</option>
              <option value="partner">Local Business Partner (Cafe, Chiya, Hotel)</option>
            </select>
          </div>

          <button 
            type="submit" 
            class="w-full py-3.5 rounded-xl btn-red text-xs font-bold shadow-lg shadow-red-950/50 mt-2 flex items-center justify-center space-x-2"
          >
            <span>Create Account & Get Started</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>

        <!-- LOG IN FORM -->
        <form id="auth-login-form" onsubmit="EquinestAuth.handleLogin(event)" class="hidden space-y-4">
          <div>
            <label class="block text-[11px] font-semibold text-[#888888] uppercase mb-1">Email Address *</label>
            <input 
              type="email" 
              id="auth-login-email" 
              required 
              placeholder="e.g. aayush.engineer@gmail.com" 
              class="w-full px-3.5 py-2.5 text-xs input-dark font-mono" 
            />
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-[11px] font-semibold text-[#888888] uppercase">Password *</label>
              <span class="text-[10px] text-[#777777]">Demo: password123</span>
            </div>
            <div class="relative">
              <input 
                type="password" 
                id="auth-login-password" 
                required 
                placeholder="Enter password" 
                class="w-full px-3.5 py-2.5 text-xs input-dark pr-10" 
              />
              <button 
                type="button" 
                onclick="EquinestAuth.togglePasswordVisibility('auth-login-password')" 
                class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#777777] hover:text-white"
              >👁️</button>
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full py-3.5 rounded-xl btn-red text-xs font-bold shadow-lg shadow-red-950/50 mt-2 flex items-center justify-center space-x-2"
          >
            <span>Log In to Equinest</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>

        <!-- 1-Click Fast Fill for Demo Testing -->
        <div class="mt-6 pt-5 border-t border-[#222222]">
          <div class="text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-2 text-center">
            ⚡ Fast Demo Accounts (1-Click Fill & Login)
          </div>
          <div class="grid grid-cols-3 gap-1.5 text-[10px]">
            <button 
              type="button" 
              onclick="EquinestAuth.quickDemoLogin('aayush.engineer@gmail.com')" 
              class="p-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2d2d2d] text-center transition-colors"
            >
              <div class="font-bold text-white truncate">Aayush</div>
              <div class="text-[9px] text-[#FF5555]">Investor</div>
            </button>
            <button 
              type="button" 
              onclick="EquinestAuth.quickDemoLogin('suman.thapa@hamrokrishi.ai')" 
              class="p-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2d2d2d] text-center transition-colors"
            >
              <div class="font-bold text-white truncate">Suman</div>
              <div class="text-[9px] text-amber-400">Founder</div>
            </button>
            <button 
              type="button" 
              onclick="EquinestAuth.quickDemoLogin('rina.chiya@gmail.com')" 
              class="p-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2d2d2d] text-center transition-colors"
            >
              <div class="font-bold text-white truncate">Rina</div>
              <div class="text-[9px] text-blue-400">Partner</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

// Global Auth Controller
const EquinestAuth = {
  openAuthModal(options = {}) {
    authModalOptions = {
      tab: options.tab || "signup",
      intentMessage: options.intentMessage || "",
      onSuccessRedirect: options.onSuccessRedirect || null,
      onSuccessCallback: options.onSuccessCallback || null
    };

    ensureAuthModalMounted();
    const modal = document.getElementById("equinest-auth-modal");
    if (!modal) return;

    // Handle intent message
    const banner = document.getElementById("auth-intent-banner");
    const intentText = document.getElementById("auth-intent-text");
    if (authModalOptions.intentMessage) {
      intentText.textContent = authModalOptions.intentMessage;
      banner.classList.remove("hidden");
    } else {
      banner.classList.add("hidden");
    }

    // Hide any previous error
    this.hideError();

    // Switch to requested tab
    this.switchAuthTab(authModalOptions.tab);

    modal.classList.remove("hidden");
  },

  closeAuthModal() {
    const modal = document.getElementById("equinest-auth-modal");
    if (modal) modal.classList.add("hidden");
    this.hideError();
  },

  switchAuthTab(tab) {
    const btnSignup = document.getElementById("auth-tab-signup-btn");
    const btnLogin = document.getElementById("auth-tab-login-btn");
    const formSignup = document.getElementById("auth-signup-form");
    const formLogin = document.getElementById("auth-login-form");
    const subtitle = document.getElementById("auth-modal-subtitle");

    this.hideError();

    const activeBtnClass = "w-1/2 py-2 rounded-lg text-xs font-bold transition-all bg-[#FF2D2D] text-white shadow-md shadow-red-950/40";
    const inactiveBtnClass = "w-1/2 py-2 rounded-lg text-xs font-semibold text-[#888888] hover:text-white transition-all";

    if (tab === "signup") {
      btnSignup.className = activeBtnClass;
      btnLogin.className = inactiveBtnClass;
      formSignup.classList.remove("hidden");
      formLogin.classList.add("hidden");
      subtitle.textContent = "Create an account to invest or list in Nepal";
    } else {
      btnLogin.className = activeBtnClass;
      btnSignup.className = inactiveBtnClass;
      formLogin.classList.remove("hidden");
      formSignup.classList.add("hidden");
      subtitle.textContent = "Welcome back! Log in to access your venture portal";
    }
  },

  showError(msg) {
    const box = document.getElementById("auth-error-msg");
    if (box) {
      box.textContent = msg;
      box.classList.remove("hidden");
    }
  },

  hideError() {
    const box = document.getElementById("auth-error-msg");
    if (box) box.classList.add("hidden");
  },

  togglePasswordVisibility(fieldId) {
    const input = document.getElementById(fieldId);
    if (input) {
      input.type = input.type === "password" ? "text" : "password";
    }
  },

  handleSignUp(e) {
    e.preventDefault();
    const name = document.getElementById("auth-signup-name").value;
    const email = document.getElementById("auth-signup-email").value;
    const phoneRaw = document.getElementById("auth-signup-phone").value.trim();
    const phone = phoneRaw.startsWith("+977") ? phoneRaw : `+977 ${phoneRaw}`;
    const password = document.getElementById("auth-signup-password").value;
    const roleType = document.getElementById("auth-signup-role").value;

    try {
      const user = EquinestState.signUp({ name, email, phone, password, roleType });
      this.closeAuthModal();
      showToast(`Welcome to Equinest, ${user.displayName}!`, "success");
      this.handleSuccessRedirect();
    } catch (err) {
      this.showError(err.message);
    }
  },

  handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("auth-login-email").value;
    const password = document.getElementById("auth-login-password").value;

    try {
      const user = EquinestState.login({ email, password });
      this.closeAuthModal();
      showToast(`Welcome back, ${user.displayName}!`, "success");
      this.handleSuccessRedirect();
    } catch (err) {
      this.showError(err.message);
    }
  },

  quickDemoLogin(email) {
    try {
      const user = EquinestState.login({ email, password: "password123" });
      this.closeAuthModal();
      showToast(`Demo login successful as ${user.displayName} (${user.roleType})`, "success");
      this.handleSuccessRedirect();
    } catch (err) {
      this.showError(err.message);
    }
  },

  handleLogout() {
    EquinestState.logout();
    showToast("You have been logged out.", "info");
    const activeMeta = document.body.dataset.page || "home";
    renderEquinestNavbar(activeMeta);
    if (window.onRoleChanged) {
      window.onRoleChanged(EquinestState.getCurrentUser());
    } else {
      setTimeout(() => window.location.reload(), 400);
    }
  },

  handleSuccessRedirect() {
    const activeMeta = document.body.dataset.page || "home";
    renderEquinestNavbar(activeMeta);

    if (authModalOptions.onSuccessCallback) {
      authModalOptions.onSuccessCallback();
    } else if (authModalOptions.onSuccessRedirect) {
      window.location.href = authModalOptions.onSuccessRedirect;
    } else {
      if (window.onAuthSuccess) {
        window.onAuthSuccess();
      } else {
        setTimeout(() => window.location.reload(), 400);
      }
    }
  },

  // Gateway Enforcer helper
  requireAuth(actionCallback, intentMessage = "Please log in or sign up to proceed.", redirectUrl = null) {
    if (EquinestState.isAuthenticated()) {
      actionCallback();
    } else {
      this.openAuthModal({
        tab: "login",
        intentMessage,
        onSuccessCallback: actionCallback,
        onSuccessRedirect: redirectUrl
      });
    }
  }
};

// Global Toast Notification Helper
function showToast(message, type = "success") {
  let toastContainer = document.getElementById("equinest-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "equinest-toast-container";
    toastContainer.className = "fixed bottom-5 right-5 z-[9999] flex flex-col space-y-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-xl border shadow-2xl text-xs sm:text-sm text-white transform transition-all duration-300 translate-y-3 opacity-0 ${
    type === "error" 
      ? "bg-[#250d0d] border-red-700/60 shadow-red-950/50" 
      : type === "info"
      ? "bg-[#111927] border-blue-600/50"
      : "bg-[#111c14] border-emerald-600/50"
  }`;

  const iconSvg = type === "error"
    ? `<svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    : type === "info"
    ? `<svg class="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    : `<svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div class="font-medium text-white">${message}</div>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-3", "opacity-0");
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

// Global Image Error Fallback Handler to guarantee visual display
document.addEventListener("error", function(e) {
  if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === "img") {
    const img = e.target;
    if (!img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = "true";
      const isAvatar = img.classList.contains("rounded-full") || img.width < 100;
      if (isAvatar) {
        img.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22150%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20150%20150%22%3E%3Crect%20width%3D%22150%22%20height%3D%22150%22%20fill%3D%22%231e1e1e%22%2F%3E%3Ccircle%20cx%3D%2275%22%20cy%3D%2260%22%20r%3D%2230%22%20fill%3D%22%23FF2D2D%22%20opacity%3D%220.8%22%2F%3E%3Cpath%20d%3D%22M25%20140%20c0-30%2025-45%2050-45%20s50%2015%2050%2045%22%20fill%3D%22%23FF2D2D%22%20opacity%3D%220.6%22%2F%3E%3C%2Fsvg%3E";
      } else {
        img.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23120606%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23260c0c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2248%25%22%20fill%3D%22%23FF2D2D%22%20font-family%3D%22system-ui%2Csans-serif%22%20font-size%3D%2226%22%20font-weight%3D%22800%22%20text-anchor%3D%22middle%22%3EEquinest%20Verified%20Listing%3C%2Ftext%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2256%25%22%20fill%3D%22%23A0A0A0%22%20font-family%3D%22system-ui%2Csans-serif%22%20font-size%3D%2214%22%20text-anchor%3D%22middle%22%3ENepal%20Dual-Engine%20Venture%20Network%3C%2Ftext%3E%3C%2Fsvg%3E";
      }
    }
  }
}, true);
