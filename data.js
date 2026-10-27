/**
 * Equinest Initial Seed Data
 * Pre-seeded with realistic Nepali startups, angel/VC investors, and local partner listings.
 */

const INITIAL_STARTUPS = [
  {
    id: "startup-1",
    name: "Hamro Krishi AI",
    tagline: "Precision drone analytics & direct farm-to-b2b agri supply chain",
    sector: "AgriTech",
    legalEntity: "Private Limited Company",
    stage: "Series A Seed Extension",
    location: "Chitwan & Lalitpur, Nepal",
    logo: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80",
    targetAsk: 3000000, // NPR 30 Lakhs
    minAsk: 15000,
    totalUnits: 2000,
    unitPrice: 1500, // NPR 1,500 / unit
    remainingUnits: 740,
    equityOffered: 7.5, // 7.5%
    valuation: 40000000, // NPR 4 Crore
    ageYears: 3.5,
    pitchVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pitchDeckSummary: "Hamro Krishi AI deploys multispectral drone imagery and IoT soil probes across 1,200 hectares in Terai. We aggregate produce and bypass middlemen to deliver directly to supermarket chains in Kathmandu valley.",
    founder: {
      name: "Suman Thapa",
      role: "CEO & Co-founder",
      bio: "Ex-Agricultural Officer at NARC, M.Sc. Agronomy from IAAS Rampur. 8+ years experience in agricultural tech.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      email: "suman.thapa@hamrokrishi.ai"
    },
    financials: {
      hasThreeYears: true,
      records: [
        { year: "FY 2078/79", revenue: 4200000, ebitda: -450000, netProfit: -600000, grossMargin: "34%" },
        { year: "FY 2079/80", revenue: 9800000, ebitda: 850000, netProfit: 420000, grossMargin: "41%" },
        { year: "FY 2080/81", revenue: 18500000, ebitda: 3100000, netProfit: 2150000, grossMargin: "46%" }
      ]
    },
    useOfFunds: [
      { category: "Drone Fleet Expansion (12 Units)", percentage: 40 },
      { category: "Cold Storage Sorting Hub in Chitwan", percentage: 35 },
      { category: "Software & Mobile App Engineering", percentage: 15 },
      { category: "Working Capital & Reserve", percentage: 10 }
    ],
    socials: {
      website: "https://hamrokrishi.example.np",
      linkedin: "https://linkedin.com/company/hamrokrishi",
      twitter: "https://x.com/hamrokrishi"
    },
    privateVerification: {
      panNumber: "609823411",
      citizenshipId: "27-01-72-04982",
      phone: "+977 9841234567",
      verified: true
    },
    status: "Published",
    featured: true
  },
  {
    id: "startup-2",
    name: "PaisaSend Nepal",
    tagline: "Cross-border digital remittance and multi-currency business escrow",
    sector: "FinTech",
    legalEntity: "Private Limited Company",
    stage: "Pre-Series A",
    location: "Naxal, Kathmandu, Nepal",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1556742049-0a67e5572293?w=800&auto=format&fit=crop&q=80",
    targetAsk: 5000000, // NPR 50 Lakhs
    minAsk: 25000,
    totalUnits: 2500,
    unitPrice: 2000, // NPR 2,000 / unit
    remainingUnits: 910,
    equityOffered: 5.0,
    valuation: 100000000, // NPR 10 Crore
    ageYears: 2.2,
    pitchVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pitchDeckSummary: "Empowering 2.5 million Nepali diaspora workers with zero-hidden-fee remittance connected directly to Fonepay, Khalti, and commercial bank accounts in 60 seconds.",
    founder: {
      name: "Prashant Karki",
      role: "Founder & CTO",
      bio: "Former Lead Software Architect at Grab Singapore. B.Tech Computer Engineering Pulchowk Campus.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      email: "prashant@paisasend.np"
    },
    financials: {
      hasThreeYears: false,
      records: [
        { year: "FY 2079/80", revenue: 6400000, ebitda: -800000, netProfit: -1100000, grossMargin: "65%" },
        { year: "FY 2080/81", revenue: 24800000, ebitda: 4200000, netProfit: 2900000, grossMargin: "72%" }
      ]
    },
    useOfFunds: [
      { category: "Regulatory Reserve & NRB Compliance", percentage: 45 },
      { category: "Cybersecurity & PCI-DSS Audits", percentage: 25 },
      { category: "Marketing across Gulf & Australia", percentage: 20 },
      { category: "Talent Acquisition", percentage: 10 }
    ],
    socials: {
      website: "https://paisasend.example.np",
      linkedin: "https://linkedin.com/company/paisasend",
      twitter: "https://x.com/paisasend"
    },
    privateVerification: {
      panNumber: "610294812",
      citizenshipId: "24-02-71-08129",
      phone: "+977 9801987654",
      verified: true
    },
    status: "Published",
    featured: true
  },
  {
    id: "startup-3",
    name: "Himalayan Mobility",
    tagline: "Indigenous electric cargo two-wheelers tailored for Nepal hills",
    sector: "CleanTech & EV",
    legalEntity: "Private Limited Company",
    stage: "Growth / Scaling",
    location: "Hetauda Industrial Area & Kathmandu",
    logo: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=800&auto=format&fit=crop&q=80",
    targetAsk: 4500000,
    minAsk: 18000,
    totalUnits: 1500,
    unitPrice: 3000, // NPR 3,000 / unit
    remainingUnits: 320,
    equityOffered: 6.0,
    valuation: 75000000,
    ageYears: 4,
    pitchVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pitchDeckSummary: "Assembling rugged swappable-battery electric cargo scooters designed specifically for high grade hill roads and urban delivery fleets in Kathmandu and Pokhara.",
    founder: {
      name: "Bikash Shrestha",
      role: "Managing Director",
      bio: "Automotive Engineer from TU IOE with 7 years in clean energy transition projects.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      email: "bikash@himalayanmobility.np"
    },
    financials: {
      hasThreeYears: true,
      records: [
        { year: "FY 2078/79", revenue: 5100000, ebitda: -900000, netProfit: -1200000, grossMargin: "28%" },
        { year: "FY 2079/80", revenue: 12400000, ebitda: 1100000, netProfit: 600000, grossMargin: "32%" },
        { year: "FY 2080/81", revenue: 29000000, ebitda: 4800000, netProfit: 3200000, grossMargin: "36%" }
      ]
    },
    useOfFunds: [
      { category: "Battery Pack Assembly Tooling", percentage: 50 },
      { category: "Showrooms in Pokhara & Butwal", percentage: 25 },
      { category: "After-Sales Service Network", percentage: 15 },
      { category: "R&D Hill Torque Optimization", percentage: 10 }
    ],
    socials: {
      website: "https://himalayanmobility.example.np",
      linkedin: "https://linkedin.com/company/himalayanmobility",
      twitter: "https://x.com/himalayan_ev"
    },
    privateVerification: {
      panNumber: "601928374",
      citizenshipId: "30-01-70-01928",
      phone: "+977 9851122334",
      verified: true
    },
    status: "Published",
    featured: true
  },
  {
    id: "startup-4",
    name: "Swastha TeleCare",
    tagline: "AI triaged remote healthcare consultations for rural districts",
    sector: "HealthTech",
    legalEntity: "Private Limited Company",
    stage: "Early Revenue",
    location: "Kupondole, Lalitpur, Nepal",
    logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    targetAsk: 2000000,
    minAsk: 10000,
    totalUnits: 2000,
    unitPrice: 1000, // NPR 1,000 / unit
    remainingUnits: 1450,
    equityOffered: 4.0,
    valuation: 50000000,
    ageYears: 1.8,
    pitchVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pitchDeckSummary: "Connecting verified specialist doctors in Kathmandu teaching hospitals with patients across Karnali and Sudurpashchim with integrated medicine home delivery.",
    founder: {
      name: "Dr. Ananya Poudel",
      role: "CEO & Medical Director",
      bio: "MBBS, MD General Medicine (TUTH), Health Informatics Fellow.",
      avatar: "https://images.unsplash.com/photo-1594824813576-90c1f516d246?w=150&auto=format&fit=crop&q=80",
      email: "ananya@swasthatelecare.np"
    },
    financials: {
      hasThreeYears: false,
      records: [
        { year: "FY 2080/81", revenue: 7800000, ebitda: 1400000, netProfit: 950000, grossMargin: "58%" }
      ]
    },
    useOfFunds: [
      { category: "Diagnostic Hub Partnerships", percentage: 40 },
      { category: "Low-Bandwidth Video Consultation Engine", percentage: 35 },
      { category: "Doctor Network Expansion", percentage: 25 }
    ],
    socials: {
      website: "https://swastha.example.np",
      linkedin: "https://linkedin.com/company/swasthatelecare"
    },
    privateVerification: {
      panNumber: "614981726",
      citizenshipId: "27-02-73-04812",
      phone: "+977 9849001122",
      verified: true
    },
    status: "Published",
    featured: false
  }
];

