"use client"
import { WorkflowProvider } from "@/components/erp/WorkflowStore"

export const AppProvider = ({ children }: { children: React.ReactNode }) => <WorkflowProvider>{children}</WorkflowProvider>
