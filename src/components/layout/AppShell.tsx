"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavItem = {
  href: string
  label: string
  icon: string
  alert?: string
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: "⌂" },
  { href: "/sourcing", label: "Import", icon: "◇" },
  { href: "/legal", label: "Legal", icon: "⚖" },
  { href: "/hr", label: "HR", icon: "◌", alert: "•" },
  { href: "/drive", label: "Drive", icon: "□" },
  { href: "/settings", label: "Settings", icon: "⚙" },
]

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-[#171712]">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[54px] flex-col items-center bg-[#131711] text-[#c5cabd] shadow-[1px_0_0_rgba(0,0,0,0.18)]">
        <div className="mt-4 grid size-8 place-items-center rounded-xl bg-white text-[15px] font-black text-[#131711] shadow-sm">
          H
        </div>
        <nav className="mt-6 flex w-full flex-1 flex-col items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href === "/dashboard" && (pathname === "/" || pathname === "/overview"))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex w-full flex-col items-center gap-1 py-2.5 text-[9px] transition ${active ? "text-white" : "text-[#9ca393] hover:text-white"}`}
              >
                <span className={`grid size-8 place-items-center rounded-xl text-[15px] ${active ? "bg-[#242b21] shadow-inner" : ""}`}>{item.icon}</span>
                <span>{item.label}</span>
                {item.alert ? <span className="absolute right-2 top-2 text-[#f08c2e]">{item.alert}</span> : null}
              </Link>
            )
          })}
        </nav>
        <div className="mb-3 flex w-full flex-col items-center gap-2 text-[9px] text-[#9ca393]">
          <Link href="/messages" className="relative flex flex-col items-center gap-1">
            <span className="grid size-8 place-items-center rounded-xl">△</span>
            <span>Alerts</span>
            <span className="absolute right-0 top-0 grid size-3 place-items-center rounded-full bg-blue-600 text-[8px] text-white">4</span>
          </Link>
          <Link href="/legal" className="flex flex-col items-center gap-1">
            <span className="grid size-8 place-items-center rounded-xl">!</span>
            <span>Report</span>
            <span>a bug</span>
          </Link>
          <div className="mt-1 grid size-8 place-items-center rounded-full bg-[#384032] text-[10px] font-bold text-white">MW</div>
          <div className="text-center leading-tight">
            <p>Mustafa</p>
            <p className="mt-1 text-[#e8ece1]">build</p>
            <p>ba3</p>
          </div>
        </div>
      </aside>
      <div className="min-h-screen pl-[54px]">
        <header className="sticky top-0 z-20 flex h-12 items-center justify-between border-b border-[#dedbd2] bg-[#fbfbf8]/95 px-5 backdrop-blur">
          <div className="flex items-center gap-3 text-xs text-[#2d3129]">
            <span className="font-semibold">Hanooot-standalone</span>
            <span className="text-[#8a8d84]">13 pages</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#686c61]">
            <span>100%</span>
            <span className="rounded-full border border-[#dedbd2] bg-white px-3 py-1">Comment</span>
            <span>Edit</span>
            <span>Present</span>
            <span className="rounded-full bg-black px-3 py-1 text-white">Share</span>
          </div>
        </header>
        <main className="min-h-[calc(100vh-48px)] px-5 py-5">{children}</main>
      </div>
    </div>
  )
}
