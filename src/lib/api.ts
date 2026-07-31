// src/lib/api-client.ts
import { Product } from "./catalog-data"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://playtech.lk/api"

export const ApiClient = {
  /**
   * Fetches the public product catalog for the website.
   * Note: Ensure your Node.js route `GET /product_web` does NOT have the `isAuth` middleware!
   */
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE_URL}/product_web`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: 'no-store' // Uncomment this if you want fresh data on every single page load
    })

    if (!res.ok) {
      throw new Error("Failed to fetch products from the server")
    }

    const data = await res.json()
    const PRODUCTS: Product[] = data
    return PRODUCTS
  },

  /**
   * Securely verifies the Google login token with the backend.
   */
  async verifyGoogleUser(token: string) {
    const res = await fetch(`${API_BASE_URL}/google_user_login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })

    if (!res.ok) {
      throw new Error("Authentication failed on the server")
    }

    return res.json()
  }
}