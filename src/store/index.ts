import { configureStore } from "@reduxjs/toolkit"
import { erpSlice } from "./erp-slice"

export const store = configureStore({ reducer: { erp: erpSlice.reducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
