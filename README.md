# Equinest - Dual-Vertical Startup Equity & Local Business Silent-Partner Marketplace 🇳🇵

Equinest is a fully responsive, modern web application prototype built with **HTML5, CSS3/Tailwind CSS, and vanilla JavaScript (with robust `localStorage` client-side state management)**. It caters specifically to the burgeoning venture ecosystem in Nepal, bridging high-growth startups and cashflowing local businesses with accredited investors and diaspora silent partners.

---

## 🎨 Design System & Visual Palette
- **Background**: Pure Black (`#000000`) and Dark Gray Containers (`#111111` / `#161616`).
- **Brand Accent Color**: Vibrant Red (`#FF2D2D`) for primary action buttons, active pill tabs, live tickers, and highlighted texts (e.g., *"Invest Smarter with Equinest"*).
- **Typography**: Crisp White (`#FFFFFF`) for headers, Muted Gray (`#A0A0A0`) for body/descriptions, and JetBrains Mono for financial figures.
- **Form Controls**: Rounded dark gray inputs (`#1E1E1E`), subtle borders (`#333333`), white text, and red focus glow rings (`focus:ring-[#FF2D2D]`).
- **Character Encoding**: `<meta charset="UTF-8">` is enforced across every single HTML page to guarantee glitch-free rendering of Nepali currency symbols (**NPR** / **रू**).

---

## 🔐 Authentication & Dynamic Identity System

Equinest features a complete client-side authentication gateway:
1. **Gateway Trigger**:
   - Clicking **"Get Started"** on the homepage (`index.html`), **"Create Profile"**, or attempting to invest/express interest while unauthenticated seamlessly opens the sleek, dark-mode Auth Modal.
2. **Auth Modal Design & Fields**:
   - Fully aligned with the pure black (`#000000`) and dark container (`#111111`) theme with `#FF2D2D` accent buttons.
   - Dual-tab toggle: **[Sign Up]** and **[Log In]**.
   - **Sign Up Fields**: Full Legal Name, Email Address, Phone Number with Nepal **🇳🇵 +977** prefix, Password (with show/hide visibility toggle), and Primary Role selection.
   - **Log In Fields**: Email Address and Password.
   - **1-Click Fast Demo Fill**: Buttons to instantly log in as *Aayush (Investor)*, *Suman (Founder)*, or *Rina (Partner)*.
3. **Session Persistence & Sticky Navbar**:
   - Sessions are persisted in `localStorage` under `equinest_auth_session`.
   - When authenticated, the top sticky navbar displays: `Welcome, [User Name]` alongside the user's avatar, role badge, and a **Log Out** button.
   - When unauthenticated, the navbar provides **[Log In]** and **[Sign Up]** buttons.
4. **Dynamic Identity Binding**:
   - **Published Profiles**: Binds the active logged-in User ID, Name, Email, and Phone to any startup, investor, or partner profile.
   - **Investment Orders**: Attaches user contact details to the transaction record and the purchase alert sent to the founder's inbox.
   - **Partner Inquiries**: Attaches user identity and contact details to inquiries dispatched to the local business operator's inbox.

---

## 🗂️ Page Structure & User Journeys

### 1. Navigation Bar (Sticky Top across all pages)
- **Brand Logo**: "Equinest" with pulsing red accent dot.
- **Top-Left**: Quick "+ Create Profile" action button (auth-protected).
- **Navigation Links**:
  - `Home` (`index.html`)
  - `Marketplace (Page 1)` (`marketplace.html`)
  - `Find Partner (Page 2)` (`partner.html`)
  - `Pricing` (`pricing.html`)
  - `Inbox Portal` (`inbox.html` with **live unread notification count badge**)
- **Top-Right User Session / Auth**:
  - If Logged In: Displays `Welcome, [User Name]`, user avatar, role badge, and user dropdown menu with **Log Out** and Demo Persona Switcher.
  - If Logged Out: Displays `[Log In]` and `[Sign Up]` buttons triggering the Auth Modal.
- **Search Bar**: Quick filter with `Enter` navigation to search results.

---

