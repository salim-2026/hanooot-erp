"use client"
import { createContext, useContext, useMemo, useState } from "react"
import { initialDeals, initialLeads, initialOrders, initialProducts, initialSourcing, orderStages, settingsSeed, type Deal, type DealStage, type Lead, type Order, type OrderStage, type Product, type SourcingRequest } from "@/data/erp-data"

type WorkflowState = {
  leads: Lead[]; deals: Deal[]; sourcing: SourcingRequest[]; orders: Order[]; products: Product[]; exchangeRate: number; taxRate: number; events: string[]
  addLeadToBoard: (id: string) => void; archiveLead: (id: string) => void; logCall: (id: string) => void; convertLead: (id: string) => void
  advanceDeal: (id: string) => void; markDealWon: (id: string) => void; addDealToSourcing: (id: string) => void
  advanceOrder: (id: string) => void; addSourcing: (request: SourcingRequest) => void; advanceSourcing: (id: string) => void
  addProduct: (product: Product) => void; removeProduct: (id: string) => void; updateSettings: (exchangeRate: number, taxRate: number) => void
}

const WorkflowContext = createContext<WorkflowState | null>(null)
const currency = (value: number) => `$${value.toLocaleString()}`

export const WorkflowProvider = ({ children }: { children: React.ReactNode }) => {
  const [leads, setLeads] = useState(initialLeads)
  const [deals, setDeals] = useState(initialDeals)
  const [sourcing, setSourcing] = useState(initialSourcing)
  const [orders, setOrders] = useState(initialOrders)
  const [products, setProducts] = useState(initialProducts)
  const [exchangeRate, setExchangeRate] = useState(settingsSeed.exchangeRate)
  const [taxRate, setTaxRate] = useState(settingsSeed.taxRate)
  const [events, setEvents] = useState(["Facebook sync active · last run 12 min ago", "Zoho Books connector ready", "WhatsApp templates loaded"])
  const note = (text: string) => setEvents((items) => [text, ...items].slice(0, 8))

  const value = useMemo<WorkflowState>(() => ({
    leads, deals, sourcing, orders, products, exchangeRate, taxRate, events,
    addLeadToBoard: (id) => { setLeads((items) => items.map((lead) => lead.id === id ? { ...lead, stage: "Contacted", archived: false } : lead)); note("Lead added to Contacted board") },
    archiveLead: (id) => { setLeads((items) => items.map((lead) => lead.id === id ? { ...lead, archived: true } : lead)); note("Lead archived from Facebook intake") },
    logCall: (id) => { setLeads((items) => items.map((lead) => lead.id === id ? { ...lead, attempts: lead.attempts + 1, stage: lead.stage === "Synced" ? "Contacted" : lead.stage } : lead)); note("Call logged and activity appended") },
    convertLead: (id) => {
      const lead = leads.find((item) => item.id === id)
      if (!lead) return
      const deal: Deal = { id: `deal-${Date.now()}`, customer: lead.name, name: `${lead.campaign} import opportunity`, cn: `CN-${Math.floor(24090 + Math.random() * 80)}`, owner: lead.owner, value: lead.value, stage: "Qualification", quoteItems: ["Customer requirements", "Supplier quote", "Shipping estimate"], activity: ["Converted from lead", `Original source: ${lead.source}`], products: ["Customer requirement list"], closeDate: "Next week", serviceTag: "Importing Service", syncNote: "Converted from Facebook/website lead" }
      setDeals((items) => [deal, ...items]); setLeads((items) => items.map((item) => item.id === id ? { ...item, stage: "Won" } : item)); note(`Converted ${lead.name} to ${currency(lead.value)} deal`)
    },
    advanceDeal: (id) => setDeals((items) => items.map((deal) => { const nextStage: Record<DealStage, DealStage> = { "Qualification": "Negotiation / Review", "Negotiation / Review": "Proposal / Price Quote", "Proposal / Price Quote": "Closed Won", "Closed Won": "Closed Won", "Closed Lost": "Closed Lost", "Ghosted / Pending": "Negotiation / Review" }; const stage = nextStage[deal.stage]; if (deal.id === id) note(`Deal ${deal.cn} moved to ${stage}`); return deal.id === id ? { ...deal, stage, activity: [`Moved to ${stage}`, ...deal.activity] } : deal })),
    markDealWon: (id) => {
      const deal = deals.find((item) => item.id === id)
      if (!deal) return
      setDeals((items) => items.map((item) => item.id === id ? { ...item, stage: "Closed Won", activity: ["Marked won · order created", ...item.activity] } : item))
      const order: Order = { id: `ord-${Date.now()}`, cn: deal.cn, dn: `DN-${Math.floor(350 + Math.random() * 80)}`, invoice: `ZB-${Math.floor(1050 + Math.random() * 80)}`, customer: deal.customer, owner: deal.owner, tracking: "created from won deal", stage: "Confirmed", duration: "0d", sender: deal.owner, assignee: deal.owner.slice(0, 2).toUpperCase(), channel: "WhatsApp draft" }
      setOrders((items) => [order, ...items]); note(`Won deal ${deal.cn} created order ${order.dn}`)
    },
    addDealToSourcing: (id) => {
      const deal = deals.find((item) => item.id === id)
      if (!deal) return
      const request: SourcingRequest = { id: `src-${Date.now()}`, item: deal.name, customer: deal.customer, cn: deal.cn, owner: deal.owner, qty: "Needs estimate", stage: "Sourcing requested", priceRmb: Math.round(deal.value / exchangeRate / 10), candidates: ["Supplier shortlist pending"] }
      setSourcing((items) => [request, ...items]); note(`Added ${deal.cn} to sourcing funnel`)
    },
    advanceOrder: (id) => setOrders((items) => items.map((order) => { const idx = orderStages.indexOf(order.stage); const stage = orderStages[Math.min(idx + 1, orderStages.length - 1)] as OrderStage; if (order.id === id) note(`Order ${order.cn} moved to ${stage} · WhatsApp update ready`); return order.id === id ? { ...order, stage } : order })),
    addSourcing: (request) => { setSourcing((items) => [request, ...items]); note(`New sourcing request ${request.cn} created`) },
    advanceSourcing: (id) => setSourcing((items) => items.map((request) => request.id === id ? { ...request, stage: request.stage === "Sourcing requested" ? "In progress" : request.stage === "In progress" ? "Enquiry priced" : "Enquiry priced" } : request)),
    addProduct: (product) => { setProducts((items) => [product, ...items]); note(`Product ${product.title} added to catalogue`) },
    removeProduct: (id) => { setProducts((items) => items.filter((product) => product.id !== id)); note("Product card removed from catalogue") },
    updateSettings: (rate, tax) => { setExchangeRate(rate); setTaxRate(tax); note(`Currency/tax settings updated: RMB→USD ${rate}, tax ${tax}%`) }
  }), [deals, events, exchangeRate, leads, orders, products, sourcing, taxRate])
  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>
}

export const useWorkflow = () => {
  const ctx = useContext(WorkflowContext)
  if (!ctx) throw new Error("useWorkflow must be used inside WorkflowProvider")
  return ctx
}

export const rmbToUsd = (rmb: number, exchangeRate: number) => `$${(rmb / exchangeRate).toFixed(2)}`
