const fs = require('fs');
const path = require('path');

const categories = ['Lifestyle', 'Product', 'Travel', 'Fashion', 'Food', 'Educational'];

const sampleThumbnails = [
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
];

const sampleVideos = [
  'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-dripping-fresh-hot-coffee-42475-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-man-working-with-his-laptop-computer-in-an-office-42778-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-luxury-wristwatch-dial-42484-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-traditional-japanese-pagoda-surrounded-by-cherry-blossoms-42435-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-in-a-neon-lit-room-42457-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-baker-taking-a-fresh-loaf-of-bread-out-of-the-oven-42751-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-young-man-giving-a-presentation-with-a-digital-tablet-42780-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-headphones-listening-to-music-42456-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-floating-candles-on-the-water-42990-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-meat-in-a-pan-with-flames-42749-large.mp4'
];

const titlesByCategory = {
  Lifestyle: [
    { title: "Minimalist Morning Coffee Ritual", client: "Brew Culture Co.", desc: "Cinematic morning routine capturing the sound design of grinding beans, pour-over bloom, and golden light.", style: "ASMR sound design, ambient color grade", tools: ["Premiere Pro", "DaVinci Resolve"] },
    { title: "Desk Setup 2026 — Creator Workspace", client: "ErgoDesk Pro", desc: "Sleek kinetic desk tour with 3D floating interface callouts and dynamic sound-synced transitions.", style: "Kinetic typography, 3D screen tracking", tools: ["After Effects", "Premiere Pro"] },
    { title: "Sound of Rain: Studio Session Vlog", client: "Indie Beats Studio", desc: "Moody, reflective editing capturing raw studio workflow during a monsoon evening in Mumbai.", style: "Lofi color palette, rhythmic whip transitions", tools: ["DaVinci Resolve", "CapCut"] },
    { title: "High-Performance Morning Habits", client: "Peak State Fitness", desc: "Fast-paced motivational montage with punchy kinetic text, bass drops, and high retention pacing.", style: "High-retention velocity cuts, SFX layers", tools: ["Premiere Pro", "CapCut"] },
    { title: "Urban Night Cycling: Neon Streets", client: "CityVelo India", desc: "Speed-ramped POV cycling through neon-lit streets with speed warp zoom transitions.", style: "Speed ramps, directional blurs", tools: ["Premiere Pro", "After Effects"] },
    { title: "Artisan Woodworking: Handmade Chair", client: "Heritage Oak Works", desc: "Tactile ASMR workshop reel showcasing raw wood shaving, chiseling, and Danish oil application.", style: "ASMR Foley, macro lens focus pulls", tools: ["DaVinci Resolve"] },
    { title: "A Sunday in Old Delhi: Sensory Story", client: "Delhi Heritage Guild", desc: "Cinematic portrait of Chandni Chowk alleyways, chai sellers, and pigeon flocks in golden sunlight.", style: "Documentary aesthetic, cinematic 9:16", tools: ["Premiere Pro", "DaVinci Resolve"] },
    { title: "Minimalist Book Lover Routine", client: "Page & Spine Books", desc: "Calm aesthetic reel with page flips, tea steeping, and soft acoustic background harmony.", style: "Minimal pacing, pastel grading", tools: ["CapCut", "Premiere Pro"] },
    { title: "Late Night Code & Synth Session", client: "DevCraft HQ", desc: "Dark mode setup with glowing OLED screen, custom mechanical keyclicks, and cyberpunk rhythm.", style: "Glow effects, rhythmic audio cuts", tools: ["After Effects", "Premiere Pro"] }
  ],
  Product: [
    { title: "Titanium EDC Watch Kinetic Teaser", client: "ChronoTech Horology", desc: "High-octane product reveal featuring macro watch dial pans, sound-synced ticking, and metallic reflections.", style: "3D camera projection, speed ramping", tools: ["After Effects", "Premiere Pro", "DaVinci Resolve"] },
    { title: "Matte Black Mechanical Keyboard Unboxing", client: "KeyCult Labs", desc: "Clean aesthetic unboxing with precise keycap clicks, box sliding ASMR, and custom specs callouts.", style: "Clean HUD graphics, crisp foley", tools: ["Premiere Pro", "After Effects"] },
    { title: "Artisan Ceramic Espresso Cup", client: "Clay & Co.", desc: "Earthy, minimalist product reel showcasing clay texture, glaze reflection, and steaming crema.", style: "Organic slow-motion, subtle light leaks", tools: ["DaVinci Resolve"] },
    { title: "Noise-Cancelling Headphones 360 Spin", client: "SonicWave Audio", desc: "Seamless 360-degree turntable loop with floating acoustic wave animations and bass-boosted transitions.", style: "Seamless 360 loop, dynamic motion graphics", tools: ["After Effects", "Premiere Pro"] },
    { title: "Luxury Oud Perfume Mist Explosion", client: "Ambre Nobile Fragrances", desc: "Ultra slow-motion bottle atomization with droplet lighting and dark editorial contrast.", style: "1000 FPS slow-motion, high contrast golden grade", tools: ["DaVinci Resolve", "After Effects"] },
    { title: "Minimalist Leather Cardholder Drop", client: "Ridge & Hide", desc: "Tactile pull-tab animation, saddle stitching closeups, and smooth magnetic closure pop.", style: "Pop-in text, crisp snap foley", tools: ["Premiere Pro"] },
    { title: "Smart Fitness Ring: 24h Sleep Track", client: "Aura Ring India", desc: "Infographic-driven video with floating biological metrics and titanium ring close-up rotations.", style: "Motion tracking, animated health UI", tools: ["After Effects", "Premiere Pro"] },
    { title: "Handcrafted Chef Knife Razor Test", client: "Kurogane Blades", desc: "Paper slice test, tomato transparency cuts, and Damascus steel ripple shimmer.", style: "ASMR slicing sound, slow-motion precision", tools: ["DaVinci Resolve", "Premiere Pro"] },
    { title: "Minimalist Ergonomic Mouse Reveal", client: "Orbit Devices", desc: "Isometric product animation and hand-feel ergonomic contour glide on desk mat.", style: "Smooth glide zooms, UI callouts", tools: ["Premiere Pro", "After Effects"] }
  ],
  Travel: [
    { title: "Kyoto Dawn: Torii Gates & Mist", client: "Japan Travel Bureau", desc: "Ethereal sunrise journey through Fushimi Inari with tranquil Japanese flute and seamless match cuts.", style: "Seamless match cuts, cinematic teal & orange", tools: ["Premiere Pro", "DaVinci Resolve", "After Effects"] },
    { title: "Spiti Valley High Altitude Expedition", client: "Nomadic India", desc: "Rugged Himalayan cliff roads, monastery prayer flags fluttering in gale, and star timelapses.", style: "Drone hyperlapse, speed ramping", tools: ["Premiere Pro", "DaVinci Resolve"] },
    { title: "Varanasi: Midnight Ganga Aarti", client: "Incredible India Stories", desc: "Sacred fire lamps swirling against the dark river, brass bells ringing in rhythmic cadence.", style: "Rhythmic bell sync, deep shadow recovery", tools: ["DaVinci Resolve", "Premiere Pro"] },
    { title: "Amalfi Coast Vintage Vespa Ride", client: "Positano Sunsets", desc: "Sun-drenched Mediterranean coastal curves with 16mm film grain emulation and classic Italian jazz.", style: "16mm film grain, halation, retro color", tools: ["DaVinci Resolve", "CapCut"] },
    { title: "Iceland: Black Sand & Glacial Ice", client: "Arctic Explorers", desc: "Dramatic crashing Atlantic waves on volcanic sand with crystal diamond ice sculptures.", style: "Cold Nordic color grading, sub-bass wave crashes", tools: ["Premiere Pro", "DaVinci Resolve"] },
    { title: "Bali: Hidden Jungle Waterfall Jump", client: "Wanderer Bali", desc: "Adrenaline leap into turquoise lagoon with underwater audio transition and splash effect.", style: "Audio muffled underwater filter, speed ramp", tools: ["Premiere Pro", "CapCut"] },
    { title: "Swiss Glacier Express in Winter Snow", client: "Alpine Railways", desc: "Panoramic train winding across stone viaducts surrounded by deep pine snowdrifts.", style: "Smooth tracking stability, winter whites", tools: ["Premiere Pro", "DaVinci Resolve"] },
    { title: "Rajasthan Forts: Sunset Over Jodhpur", client: "Desert Heritage Tours", desc: "Massive blue city battlements glowing in golden dusk light with traditional sarangi drone.", style: "Rich terracotta warmth, slow zoom-ins", tools: ["DaVinci Resolve"] },
    { title: "Dubai Marina Hyperlapse Night Run", client: "Visit Dubai Creator", desc: "Ultra-smooth gimbal hyperlapse through glittering skyscrapers and superyacht docks.", style: "Motion-blur hyperlapse, electronic drop sync", tools: ["After Effects", "Premiere Pro"] }
  ],
  Fashion: [
    { title: "Cyberpunk Streetwear Tokyo Drop", client: "NeoHarajuku Apparel", desc: "Futuristic street fashion film with glowing neon text overlays, glitch distortions, and hard bass drops.", style: "Cyberpunk glitch, frame rates stutter, RGB split", tools: ["After Effects", "Premiere Pro"] },
    { title: "Monochrome Minimalist 5-Outfit Rotation", client: "Kuro Studio", desc: "Seamless snap transition reel showing five architectural black & white silhouettes.", style: "Snap match transitions, studio masking", tools: ["Premiere Pro", "CapCut"] },
    { title: "Vintage Leather Jacket Thrift Flip", client: "ReCraft Vintage", desc: "Restoring an 80s distressed bomber jacket with before/after split screens and punchy pacing.", style: "Split-screen comparison, fast tempo cuts", tools: ["Premiere Pro"] },
    { title: "Modern Silk Saree Draping Re-imagined", client: "VIRAAT Couture", desc: "Contemporary styling of traditional Kanjeevaram weaves with cinematic slow-motion pleat drops.", style: "Fluid slow motion, royal gold tones", tools: ["DaVinci Resolve", "Premiere Pro"] },
    { title: "Sneakerhead OOTD: Retro Air Max", client: "SoleSearch India", desc: "Foot stomp outfit switches synced precisely to 808 hi-hats with parallax motion graphics.", style: "Beat-matched jump cuts, shoe spin trick", tools: ["Premiere Pro", "After Effects"] },
    { title: "Japanese Heavyweight Workwear Lookbook", client: "Iron & Thread", desc: "Raw selvedge denim, chore coats, and Red Wing boots in brutalist concrete architecture.", style: "Editorial documentary pacing, grain texture", tools: ["DaVinci Resolve"] },
    { title: "Y2K Futuristic Rave Aesthetic", client: "Club Orbit Apparel", desc: "Silver metallics, visor shades, and rave lighting with retro VHS tracking artifacts.", style: "VHS glitch, fish-eye distortion", tools: ["After Effects", "Premiere Pro"] },
    { title: "Tailoring a Bespoke Three-Piece Suit", client: "Savile & Knight", desc: "Chalk line marking, shears slicing through wool, and lapel hand-stitching elegance.", style: "Classical strings sync, crisp scissor foley", tools: ["DaVinci Resolve", "Premiere Pro"] },
    { title: "Minimalist Jewellery: Solid Gold Bands", client: "Lueur Fine Gems", desc: "Warm skin tones with light bouncing across 18K yellow gold bands and delicate necklaces.", style: "Micro-panning, lens flares", tools: ["Premiere Pro"] }
  ],
  Food: [
    { title: "Sourdough Ear Explosion & Crumb Reveal", client: "Crust & Crumb Bakehouse", desc: "Razor blade razor scoring, Dutch oven steam burst, and the ultimate hollow crust tap ASMR.", style: "ASMR audio mastery, slow-motion steam", tools: ["Premiere Pro", "DaVinci Resolve"] },
    { title: "Wagyu A5 Ribeye Sizzle & Truffle Butter", client: "Prime Cut Grill", desc: "Extreme closeup cast iron sear, marbling melt, and coarse Maldon salt bounce.", style: "Extreme macro focus, high-fidelity sizzling SFX", tools: ["DaVinci Resolve", "Premiere Pro"] },
    { title: "Neapolitan Pizza 90-Sec Woodfire Dome", client: "Napoli Fire Co.", desc: "Dough slap, San Marzano swirl, fresh fior di latte, and bubbling leopard-spotted crust.", style: "Fast rhythm slap-sync, flame saturation boost", tools: ["Premiere Pro", "CapCut"] },
    { title: "Ceremonial Matcha Whisking & Latte Layer", client: "Uji Botanicals", desc: "Bamboo chasen whisking frothy emerald green tea, poured gently over oat milk and ice cubes.", style: "Tranquil zen pacing, bright organic green grade", tools: ["DaVinci Resolve"] },
    { title: "Hand-Pulled Biang Biang Noodles", client: "Chili Silk Noodles", desc: "Dough slapping against wooden bench, chili flake oil sizzle, and scallion chop symphony.", style: "Percussive slap edits, slow-mo oil splash", tools: ["Premiere Pro", "After Effects"] },
    { title: "Smashburger Double Patty Cheese Drip", client: "SmashHouse Burgers", desc: "Cast iron press lace crust, melting cheddar drape, and toasted brioche squish test.", style: "Heavy impact bass cuts, velocity ramps", tools: ["Premiere Pro"] },
    { title: "Belgian Chocolate Lava Molten Flow", client: "Chocolatier Royale", desc: "Fork pierce into warm chocolate cake, unleashing a velvety molten cocoa river in 4K.", style: "Slow motion reveal, macro food grade", tools: ["DaVinci Resolve", "Premiere Pro"] },
    { title: "Craft Cocktail: Smoked Rosemary Old Fashioned", client: "Speakeasy 1920", desc: "Wood chip torch smoke captured in glass cloche, crystal clear ice sphere, and orange peel twist.", style: "Cocktail flair edits, torch flame pop", tools: ["Premiere Pro"] },
    { title: "Crispy Korean Fried Chicken Glaze Snap", client: "Seoul Bird Bites", desc: "Double fry sizzle, spicy gochujang glaze toss, and thunderous first bite crunch.", style: "Crunch audio amplification, dynamic text bursts", tools: ["Premiere Pro", "CapCut"] }
  ],
  Educational: [
    { title: "3 Hook Formulas for 1M Views (Shorts & Reels)", client: "Creator Blueprint", desc: "Breakdown of the Question Hook, Visual Inversion Hook, and Contrarian Statement that stop the scroll.", style: "Fast kinetic typography, sound-synced zoom punches", tools: ["Premiere Pro", "After Effects", "CapCut"] },
    { title: "How I Color Grade in DaVinci Resolve in 60s", client: "Grade Academy", desc: "Node tree workflow tutorial explaining Color Space Transform, Film Emulation LUTs, and power windows.", style: "Screen recording zoom-ins, side-by-side color wipe", tools: ["DaVinci Resolve", "Premiere Pro"] },
    { title: "Premiere Pro Sound Design Secret: Layering SFX", client: "SoundCraft Edits", desc: "Why single whooshes sound flat: breaking down the Sub-bass, Texture, and High-end impact layer stack.", style: "Audio timeline visualization, waveform reactive animations", tools: ["Premiere Pro", "After Effects"] },
    { title: "CapCut 3D Tracking Hack in 30 Seconds", client: "Mobile Edit Daily", desc: "Stick 3D text behind real moving objects using auto-cutout and camera tracking without a PC.", style: "Mobile screen PIP, fingertip tap ripples", tools: ["CapCut"] },
    { title: "Why The 3-Second Retention Rule Decides Your Reach", client: "Viral Growth Labs", desc: "Analyzing retention analytics graph dips and demonstrating 5 visual pattern interrupts that keep eyeballs.", style: "Animated retention graphs, red-line dip markers", tools: ["After Effects", "Premiere Pro"] },
    { title: "Beat Synchronization: The Invisible Frame Shift", client: "Rhythm Cut", desc: "Cutting 2 frames before the drum transient: the psychoacoustic trick that makes edits feel effortless.", style: "Waveform zoom breakdown, metronome tick visualizer", tools: ["Premiere Pro"] },
    { title: "Budget Cinematic Lighting for Under $50", client: "Indie Filmmaker Hub", desc: "Transform a flat boring webcam shot into Netflix-tier drama using an LED tube and white bounce card.", style: "Live light toggle, lighting diagram overlays", tools: ["Premiere Pro", "Photoshop"] },
    { title: "Viral Scripting: The 4-Part Short Form Matrix", client: "ScriptScale Media", desc: "Hook -> Problem Agitation -> Solution Twist -> Action Loop: the exact 45-word teleprompter template.", style: "Teleprompter text animations, timer countdowns", tools: ["After Effects", "Premiere Pro"] },
    { title: "High Retention Captions: Font & Animation Masterclass", client: "CaptionGenius", desc: "Why standard captions fail: word-by-word highlights, emoji placement, and font hierarchy rules.", style: "Multi-font comparison, karaoke word bounce", tools: ["After Effects", "CapCut"] }
  ]
};

