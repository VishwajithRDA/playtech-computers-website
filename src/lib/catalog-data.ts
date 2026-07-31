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
  tagline: "Elevate your Digital Experience",
  phone: "+94 71 75 75 240",
  whatsapp: "94717575240",
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



// export const PRODUCTS: Product[] = ApiClient.getProducts()