const INITIAL_INVESTORS = [
  {
    id: "inv-1",
    name: "Rameshwar Neupane",
    type: "Angel Investor",
    vcName: "Personal Angel Portfolio",
    email: "rameshwar.invests@gmail.com",
    location: "Kathmandu & London",
    ticketSize: "NPR 5,00,000 - 30,00,000",
    focusSectors: ["FinTech", "AgriTech", "SaaS", "E-commerce"],
    bio: "Ex-FinTech Managing Director with 15+ years in international payments. Passionate about empowering high-potential young Nepali founders.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    portfolioCount: 9,
    verified: true,
    privateVerification: {
      citizenshipId: "27-01-65-02918",
      phone: "+977 9851098765"
    }
  },
  {
    id: "inv-2",
    name: "Himalaya Frontier Ventures",
    type: "VC Firm",
    vcName: "Himalaya Frontier Capital Pvt. Ltd.",
    email: "deals.himalaya@gmail.com",
    location: "Jhamsikhel, Lalitpur, Nepal",
    ticketSize: "NPR 50,00,000 - 2,50,00,000",
    focusSectors: ["CleanTech & EV", "HealthTech", "AgriTech", "B2B Logistics"],
    bio: "Institutional early-stage venture fund partnering with tech-enabled market champions across the Himalayan economic corridor.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    portfolioCount: 18,
    verified: true,
    privateVerification: {
      panNumber: "602384910",
      citizenshipId: "28-01-68-01123",
      phone: "+977 01 5543210"
    }
  },
  {
    id: "inv-3",
    name: "Sunita Amatya",
    type: "Angel Investor",
    vcName: "Amatya Heritage Angels",
    email: "sunita.amatya.angel@gmail.com",
    location: "Patan, Lalitpur, Nepal",
    ticketSize: "NPR 3,00,000 - 15,00,000",
    focusSectors: ["D2C Brands", "Hospitality", "Sustainable Crafts", "Women-Led Tech"],
    bio: "Active angel championing female entrepreneurs, artisan value-chains, and premium export brands originating from Nepal.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    portfolioCount: 6,
    verified: true,
    privateVerification: {
      citizenshipId: "27-03-71-09821",
      phone: "+977 9841998877"
    }
  },
  {
    id: "inv-4",
    name: "Yeti Bridge Capital",
    type: "VC Firm",
    vcName: "Yeti Bridge Capital Partners",
    email: "ventures.yeti@gmail.com",
    location: "Durbarmarg, Kathmandu",
    ticketSize: "NPR 30,00,000 - 1,50,00,000",
    focusSectors: ["FinTech", "EdTech", "AI & Automation", "Cross-Border Trade"],
    bio: "Multi-stage seed syndicate connecting diaspora tech executives in Silicon Valley & Sydney directly with scalable Nepali innovations.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    portfolioCount: 14,
    verified: true,
    privateVerification: {
      panNumber: "608920194",
      citizenshipId: "24-01-66-04562",
      phone: "+977 9801123344"
    }
  }
];