let allVideos = [];
let idCounter = 1;

// Build 54 videos (9 in each of the 6 categories)
categories.forEach(cat => {
  const items = titlesByCategory[cat] || [];
  items.forEach((item, idx) => {
    const id = 'proj-' + String(idCounter).padStart(2, '0');
    const viewsCount = Math.floor(180000 + Math.random() * 1320000);
    const viewsStr = viewsCount >= 1000000 ? (viewsCount / 1000000).toFixed(1) + 'M' : Math.round(viewsCount / 1000) + 'K';
    const durSec = 18 + ((idCounter * 3) % 30);
    const duration = '0:' + String(durSec).padStart(2, '0');
    const month = String(1 + ((12 - (idCounter % 8)) % 12)).padStart(2, '0');
    const day = String(1 + ((idCounter * 5) % 27)).padStart(2, '0');
    const date = `2026-${month}-${day}`;
    
    // Feature 5 top videos
    const isFeatured = idCounter === 1 || idCounter === 10 || idCounter === 19 || idCounter === 28 || idCounter === 37 || idCounter === 46;

    allVideos.push({
      id,
      title: item.title,
      category: cat,
      videoUrl: sampleVideos[(idCounter - 1) % sampleVideos.length],
      thumbnailUrl: sampleThumbnails[(idCounter - 1) % sampleThumbnails.length],
      duration,
      views: viewsStr,
      viewsCount,
      date,
      description: item.desc,
      editingStyle: item.style,
      toolsUsed: item.tools,
      clientName: item.client,
      results: `${viewsStr} Views • ${Math.round(85 + (idCounter % 14))}% Retention • Viral Reel`,
      isFeatured,
      isPublished: true,
      sortOrder: idCounter
    });
    idCounter++;
  });
});

