import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { deals, orders, type Stage } from "@/data/erp-data"

type Comment = { dealId: string; text: string; author: string }
type ErpState = { selectedDealId: string; deals: typeof deals; orders: typeof orders; comments: Comment[] }
const initialState: ErpState = { selectedDealId: deals[0].id, deals, orders, comments: [{ dealId: "CN-7716", text: "@tania amount syncs from Zoho Books on win.", author: "System" }] }

export const erpSlice = createSlice({ name: "erp", initialState, reducers: {
  selectDeal: (state, action: PayloadAction<string>) => { state.selectedDealId = action.payload },
  moveStage: (state, action: PayloadAction<{ dealId: string; stage: Stage }>) => {
    const deal = state.deals.find((item) => item.id === action.payload.dealId)
    if (!deal) return
    deal.stage = action.payload.stage
    if (action.payload.stage === "won" && !deal.orderId) {
      deal.orderId = `HO-${1040 + state.orders.length + 1}`
      state.orders.push({ id: deal.orderId, dealId: deal.id, customer: deal.company, status: "Created from Mark Won", total: `$${Math.max(deal.amount, 120)}`, tax: "Currency/tax pending" })
      state.comments.push({ dealId: deal.id, text: `Mark Won created order ${deal.orderId}.`, author: "System" })
    }
  },
  addComment: (state, action: PayloadAction<{ dealId: string; text: string }>) => { state.comments.unshift({ dealId: action.payload.dealId, text: action.payload.text, author: "You" }) },
} })
export const { selectDeal, moveStage, addComment } = erpSlice.actions
