import type { ReactNode } from "react"
export const Badge = ({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "amber" | "slate" | "red" }) => {
  const tones = { blue: "bg-blue-50 text-blue-700 ring-blue-100", green: "bg-emerald-50 text-emerald-700 ring-emerald-100", amber: "bg-amber-50 text-amber-700 ring-amber-100", slate: "bg-slate-100 text-slate-600 ring-slate-200", red: "bg-rose-50 text-rose-700 ring-rose-100" }
  return <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ${tones[tone]}`}>{children}</span>
}
export const Button = ({ children, onClick, tone = "primary", type = "button" }: { children: ReactNode; onClick?: () => void; tone?: "primary" | "secondary" | "danger" | "ghost"; type?: "button" | "submit" }) => {
  const tones = { primary: "bg-blue-600 text-white hover:bg-blue-700", secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50", danger: "bg-rose-50 text-rose-700 hover:bg-rose-100", ghost: "text-slate-600 hover:bg-slate-100" }
  return <button type={type} onClick={onClick} className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${tones[tone]}`}>{children}</button>
}
export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => <section className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>{children}</section>
export const PageHeader = ({ eyebrow, title, subtitle, actions }: { eyebrow: string; title: string; subtitle: string; actions?: ReactNode }) => <header className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p><h1 className="text-2xl font-bold text-slate-950">{title}</h1><p className="mt-1 max-w-3xl text-sm text-slate-500">{subtitle}</p></div><div className="flex flex-wrap gap-2">{actions}</div></header>
export const SelectPill = ({ children }: { children: ReactNode }) => <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">{children} ▾</button>
export const Drawer = ({ title, children }: { title: string; children: ReactNode }) => <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Detail drawer</p><h2 className="mt-1 text-lg font-bold text-slate-950">{title}</h2><div className="mt-4 space-y-3">{children}</div></aside>
export const Money = ({ value }: { value: number }) => <span>{`$${value.toLocaleString()}`}</span>