const initialStats = {
  videosEdited: "52+",
  totalViews: "2.1M+",
  clientsCount: "30+",
  engagement: "High Engagement"
};

const initialTestimonials = [
  {
    id: "test-01",
    name: "Aakash Mehta",
    role: "Founder & Head of Content",
    company: "ChronoTech Horology",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote: "Piyush transformed our watch launch campaign. The vertical edits felt like luxury commercials, driving over 950K organic views and tripling our pre-orders in 48 hours. Absolute master of retention pacing.",
    rating: 5,
    project: "Titanium EDC Watch Campaign"
  },
  {
    id: "test-02",
    name: "Elena Rostova",
    role: "Creative Director",
    company: "NeoHarajuku Tokyo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote: "Finding an editor who understands kinetic typography, sound design, and viral social hooks is rare. Piyush delivered on the first cut with zero revisions. Our collection completely sold out.",
    rating: 5,
    project: "Cyberpunk Streetwear Drop"
  },
  {
    id: "test-03",
    name: "Devendra Patel",
    role: "CEO & Creator",
    company: "Creator Blueprint Media",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote: "Our YouTube Shorts channel went from 15K views to averaging 400K+ per video after bringing Piyush on board. He understands algorithm retention curves better than most creators.",
    rating: 5,
    project: "1M Views Hook Formula Series"
  },
  {
    id: "test-04",
    name: "Rhea Sen",
    role: "Brand Marketing Lead",
    company: "Brew Culture Co.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote: "The ASMR audio editing and subtle color grades Piyush produced gave our coffee brand an untouchable editorial aesthetic. Working with him is seamless and deadline-perfect.",
    rating: 5,
    project: "Minimalist Coffee Morning Reel"
  }
];

