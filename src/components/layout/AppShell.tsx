"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWorkflow } from "@/components/erp/WorkflowStore"

const nav = [
  ["/dashboard", "Dashboard", "Pulse"], ["/leads", "Leads", "24"], ["/pipeline", "Pipeline", "$84k"], ["/sourcing", "Sourcing", "9"], ["/orders", "Orders", "17"], ["/products", "Products", "128"], ["/contacts", "Contacts", "560"], ["/settings", "Settings", "Admin"], ["/messages", "Messages", "6"], ["/drive", "Drive", "2.4GB"], ["/hr", "HR", "18"], ["/legal", "Legal", "7"]
]

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { events } = useWorkflow()
  return <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
    <aside className="fixed inset-y-0 left-0 z-20 flex w-14 flex-col items-center gap-4 bg-slate-950 py-4 text-slate-300">
      <div className="grid size-9 place-items-center rounded-xl bg-blue-600 font-bold text-white">H</div>
      {["⌂", "◎", "▦", "▣", "▤", "⚙"].map((icon) => <div key={icon} className="grid size-9 place-items-center rounded-xl bg-slate-900 text-sm">{icon}</div>)}
    </aside>
    <aside className="fixed inset-y-0 left-14 z-10 flex w-64 flex-col border-r border-slate-200 bg-white p-3">
      <div className="mb-4 rounded-2xl bg-slate-950 p-4 text-white"><b className="text-lg">Hanooot</b><p className="text-xs text-blue-200">Importing ERP workspace</p></div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {nav.map(([href, label, badge]) => {
          const active = pathname === href
          return <Link key={href} href={href} className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${active ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}><span>{label}</span><span className={`rounded-full px-2 py-0.5 text-[10px] ${active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{badge}</span></Link>
        })}
      </nav>
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-900"><b>Facebook sync active</b><p>Last run 12 min ago • 18 leads imported</p><p className="mt-2 text-blue-700">{events[0]}</p></div>
    </aside>
    <main className="ml-[312px] min-h-screen p-5">{children}</main>
  </div>
}
