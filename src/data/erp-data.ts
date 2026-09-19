export type RouteKey = "dashboard" | "leads" | "pipeline" | "sourcing" | "orders" | "products" | "contacts" | "settings" | "messages" | "drive" | "hr" | "legal" | "overview" | "importing"
export const stages = ["Synced", "Contacted", "Qualified", "Won"]
export const leads = [
  ["Solar inverter import", "Ahmed Al‑Najjar", "Facebook", "September KSA", "$8,400", "2 call attempts"],
  ["Kitchen appliance bundle", "شركة النور للتجارة", "Facebook", "Importing CN", "$14,200", "Open WhatsApp"],
  ["Kids bikes wholesale", "Lina Haddad", "Website", "Organic", "$3,250", "Convert to deal"]
]
export const deals = [
  ["Quote", "Commercial blender lot", "بيت القهوة", "CN-24063", "$11,900"],
  ["Negotiation", "LED panels 600 units", "Noura Trading", "CN-24088", "$19,600"],
  ["Won / create order", "Ceramic dinnerware", "Al Noor Hotels", "CN-24072", "$27,400"],
  ["Lost", "Fitness bands", "FitLine", "CN-23998", "$4,300"]
]
export const products = [
  ["Solar inverter 5KW", "¥1,380", "$192.74", "CN-24088", "Video slot"],
  ["Ceramic dinnerware set", "¥68", "$9.50", "CN-24072", "Image slot"],
  ["304 steel thermos", "¥34", "$4.75", "CN-24091", "Removable"],
  ["Commercial blender", "¥410", "$57.26", "CN-24063", "Supplier media"]
]
export const orders = [
  ["Invoice", "Ceramic dinnerware", "Al Noor Hotels", "ZB-1044", "2d", "Sara"],
  ["Factory production", "LED panels", "Noura Trading", "CN-24088", "6d", "Mr. Wang"],
  ["Shipping", "Kitchen bundle", "شركة النور للتجارة", "HNT928118", "ETA 11d", "Rami"],
  ["Delivered", "Commercial blender", "بيت القهوة", "Closed", "Done", "Rami"]
]
export const tableRows = {
  contacts: [["Ahmed Al‑Najjar", "Customer", "Riyadh", "Maya", "$8,400"], ["شركة النور للتجارة", "Customer", "Jeddah", "Rami", "$14,200"], ["Guangzhou Everbright", "Supplier", "Guangzhou", "Chen", "¥82k"]],
  drive: [["CN-24072 quote.pdf", "Deal • Ceramic dinnerware", "Sara", "428 KB"], ["Supplier video — inverter.mp4", "Sourcing • CN-24088", "Chen", "21 MB"]],
  hr: [["Maya Khaled", "CRM Lead", "$4,200", "$210", "$3,990"], ["سارة منصور", "Account manager", "$3,900", "$195", "$3,705"]],
  legal: [["Al Noor Hotels", "Import contract review", "CRM", "$2,400", "Draft"], ["شركة النور للتجارة", "Client-services retainer", "Referral", "$4,800", "Active matter"]]
}
export const settings = ["Organisation and departments", "Staff/people directory", "Currency & tax: RMB → USD 7.16, tax 5%", "Campaign/ad form settings", "Pipeline/order stages", "Automation rules", "Facebook sync", "Zoho Books sync", "WhatsApp templates", "User roles"]
export const messages = ["@Maya assigned CN-24088 to Chen for updated supplier video.", "System imported 18 Facebook leads from September KSA.", "WhatsApp template sent to العميل: الشحنة قيد التجهيز."]

export const arabicSupport = "Arabic names/content render inside English LTR records"
