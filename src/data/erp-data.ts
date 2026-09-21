export type Stage = "Synced" | "Contacted" | "Qualified" | "Won" | "Ghosted"
export type DealStage = "Qualification" | "Negotiation / Review" | "Proposal / Price Quote" | "Closed Won" | "Closed Lost" | "Ghosted / Pending"
export type OrderStage = "Confirmed" | "Purchased" | "Partially Shipped" | "Shipped" | "Partially Received" | "Reached Iraq" | "Received by Client"

export type Lead = { id: string; name: string; phone: string; source: string; campaign: string; owner: string; stage: Stage; value: number; attempts: number; note: string; archived?: boolean }
export type Deal = { id: string; customer: string; name: string; cn: string; owner: string; value: number; stage: DealStage; quoteItems: string[]; activity: string[]; products: string[]; closeDate: string; serviceTag: string; syncNote: string }
export type SourcingRequest = { id: string; item: string; customer: string; cn: string; owner: string; qty: string; stage: string; priceRmb: number; candidates: string[] }
export type Order = { id: string; cn: string; dn: string; invoice: string; customer: string; owner: string; tracking: string; stage: OrderStage; duration: string; sender: string; assignee: string; channel: string }
export type Product = { id: string; title: string; cn: string; desc: string; media: string; priceRmb: number; moq: string; removable?: boolean }

export const leadStages: Stage[] = ["Synced", "Contacted", "Qualified", "Won", "Ghosted"]
export const dealStages: DealStage[] = ["Qualification", "Negotiation / Review", "Proposal / Price Quote", "Closed Won", "Closed Lost", "Ghosted / Pending"]
export const dealDrawerStages = ["Enquiry", "Contacted", "Src Req", "Src Rec", "Priced", "Won"]
export const orderStages: OrderStage[] = ["Confirmed", "Purchased", "Partially Shipped", "Shipped", "Partially Received", "Reached Iraq", "Received by Client"]

export const initialLeads: Lead[] = [
  { id: "lead-1", name: "Mohammed Ghazi", phone: "+966 55 120 4421", source: "Facebook Ads", campaign: "Ramadan-B", owner: "Rasha", stage: "Synced", value: 8400, attempts: 0, note: "China sourcing lead asks for a WhatsApp catalogue" },
  { id: "lead-2", name: "Al Noor Trading", phone: "+966 54 771 2011", source: "Facebook Ads", campaign: "Sourcing-A", owner: "Noor", stage: "Contacted", value: 14200, attempts: 2, note: "Needs supplier video before quote approval" },
  { id: "lead-3", name: "Omar Jafar", phone: "+971 50 663 9012", source: "Website", campaign: "Organic", owner: "Noor", stage: "Qualified", value: 3250, attempts: 1, note: "Ready to convert to deal" },
  { id: "lead-4", name: "Yousif Alazzawi", phone: "+964 770 122 9090", source: "DM / WhatsApp", campaign: "Importing CN", owner: "Ali", stage: "Ghosted", value: 4300, attempts: 3, note: "Auto-retarget list after 3 tries" }
]

export const initialDeals: Deal[] = [
  { id: "deal-1", customer: "Coffee House Group", name: "Commercial blender lot", cn: "CN-24063", owner: "Rami", value: 11900, stage: "Qualification", quoteItems: ["12 blenders · RMB 410 each", "Spare blades · RMB 22 each", "Sea freight estimate · $780"], activity: ["Customer requested a formal quote", "Quote PDF generated", "WhatsApp template sent"], products: ["Commercial blender", "Spare blade kit"], closeDate: "Sep 26", serviceTag: "Importing Service", syncNote: "Amount synced from quote items" },
  { id: "deal-2", customer: "Noura Trading", name: "LED panels 600 units", cn: "CN-24088", owner: "Noor", value: 19600, stage: "Negotiation / Review", quoteItems: ["600 LED panels · RMB 92 each", "Sea freight · $1,140", "Customs estimate · $420"], activity: ["Supplier video requested", "Zoho draft invoice ready", "Second supplier pending margin approval"], products: ["LED panel 60×60", "Mounting clips"], closeDate: "Sep 28", serviceTag: "Importing Service", syncNote: "Owner and amount synced to CRM" },
  { id: "deal-3", customer: "Al Noor Hotels", name: "Ceramic dinnerware", cn: "CN-24072", owner: "Sara", value: 27400, stage: "Proposal / Price Quote", quoteItems: ["4,000 plates · RMB 18 each", "Logo print · RMB 2.8 each", "QC inspection · $320"], activity: ["Deposit 50% promised", "Add to sourcing funnel", "Quote reviewed by operations"], products: ["Dinner plate set", "Logo print service"], closeDate: "Sep 30", serviceTag: "Importing Service", syncNote: "Quote total ready for Zoho Books" },
  { id: "deal-4", customer: "Mansour Market", name: "Thermos retail launch", cn: "CN-24091", owner: "Ali", value: 8800, stage: "Ghosted / Pending", quoteItems: ["1,000 thermos units", "Private label packaging"], activity: ["No answer after third call", "Retarget campaign scheduled"], products: ["304 steel thermos"], closeDate: "Oct 03", serviceTag: "Importing Service", syncNote: "Follow-up paused until customer replies" }
]

