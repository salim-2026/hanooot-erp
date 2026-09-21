"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/erp/AuthStore"
import { SignInGate } from "@/sections/auth/SignInGate"

type IconName = keyof typeof icons
type RailItem = { href: string; label: string; icon: IconName; alert?: string }
type SideItem = { href: string; label: string; icon: IconName; badge?: string }
type SidebarConfig = { title: string; kicker: string; items: SideItem[]; card?: React.ReactNode }

const icons = {
  activity: "M4 5h16M4 12h16M4 19h10",
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5",
  importing: "M3 8.5 12 4l9 4.5v7L12 20l-9-4.5zM3 8.5 12 13m0 0 9-4.5M12 13v7",
  legal: "M12 3v18M3 7h18M6 7l-3 6a3.2 3.2 0 0 0 6 0zM18 7l3 6a3.2 3.2 0 0 1-6 0z",
  hr: "M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20M9.5 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8M21 20v-1.6a3.4 3.4 0 0 0-2.6-3.3M15.5 3.9a3.4 3.4 0 0 1 0 6.6",
  drive: "M4 7.5A1.5 1.5 0 0 1 5.5 6h3.2l1.8 2.2h8A1.5 1.5 0 0 1 20 9.7v7.8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z",
  settings: "M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-2.87 1.2v.17a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-2.93-1.16l-.06.06A2 2 0 1 1 4.22 17l.06-.06A1.7 1.7 0 0 0 3.12 14H3a2 2 0 0 1 0-4h.17A1.7 1.7 0 0 0 4.28 7.1l-.06-.06A2 2 0 1 1 7.05 4.2l.06.06A1.7 1.7 0 0 0 10 3.12V3a2 2 0 0 1 4 0v.17a1.7 1.7 0 0 0 2.87 1.16l.06-.06A2 2 0 1 1 19.8 7.1l-.06.06A1.7 1.7 0 0 0 20.88 10H21a2 2 0 0 1 0 4h-.17a1.7 1.7 0 0 0-1.43 1z",
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  leads: "M3 4h18l-7 8v6l-4 2v-8L3 4z",
  pipeline: "M3 3h4v18H3zM10 3h4v12h-4zM17 3h4v8h-4z",
  sourcing: "M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z",
  orders: "M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8",
  products: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM8 7V5a4 4 0 0 1 8 0v2",
  contacts: "M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1",
  organisation: "M4 21V8l8-5 8 5v13M9 21v-6h6v6M4 21h16",
  users: "M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20M9.5 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8M21 20v-1.6a3.4 3.4 0 0 0-2.6-3.3",
  branches: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  directory: "M4 4h16v16H4zM8 4v16M11 9h6M11 13h4",
  docs: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5",
  currency: "M12 2v20M17 6.5c0-2-2.2-3-5-3s-5 1-5 3 2.2 2.8 5 3.2 5 1.2 5 3.3-2.2 3.2-5 3.2-5-1.2-5-3.2",
  notifications: "M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 20a2 2 0 0 1-3.4 0",
  bug: "M8 8h8M8 12h8M8 16h5M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6l-4 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
}

const importBase = "/importing"
const legacyImportPaths = ["/dashboard", "/leads", "/pipeline", "/sourcing", "/orders", "/products", "/contacts", "/importing"]

const railItems: RailItem[] = [
  { href: "/messages", label: "Activity", icon: "activity", alert: "2" },
  { href: "/overview", label: "Home", icon: "home" },
  { href: `${importBase}/dashboard`, label: "Import", icon: "importing" },
  { href: "/legal", label: "Legal", icon: "legal" },
  { href: "/hr", label: "HR", icon: "hr", alert: "•" },
  { href: "/drive", label: "Drive", icon: "drive" },
  { href: "/settings", label: "Settings", icon: "settings" },
]

const importItems: SideItem[] = [
  { href: `${importBase}/dashboard`, label: "Dashboard", icon: "dashboard" },
  { href: `${importBase}/leads`, label: "Leads", icon: "leads", badge: "2" },
  { href: `${importBase}/pipeline`, label: "Pipeline", icon: "pipeline" },
  { href: `${importBase}/sourcing`, label: "Sourcing", icon: "sourcing" },
  { href: `${importBase}/orders`, label: "Orders", icon: "orders" },
  { href: `${importBase}/products`, label: "Products", icon: "products" },
  { href: `${importBase}/contacts`, label: "Contacts", icon: "contacts" },
  { href: "/settings", label: "Settings", icon: "settings" },
]

const sidebars: Record<string, SidebarConfig> = {
  import: {
    title: "Importing",
    kicker: "Trade operations",
    items: importItems,
    card: <><p className="flex items-center gap-1 font-medium text-[#2f8f63]"><span className="size-2 rounded-full bg-emerald-500" /> Facebook sync active</p><p className="mt-1">last run 12 min ago</p></>,
  },
  legal: {
    title: "Legal",
    kicker: "Client services",
    items: [{ href: "/legal", label: "Overview", icon: "dashboard" }, { href: "/legal", label: "Enquiries", icon: "activity", badge: "5" }, { href: "/legal", label: "Pipeline", icon: "pipeline" }, { href: "/legal", label: "Retainers", icon: "docs" }, { href: "/legal", label: "Documents", icon: "docs" }],
    card: <><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78736a]">Billable this month</p><p className="mt-1 text-xl font-black">$18,450</p><p>62 hrs logged · 4 retainers</p></>,
  },
  hr: {
    title: "People",
    kicker: "Human resources",
    items: [{ href: "/hr", label: "Directory", icon: "directory" }, { href: "/hr", label: "Leave", icon: "notifications", badge: "2" }, { href: "/hr", label: "Payroll", icon: "currency" }, { href: "/hr", label: "Documents", icon: "docs" }],
    card: <><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78736a]">Headcount</p><p className="mt-1 text-xl font-black">13</p><p>5 titles still to confirm</p></>,
  },
  settings: {
    title: "Settings",
    kicker: "Platform wide",
    items: [{ href: "/settings", label: "Organisation", icon: "organisation" }, { href: "/settings", label: "Users & roles", icon: "users" }, { href: "/settings", label: "Branches", icon: "branches" }, { href: "/settings", label: "Directory", icon: "directory" }, { href: "/settings", label: "Currency & tax", icon: "currency" }, { href: "/settings", label: "Notifications", icon: "notifications" }],
  },
}

