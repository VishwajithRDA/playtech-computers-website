// Mock catalog data for Playtech.
// Shapes here mirror likely database tables (categories, products, stock_locations)
// so they can be swapped for real DB queries later without touching the UI.

export type StockStatus = "in-stock" | "out-of-stock" | "call-for-price"

export interface StockLocation {
  branch: string
  quantity: number
}

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  brand: string
  categoryId: string
  image: string
  /** Price in Sri Lankan Rupees. `null` means "Call for Price". */
  priceLKR: number | null
  stock: StockStatus
  rating: number
  isNew?: boolean
  shortSpec: string
  description: string
  warranty: string
  specs: ProductSpec[]
  locations: StockLocation[]
}

export interface Category {
  id: string
  name: string
  /** lucide-react icon name resolved in the sidebar component. */
  icon: string
  count: number
}

export interface StoreInfo {
  name: string
  tagline: string
  phone: string
  whatsapp: string // digits only, intl format for wa.me links
  address: string
  hours: string
  email: string
}

export const STORE_INFO: StoreInfo = {
  name: "Playtech",
  tagline: "No.1 IT Partner in Sri Lanka",
  phone: "+94 37 224 5678",
  whatsapp: "94372245678",
  address: "No 63, Hettipola Road, Kuliyapitiya, Sri Lanka",
  hours: "Mon–Sat · 9.00 AM – 7.00 PM",
  email: "sales@playtech.lk",
}

export const CATEGORIES: Category[] = [
  { id: "laptops", name: "Laptops", icon: "Laptop", count: 3 },
  { id: "desktops", name: "Desktop Systems", icon: "Monitor", count: 2 },
  { id: "processors", name: "Processors", icon: "Cpu", count: 3 },
  { id: "motherboards", name: "Motherboards", icon: "CircuitBoard", count: 2 },
  { id: "ram", name: "RAM", icon: "MemoryStick", count: 2 },
  { id: "storage", name: "Storage", icon: "HardDrive", count: 2 },
  { id: "casings", name: "Casings", icon: "Box", count: 2 },
  { id: "cooling", name: "Cooling", icon: "Fan", count: 2 },
]