export const initialSourcing: SourcingRequest[] = [
  { id: "src-1", item: "LED panels 600 units", customer: "Noura Trading", cn: "CN-24088", owner: "Chen", qty: "600 pcs", stage: "Sourcing requested", priceRmb: 1380, candidates: ["Guangzhou Everbright", "Shenzhen BrightMax"] },
  { id: "src-2", item: "Ceramic dinnerware set", customer: "Al Noor Hotels", cn: "CN-24072", owner: "Sara", qty: "400 cartons", stage: "Enquiry priced", priceRmb: 68, candidates: ["Foshan Ceramics", "Yiwu Tableware"] }
]

export const initialOrders: Order[] = [
  { id: "ord-1", cn: "CN-24072", dn: "DN-341", invoice: "ZB-1044", customer: "Al Noor Hotels", owner: "Sara", tracking: "HNT928118", stage: "Confirmed", duration: "2d", sender: "Ms. Li", assignee: "SM", channel: "WhatsApp ready" },
  { id: "ord-2", cn: "CN-24088", dn: "DN-340", invoice: "ZB-1049", customer: "Noura Trading", owner: "Noor", tracking: "TRK-7719", stage: "Purchased", duration: "4d", sender: "Mr. Wang", assignee: "NW", channel: "Supplier update" },
  { id: "ord-3", cn: "CN-24063", dn: "DN-338", invoice: "ZB-1028", customer: "Coffee House Group", owner: "Rami", tracking: "SZ-8841", stage: "Shipped", duration: "ETA 11d", sender: "Rami", assignee: "RA", channel: "Client notified" },
  { id: "ord-4", cn: "CN-24091", dn: "DN-344", invoice: "ZB-1052", customer: "Mansour Market", owner: "Ali", tracking: "AQB-4471", stage: "Partially Received", duration: "18d", sender: "Ms. Zhao", assignee: "AA", channel: "Missing cartons" },
  { id: "ord-5", cn: "CN-24058", dn: "DN-329", invoice: "ZB-1018", customer: "Basra Retail", owner: "Noor", tracking: "Closed", stage: "Received by Client", duration: "Done", sender: "Noor", assignee: "NW", channel: "Delivered" }
]

export const initialProducts: Product[] = [
  { id: "prod-1", title: "Solar inverter 5KW", cn: "CN-24088", desc: "Video slot · B2B catalogue-ready", media: "▶", priceRmb: 1380, moq: "20 pcs" },
  { id: "prod-2", title: "Ceramic dinnerware set", cn: "CN-24072", desc: "Image slot · logo print option", media: "▧", priceRmb: 68, moq: "400 cartons" },
  { id: "prod-3", title: "304 steel thermos", cn: "CN-24091", desc: "Removable card with supplier media", media: "▣", priceRmb: 34, moq: "1000 pcs", removable: true },
  { id: "prod-4", title: "Commercial blender", cn: "CN-24063", desc: "Supplier video and replacement parts", media: "▶", priceRmb: 410, moq: "50 pcs" }
]

export const contacts = [
  ["Ahmed Al-Najjar", "+966 55 120 4421", "Riyadh", "Facebook Ads", "3 orders", "$8,400", "Active"],
  ["Al Noor Trading", "+966 54 771 2011", "Jeddah", "Facebook Ads", "2 orders", "$14,200", "Qualified"],
  ["Guangzhou Everbright", "+86 20 8821 4100", "Guangzhou", "Supplier", "9 orders", "¥82k", "Vendor"]
]

export const settingsSeed = {
  org: "The Spice / Hanooot Importing",
  departments: ["CRM", "Trade operations", "HR", "Legal", "Drive"],
  roles: ["Super admin", "Manager", "Contributor", "Read only"],
  campaigns: ["Ramadan-B", "Sourcing-A", "Importing CN"],
  automations: ["Facebook lead sync active", "Zoho Books draft invoice on won", "WhatsApp stage update template"],
  exchangeRate: 7.16,
  taxRate: 5
}

export const messagesSeed = [
  { who: "Noor", text: "@Chen please add supplier video for CN-24088 before tonight.", board: "Sourcing", ref: "CN-24088" },
  { who: "System", text: "Imported 18 Facebook leads from Ramadan-B. Facebook sync active.", board: "Leads", ref: "SYNC" },
  { who: "Sara", text: "WhatsApp shipping template queued for the customer.", board: "Orders", ref: "CN-24072" }
]

export const driveRows = [
  ["pdf", "CN-24072 quote.pdf", "Deal · Ceramic dinnerware · Sep 18", "Sara", "428 KB"],
  ["mp4", "Supplier video — inverter.mp4", "Sourcing · CN-24088 · Sep 17", "Chen", "21 MB"],
  ["doc", "Legal retainer — Al Noor Trading.docx", "Legal · Active matter", "Legal", "188 KB"]
]

export const hrPeople = [
  ["Maya Khaled", "CRM Lead", "Sales", "Active", "$4,200", "$3,990"],
  ["Sara Mansour", "Account manager", "Trade operations", "Leave pending", "$3,900", "$3,705"],
  ["Chen Wei", "Supplier coordinator", "Sourcing", "Active", "$3,600", "$3,420"]
]

export const legalMatters = [
  ["Al Noor Hotels", "Import contract review", "CRM", "$2,400", "Draft", "Lana"],
  ["Al Noor Trading", "Client-services retainer", "Referral", "$4,800", "Active matter", "Omar"],
  ["Noura Trading", "Customs dispute", "Pipeline", "$3,100", "Needs attention", "Lana"]
]
