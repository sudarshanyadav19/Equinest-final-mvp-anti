/**
 * Equinest State & Authentication Management Module
 * Robust localStorage persistence with reactive authentication, session management, and transaction helpers
 */

const STORAGE_KEYS = {
  STARTUPS: "equinest_startups",
  INVESTORS: "equinest_investors",
  PARTNERS: "equinest_partners",
  NOTIFICATIONS: "equinest_notifications",
  CURRENT_USER: "equinest_current_user",
  INVESTMENTS: "equinest_investments_history",
  USERS: "equinest_registered_users",
  AUTH_SESSION: "equinest_auth_session"
};

const EquinestState = {
  // Initialize state with seed data if not found in localStorage
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.STARTUPS)) {
      localStorage.setItem(STORAGE_KEYS.STARTUPS, JSON.stringify(INITIAL_STARTUPS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INVESTORS)) {
      localStorage.setItem(STORAGE_KEYS.INVESTORS, JSON.stringify(INITIAL_INVESTORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PARTNERS)) {
      localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(INITIAL_PARTNERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_REGISTERED_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INVESTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.INVESTMENTS, JSON.stringify([]));
    }
  },

  // Reset to default seed data
  resetAll() {
    localStorage.setItem(STORAGE_KEYS.STARTUPS, JSON.stringify(INITIAL_STARTUPS));
    localStorage.setItem(STORAGE_KEYS.INVESTORS, JSON.stringify(INITIAL_INVESTORS));
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(INITIAL_PARTNERS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_REGISTERED_USERS));
    localStorage.setItem(STORAGE_KEYS.INVESTMENTS, JSON.stringify([]));
    // Clear session on total reset
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    window.dispatchEvent(new CustomEvent("equinest:auth_changed"));
    window.dispatchEvent(new CustomEvent("equinest:user_changed"));
  },

  // ==========================================
  // AUTHENTICATION & USER SESSION METHODS
  // ==========================================
  getRegisteredUsers() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || INITIAL_REGISTERED_USERS;
    } catch (e) {
      return INITIAL_REGISTERED_USERS;
    }
  },

  isAuthenticated() {
    this.init();
    const session = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (!session) return false;
    try {
      const user = JSON.parse(session);
      return !!(user && user.email);
    } catch (e) {
      return false;
    }
  },

  getLoggedInUser() {
    this.init();
    const session = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (!session) return null;
    try {
      return JSON.parse(session);
    } catch (e) {
      return null;
    }
  },

  // Returns currently authenticated user, or guest visitor if unauthenticated
  getCurrentUser() {
    this.init();
    const loggedIn = this.getLoggedInUser();
    if (loggedIn) {
      return loggedIn;
    }
    // Return Guest Visitor object
    return {
      id: "visitor-guest",
      roleId: "visitor-demo",
      roleType: "visitor",
      displayName: "Guest Visitor",
      subtitle: "Unregistered Guest",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      email: "",
      phone: "",
      canInvest: false,
      plan: "None (Free Preview)",
      isAuthenticated: false
    };
  },

  setCurrentUser(user) {
    if (user && user.email) {
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    }
    window.dispatchEvent(new CustomEvent("equinest:auth_changed", { detail: user }));
    window.dispatchEvent(new CustomEvent("equinest:user_changed", { detail: user }));
  },

  // Sign Up method
  signUp({ name, email, phone, password, roleType = "investor" }) {
    if (!name || !email || !password) {
      throw new Error("Full name, email address, and password are required.");
    }
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getRegisteredUsers();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error("An account with this email address already exists. Please log in instead.");
    }

    const newUser = {
      id: "usr-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      displayName: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : "+977 ",
      password: password,
      roleType: roleType,
      canInvest: roleType === "investor",
      subtitle: roleType === "investor" ? "Verified Angel Investor" : (roleType === "founder" ? "Startup Founder" : "Local Business Partner"),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      plan: roleType === "investor" ? "Diamond Super Value" : (roleType === "founder" ? "Elite Founder Plan" : "Standard Matchmaker"),
      createdAt: new Date().toISOString(),
      isAuthenticated: true
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Save active session
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(newUser));
    window.dispatchEvent(new CustomEvent("equinest:auth_changed", { detail: newUser }));
    window.dispatchEvent(new CustomEvent("equinest:user_changed", { detail: newUser }));

    // Send welcome inbox notification
    this.addNotification({
      type: "system",
      title: `Welcome to Equinest, ${newUser.displayName}! 🇳🇵`,
      body: `Your identity (${newUser.email}) has been authenticated. You can now explore startup equity, publish listings, and connect with silent partners.`,
      targetLink: "marketplace.html",
      sender: {
        name: "Equinest Security & Identity",
        role: "Authentication Gateway",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
      }
    });

    return newUser;
  },

  // Log In method
  login({ email, password }) {
    if (!email || !password) {
      throw new Error("Email address and password are required.");
    }
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getRegisteredUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      throw new Error("No account found with this email. Please check your credentials or Sign Up.");
    }

    if (user.password !== password) {
      throw new Error("Incorrect password. Please try again or use a demo account.");
    }

    // Set session
    const sessionUser = {
      ...user,
      isAuthenticated: true
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(sessionUser));
    window.dispatchEvent(new CustomEvent("equinest:auth_changed", { detail: sessionUser }));
    window.dispatchEvent(new CustomEvent("equinest:user_changed", { detail: sessionUser }));

    return sessionUser;
  },

  // Log Out method
  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    window.dispatchEvent(new CustomEvent("equinest:auth_changed", { detail: null }));
    window.dispatchEvent(new CustomEvent("equinest:user_changed", { detail: null }));
  },

  // Switch demo persona (logs in as chosen persona)
  switchRole(roleId) {
    const demo = MOCK_CURRENT_USERS.find(u => u.roleId === roleId);
    if (demo) {
      if (demo.roleType === "visitor") {
        this.logout();
        return this.getCurrentUser();
      } else {
        const sessionUser = {
          id: "usr-" + demo.roleId,
          displayName: demo.displayName,
          email: demo.email,
          phone: demo.phone || "+977 9801223399",
          roleType: demo.roleType,
          canInvest: demo.canInvest,
          subtitle: demo.subtitle,
          avatar: demo.avatar,
          plan: demo.plan,
          isAuthenticated: true
        };
        localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(sessionUser));
        window.dispatchEvent(new CustomEvent("equinest:auth_changed", { detail: sessionUser }));
        window.dispatchEvent(new CustomEvent("equinest:user_changed", { detail: sessionUser }));
        return sessionUser;
      }
    }
    return null;
  },

  // ==========================================
  // STARTUPS CRUD WITH DYNAMIC IDENTITY BINDING
  // ==========================================
  getStartups() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.STARTUPS)) || [];
    } catch (e) {
      return [];
    }
  },

  getStartupById(id) {
    const list = this.getStartups();
    return list.find(s => s.id === id) || null;
  },

  saveStartup(startupData) {
    const currentUser = this.getCurrentUser();
    const list = this.getStartups();

    // Bind active logged-in user identity to the startup profile
    const boundData = {
      ...startupData,
      authorId: currentUser.id || "anonymous",
      authorEmail: currentUser.email || (startupData.founder && startupData.founder.email),
      authorName: currentUser.displayName || (startupData.founder && startupData.founder.name),
      authorPhone: currentUser.phone || (startupData.privateVerification && startupData.privateVerification.phone)
    };

    const existingIndex = list.findIndex(s => s.id === boundData.id);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...boundData };
    } else {
      list.unshift(boundData);
    }
    localStorage.setItem(STORAGE_KEYS.STARTUPS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("equinest:startups_changed"));
    return boundData;
  },

  // ==========================================
  // INVESTORS CRUD WITH DYNAMIC IDENTITY BINDING
  // ==========================================
  getInvestors() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.INVESTORS)) || [];
    } catch (e) {
      return [];
    }
  },

  saveInvestor(investorData) {
    const currentUser = this.getCurrentUser();
    const list = this.getInvestors();

    const boundData = {
      ...investorData,
      authorId: currentUser.id || "anonymous",
      authorEmail: currentUser.email || investorData.email,
      authorName: currentUser.displayName || investorData.name,
      authorPhone: currentUser.phone || (investorData.privateVerification && investorData.privateVerification.phone)
    };

    const existingIndex = list.findIndex(i => i.id === boundData.id);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...boundData };
    } else {
      list.unshift(boundData);
    }
    localStorage.setItem(STORAGE_KEYS.INVESTORS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("equinest:investors_changed"));
    return boundData;
  },

  // ==========================================
  // PARTNERS CRUD WITH DYNAMIC IDENTITY BINDING
  // ==========================================
  getPartners() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTNERS)) || [];
    } catch (e) {
      return [];
    }
  },

  getPartnerById(id) {
    const list = this.getPartners();
    return list.find(p => p.id === id) || null;
  },

  savePartner(partnerData) {
    const currentUser = this.getCurrentUser();
    const list = this.getPartners();

    const boundData = {
      ...partnerData,
      authorId: currentUser.id || "anonymous",
      authorEmail: currentUser.email || "",
      authorName: currentUser.displayName || partnerData.operatorName,
      authorPhone: currentUser.phone || (partnerData.privateVerification && partnerData.privateVerification.phone)
    };

    const existingIndex = list.findIndex(p => p.id === boundData.id);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...boundData };
    } else {
      list.unshift(boundData);
    }
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("equinest:partners_changed"));
    return boundData;
  },

  // ==========================================
  // NOTIFICATIONS CRUD
  // ==========================================
  getNotifications() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || [];
    } catch (e) {
      return [];
    }
  },

  getUnreadNotificationCount() {
    const list = this.getNotifications();
    return list.filter(n => !n.read).length;
  },

  addNotification(notif) {
    const list = this.getNotifications();
    const newNotif = {
      id: "notif-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      timestamp: "Just now",
      read: false,
      ...notif
    };
    list.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("equinest:notifications_changed", { detail: newNotif }));
    return newNotif;
  },

  markNotificationAsRead(id) {
    const list = this.getNotifications();
    const item = list.find(n => n.id === id);
    if (item) {
      item.read = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("equinest:notifications_changed"));
    }
  },

  markAllNotificationsAsRead() {
    const list = this.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("equinest:notifications_changed"));
  },

  deleteNotification(id) {
    const list = this.getNotifications().filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("equinest:notifications_changed"));
  },

  clearAllNotifications() {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent("equinest:notifications_changed"));
  },

  // ==========================================
  // TRANSACTIONS: INVEST IN STARTUP
  // Binds active logged-in user identity & contact
  // ==========================================
  investInStartup(startupId, unitsCount, investorDetails = {}) {
    const startup = this.getStartupById(startupId);
    if (!startup) throw new Error("Startup not found");

    const units = parseInt(unitsCount, 10);
    if (isNaN(units) || units <= 0) throw new Error("Invalid units count");
    if (units > startup.remainingUnits) throw new Error("Requested units exceed available units");

    const currentUser = this.getCurrentUser();
    const totalAmount = units * startup.unitPrice;
    const equityPct = ((units / startup.totalUnits) * startup.equityOffered).toFixed(4);
    const txId = "EQ-NPR-" + Math.floor(100000 + Math.random() * 900000);

    // Identity binding: priority to active logged-in user, then passed details
    const boundInvestorName = currentUser.isAuthenticated ? currentUser.displayName : (investorDetails.name || currentUser.displayName);
    const boundInvestorEmail = currentUser.isAuthenticated ? currentUser.email : (investorDetails.email || currentUser.email);
    const boundInvestorPhone = currentUser.phone || investorDetails.phone || "+977 9801223399";
    const boundUserId = currentUser.id || "guest";

    // Deduct remaining units
    startup.remainingUnits -= units;
    this.saveStartup(startup);

    // Save investment record in history
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVESTMENTS) || "[]");
    const record = {
      txId,
      startupId,
      startupName: startup.name,
      units,
      unitPrice: startup.unitPrice,
      totalAmount,
      equityPct,
      userId: boundUserId,
      investorName: boundInvestorName,
      investorEmail: boundInvestorEmail,
      investorPhone: boundInvestorPhone,
      date: new Date().toISOString(),
      status: "Secured in Escrow"
    };
    history.unshift(record);
    localStorage.setItem(STORAGE_KEYS.INVESTMENTS, JSON.stringify(history));

    // Dispatch Founder alert notification (with bound buyer contact details)
    this.addNotification({
      type: "investment",
      title: "New Investment Confirmed! 🎉",
      body: `Investor ${boundInvestorName} (${boundInvestorEmail}, ${boundInvestorPhone}) purchased ${units} units (${EquinestFormat.npr(totalAmount)}) in '${startup.name}'. Equity stake transferred: ${equityPct}%. Payment secured in Escrow.`,
      targetLink: `company-detail.html?id=${startup.id}`,
      sender: {
        name: boundInvestorName,
        role: "Angel Investor",
        email: boundInvestorEmail,
        phone: boundInvestorPhone,
        avatar: currentUser.avatar
      }
    });

    return record;
  },

  // ==========================================
  // TRANSACTIONS: LOCAL PARTNER INQUIRY
  // Binds active logged-in user identity & contact
  // ==========================================
  sendPartnerInquiry(partnerId, messageText) {
    const partner = this.getPartnerById(partnerId);
    if (!partner) throw new Error("Partner listing not found");

    const currentUser = this.getCurrentUser();
    const contactInfo = currentUser.phone ? `${currentUser.email} • ${currentUser.phone}` : currentUser.email;

    // Add notification to Inbox with bound contact details
    const notif = this.addNotification({
      type: "partner_inquiry",
      title: `New Partner Inquiry for "${partner.title}" 🤝`,
      body: `${currentUser.displayName} (${currentUser.subtitle} • Contact: ${contactInfo}) expressed interest: "${messageText || 'Interested in exploring this opportunity. Please reach out to discuss partnership terms.'}"`,
      targetLink: "partner.html",
      sender: {
        userId: currentUser.id,
        name: currentUser.displayName,
        role: currentUser.subtitle,
        email: currentUser.email,
        phone: currentUser.phone,
        avatar: currentUser.avatar
      }
    });

    return notif;
  },

  // Subscription approval
  subscribeToPlan(planName, planPriceFormatted, userRole) {
    const currentUser = this.getCurrentUser();
    currentUser.plan = planName;
    if (userRole === "investor") currentUser.canInvest = true;
    this.setCurrentUser(currentUser);

    this.addNotification({
      type: "system",
      title: `Plan Activated: ${planName} 🚀`,
      body: `Congratulations ${currentUser.displayName}! Your subscription to '${planName}' (${planPriceFormatted}) is now active. All platform privileges have been unlocked for your account (${currentUser.email}).`,
      targetLink: "marketplace.html",
      sender: {
        name: "Equinest Billing Desk",
        role: "Automated Escrow",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
      }
    });

    return currentUser;
  }
};

// Formatting helpers with clean Nepal NPR / रू support
const EquinestFormat = {
  npr(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return "NPR 0";
    const num = Math.round(Number(amount));
    return "NPR " + num.toLocaleString("en-IN");
  },
  
  nprWithSymbol(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return "रू 0";
    const num = Math.round(Number(amount));
    return "रू " + num.toLocaleString("en-IN");
  },

  shortNPR(amount) {
    const val = Number(amount);
    if (isNaN(val)) return "NPR 0";
    if (val >= 10000000) {
      return `NPR ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `NPR ${(val / 100000).toFixed(1)} Lakhs`;
    }
    if (val >= 1000) {
      return `NPR ${(val / 1000).toFixed(0)}K`;
    }
    return `NPR ${val}`;
  }
};

// Ensure state is initialized
EquinestState.init();