const INITIAL_PARTNERS = [
  {
    id: "partner-1",
    role: "need_investment", // Operator seeking silent partner
    title: "Bhojan & Himalayan Chiya Hub - Branch 2 Expansion",
    sector: "Chiya Station",
    stage: "Expansion / High Footfall",
    location: "Jhamsikhel & Sanepa Road, Lalitpur",
    fundingAsk: 1200000, // NPR 12 Lakhs
    profitShare: "22% Net Monthly Profit Share",
    coverImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80",
    operatorName: "Rina Gurung & Suraj Shrestha",
    description: "Our first outlet in Pulchowk serves 450+ cups of premium Ilam artisanal tea and fresh bakery goods daily with NPR 6.8 Lakhs monthly sales. Seeking a silent partner to co-fund our new prime corner station in Jhamsikhel.",
    metrics: {
      currentMonthlyRevenue: "NPR 6,80,000",
      operatingMargin: "38%",
      dailyFootfall: "450+ customers",
      paybackPeriod: "14-18 months"
    },
    privateVerification: {
      pan: "608123984",
      citizenship: "27-01-75-01294",
      phone: "+977 9841887766"
    },
    publishedAt: "2026-10-15"
  },
  {
    id: "partner-2",
    role: "want_to_invest", // Silent Partner looking to invest
    title: "Senior Tech Architect seeking Silent Partnership in F&B / Cafe",
    sector: "Cafe",
    stage: "Ready for Capital Deployment",
    location: "Kathmandu Valley (Thamel, Baluwatar, Jhamsikhel)",
    fundingAsk: 1500000, // NPR 15 Lakhs capital ready
    profitShare: "18% - 25% Profit Share Expected",
    coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    operatorName: "Aayush Adhikari",
    description: "Full-time Lead Software Engineer working remotely for US company. Looking to invest NPR 10L - 18L as a 100% silent capital partner in a specialty coffee shop or bakery with a passionate full-time operator. No operational interference, pure dividend partnership.",
    metrics: {
      capitalReady: "NPR 15,00,000 liquid",
      involvement: "Silent (Monthly Audits Only)",
      domainSupport: "Can build POS, inventory dashboard & web presence",
      timeline: "Immediate deployment within 2 weeks"
    },
    privateVerification: {
      citizenship: "27-02-74-03918",
      phone: "+977 9801223399"
    },
    publishedAt: "2026-10-16"
  },
  {
    id: "partner-3",
    role: "need_investment",
    title: "Lakeside Heritage Eco-Boutique Resort",
    sector: "Hotel",
    stage: "Established (Adding 6 Glamping Domes)",
    location: "Lakeside North, Pokhara",
    fundingAsk: 2500000, // NPR 25 Lakhs
    profitShare: "15% Gross Revenue Share / Quarterly Dividend",
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    operatorName: "Kiran & Doma Lama",
    description: "Operating 12 boutique rooms in Pokhara with 78% average annual occupancy. We are expanding to add 6 scenic glass-dome luxury glamping units overlooking Fewa Lake and Machhapuchhre peak. High tourist demand with secured advance bookings.",
    metrics: {
      annualOccupancy: "78%",
      averageDailyRate: "NPR 6,500 / night",
      currentAnnualGross: "NPR 82,00,000",
      projectedROI: "28% p.a."
    },
    privateVerification: {
      pan: "603819274",
      citizenship: "45-01-69-02938",
      phone: "+977 9856012345"
    },
    publishedAt: "2026-10-17"
  },
  {
    id: "partner-4",
    role: "need_investment",
    title: "Dhaka & Pashmina Artisan Concept Store",
    sector: "Clothing & Retail",
    stage: "Retail Storefront Launch",
    location: "Baluwatar Prime Arcade, Kathmandu",
    fundingAsk: 950000, // NPR 9.5 Lakhs
    profitShare: "20% Net Profit Share + Free Wardrobe Allowance",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
    operatorName: "Priyanka Shakya",
    description: "Working directly with 35 handloom weaving mothers in Palpa and Bhojpur. We already do NPR 3.5 Lakhs monthly on Instagram and TikTok. We secured a 600 sq.ft lease in Baluwatar and need capital for interior fitout and inventory stocking.",
    metrics: {
      socialFollowers: "28,000+ targeted shoppers",
      avgOrderValue: "NPR 4,800",
      repeatCustomerRate: "34%",
      breakEvenTarget: "Month 4"
    },
    privateVerification: {
      pan: "609923847",
      citizenship: "27-01-76-08832",
      phone: "+977 9849112233"
    },
    publishedAt: "2026-10-18"
  },
  {
    id: "partner-5",
    role: "want_to_invest",
    title: "Doctor Syndicate looking for Silent Partnership in Cloud Kitchen / Bakery",
    sector: "Cafe",
    stage: "Ready for Capital Deployment",
    location: "Lalitpur / Baneshwor Corridor",
    fundingAsk: 2000000, // NPR 20 Lakhs
    profitShare: "20% Profit Share / Escrow Supported",
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    operatorName: "Dr. Sandeep & Dr. Rachana",
    description: "Two medical practitioners with stable income looking to co-fund a high-turnover cloud kitchen or artisan sourdough bakery. Looking for a passionate head chef / operator who manages daily operations.",
    metrics: {
      capitalReady: "NPR 20,00,000",
      involvement: "Strictly Silent Partner",
      preference: "Clean hygienic kitchen, high UberEats/Bhojdeals volume",
      payoutPreference: "Monthly profit remittance"
    },
    privateVerification: {
      citizenship: "27-01-70-04421",
      phone: "+977 9841009988"
    },
    publishedAt: "2026-10-18"
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "investment",
    title: "New Investment Received! 🎉",
    body: "Investor Rameshwar Neupane confirmed an investment of NPR 75,000 (50 units) into 'Hamro Krishi AI'. Funds are secured in escrow.",
    timestamp: "10 mins ago",
    read: false,
    targetLink: "company-detail.html?id=startup-1",
    sender: {
      name: "Rameshwar Neupane",
      role: "Angel Investor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      email: "rameshwar.invests@gmail.com"
    }
  },
  {
    id: "notif-2",
    type: "partner_inquiry",
    title: "Partner Matchmaker Inquiry 🤝",
    body: "Aayush Adhikari expressed interest in becoming a silent partner for 'Bhojan & Himalayan Chiya Hub - Branch 2'. Click to inspect profile & connect.",
    timestamp: "1 hour ago",
    read: false,
    targetLink: "partner.html",
    sender: {
      name: "Aayush Adhikari",
      role: "Silent Partner / Tech Architect",
      avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150&auto=format&fit=crop&q=80",
      email: "aayush.engineer@gmail.com"
    }
  },
  {
    id: "notif-3",
    type: "system",
    title: "Platform KYC Verification Approved 🛡️",
    body: "Your private Citizenship & PAN verification documents were successfully approved by Equinest Compliance. Your verified badge is now active.",
    timestamp: "Yesterday",
    read: true,
    targetLink: "marketplace.html",
    sender: {
      name: "Equinest Compliance Team",
      role: "System Admin",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
    }
  }
];