### 2. Homepage (`index.html`)
- **Hero Section**:
  - Bold typography with red gradient highlight text: **"Invest Smarter with Equinest"**.
  - Nepal trust badge: `🇳🇵 Nepal's 1st Dual-Engine Venture Platform`.
  - Prominent red **"Get Started"** button directly opening Page 1 (`marketplace.html`), alongside **"Find Silent Partner"** (Page 2).
  - Live metric counters: `रू 4.85 Cr+ NPR Deployed`, `142+ Silent Partners`, `28 Startups`, `100% Escrow Verified`.
- **"What is Equinest?" 3 Core Pillars**:
  1. *Growth Focused* (Micro-equity rounds democratizing startup access from NPR 1,000/unit).
  2. *Secure Platform* (Strict PAN/Citizenship validation, private documents hidden from public).
  3. *Global Vision* (Local high-footfall businesses paired with diaspora silent partners).
- **Dual-Vertical Interactive Showcase**: Side-by-side comparison of **Startup Micro-Equity** vs **Local Silent Partner Cashflow**.
- **Live Featured Startups**: Dynamic rendering from `localStorage`.
- **How It Works**: 3-step walk-through for founders and investors.

---

### 3. Page 1: Main Marketplace (`marketplace.html`)
- **Top Dual Toggle Switch**:
  - `[ 🚀 Startup Profiles ]`: Browse companies raising micro-equity with live progress bars, category pills, unit prices (e.g. `NPR 1,500 / unit`), remaining units, and minimum tickets.
  - `[ 💼 Investor Profiles ]`: Browse accredited Angel Investors and VC syndicates, displaying Investor Type, VC Company Name, Public Contact Gmail, and direct **"Pitch This Investor"** dialog.
- **Search & Filter Toolbar**:
  - Real-time text search by company name, sector, or keywords.
  - Filter chips: *All, AgriTech, FinTech, CleanTech & EV, HealthTech, D2C Brands*.
  - Sort select: *Featured, Unit Price: Low to High, High to Low, Units Filling Fast*.
- **Role Permission Enforcement**:
  - The **"Invest Now"** button is exclusive to Investor profiles.
  - If a Founder or Guest Visitor clicks **"Invest Now"**, an interactive modal explains the compliance requirement and allows switching to an Investor persona in 1 click!

---

### 4. Page 2: Local Partner Matchmaking (`partner.html`)
- Connects local small businesses (cafes, tea/chiya stations, clothing stores, boutique hotels, cloud kitchens) with working professional silent partners.
- **Tabbed Views**:
  - `[ All Listings ]`
  - `[ 🏢 Need Investment / Operators ]` (e.g. Jhamsikhel Chiya Hub expansion, Pokhara Glamping Resort)
  - `[ 💰 Want to Invest / Silent Partners ]` (e.g. Senior Software Architect looking to deploy NPR 15 Lakhs capital)
- **Sector Filters**: Cafe, Chiya Station, Hotel, Clothing & Retail, Cloud Kitchen.
- **Interactive "Interested" Action**:
  - Clicking **"Interested"** opens a personalized inquiry note dialog.
  - Submitting fires an **instant notification directly into the target user's Inbox Portal** via `localStorage`.
  - Displays a celebratory popup and updates the card button state to `✓ Inquiry Sent to Inbox`.

---

### 5. Company Profile & Investment Modal (`company-detail.html`)
- Accessible by clicking any startup or passing `?id=startup-1`.
- **Comprehensive Company Dossier**:
  - Cover image, verified badges, sector tags, executive summary, and video pitch simulation.
  - **3-Year Historical Financials Table (Audited)**: Revenue, Gross Margin, EBITDA, and Net Profit in NPR.
  - **Allocation & Use of Funds Breakdown**: Visual progress distribution.
  - **Founder Leadership**: Verified founder bio with shielded private KYC compliance badge.
- **Interactive Sticky Unit Calculator**:
  - Stepper buttons (`-` / `+`), manual numeric input, and live range slider.
  - Quick unit presets (`5u`, `25u`, `50u`, `100u`).
  - **Live Dynamic Recalculations**:
    - Unit Price × Selected Quantity = **Total Investment in NPR**.
    - Calculates exact percentage of company equity acquired (e.g., `0.0375%`).
    - Projected 3-year return scenario at target multiple.
