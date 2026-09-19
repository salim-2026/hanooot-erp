"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

type RailItem = {
  href: string
  label: string
  icon: React.ReactNode
  alert?: string
}

type ModuleItem = {
  href: string
  label: string
  icon: React.ReactNode
  badge?: string
}

const railItems: RailItem[] = [
  { href: "/messages", label: "Activity", icon: "♧", alert: "2" },
  { href: "/dashboard", label: "Home", icon: "⌂" },
  { href: "/dashboard", label: "Import", icon: "▱" },
  { href: "/legal", label: "Legal", icon: "⚖" },
  { href: "/hr", label: "HR", icon: "☷", alert: "•" },
  { href: "/drive", label: "Drive", icon: "□" },
  { href: "/settings", label: "Settings", icon: "⚙" },
]

const moduleItems: ModuleItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/leads", label: "Leads", icon: "▽", badge: "2" },
  { href: "/pipeline", label: "Pipeline", icon: "⌁" },
  { href: "/sourcing", label: "Sourcing", icon: "⌕" },
  { href: "/orders", label: "Orders", icon: "◇" },
  { href: "/products", label: "Products", icon: "▤" },
  { href: "/contacts", label: "Contacts", icon: "♙" },
  { href: "/settings", label: "Settings", icon: "☼" },
]

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const importActive = ["/dashboard", "/", "/overview", "/leads", "/pipeline", "/sourcing", "/orders", "/products", "/contacts", "/settings"].includes(pathname)

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-[#11140f]">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[54px] flex-col items-center bg-[#141811] text-[#a9aea3] shadow-[1px_0_0_rgba(0,0,0,0.2)]">
        <div className="mt-4 grid size-8 place-items-center rounded-xl bg-white text-[15px] font-black text-[#141811] shadow-sm">H</div>
        <nav className="mt-6 flex w-full flex-1 flex-col items-center gap-1">
          {railItems.map((item) => {
            const active = item.label === "Import" ? importActive : pathname === item.href
            return (
              <Link key={`${item.href}-${item.label}`} href={item.href} className={`relative flex w-full flex-col items-center gap-1 py-2.5 text-[9px] transition ${active ? "text-white" : "hover:text-white"}`}>
                <span className={`grid size-8 place-items-center rounded-xl ${active ? "bg-[#2b3027] shadow-inner" : ""}`}>{item.icon}</span>
                <span>{item.label}</span>
                {item.alert ? <span className={`absolute right-2 top-2 grid size-3 place-items-center rounded-full text-[8px] ${item.alert === "•" ? "bg-[#f08c2e] text-[#f08c2e]" : "bg-blue-600 text-white"}`}>{item.alert}</span> : null}
              </Link>
            )
          })}
        </nav>
        <div className="mb-3 flex w-full flex-col items-center gap-2 text-[9px]">
          <Link href="/messages" className="relative flex flex-col items-center gap-1">
            <span className="grid size-8 place-items-center rounded-xl">♧</span>
            <span>Alerts</span>
            <span className="absolute right-0 top-0 grid size-3 place-items-center rounded-full bg-blue-600 text-[8px] text-white">4</span>
          </Link>
          <Link href="/legal" className="flex flex-col items-center gap-1">
            <span className="grid size-8 place-items-center rounded-xl">♙</span>
            <span>Report</span>
            <span>a bug</span>
          </Link>
          <div className="mt-1 grid size-8 place-items-center rounded-full bg-[#41483a] text-[10px] font-bold text-white">MW</div>
          <div className="text-center leading-tight">
            <p>Mustafa</p>
            <p className="mt-1 text-white">build</p>
            <p>b23</p>
          </div>
        </div>
      </aside>

      <aside className="fixed inset-y-0 left-[54px] z-20 w-[142px] border-r border-[#dedbd2] bg-[#f4f3ef] px-3 py-4">
        <div className="mb-5 pl-1">
          <h2 className="text-[15px] font-extrabold tracking-tight">Importing</h2>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#777a70]">Trade operations</p>
        </div>
        <nav className="space-y-1">
          {moduleItems.map((item) => {
            const active = pathname === item.href || (item.href === "/dashboard" && (pathname === "/" || pathname === "/overview"))
            return (
              <Link key={item.href} href={item.href} className={`flex h-9 items-center justify-between rounded-lg px-2 text-[11px] font-semibold transition ${active ? "bg-white text-blue-700 shadow-sm" : "text-[#4e5249] hover:bg-white/70"}`}>
                <span className="flex items-center gap-2">{item.icon}{item.label}</span>
                {item.badge ? <span className="grid size-4 place-items-center rounded-full bg-blue-600 text-[9px] font-bold text-white">{item.badge}</span> : null}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-4 left-3 right-3 rounded-lg bg-[#ebece6] px-3 py-2 text-[10px] text-[#6b7066]">
          <p className="flex items-center gap-1 font-medium text-[#334033]"><span className="size-2 rounded-full bg-emerald-500" /> Facebook sync active</p>
          <p className="mt-1">last run 12 min ago</p>
        </div>
      </aside>

      <div className="min-h-screen pl-[196px]">
        <header className="sticky top-0 z-10 flex h-[38px] items-center justify-between border-b border-[#dedbd2] bg-[#fbfbf8]/95 px-4 backdrop-blur">
          <div className="flex items-center gap-3 text-xs text-[#2d3129]"><span>↻</span><span>⌘</span><span className="font-semibold">Hanooot-standalone</span><span className="text-[#8a8d84]">13 pages</span></div>
          <div className="flex items-center gap-4 text-[11px] text-[#686c61]"><span>100%</span><span className="rounded-full border border-[#dedbd2] bg-white px-3 py-1">⌁</span><span>Comment</span><span>Edit</span><span>Present⌄</span><span className="rounded-full bg-black px-3 py-1 text-white">↗ Share</span><span className="grid size-5 place-items-center rounded-full bg-[#f0f0eb]">B</span></div>
        </header>
        <main className="min-h-[calc(100vh-38px)] px-5 py-5">{children}</main>
      </div>
    </div>
  )
}