const SUBSCRIPTION_PLANS = {
  startup: [
    {
      id: "startup-growth",
      name: "Growth Plan",
      price: 5000,
      billingPeriod: "year",
      priceFormatted: "NPR 5,000 / year",
      popular: false,
      description: "Ideal for early-stage founders seeking their first community micro-equity round.",
      features: [
        "1 Vetted Startup Profile Listing",
        "Up to 500 retail & angel investors",
        "Interactive Unit Calculator integration",
        "Standard legal compliance checks",
        "Automated inbox notifications on every pledge",
        "Standard 7-day payout clearance"
      ]
    },
    {
      id: "startup-elite",
      name: "Elite Founder Plan",
      price: 10000,
      billingPeriod: "year",
      priceFormatted: "NPR 10,000 / year",
      popular: true,
      badge: "Founder's Choice",
      description: "Maximum visibility with dual investing power and express 4-hour settlement.",
      features: [
        "Featured Hero Banner on Marketplace",
        "Dual Investing Power (Fundraise & Co-invest as Angel)",
        "Ultra-fast 4-Hour Payout Speed",
        "Dedicated Legal & Escrow Compliance Officer",
        "Unlimited Cap-Table investor slots",
        "Direct email broadcast to Verified VC & Angel syndicate",
        "Promoted badge across search results"
      ]
    }
  ],
  investor: [
    {
      id: "investor-beginner",
      name: "Beginner's Plan",
      priceMonth: 99,
      priceYear: 999,
      billingPeriod: "mo / yr",
      priceFormatted: "NPR 99 / mo or NPR 999 / yr",
      popular: false,
      description: "For retail individuals beginning their angel investing journey in Nepal.",
      features: [
        "Browse all open startup equity rounds",
        "Micro-invest starting from NPR 1,000",
        "Digital PDF Share Certificate generation",
        "Access to basic 3-year financials",
        "Standard community Q&A access"
      ]
    },
    {
      id: "investor-angel-vc",
      name: "Angel / VC Plan",
      priceMonth: 5222, // 6 months
      priceYear: 10000,
      billingPeriod: "6-mo / yr",
      priceFormatted: "NPR 5,222 / 6-mo or NPR 10,000 / yr",
      popular: true,
      badge: "High Demand",
      description: "Tailored for active angels and fund managers with physical certificate delivery.",
      features: [
        "Doorstep Physical Delivery of stamped Share Certificate in 8 days",
        "Early 48-hour access to oversubscribed rounds",
        "Audited 3-year financials with raw balance sheets",
        "Direct WhatsApp/Gmail intro to founders",
        "Priority allocation in high-growth deals",
        "Quarterly private investor briefing roundtables"
      ]
    },
    {
      id: "investor-diamond",
      name: "Diamond Super Value Plan",
      priceYear: 15000,
      billingPeriod: "year",
      priceFormatted: "NPR 15,000 / year",
      popular: false,
      badge: "VIP Access",
      description: "Elite tier for family offices, syndicates, and high-net-worth individuals.",
      features: [
        "Exclusive 1-on-1 Live Pitch Room Access with Founders",
        "Zero Platform Escrow Fees on all transactions",
        "Custom Syndicate Vehicle creation",
        "VIP Networking Dinner invitations in Kathmandu & Pokhara",
        "Includes Doorstep physical certificate express delivery",
        "Dedicated Account Executive on direct call"
      ]
    }
  ],
  partner: [
    {
      id: "partner-standard",
      name: "Standard Matchmaker Plan",
      priceMonth: 199,
      price6Month: 999,
      priceYear: 1888,
      billingPeriod: "mo / 6-mo / yr",
      priceFormatted: "NPR 199 / mo • NPR 999 / 6-mo • NPR 1,888 / yr",
      popular: true,
      badge: "Universal Pass",
      description: "Complete access to connect local business operators with silent partners.",
      features: [
        "Post unlimited Business Operator or Silent Partner requests",
        "Instant Inbox Matchmaker Notification alerts",
        "Vetted Local Partner Trust Badge",
        "Standard Silent Partner Legal Contract Template (Nepali & English)",
        "Escrow Monthly Profit-Share Tracker access",
        "Direct phone and verified Gmail contact exchange"
      ]
    }
  ]
};

