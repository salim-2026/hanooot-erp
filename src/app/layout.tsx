import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/providers/AppProvider"
import { AppShell } from "@/components/layout/AppShell"

export const metadata: Metadata = { title: "Hanooot ERP", description: "ERP operations workspace for Hanooot" }
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => <html lang="en" dir="ltr"><body><AppProvider><AppShell>{children}</AppShell></AppProvider></body></html>
export default RootLayout
