/** Format a number as Sri Lankan Rupees, e.g. 685000 -> "Rs 685,000". */
export function formatLKR(value: number): string {
  return `Rs ${new Intl.NumberFormat("en-LK", { maximumFractionDigits: 0 }).format(value)}`
}