const initialServices = [
  {
    id: "srv-01",
    title: "Instagram Reels",
    category: "Social Content",
    description: "High-retention, algorithm-optimized 9:16 vertical edits tailored to trigger Instagram exploration feeds and viral saves.",
    deliverables: ["Pattern interrupt hooks", "Karaoke style animated captions", "Beat-synced trending audio", "Color grading & LUT matching"],
    iconName: "Instagram"
  },
  {
    id: "srv-02",
    title: "YouTube Shorts",
    category: "Growth & Retention",
    description: "Fast-paced, data-backed edits engineered for 90%+ completion rates, seamless loop endings, and subscriber conversion.",
    deliverables: ["Looping endings", "Infographic retention spikes", "Custom sound effects layers", "SEO title advice"],
    iconName: "Youtube"
  },
  {
    id: "srv-03",
    title: "TikTok Videos",
    category: "Viral Storytelling",
    description: "Authentic, dynamic cuts designed to ride TikTok pacing trends, humor timing, and hook curiosity triggers.",
    deliverables: ["3-second curiosity hooks", "Dynamic voiceover punch cuts", "Trending transition effects", "Mobile-first formatting"],
    iconName: "PlaySquare"
  },
  {
    id: "srv-04",
    title: "Product Videos",
    category: "Commercial & E-Commerce",
    description: "Cinematic commercial-grade showcases for e-commerce, tech gadgets, watches, and physical consumer goods.",
    deliverables: ["Macro texture closeups", "3D product callouts", "Speed-ramped turntable pans", "Conversion CTA screens"],
    iconName: "ShoppingBag"
  },
  {
    id: "srv-05",
    title: "Lifestyle Content",
    category: "Brand Aesthetics",
    description: "Sensory, aesthetic vignettes for boutique brands, travel influencers, fitness creators, and daily routine vlogs.",
    deliverables: ["ASMR Foley sound design", "Film emulation 16mm/35mm", "Golden hour color grades", "Smooth gimbal flow"],
    iconName: "Camera"
  },
  {
    id: "srv-06",
    title: "Talking Head Videos",
    category: "Personal Brand & Podcasts",
    description: "Transforming dry, stationary speaking footage into kinetic, visually stimulating educational masterclasses.",
    deliverables: ["B-roll insertion", "Dynamic zoom punches", "Animated lower thirds", "Background noise reduction"],
    iconName: "Mic"
  },
  {
    id: "srv-07",
    title: "Motion Graphics",
    category: "Visual Effects",
    description: "Custom kinetic typography, 3D tracking, floating UI components, map animations, and branded stickers.",
    deliverables: ["Custom After Effects comps", "3D camera projection", "Vector icon animation", "Branded color system"],
    iconName: "Sparkles"
  },
  {
    id: "srv-08",
    title: "Social Media Ads",
    category: "Direct Response Paid Media",
    description: "High-ROI paid advertising creatives for Meta, TikTok Ads, and YouTube Shorts designed to halt thumbs and lower CAC.",
    deliverables: ["Multiple hook variations (A/B testing)", "High-contrast offer callouts", "Clear conversion CTAs", "Platform aspect exports"],
    iconName: "Target"
  }
];