// Initial registered users for authentication system
const INITIAL_REGISTERED_USERS = [
  {
    id: "usr-investor-1",
    displayName: "Aayush Adhikari",
    email: "aayush.engineer@gmail.com",
    phone: "+977 9801223399",
    password: "password123",
    roleType: "investor",
    canInvest: true,
    subtitle: "Verified Angel Investor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    plan: "Diamond Super Value",
    createdAt: "2026-10-01T09:00:00Z"
  },
  {
    id: "usr-founder-1",
    displayName: "Suman Thapa",
    email: "suman.thapa@hamrokrishi.ai",
    phone: "+977 9841234567",
    password: "password123",
    roleType: "founder",
    canInvest: false,
    subtitle: "Founder, Hamro Krishi AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    plan: "Elite Founder Plan",
    createdAt: "2026-10-02T10:30:00Z"
  },
  {
    id: "usr-partner-1",
    displayName: "Rina Gurung",
    email: "rina.chiya@gmail.com",
    phone: "+977 9841887766",
    password: "password123",
    roleType: "partner",
    canInvest: false,
    subtitle: "Operator, Chiya Hub Jhamsikhel",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    plan: "Standard Matchmaker",
    createdAt: "2026-10-03T11:15:00Z"
  }
];

// Current mock user profiles for role switching simulation
const MOCK_CURRENT_USERS = [
  {
    roleId: "investor-demo",
    roleType: "investor",
    displayName: "Aayush Adhikari",
    subtitle: "Verified Angel Investor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    email: "aayush.engineer@gmail.com",
    phone: "+977 9801223399",
    canInvest: true,
    plan: "Diamond Super Value"
  },
  {
    roleId: "founder-demo",
    roleType: "founder",
    displayName: "Suman Thapa",
    subtitle: "Founder, Hamro Krishi AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    email: "suman.thapa@hamrokrishi.ai",
    phone: "+977 9841234567",
    canInvest: false,
    plan: "Elite Founder Plan"
  },
  {
    roleId: "partner-demo",
    roleType: "partner",
    displayName: "Rina Gurung",
    subtitle: "Operator, Chiya Hub Jhamsikhel",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    email: "rina.chiya@gmail.com",
    phone: "+977 9841887766",
    canInvest: false,
    plan: "Standard Matchmaker"
  },
  {
    roleId: "visitor-demo",
    roleType: "visitor",
    displayName: "Guest Visitor",
    subtitle: "Unregistered Guest",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    email: "guest@equinest.np",
    phone: "+977 9800000000",
    canInvest: false,
    plan: "None (Free Preview)"
  }
];
