export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'premium-apparel' | 'fine-jewellery-timepieces' | 'mobile-accessories';
  categoryLabel: string;
  image: string;
  secondaryImage?: string;
  description: string;
  fabricOrMaterial?: string;
  pieceCount?: string;
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface Category {
  id: string;
  slug: 'premium-apparel' | 'fine-jewellery-timepieces' | 'mobile-accessories';
  number: string;
  name: string;
  subtitle: string;
  headline: string;
  description: string;
  image: string;
  itemCount: number;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  location?: string;
  rating: number;
  date: string;
  text: string;
  productMentioned: string;
}

export const SITE_CONTENT = {
  brand: {
    name: "Grace by Shahzaib",
    displayWordmark: "Grace by Shahzaib",
    tagline: "Elevate Your Everyday Style: Fashion, Jewellery, Timepieces & Mobile Accessories",
    eyebrow: "PREMIUM APPAREL · FINE JEWELLERY · CLASSIC TIMEPIECES · MOBILE ACCESSORIES",
    heroHeadlinePart1: "Elevate Your",
    heroHeadlineItalic: "Everyday",
    heroHeadlinePart2: "Style",
    heroSubheading: "A curated curation of bespoke Pakistani designer apparel, timeless heirloom jewellery, classic timepieces, and high-performance mobile tech essentials.",
    phone: "+92 321 8490211",
    whatsappNumber: "923218490211",
    email: "info@gracebyshahzaib.site",
    supportEmail: "orders@gracebyshahzaib.site",
    instagram: "@gracebyshahzaib.site",
    instagramUrl: "https://instagram.com/gracebyshahzaib.site",
    address: "Gulberg III, Lahore & Clifton, Karachi, Pakistan",
    deliveryInfo: "Free Express Shipping Across Pakistan on Orders Over Rs 2,500",
  },

  marqueeWords: [
    "Premium Apparel",
    "Fine Jewellery",
    "Classic Timepieces",
    "Mobile Accessories",
    "Bespoke Embroidery",
    "Cash on Delivery",
    "Nationwide Delivery",
    "Artisanal Craftsmanship"
  ],

  categories: [
    {
      id: "cat-1",
      slug: "premium-apparel",
      number: "01",
      name: "Premium Apparel",
      subtitle: "Unstitched & Stitched Pret",
      headline: "Bespoke Silks, Lawn & Festive Dhanak",
      description: "From ethereal organza dupattas and intricate katan silks to breathable everyday lawn, our apparel brings timeless Pakistani tailoring to your wardrobe.",
      image: "/src/assets/images/category_apparel_1792237669441.jpg",
      itemCount: 14,
      tags: ["3-Piece Unstitched", "Stitched Shirts", "Digital Lawn", "Festive Silk", "Khaddar"]
    },
    {
      id: "cat-2",
      slug: "fine-jewellery-timepieces",
      number: "02",
      name: "Fine Jewellery & Timepieces",
      subtitle: "Precious Pave & Chronographs",
      headline: "Heirloom Pave Zircons & Prestige Watches",
      description: "Finely faceted zircon teardrop pendants, copper pave necklaces, and impeccably styled wristwatches designed for memorable moments and everyday grace.",
      image: "/src/assets/images/category_jewellery_1792237668927.jpg",
      itemCount: 6,
      tags: ["Zircon Pendants", "Leather Chronographs", "Smart Watches", "Statement Jewellery"]
    },
    {
      id: "cat-3",
      slug: "mobile-accessories",
      number: "03",
      name: "Mobile & Smart Accessories",
      subtitle: "High-Performance Gadgets",
      headline: "Studio Microphones & Wearable Tech",
      description: "Plug-and-play wireless lavalier microphones, ultra-smart wearables, and premium mobile gear engineered for creators and professionals on the move.",
      image: "/src/assets/images/category_tech_1792237668845.jpg",
      itemCount: 5,
      tags: ["Wireless Microphones", "Apple Ultra Compatible", "Audio Gear", "Smart Wearables"]
    }
  ] as Category[],

  products: [
    {
      id: "prod-1",
      name: "Wireless Bluetooth Microphone Universal Plug & Play",
      price: 1899,
      originalPrice: 2499,
      category: "mobile-accessories",
      categoryLabel: "Mobile Accessories",
      image: "/src/assets/images/category_tech_1792237668845.jpg",
      description: "Dual wireless lavalier microphone with instant auto-sync receiver for smartphones, vlogging, and livestreaming. Active noise cancellation and 8-hour battery.",
      fabricOrMaterial: "Matte Polycarbonate & Metal Clip",
      inStock: true,
      featured: true,
      bestSeller: true,
      rating: 4.9,
      reviewsCount: 38
    },
    {
      id: "prod-2",
      name: "K8 Wireless Microphone Dual Channel",
      price: 1899,
      originalPrice: 2299,
      category: "mobile-accessories",
      categoryLabel: "Mobile Accessories",
      image: "/src/assets/images/category_tech_1792237668845.jpg",
      description: "Ultra-compact clip-on wireless lavalier mic with 20m barrier-free transmission and crystal voice pickup for TikTok, YouTube, and interviews.",
      fabricOrMaterial: "Acoustic Mesh & ABS",
      inStock: true,
      featured: false,
      rating: 4.8,
      reviewsCount: 24
    },
    {
      id: "prod-3",
      name: "3 Pcs Women's Unstitched Embroidered Suit",
      price: 4599,
      originalPrice: 5500,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/category_apparel_1792237669441.jpg",
      description: "Artisanal embroidered lawn shirt with resham threadwork, dyed cambric cotton trousers, and a lightweight printed chiffon dupatta.",
      fabricOrMaterial: "Pure Lawn & Chiffon",
      pieceCount: "3 Pieces (Shirt, Trouser, Dupatta)",
      inStock: true,
      featured: true,
      bestSeller: true,
      rating: 5.0,
      reviewsCount: 42
    },
    {
      id: "prod-4",
      name: "3 Pcs Women's Unstitched Digital Print Suit (Bin Saeed)",
      price: 3999,
      originalPrice: 4800,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/hero_luxury_fashion_1792237668313.jpg",
      description: "Authentic Bin Saeed digital floral lawn collection with premium softness, vivid floral motifs, and a matching full-length lawn dupatta.",
      fabricOrMaterial: "100% Combed Summer Lawn",
      pieceCount: "3 Pieces Unstitched",
      inStock: true,
      featured: true,
      rating: 4.9,
      reviewsCount: 31
    },
    {
      id: "prod-5",
      name: "3-Piece Printed Khaddar Unstitched Suit for Women Wedding Party Wear",
      price: 5899,
      originalPrice: 7200,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/atelier_craftsmanship_1792237669060.jpg",
      description: "Opulent festive khaddar with tilla and threadwork embroidery along the neckline and hem, paired with a rich wool-blend jacquard shawl.",
      fabricOrMaterial: "Winter Khaddar & Jacquard",
      pieceCount: "3 Pieces Festive Unstitched",
      inStock: true,
      featured: true,
      bestSeller: true,
      rating: 5.0,
      reviewsCount: 19
    },
    {
      id: "prod-6",
      name: "Lilac Embroidered 3-Piece Unstitched Suit for Women",
      price: 5999,
      originalPrice: 7500,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/category_apparel_1792237669441.jpg",
      description: "Regal soft lilac luxury ensemble adorned with sequence work, delicate organza borders, and a scalloped embroidered organza dupatta.",
      fabricOrMaterial: "Chiffon Silk & Organza",
      pieceCount: "3 Pieces Luxury Unstitched",
      inStock: true,
      featured: true,
      rating: 4.9,
      reviewsCount: 27
    },
    {
      id: "prod-7",
      name: "3-Piece Printed Dobby Lawn Suit Unstitched Yellow Blue",
      price: 4999,
      originalPrice: 5800,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/hero_luxury_fashion_1792237668313.jpg",
      description: "Textured dobby weave fabric featuring vibrant summery contrast in cobalt blue and sunshine yellow, with intricate neck embroidery patch.",
      fabricOrMaterial: "Dobby Textured Lawn",
      pieceCount: "3 Pieces Unstitched",
      inStock: true,
      featured: false,
      rating: 4.7,
      reviewsCount: 15
    },
    {
      id: "prod-8",
      name: "3 Piece Black Embroidered Dhanak Suit Unstitched with Printed Dupatta",
      price: 5399,
      originalPrice: 6500,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/atelier_craftsmanship_1792237669060.jpg",
      description: "Signature Urge collection deep jet-black dhanak fabric with heavy golden resham thread embroidery and an artistic digital printed warm shawl.",
      fabricOrMaterial: "Warm Winter Dhanak",
      pieceCount: "3 Pieces Unstitched",
      inStock: true,
      featured: true,
      bestSeller: true,
      rating: 5.0,
      reviewsCount: 36
    },
    {
      id: "prod-9",
      name: "2 Pcs Women's Unstitched Printed Suit - Mustard Blossom",
      price: 2499,
      originalPrice: 3200,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/category_apparel_1792237669441.jpg",
      description: "Breezy two-piece printed lawn shirt and trouser set in warm mustard with contemporary geometric borders.",
      fabricOrMaterial: "Pure Lawn Cotton",
      pieceCount: "2 Pieces (Shirt & Trouser)",
      inStock: true,
      featured: false,
      rating: 4.8,
      reviewsCount: 22
    },
    {
      id: "prod-10",
      name: "Pink Katan Silk 3-Piece Wedding Unstitch Suit with Net Dupatta",
      price: 2699,
      originalPrice: 3500,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/hero_luxury_fashion_1792237668313.jpg",
      description: "Lustrous blush pink katan silk shirt and trouser fabric accompanied by an embellished four-sided bordered net dupatta.",
      fabricOrMaterial: "Katan Silk & Net",
      pieceCount: "3 Pieces Wedding Wear",
      inStock: true,
      featured: false,
      rating: 4.9,
      reviewsCount: 18
    },
    {
      id: "prod-11",
      name: "2 Pcs Women's Unstitched 3-D Block Printed Suit",
      price: 3099,
      originalPrice: 3800,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/category_apparel_1792237669441.jpg",
      description: "Intricate 3D metallic gold block print on fine dyed lawn. High durability colorfast dyes with soft hand-feel.",
      fabricOrMaterial: "3D Gold Block Printed Lawn",
      pieceCount: "2 Pieces Unstitched",
      inStock: true,
      featured: false,
      rating: 4.7,
      reviewsCount: 14
    },
    {
      id: "prod-12",
      name: "1 Pc Women's Stitched Arabic Lawn Embroidered Shirt",
      price: 3499,
      originalPrice: 4200,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/category_apparel_1792237669441.jpg",
      description: "Ready-to-wear kurta cut in breathable sage green Arabic lawn with delicate thread neckline and cuff tassels.",
      fabricOrMaterial: "Arabic Lawn",
      pieceCount: "1 Pc Stitched Kurta",
      inStock: true,
      featured: false,
      rating: 4.8,
      reviewsCount: 20
    },
    {
      id: "prod-13",
      name: "Black Boring 2 Pcs Women's Stitched Cotton Embroidered Suit",
      price: 4999,
      originalPrice: 6200,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/atelier_craftsmanship_1792237669060.jpg",
      description: "Pure cotton chikankari schiffli (boring work) shirt with matching straight trousers in jet noir black. Timeless festive pret.",
      fabricOrMaterial: "Schiffli Boring Embroidered Cotton",
      pieceCount: "2 Pcs Stitched Pret",
      inStock: true,
      featured: true,
      bestSeller: true,
      rating: 5.0,
      reviewsCount: 29
    },
    {
      id: "prod-14",
      name: "Apple Watch Ultra 3 Grey Silicone Strap",
      price: 3499,
      originalPrice: 4500,
      category: "fine-jewellery-timepieces",
      categoryLabel: "Fine Jewellery & Timepieces",
      image: "/src/assets/images/category_tech_1792237668845.jpg",
      description: "High-definition always-on AMOLED display with aerospace titanium-style finish, multi-sport tracking, heart rate, and dual-button navigation.",
      fabricOrMaterial: "Titanium Finish Alloy & Grey Fluoroelastomer",
      inStock: true,
      featured: true,
      bestSeller: true,
      rating: 4.9,
      reviewsCount: 44
    },
    {
      id: "prod-15",
      name: "Smart Watch FangHua Waterproof Sports Edition",
      price: 2999,
      originalPrice: 3800,
      category: "fine-jewellery-timepieces",
      categoryLabel: "Fine Jewellery & Timepieces",
      image: "/src/assets/images/category_tech_1792237668845.jpg",
      description: "IP68 waterproof Bluetooth calling smartwatch with built-in voice speaker, notifications, and 7-day standby battery.",
      fabricOrMaterial: "Zinc Alloy & Sports Silicone",
      inStock: true,
      featured: false,
      rating: 4.7,
      reviewsCount: 21
    },
    {
      id: "prod-16",
      name: "Men's Modern Stylish Look Watch (Burgundy Leather)",
      price: 2199,
      originalPrice: 2800,
      category: "fine-jewellery-timepieces",
      categoryLabel: "Fine Jewellery & Timepieces",
      image: "/src/assets/images/category_jewellery_1792237668927.jpg",
      description: "Sophisticated deep burgundy genuine leather strap with rose-gold accented dial markers and mineral crystal glass.",
      fabricOrMaterial: "Genuine Leather & Stainless Steel",
      inStock: true,
      featured: true,
      bestSeller: true,
      rating: 4.9,
      reviewsCount: 33
    },
    {
      id: "prod-17",
      name: "Imported Quality Watch - Matte Forest Green",
      price: 1899,
      originalPrice: 2400,
      category: "fine-jewellery-timepieces",
      categoryLabel: "Fine Jewellery & Timepieces",
      image: "/src/assets/images/category_jewellery_1792237668927.jpg",
      description: "Minimalist Scandinavian-inspired monochrome watch with soft-touch olive silicone case and high-precision Japanese quartz movement.",
      fabricOrMaterial: "Matte Silicone & Quartz Movement",
      inStock: true,
      featured: false,
      rating: 4.8,
      reviewsCount: 17
    },
    {
      id: "prod-18",
      name: "White Zircon Pendant Necklace Copper Pave Fashion",
      price: 1999,
      originalPrice: 2600,
      category: "fine-jewellery-timepieces",
      categoryLabel: "Fine Jewellery & Timepieces",
      image: "/src/assets/images/category_jewellery_1792237668927.jpg",
      description: "Exquisite teardrop brilliant-cut white cubic zircon encased in micro-pave copper setting with an anti-tarnish rhodium plated link chain.",
      fabricOrMaterial: "AAA Zircon & Rhodium Plated Copper",
      inStock: true,
      featured: true,
      bestSeller: true,
      rating: 5.0,
      reviewsCount: 52
    },
    {
      id: "prod-19",
      name: "T800 Ultra Smart Watch Bluetooth Call With Ocean Strap",
      price: 3499,
      originalPrice: 4200,
      category: "fine-jewellery-timepieces",
      categoryLabel: "Fine Jewellery & Timepieces",
      image: "/src/assets/images/category_tech_1792237668845.jpg",
      description: "Series Bluetooth call smartwatch with textured ocean wave silicone strap, magnetic wireless charger dock, and customizable watch faces.",
      fabricOrMaterial: "Matte Alloy Case & Ocean Silicone",
      inStock: true,
      featured: true,
      rating: 4.8,
      reviewsCount: 39
    },
    {
      id: "prod-20",
      name: "Black Red Embroidered 2-Piece Women's Suit",
      price: 3699,
      originalPrice: 4500,
      category: "premium-apparel",
      categoryLabel: "Premium Apparel",
      image: "/src/assets/images/atelier_craftsmanship_1792237669060.jpg",
      description: "Bold crimson floral embroidery over raven black premium fabric. Perfect for evening dinners and festive gatherings.",
      fabricOrMaterial: "Dhanak Cotton Blend",
      pieceCount: "2 Pieces (Shirt & Trouser)",
      inStock: true,
      featured: false,
      rating: 4.9,
      reviewsCount: 23
    }
  ] as Product[],

  reviews: [
    {
      id: "rev-1",
      author: "Saima Akhtar",
      location: "Lahore, Pakistan",
      rating: 5,
      date: "October 2026",
      text: "Beautiful suit with excellent fabric and stitching. The design looks elegant and exactly as shown. Really happy with my purchase!",
      productMentioned: "3 Pcs Women's Unstitched Embroidered Suit"
    },
    {
      id: "rev-2",
      author: "Salma Naseer",
      location: "Islamabad, Pakistan",
      rating: 5,
      date: "September 2026",
      text: "Absolutely beautiful jewelry! The design is elegant and eye-catching. Great choice for special occasions and gifts.",
      productMentioned: "White Zircon Pendant Necklace Copper Pave"
    },
    {
      id: "rev-3",
      author: "Noman Aslam",
      location: "Karachi, Pakistan",
      rating: 5,
      date: "October 2026",
      text: "Great-looking watch with a stylish design and good quality. It looks even better in person. Perfect for everyday wear! And Your Mobile Accessories are Amazing.",
      productMentioned: "T800 Ultra Watch & Wireless Mic Set"
    }
  ] as Review[],

  whyChooseUs: [
    {
      title: "Master Craftsmanship",
      description: "Every suit is detailed with authentic threadwork, fine selvedge finish, and hand-selected luxury fabrics."
    },
    {
      title: "Direct Curated Sourcing",
      description: "From certified zircon jewelry to studio-grade wireless audio gear, every piece passes strict quality control."
    },
    {
      title: "Cash on Delivery",
      description: "Shop with absolute peace of mind. Inspect your parcel at doorstep anywhere across Pakistan before payment."
    },
    {
      title: "Dedicated WhatsApp Care",
      description: "Direct one-on-one styling advice, size consultation, and live courier tracking via WhatsApp."
    }
  ],

  craftsmanshipStory: {
    title: "The Art of Refined Grace",
    lead: "Born from a passion for timeless elegance, Grace by Shahzaib unites traditional Pakistani textile heritage with modern luxury accessories.",
    body1: "We believe luxury lies in the delicate details: the precision of a needle on pure organza, the facet of a flawless zircon catching the sun, and the ergonomic craftsmanship of modern tech you carry every single day.",
    body2: "Whether you are selecting a hand-embroidered suit for festive weddings or styling a minimalist timepiece with high-definition wireless acoustics, our pieces are designed to elevate your everyday presence.",
    stats: [
      { label: "Satisfied Patrons", value: "15,000+" },
      { label: "Cities Delivered", value: "180+" },
      { label: "Curated Collections", value: "100% Authentic" }
    ]
  }
};