export const PRODUCTS: Product[] = [
  {
    id: "lap-rog-g16",
    name: "ASUS ROG Strix G16 (2024)",
    brand: "ASUS",
    categoryId: "laptops",
    image: "/products/laptop.png",
    priceLKR: 685000,
    stock: "in-stock",
    rating: 4.8,
    isNew: true,
    shortSpec: "Core i9-14900HX · RTX 4070 · 16GB · 1TB",
    description:
      "A powerhouse 16-inch gaming laptop with a 240Hz Nebula display, per-key RGB, and aggressive thermals for sustained performance on the go.",
    warranty: "3 Years ASUS Sri Lanka Agent Warranty (2Y Global + 1Y Local)",
    specs: [
      { label: "Processor", value: "Intel Core i9-14900HX" },
      { label: "Graphics", value: "NVIDIA GeForce RTX 4070 8GB" },
      { label: "Memory", value: "16GB DDR5 5600MHz" },
      { label: "Storage", value: "1TB PCIe 4.0 NVMe SSD" },
      { label: "Display", value: '16" QHD+ 240Hz IPS' },
      { label: "OS", value: "Windows 11 Home" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 6 },
      { branch: "Kandy", quantity: 2 },
    ],
  },
  {
    id: "lap-legion-5",
    name: "Lenovo Legion 5 Pro",
    brand: "Lenovo",
    categoryId: "laptops",
    image: "/products/laptop.png",
    priceLKR: 540000,
    stock: "in-stock",
    rating: 4.6,
    shortSpec: "Ryzen 7 7745HX · RTX 4060 · 16GB · 512GB",
    description:
      "Balanced performance and value with a tall 16:10 165Hz panel, excellent keyboard, and cool, quiet operation.",
    warranty: "2 Years Lenovo Sri Lanka Warranty",
    specs: [
      { label: "Processor", value: "AMD Ryzen 7 7745HX" },
      { label: "Graphics", value: "NVIDIA GeForce RTX 4060 8GB" },
      { label: "Memory", value: "16GB DDR5" },
      { label: "Storage", value: "512GB PCIe 4.0 NVMe SSD" },
      { label: "Display", value: '16" WQXGA 165Hz' },
      { label: "OS", value: "Windows 11 Home" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 4 },
      { branch: "Galle", quantity: 1 },
    ],
  },
  {
    id: "lap-macbook-air",
    name: 'Apple MacBook Air 15" M3',
    brand: "Apple",
    categoryId: "laptops",
    image: "/products/laptop.png",
    priceLKR: null,
    stock: "call-for-price",
    rating: 4.9,
    shortSpec: "Apple M3 · 8-core · 8GB · 256GB",
    description:
      "The thin-and-light 15-inch MacBook Air with the M3 chip, all-day battery life and a stunning Liquid Retina display.",
    warranty: "1 Year Apple Limited Warranty (Authorized Reseller)",
    specs: [
      { label: "Chip", value: "Apple M3 (8-core CPU)" },
      { label: "GPU", value: "10-core GPU" },
      { label: "Memory", value: "8GB Unified Memory" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '15.3" Liquid Retina' },
      { label: "OS", value: "macOS" },
    ],
    locations: [{ branch: "Kuliyapitiya (Main)", quantity: 0 }],
  },
  {
    id: "desk-playtech-titan",
    name: "Playtech Titan RTX Gaming Rig",
    brand: "Playtech Custom",
    categoryId: "desktops",
    image: "/products/desktop.png",
    priceLKR: 895000,
    stock: "in-stock",
    rating: 4.9,
    isNew: true,
    shortSpec: "Core i7-14700K · RTX 4070 Ti · 32GB · 2TB",
    description:
      "A hand-built enthusiast desktop assembled and stress-tested in-house. Ready for 1440p high-refresh gaming and heavy content creation.",
    warranty: "2 Years Playtech Assembly Warranty + Component Agent Warranty",
    specs: [
      { label: "Processor", value: "Intel Core i7-14700K" },
      { label: "Graphics", value: "NVIDIA RTX 4070 Ti 12GB" },
      { label: "Memory", value: "32GB DDR5 6000MHz" },
      { label: "Storage", value: "2TB Gen4 NVMe SSD" },
      { label: "Cooling", value: "240mm AIO Liquid Cooler" },
      { label: "PSU", value: "850W 80+ Gold" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 3 },
      { branch: "Kandy", quantity: 1 },
    ],
  },
  {
    id: "desk-office-pro",
    name: "Playtech Office Pro Mini",
    brand: "Playtech Custom",
    categoryId: "desktops",
    image: "/products/desktop.png",
    priceLKR: 210000,
    stock: "out-of-stock",
    rating: 4.4,
    shortSpec: "Core i5-13400 · 16GB · 512GB · iGPU",
    description:
      "Compact, efficient desktop for business and productivity workloads with fast NVMe storage and quiet operation.",
    warranty: "2 Years Playtech Assembly Warranty",
    specs: [
      { label: "Processor", value: "Intel Core i5-13400" },
      { label: "Graphics", value: "Intel UHD 730" },
      { label: "Memory", value: "16GB DDR4 3200MHz" },
      { label: "Storage", value: "512GB NVMe SSD" },
      { label: "Form Factor", value: "Micro-ATX" },
      { label: "PSU", value: "500W 80+ Bronze" },
    ],
    locations: [{ branch: "Kuliyapitiya (Main)", quantity: 0 }],
  },
  {
    id: "cpu-i9-14900k",
    name: "Intel Core i9-14900K",
    brand: "Intel",
    categoryId: "processors",
    image: "/products/cpu.png",
    priceLKR: 178500,
    stock: "in-stock",
    rating: 4.7,
    shortSpec: "24 Cores · 32 Threads · up to 6.0GHz",
    description:
      "Flagship 14th-gen desktop processor delivering top-tier gaming and multi-threaded performance on the LGA1700 platform.",
    warranty: "3 Years Intel Agent Warranty",
    specs: [
      { label: "Cores / Threads", value: "24 (8P + 16E) / 32" },
      { label: "Max Turbo", value: "6.0 GHz" },
      { label: "Cache", value: "36MB Intel Smart Cache" },
      { label: "Socket", value: "LGA1700" },
      { label: "TDP", value: "125W (253W Turbo)" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 12 },
      { branch: "Kandy", quantity: 5 },
    ],
  },
  {
    id: "cpu-r7-7800x3d",
    name: "AMD Ryzen 7 7800X3D",
    brand: "AMD",
    categoryId: "processors",
    image: "/products/cpu.png",
    priceLKR: 152000,
    stock: "in-stock",
    rating: 4.9,
    isNew: true,
    shortSpec: "8 Cores · 16 Threads · 3D V-Cache",
    description:
      "The gaming champion. 3D V-Cache technology delivers class-leading frame rates while staying cool and efficient.",
    warranty: "3 Years AMD Agent Warranty",
    specs: [
      { label: "Cores / Threads", value: "8 / 16" },
      { label: "Max Boost", value: "5.0 GHz" },
      { label: "Cache", value: "96MB (L2 + 3D V-Cache)" },
      { label: "Socket", value: "AM5" },
      { label: "TDP", value: "120W" },
    ],
    locations: [{ branch: "Kuliyapitiya (Main)", quantity: 8 }],
  },
  {
    id: "cpu-i5-14600k",
    name: "Intel Core i5-14600K",
    brand: "Intel",
    categoryId: "processors",
    image: "/products/cpu.png",
    priceLKR: 98000,
    stock: "in-stock",
    rating: 4.6,
    shortSpec: "14 Cores · 20 Threads · up to 5.3GHz",
    description:
      "The sweet-spot mid-range CPU for gamers and creators wanting excellent value without compromise.",
    warranty: "3 Years Intel Agent Warranty",
    specs: [
      { label: "Cores / Threads", value: "14 (6P + 8E) / 20" },
      { label: "Max Turbo", value: "5.3 GHz" },
      { label: "Cache", value: "24MB Smart Cache" },
      { label: "Socket", value: "LGA1700" },
      { label: "TDP", value: "125W" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 15 },
      { branch: "Galle", quantity: 3 },
    ],
  },
  {
    id: "mb-z790-hero",
    name: "ASUS ROG Maximus Z790 Hero",
    brand: "ASUS",
    categoryId: "motherboards",
    image: "/products/motherboard.png",
    priceLKR: 235000,
    stock: "in-stock",
    rating: 4.8,
    shortSpec: "LGA1700 · DDR5 · PCIe 5.0 · Wi-Fi 6E",
    description:
      "Premium enthusiast board with robust VRM, dual PCIe 5.0 M.2 slots and comprehensive tuning options.",
    warranty: "3 Years ASUS Agent Warranty",
    specs: [
      { label: "Socket", value: "LGA1700" },
      { label: "Chipset", value: "Intel Z790" },
      { label: "Memory", value: "4x DDR5, up to 192GB" },
      { label: "Expansion", value: "PCIe 5.0 x16" },
      { label: "Networking", value: "2.5G LAN + Wi-Fi 6E" },
    ],
    locations: [{ branch: "Kuliyapitiya (Main)", quantity: 4 }],
  },
  {
    id: "mb-b650-tomahawk",
    name: "MSI MAG B650 Tomahawk WiFi",
    brand: "MSI",
    categoryId: "motherboards",
    image: "/products/motherboard.png",
    priceLKR: 89000,
    stock: "call-for-price",
    rating: 4.7,
    shortSpec: "AM5 · DDR5 · PCIe 4.0 · Wi-Fi",
    description:
      "A rock-solid AM5 board pairing perfectly with Ryzen 7000/9000 chips, with strong VRM cooling and great value.",
    warranty: "3 Years MSI Agent Warranty",
    specs: [
      { label: "Socket", value: "AM5" },
      { label: "Chipset", value: "AMD B650" },
      { label: "Memory", value: "4x DDR5, up to 256GB" },
      { label: "Expansion", value: "PCIe 4.0 x16" },
      { label: "Networking", value: "2.5G LAN + Wi-Fi 6E" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 0 },
      { branch: "Kandy", quantity: 0 },
    ],
  },
  {
    id: "ram-tridentz-32",
    name: "G.Skill Trident Z5 RGB 32GB",
    brand: "G.Skill",
    categoryId: "ram",
    image: "/products/ram.png",
    priceLKR: 46500,
    stock: "in-stock",
    rating: 4.8,
    isNew: true,
    shortSpec: "2x16GB · DDR5 6000MHz · CL30",
    description:
      "Blazing-fast DDR5 kit with tight CL30 timings and stunning RGB, ideal for high-end AM5 and LGA1700 builds.",
    warranty: "Lifetime Limited Warranty (Agent)",
    specs: [
      { label: "Capacity", value: "32GB (2x16GB)" },
      { label: "Speed", value: "DDR5 6000MHz" },
      { label: "Latency", value: "CL30-38-38-96" },
      { label: "Voltage", value: "1.35V" },
      { label: "Lighting", value: "Addressable RGB" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 20 },
      { branch: "Galle", quantity: 6 },
    ],
  },
  {
    id: "ram-vengeance-16",
    name: "Corsair Vengeance 16GB DDR4",
    brand: "Corsair",
    categoryId: "ram",
    image: "/products/ram.png",
    priceLKR: 18900,
    stock: "in-stock",
    rating: 4.6,
    shortSpec: "2x8GB · DDR4 3200MHz · CL16",
    description:
      "Dependable DDR4 kit for mainstream and budget builds with a low-profile heat spreader.",
    warranty: "Lifetime Limited Warranty (Agent)",
    specs: [
      { label: "Capacity", value: "16GB (2x8GB)" },
      { label: "Speed", value: "DDR4 3200MHz" },
      { label: "Latency", value: "CL16-20-20-38" },
      { label: "Voltage", value: "1.35V" },
      { label: "Profile", value: "Intel XMP 2.0" },
    ],
    locations: [{ branch: "Kuliyapitiya (Main)", quantity: 30 }],
  },
  {
    id: "ssd-990pro-2tb",
    name: "Samsung 990 PRO 2TB NVMe",
    brand: "Samsung",
    categoryId: "storage",
    image: "/products/storage.png",
    priceLKR: 62000,
    stock: "in-stock",
    rating: 4.9,
    shortSpec: "PCIe 4.0 · 7450MB/s Read",
    description:
      "Flagship Gen4 SSD with best-in-class sustained performance and efficiency for gaming and creative workloads.",
    warranty: "5 Years Samsung Agent Warranty",
    specs: [
      { label: "Capacity", value: "2TB" },
      { label: "Interface", value: "PCIe 4.0 x4 NVMe" },
      { label: "Read Speed", value: "7450 MB/s" },
      { label: "Write Speed", value: "6900 MB/s" },
      { label: "Form Factor", value: "M.2 2280" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 14 },
      { branch: "Kandy", quantity: 4 },
    ],
  },
  {
    id: "hdd-barracuda-4tb",
    name: "Seagate BarraCuda 4TB HDD",
    brand: "Seagate",
    categoryId: "storage",
    image: "/products/storage.png",
    priceLKR: 34500,
    stock: "out-of-stock",
    rating: 4.5,
    shortSpec: "3.5\" · 5400RPM · SATA 6Gb/s",
    description:
      "High-capacity mechanical drive for mass storage, backups and media libraries at an unbeatable cost per GB.",
    warranty: "2 Years Seagate Agent Warranty",
    specs: [
      { label: "Capacity", value: "4TB" },
      { label: "Interface", value: "SATA 6Gb/s" },
      { label: "Spindle", value: "5400 RPM" },
      { label: "Cache", value: "256MB" },
      { label: "Form Factor", value: '3.5"' },
    ],
    locations: [{ branch: "Kuliyapitiya (Main)", quantity: 0 }],
  },
  {
    id: "case-lancool-3",
    name: "Lian Li Lancool 216 RGB",
    brand: "Lian Li",
    categoryId: "casings",
    image: "/products/casing.png",
    priceLKR: 42000,
    stock: "in-stock",
    rating: 4.8,
    isNew: true,
    shortSpec: "Mid Tower · Mesh · 2x160mm ARGB",
    description:
      "Airflow-focused mid-tower with two pre-installed 160mm ARGB fans and outstanding cable management.",
    warranty: "1 Year Agent Warranty",
    specs: [
      { label: "Type", value: "Mid Tower ATX" },
      { label: "Front", value: "High-Airflow Mesh" },
      { label: "Included Fans", value: "2x 160mm + 1x 140mm ARGB" },
      { label: "GPU Clearance", value: "392mm" },
      { label: "Side Panel", value: "Tempered Glass" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 9 },
      { branch: "Galle", quantity: 2 },
    ],
  },
  {
    id: "case-nr200",
    name: "Cooler Master NR200P",
    brand: "Cooler Master",
    categoryId: "casings",
    image: "/products/casing.png",
    priceLKR: 38000,
    stock: "in-stock",
    rating: 4.7,
    shortSpec: "Mini-ITX · SFF · Tempered Glass",
    description:
      "A compact small-form-factor icon that packs full-size GPU support into a tiny, versatile chassis.",
    warranty: "1 Year Agent Warranty",
    specs: [
      { label: "Type", value: "Mini-ITX SFF" },
      { label: "GPU Clearance", value: "330mm" },
      { label: "Cooler Height", value: "155mm" },
      { label: "Included Fans", value: "2x 120mm" },
      { label: "Volume", value: "18.25 L" },
    ],
    locations: [{ branch: "Kuliyapitiya (Main)", quantity: 5 }],
  },
  {
    id: "cool-kraken-x",
    name: "NZXT Kraken 240 RGB AIO",
    brand: "NZXT",
    categoryId: "cooling",
    image: "/products/cooling.png",
    priceLKR: 58000,
    stock: "in-stock",
    rating: 4.7,
    shortSpec: "240mm · LCD-ready Pump · ARGB",
    description:
      "A quiet, high-performance 240mm all-in-one liquid cooler with an infinity-mirror RGB pump cap.",
    warranty: "6 Years NZXT Agent Warranty",
    specs: [
      { label: "Radiator", value: "240mm Aluminium" },
      { label: "Fans", value: "2x 120mm F Series" },
      { label: "Pump", value: "7th Gen Asetek" },
      { label: "Sockets", value: "LGA1700 / AM5" },
      { label: "Lighting", value: "RGB Ring + Pump" },
    ],
    locations: [
      { branch: "Kuliyapitiya (Main)", quantity: 7 },
      { branch: "Kandy", quantity: 2 },
    ],
  },
  {
    id: "cool-peerless",
    name: "Thermalright Peerless Assassin 120",
    brand: "Thermalright",
    categoryId: "cooling",
    image: "/products/cooling.png",
    priceLKR: 16500,
    stock: "call-for-price",
    rating: 4.9,
    shortSpec: "Dual Tower Air · 6 Heatpipes",
    description:
      "The value king of air cooling — dual-tower design that rivals far pricier coolers, whisper quiet under load.",
    warranty: "2 Years Agent Warranty",
    specs: [
      { label: "Type", value: "Dual Tower Air Cooler" },
      { label: "Heatpipes", value: "6x 6mm Nickel Plated" },
      { label: "Fans", value: "2x 120mm PWM" },
      { label: "Height", value: "155mm" },
      { label: "Sockets", value: "LGA1700 / AM5" },
    ],
    locations: [{ branch: "Kuliyapitiya (Main)", quantity: 0 }],
  },
]