- **"Confirm Investment" Workflow**:
  - Opens checkout verification modal with investor declaration.
  - Simulates payment gateway: **eSewa**, **Khalti**, **ConnectIPS**.
  - On approval:
    - Automatically deducts remaining units from the startup in `localStorage`.
    - Generates a unique Transaction ID (`EQ-NPR-XXXXXX`).
    - Renders a share certificate simulation preview.
    - Dispatches instant purchase alerts to both the founder's and investor's inboxes.

---

### 6. Profile Creation & Multi-Tier Pricing (`create-profile.html` & `pricing.html`)
- **Step 1: Choose Persona**:
  - *Startup Equity Listing*, *Investor Profile*, or *Local Partner Matchmaker*.
- **Dynamic Multi-Step Forms**:
  - **Startup**: Name, sector, custom typed Legal Entity (allows choosing "Other" to freely type any custom legal structure!), pitch video link, min/max ask, total units.
  - **Dynamic Unit Price**: Automatically calculates `Target Ask ÷ Total Units` live as you type.
  - **Conditional 3-Year Financials**: Unlocked if company operating age is > 3 years.
  - **Shielded KYC Verification**: PAN Number, Citizenship ID, and Phone Number are securely marked with privacy shields and kept confidential.
- **Publish Trigger & Multi-Tier Pricing Modal**:
  - Submitting any creation form triggers the **Pricing Plans Modal**:
    - **Startup Plans**: *Growth Plan* (`NPR 5,000 / yr`) & *Elite Founder Plan* (`NPR 10,000 / yr` with dual investing power and 4-hr payout speed).
    - **Investor Plans**: *Beginner's Plan* (`NPR 99 / mo` or `999 / yr`), *Angel/VC Plan* (`NPR 5,222 / 6mo` or `10,000 / yr` with physical doorstep delivery in 8 days), and *Diamond Super Value Plan* (`NPR 15,000 / yr` with exclusive 1-on-1 Live Pitch access).
    - **Partner Plans**: *Standard Matchmaker Plan* (`NPR 199 / mo`, `999 / 6mo`, or `1,888 / yr`).
  - Clicking **"Buy Now / Subscribe"** simulates demo payment approval, updates platform privileges, saves the listing into `localStorage`, dispatches an activation notification, and redirects to the live listing.

---

### 7. Inbox & Notification Portal (`inbox.html`)
- Central real-time dashboard powered by `localStorage`.
- Filter alerts by:
  - `All Alerts`
  - `💰 Investment Alerts` (e.g., someone bought micro-units in your startup)
  - `🤝 Partner Inquiries` (e.g., a silent partner clicked 'Interested' on your chiya station)
  - `🔔 System & Compliance` (KYC approvals, plan activations)
- **Features**:
  - Unread visual indicators (red pulse dot & dark red highlight).
  - Live count synced with sticky navbar badge.
  - **"Reply" button**: Opens dialog to send a reply or meeting proposal, which appends to the conversation thread.
  - "Mark All Read", "Delete", and "Reset Demo Data" to restore default test scenarios.

---

## 🛠️ File Structure
```
anti gravity equinest phase 1/
│
├── index.html              # Homepage with Hero, "Invest Smarter with Equinest", Pillars, Stats
├── marketplace.html        # Page 1: Main Marketplace (Startups vs Investors toggle & search)
├── partner.html            # Page 2: Local Partner Matchmaking (Need vs Want capital tabs)
├── company-detail.html     # Detailed Company Profile & Interactive Unit Calculator
├── create-profile.html     # Multi-step creation form with dynamic pricing modal trigger
├── pricing.html            # Dedicated multi-tier pricing plans portal
├── inbox.html              # Central notification portal with persistent alerts
├── README.md               # Documentation & manual
│
├── css/
│   └── styles.css          # Dark design system (#000000, #111111), #FF2D2D accents, fonts
│
└── js/
    ├── data.js             # Realistic seed data (AgriTech, FinTech, Chiya Hub, Angels, Plans)
    ├── state.js            # Reactive localStorage state manager, transaction & currency helpers
    └── navbar.js           # Shared sticky navbar, role switcher, badge sync, image fallbacks
```

---

## 🚀 How to Run & Preview
You can preview this web application directly by opening any `.html` file in any modern web browser:
1. Double-click `index.html` (or open with Google Chrome, Safari, Firefox, Edge).
2. Or serve via standard local HTTP server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
3. Navigate to `http://localhost:8000`.
