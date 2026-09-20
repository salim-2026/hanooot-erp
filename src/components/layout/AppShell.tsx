"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

type RailItem = { href: string; label: string; icon: string; alert?: string }
type SideItem = { href: string; label: string; icon: string; badge?: string }

const railItems: RailItem[] = [
  { href: "/messages", label: "Activity", icon: "•", alert: "2" },
  { href: "/overview", label: "Home", icon: "•" },
  { href: "/dashboard", label: "Import", icon: "•" },
  { href: "/legal", label: "Legal", icon: "•" },
  { href: "/hr", label: "HR", icon: "•", alert: "•" },
  { href: "/drive", label: "Drive", icon: "•" },
  { href: "/settings", label: "Settings", icon: "•" },
]

const importPaths = ["/dashboard", "/leads", "/pipeline", "/sourcing", "/orders", "/products", "/contacts"]
const importItems: SideItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "•" },
  { href: "/leads", label: "Leads", icon: "•", badge: "2" },
  { href: "/pipeline", label: "Pipeline", icon: "•" },
  { href: "/sourcing", label: "Sourcing", icon: "•" },
  { href: "/orders", label: "Orders", icon: "•" },
  { href: "/products", label: "Products", icon: "•" },
  { href: "/contacts", label: "Contacts", icon: "•" },
  { href: "/settings", label: "Settings", icon: "•" },
]

const sidebars: Record<string, { title: string; kicker: string; items: SideItem[]; card?: React.ReactNode }> = {
  import: { title: "Importing", kicker: "Trade operations", items: importItems, card: <><p className="flex items-center gap-1 font-medium text-[#2f8f63]"><span className="size-2 rounded-full bg-emerald-500" /> Facebook sync active</p><p className="mt-1">last run 12 min ago</p></> },
  legal: { title: "Legal", kicker: "Client services", items: [{ href: "/legal", label: "Overview", icon: "•" }, { href: "/legal", label: "Enquiries", icon: "•", badge: "5" }, { href: "/legal", label: "Pipeline", icon: "•" }, { href: "/legal", label: "Retainers", icon: "•" }, { href: "/legal", label: "Documents", icon: "•" }], card: <><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78736a]">Billable this month</p><p className="mt-1 text-xl font-black">$18,450</p><p>62 hrs logged · 4 retainers</p></> },
  hr: { title: "People", kicker: "Human resources", items: [{ href: "/hr", label: "Directory", icon: "•" }, { href: "/hr", label: "Leave", icon: "•", badge: "2" }, { href: "/hr", label: "Payroll", icon: "•" }, { href: "/hr", label: "Documents", icon: "•" }], card: <><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78736a]">Headcount</p><p className="mt-1 text-xl font-black">13</p><p>5 titles still to confirm</p></> },
  settings: { title: "Settings", kicker: "Platform wide", items: [{ href: "/settings", label: "Organisation", icon: "•" }, { href: "/settings", label: "Users & roles", icon: "•" }, { href: "/settings", label: "Branches", icon: "•" }, { href: "/settings", label: "Directory", icon: "•" }, { href: "/settings", label: "Currency & tax", icon: "•" }, { href: "/settings", label: "Notifications", icon: "•" }] },
}

const getSidebarKey = (pathname: string) => {
  if (importPaths.includes(pathname) || pathname === "/importing") return "import"
  if (pathname === "/legal") return "legal"
  if (pathname === "/hr") return "hr"
  if (pathname === "/settings") return "settings"
  return null
}

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const key = getSidebarKey(pathname)
  const sidebar = key ? sidebars[key] : null
  const railActive = (item: RailItem) => item.label === "Import" ? importPaths.includes(pathname) || pathname === "/importing" : item.href === pathname || (item.label === "Home" && pathname === "/")
  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#211f1b]">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[76px] flex-col items-center bg-[#1f1e1b] text-[#8d877c] shadow-[1px_0_0_rgba(0,0,0,0.2)]">
        <Link href="/overview" className="mt-4 grid size-8 place-items-center rounded-xl bg-white text-[15px] font-black text-[#1f1e1b] shadow-sm">H</Link>
        <nav className="mt-6 flex w-full flex-1 flex-col items-center gap-1">
          {railItems.map((item) => <Link key={item.label} href={item.href} className={`relative flex w-full flex-col items-center gap-1 border-b border-white/5 py-2.5 text-[9px] transition ${railActive(item) ? "text-white" : "hover:text-white"}`}><span className={`grid size-10 place-items-center rounded-xl text-[18px] ${railActive(item) ? "bg-[#3c382f] shadow-inner" : ""}`}>{item.icon}</span><span>{item.label}</span>{item.alert ? <span className={`absolute right-7 top-2 grid size-4 place-items-center rounded-full text-[9px] ${item.alert === "•" ? "bg-[#f08c2e] text-[#f08c2e]" : "bg-blue-600 text-white"}`}>{item.alert}</span> : null}</Link>)}
        </nav>
        <div className="mb-3 flex w-full flex-col items-center gap-2 text-[9px]"><Link href="/messages" className="relative flex flex-col items-center gap-1"><span className="grid size-8 place-items-center rounded-xl">A</span><span>Alerts</span><span className="absolute right-1 top-0 grid size-4 place-items-center rounded-full bg-blue-600 text-[9px] text-white">4</span></Link><Link href="/messages" className="flex flex-col items-center gap-1"><span className="grid size-8 place-items-center rounded-xl">B</span><span>Report</span><span>a bug</span></Link><div className="mt-1 grid size-8 place-items-center rounded-full bg-[#3c382f] text-[10px] font-bold text-white">MW</div><div className="text-center leading-tight"><p className="font-bold text-white">build</p><p>b23</p></div></div>
      </aside>
      {sidebar ? <aside className="fixed inset-y-0 left-[76px] z-20 w-[220px] border-r border-[#e4e0d6] bg-[#f5f3ee] px-3 py-5"><div className="mb-6 pl-2"><h2 className="text-[20px] font-extrabold tracking-tight">{sidebar.title}</h2><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#78736a]">{sidebar.kicker}</p></div><nav className="space-y-2">{sidebar.items.map((item, index) => { const active = index === 0 || pathname === item.href && item.href !== "/settings"; return <Link key={`${item.label}-${index}`} href={item.href} className={`flex h-10 items-center justify-between rounded-xl px-3 text-[14px] font-bold transition ${active ? "bg-white text-blue-700 shadow-sm" : "text-[#6b665d] hover:bg-white/70"}`}><span className="flex items-center gap-3"><span className="text-[#8d877c]">{item.icon}</span>{item.label}</span>{item.badge ? <span className="grid size-5 place-items-center rounded-full bg-blue-600 text-[10px] font-bold text-white">{item.badge}</span> : null}</Link>})}</nav>{sidebar.card ? <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#e4e0d6] bg-white px-3 py-3 text-[11px] text-[#6b7066] shadow-sm">{sidebar.card}</div> : null}</aside> : null}
      <main className={`min-h-screen ${sidebar ? "ml-[296px]" : "ml-[76px]"}`}>{children}</main>
    </div>
  )
}