const initialSettings = {
  name: "PIYUSH",
  tagline: "Short Video Editor",
  heroHeadline: "PIYUSH",
  heroSubtitle: "Short-form Video Editor • Motion Design • Reels & Social Content Creator",
  heroBio: "I craft engaging short-form videos for brands & creators. Specializing in dynamic cuts, motion graphics, and viral storytelling for Instagram Reels, TikTok, and YouTube Shorts.",
  availabilityText: "Available for freelance • Based in India",
  aboutBio: "Piyush is a short-form video editor focused on transforming raw footage into engaging, high-retention social media content for creators, brands, and businesses worldwide. With deep expertise across Premiere Pro, After Effects, DaVinci Resolve, and CapCut, he bridges creative storytelling with algorithmic performance.",
  aboutPhilosophy: "In modern social feeds, attention is won or lost in 2.5 seconds. Every single cut, audio hit, and frame transition must earn its place. I treat vertical video as a modern cinematic medium — sharp, rhythmic, and impossible to ignore.",
  aboutQuote: "Let\'s create content that people stop scrolling for.",
  contactEmail: "chameliedits@gmail.com",
  instagramUrl: "https://instagram.com",
  linkedinUrl: "https://linkedin.com",
  behanceUrl: "https://behance.net"
};

const initialInquiries = [
  {
    id: "inq-01",
    name: "Sahil Verma",
    email: "sahil@urbanwear.in",
    projectType: "Social Media Ads",
    budgetRange: "$1,000 – $2,500",
    message: "Hi Piyush, loved your streetwear portfolio. We are launching a new winter hoodie drop and need 8 high-energy Reels + 3 hook variations each for Meta ads next month.",
    createdAt: "2026-08-30T14:20:00.000Z",
    status: "new"
  },
  {
    id: "inq-02",
    name: "Jessica Miller",
    email: "jessica@wanderlustmag.com",
    projectType: "Lifestyle / Travel",
    budgetRange: "$2,500 – $5,000",
    message: "Hello Piyush, we have 40GB of raw 4K footage from a luxury safari expedition in Kenya. We need a 10-part episodic Shorts series with heavy sound design and cinematic grading.",
    createdAt: "2026-08-28T09:15:00.000Z",
    status: "read"
  }
];

const data = {
  videos: allVideos,
  stats: initialStats,
  testimonials: initialTestimonials,
  services: initialServices,
  settings: initialSettings,
  inquiries: initialInquiries
};

const outPath = path.join(process.cwd(), 'public', 'data', 'initialData.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Generated ${allVideos.length} videos successfully into ${outPath}`);
