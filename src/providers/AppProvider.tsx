"use client"
import { AuthProvider } from "@/components/erp/AuthStore"
import { WorkflowProvider } from "@/components/erp/WorkflowStore"

export const AppProvider = ({ children }: { children: React.ReactNode }) => <AuthProvider><WorkflowProvider>{children}</WorkflowProvider></AuthProvider>
