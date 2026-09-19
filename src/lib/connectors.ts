export type ConnectorName = "facebook" | "zohoBooks" | "whatsapp" | "storage" | "currencyTax"
export type ConnectorBoundary = { name: ConnectorName; displayName: string; responsibility: string; env: string[]; status: "stubbed" | "ready" }
export const connectorBoundaries: ConnectorBoundary[] = [
  { name: "facebook", displayName: "Facebook", responsibility: "Import leads, comments, and source metadata into lead inbox.", env: ["FACEBOOK_APP_ID", "FACEBOOK_APP_SECRET"], status: "stubbed" },
  { name: "zohoBooks", displayName: "Zoho Books", responsibility: "Sync customer amounts, invoices, taxes, and payment state.", env: ["ZOHO_CLIENT_ID", "ZOHO_CLIENT_SECRET"], status: "stubbed" },
  { name: "whatsapp", displayName: "WhatsApp", responsibility: "Send deal/order updates and preserve thread references.", env: ["WHATSAPP_TOKEN"], status: "stubbed" },
  { name: "storage", displayName: "Supabase Storage", responsibility: "Upload product, supplier, legal, HR, and drive files.", env: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"], status: "ready" },
  { name: "currencyTax", displayName: "Currency & tax", responsibility: "Normalize landed costs, tax labels, and quote currencies.", env: ["DEFAULT_CURRENCY"], status: "stubbed" },
]