const SvgIcon = ({ name, className = "" }: { name: IconName; className?: string }) => (
  <svg className={className} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={icons[name]} />
  </svg>
)

const isImportPath = (pathname: string) => pathname.startsWith(`${importBase}/`) || legacyImportPaths.includes(pathname)

const getSidebarKey = (pathname: string) => {
  if (isImportPath(pathname)) return "import"
  if (pathname === "/legal") return "legal"
  if (pathname === "/hr") return "hr"
  if (pathname === "/settings") return "settings"
  return null
}

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  if (!user) return <SignInGate />

  const key = getSidebarKey(pathname)
  const sidebar = key ? sidebars[key] : null
  const railActive = (item: RailItem) => item.label === "Import" ? isImportPath(pathname) : item.href === pathname || (item.label === "Home" && pathname === "/")

  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#211f1b]">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[76px] flex-col items-center bg-[#1f1e1b] text-[#8d877c] shadow-[1px_0_0_rgba(0,0,0,0.2)]">
        <Link href="/overview" className="mt-4 grid size-8 place-items-center rounded-xl bg-white text-[15px] font-black text-[#1f1e1b] shadow-sm">H</Link>
        <nav className="mt-6 flex w-full flex-1 flex-col items-center gap-1">
          {railItems.map((item) => {
            const active = railActive(item)
            return <Link key={item.label} href={item.href} className={`relative flex w-full flex-col items-center gap-1 border-b border-white/5 py-2.5 text-[9px] transition ${active ? "text-white" : "hover:text-white"}`}><span className={`grid size-10 place-items-center rounded-xl ${active ? "bg-[#3c382f] shadow-inner" : ""}`}><SvgIcon name={item.icon} className="size-[18px]" /></span><span>{item.label}</span>{item.alert ? <span className={`absolute right-7 top-2 grid size-4 place-items-center rounded-full text-[9px] ${item.alert === "•" ? "bg-[#f08c2e] text-[#f08c2e]" : "bg-blue-600 text-white"}`}>{item.alert}</span> : null}</Link>
          })}
        </nav>
        <div className="mb-3 flex w-full flex-col items-center gap-2 text-[9px]"><Link href="/messages" className="relative flex flex-col items-center gap-1"><span className="grid size-8 place-items-center rounded-xl"><SvgIcon name="activity" className="size-4" /></span><span>Alerts</span><span className="absolute right-1 top-0 grid size-4 place-items-center rounded-full bg-blue-600 text-[9px] text-white">4</span></Link><Link href="/messages" className="flex flex-col items-center gap-1"><span className="grid size-8 place-items-center rounded-xl"><SvgIcon name="bug" className="size-4" /></span><span>Report</span><span>a bug</span></Link><div className="mt-1 grid size-8 place-items-center rounded-full bg-[#3c382f] text-[10px] font-bold text-white">{user.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div><div className="text-center leading-tight"><p className="font-bold text-white">build</p><p>b24</p></div><button onClick={signOut} className="mt-1 rounded-lg px-2 py-1 text-[9px] font-bold text-white hover:bg-white/10">Sign out</button></div>
      </aside>
      {sidebar ? <aside className="fixed inset-y-0 left-[76px] z-20 w-[220px] border-r border-[#e4e0d6] bg-[#f5f3ee] px-3 py-5"><div className="mb-6 pl-2"><h2 className="text-[20px] font-extrabold tracking-tight">{sidebar.title}</h2><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#78736a]">{sidebar.kicker}</p></div><nav className="space-y-2">{sidebar.items.map((item, index) => { const active = pathname === item.href || (index === 0 && (pathname === "/importing" || pathname === "/dashboard" || pathname === "/legal" || pathname === "/hr" || pathname === "/settings")); return <Link key={`${item.label}-${index}`} href={item.href} className={`flex h-10 items-center justify-between rounded-xl px-3 text-[14px] font-bold transition ${active ? "bg-white text-blue-700 shadow-sm" : "text-[#6b665d] hover:bg-white/70"}`}><span className="flex items-center gap-3"><SvgIcon name={item.icon} className="size-[17px] text-[#8d877c]" />{item.label}</span>{item.badge ? <span className="grid size-5 place-items-center rounded-full bg-blue-600 text-[10px] font-bold text-white">{item.badge}</span> : null}</Link>})}</nav>{sidebar.card ? <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#e4e0d6] bg-white px-3 py-3 text-[11px] text-[#6b7066] shadow-sm">{sidebar.card}</div> : null}</aside> : null}
      <main className={`min-h-screen ${sidebar ? "ml-[296px]" : "ml-[76px]"}`}>{children}</main>
    </div>
  )
}
