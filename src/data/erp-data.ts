export type Stage = "enquiry" | "contacted" | "sourcing" | "priced" | "won" | "lost"
export type RouteKey = "dashboard" | "leads" | "pipeline" | "sourcing" | "orders" | "products" | "contacts" | "settings" | "messages" | "drive" | "hr" | "legal"

export const modules: { key: RouteKey; label: string; count?: string }[] = [
  { key: "dashboard", label: "Dashboard" }, { key: "leads", label: "Leads", count: "128" }, { key: "pipeline", label: "Pipeline" }, { key: "sourcing", label: "Sourcing" }, { key: "orders", label: "Orders" }, { key: "products", label: "Products" }, { key: "contacts", label: "Contacts" }, { key: "settings", label: "Settings" }, { key: "messages", label: "Messages" }, { key: "drive", label: "Drive" }, { key: "hr", label: "HR" }, { key: "legal", label: "Legal" },
]

export const stages: { key: Stage; label: string }[] = [
  { key: "enquiry", label: "Enquiry" }, { key: "contacted", label: "Contacted" }, { key: "sourcing", label: "Src Req" }, { key: "priced", label: "Priced" }, { key: "won", label: "Won" }, { key: "lost", label: "Lost" },
]

export const deals = [
  { id: "CN-7716", company: "Engines World", contact: "Yahya Hamadani", phone: "+964 770 742 5566", owner: "Tania", stage: "priced" as Stage, amount: 150, tags: ["Importing Service", "Mustafa W"], arabicNote: "يرجى تأكيد السعر قبل الشحن", products: ["LED headlight kits H4/H7 mix", "Engine gasket set"], orderId: "HO-1042" },
  { id: "CN-7760", company: "Farqad", contact: "Importing Service", phone: "+964 781 220 5040", owner: "Mustafa", stage: "enquiry" as Stage, amount: 0, tags: ["Importing Service"], arabicNote: "عميل جديد من فيسبوك", products: ["Stainless steel kitchen sink 60x45cm"], orderId: undefined },
  { id: "CN-7810", company: "Mohammed Ghazi", contact: "Kitchen supply", phone: "+964 770 168 4080", owner: "Noor", stage: "sourcing" as Stage, amount: 320, tags: ["Facebook", "MOQ 300"], arabicNote: "سعر مستهدف أقل من 9$", products: ["Stainless steel kitchen sink 60x45cm"], orderId: undefined },
]

export const activity = ["Proposal sent — Jul 29", "@yousif aljbara requested supplier price", "WhatsApp follow-up queued", "Zoho Books amount synced"]
export const orders = [{ id: "HO-1042", dealId: "CN-7716", customer: "Engines World", status: "Revealed from Mark Won", total: "$150", tax: "IQD VAT ready" }]
export const files = ["Supplier quote - Guangzhou.pdf", "Product photos / CN-7810", "Legal template - importing service.docx", "HR onboarding checklist.xlsx"]
export const people = ["مصطفى النداوي", "Tania Sales", "Yousif Aljbara", "Noor Operations"]
export const connectors = ["Facebook lead sync", "Zoho Books invoices", "WhatsApp messaging", "Supabase Storage uploads", "Currency & tax rules"]
