export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  tech: string;
  variants: Variant[];
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  color: {
    id: string;
    name: string;
    hex: string;
  };
  images: string[];
  sizes: Size[];
}

export interface Size {
  size: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: "prd-001",
    name: "GPM-01 'VOID' RUNNING TEE",
    description:
      "Lightweight moisture-wicking running tee engineered for maximum breathability",
    price: 300000,
    category: "APPAREL",
    subcategory: "COMPRESSION",
    tech: "DRY-FIT / 140GSM",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 10 },
          { size: "M", stock: 15 },
          { size: "L", stock: 8 },
        ],
      },
      {
        color: {
          id: "clr-white",
          name: "White",
          hex: "#FFFFFF",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 5 },
          { size: "M", stock: 12 },
          { size: "L", stock: 6 },
        ],
      },
      {
        color: {
          id: "clr-navy",
          name: "Navy",
          hex: "#1e3a8a",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "M", stock: 8 },
          { size: "L", stock: 10 },
        ],
      },
    ],
    createdAt: "2026-01-25T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-002",
    name: "GPM-02 'SHADOW' RUNNING SHORTS",
    description: "Ultra-light running shorts with built-in compression liner",
    price: 350000,
    category: "APPAREL",
    subcategory: "COMPRESSION",
    tech: "4-WAY STRETCH / QUICK-DRY",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 12 },
          { size: "M", stock: 18 },
          { size: "L", stock: 10 },
          { size: "XL", stock: 5 },
        ],
      },
      {
        color: {
          id: "clr-gray",
          name: "Gray",
          hex: "#6b7280",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "M", stock: 8 },
          { size: "L", stock: 7 },
        ],
      },
    ],
    createdAt: "2026-01-26T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-003",
    name: "GPM-03 'PHANTOM' RUNNING JACKET",
    description:
      "Windproof running jacket with reflective details for night runs",
    price: 650000,
    category: "APPAREL",
    subcategory: "OUTWEAR",
    tech: "WINDPROOF / WATER-RESISTANT",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "M", stock: 6 },
          { size: "L", stock: 8 },
          { size: "XL", stock: 4 },
        ],
      },
      {
        color: {
          id: "clr-neon",
          name: "Neon Yellow",
          hex: "#facc15",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 3 },
          { size: "M", stock: 5 },
          { size: "L", stock: 4 },
        ],
      },
    ],
    createdAt: "2026-01-27T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-004",
    name: "GPM-04 'STEALTH' COMPRESSION TIGHTS",
    description: "Full-length compression tights for enhanced muscle support",
    price: 400000,
    category: "APPAREL",
    subcategory: "COMPRESSION",
    tech: "COMPRESSION FIT / MOISTURE-WICKING",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 7 },
          { size: "M", stock: 12 },
          { size: "L", stock: 9 },
          { size: "XL", stock: 5 },
        ],
      },
    ],
    createdAt: "2026-01-28T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-005",
    name: "GPM-05 'PULSE' RUNNING TANK",
    description: "Sleeveless running tank for maximum ventilation",
    price: 250000,
    category: "APPAREL",
    subcategory: "COMPRESSION",
    tech: "MESH PANELS / 120GSM",
    variants: [
      {
        color: {
          id: "clr-white",
          name: "White",
          hex: "#FFFFFF",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 10 },
          { size: "M", stock: 14 },
          { size: "L", stock: 8 },
        ],
      },
      {
        color: {
          id: "clr-gray",
          name: "Gray",
          hex: "#6b7280",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "M", stock: 6 },
          { size: "L", stock: 5 },
        ],
      },
      {
        color: {
          id: "clr-blue",
          name: "Blue",
          hex: "#3b82f6",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 4 },
          { size: "M", stock: 7 },
        ],
      },
    ],
    createdAt: "2026-01-29T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-006",
    name: "GPM-06 'APEX' WINDBREAKER",
    description: "Packable windbreaker for unpredictable weather conditions",
    price: 550000,
    category: "APPAREL",
    subcategory: "OUTWEAR",
    tech: "PACKABLE / WATER-REPELLENT",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "M", stock: 8 },
          { size: "L", stock: 6 },
          { size: "XL", stock: 3 },
        ],
      },
      {
        color: {
          id: "clr-red",
          name: "Red",
          hex: "#ef4444",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 5 },
          { size: "M", stock: 7 },
        ],
      },
    ],
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-007",
    name: "ACC-01 'VELOCITY' RUNNING CAP",
    description: "Lightweight running cap with moisture-wicking sweatband",
    price: 150000,
    category: "ACCESSORIES",
    subcategory: "HEADWEAR",
    tech: "BREATHABLE MESH / ADJUSTABLE",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [{ size: "ONE SIZE", stock: 20 }],
      },
      {
        color: {
          id: "clr-white",
          name: "White",
          hex: "#FFFFFF",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [{ size: "ONE SIZE", stock: 15 }],
      },
    ],
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-008",
    name: "ACC-02 'SONIC' RUNNING SOCKS",
    description: "Performance running socks with arch support and cushioning",
    price: 80000,
    category: "ACCESSORIES",
    subcategory: "FOOTWEAR",
    tech: "ANTI-BLISTER / ARCH SUPPORT",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S (36-38)", stock: 25 },
          { size: "M (39-42)", stock: 30 },
          { size: "L (43-45)", stock: 20 },
        ],
      },
      {
        color: {
          id: "clr-white",
          name: "White",
          hex: "#FFFFFF",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S (36-38)", stock: 18 },
          { size: "M (39-42)", stock: 22 },
          { size: "L (43-45)", stock: 15 },
        ],
      },
    ],
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-009",
    name: "GEAR-01 'HYDRO' RUNNING BELT",
    description:
      "Adjustable running belt with water bottle holder and zip pockets",
    price: 200000,
    category: "GEAR",
    subcategory: "STORAGE",
    tech: "WATER-RESISTANT / ADJUSTABLE",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [{ size: "ONE SIZE", stock: 15 }],
      },
    ],
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-010",
    name: "GEAR-02 'LUMINA' REFLECTIVE VEST",
    description: "High-visibility reflective vest for night running safety",
    price: 180000,
    category: "GEAR",
    subcategory: "SAFETY",
    tech: "360° REFLECTIVE / ADJUSTABLE",
    variants: [
      {
        color: {
          id: "clr-neon",
          name: "Neon Yellow",
          hex: "#facc15",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [{ size: "ONE SIZE", stock: 12 }],
      },
      {
        color: {
          id: "clr-orange",
          name: "Orange",
          hex: "#f97316",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [{ size: "ONE SIZE", stock: 10 }],
      },
    ],
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-011",
    name: "GPM-07 'CARBON' LONG SLEEVE TEE",
    description: "Long sleeve running tee with thumb holes for cold weather",
    price: 350000,
    category: "APPAREL",
    subcategory: "COMPRESSION",
    tech: "THERMAL / THUMB HOLES",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 8 },
          { size: "M", stock: 12 },
          { size: "L", stock: 9 },
          { size: "XL", stock: 4 },
        ],
      },
      {
        color: {
          id: "clr-gray",
          name: "Gray",
          hex: "#6b7280",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "M", stock: 7 },
          { size: "L", stock: 6 },
        ],
      },
    ],
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "prd-012",
    name: "GPM-08 'ECLIPSE' RUNNING VEST",
    description:
      "Insulated running vest for core warmth without restricted arms",
    price: 500000,
    category: "APPAREL",
    subcategory: "OUTWEAR",
    tech: "INSULATED / WINDPROOF",
    variants: [
      {
        color: {
          id: "clr-black",
          name: "Black",
          hex: "#000000",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "M", stock: 5 },
          { size: "L", stock: 7 },
          { size: "XL", stock: 3 },
        ],
      },
      {
        color: {
          id: "clr-navy",
          name: "Navy",
          hex: "#1e3a8a",
        },
        images: ["/images/products/product-1_1.png"],
        sizes: [
          { size: "S", stock: 4 },
          { size: "M", stock: 6 },
        ],
      },
    ],
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
];
