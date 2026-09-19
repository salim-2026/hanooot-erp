import type { ReactNode } from "react"

export const Badge = ({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "amber" | "slate" | "red" }) => {
  const tones = {
    blue: "bg-[#e7eefb] text-[#1d4ed8] ring-[#c7d6f7]",
    green: "bg-[#e6f2ea] text-[#2f8f63] ring-[#cde7d6]",
    amber: "bg-[#fbf4e4] text-[#8a5a12] ring-[#ebdcbe]",
    slate: "bg-[#efede6] text-[#78736a] ring-[#e4e0d6]",
    red: "bg-[#f4e3e1] text-[#a8453f] ring-[#ebd3cd]",
  }
  return <span className={`rounded-md px-2 py-1 text-[10px] font-bold ring-1 ${tones[tone]}`}>{children}</span>
}

export const Button = ({ children, onClick, tone = "primary", type = "button" }: { children: ReactNode; onClick?: () => void; tone?: "primary" | "secondary" | "danger" | "ghost"; type?: "button" | "submit" }) => {
  const tones = {
    primary: "bg-[#1d4ed8] text-white hover:bg-[#183fb0]",
    secondary: "border border-[#e4e0d6] bg-white text-[#211f1b] hover:bg-[#fbfaf7]",
    danger: "bg-[#f4e3e1] text-[#a8453f] hover:bg-[#ebd3cd]",
    ghost: "text-[#78736a] hover:bg-[#efede6]",
  }
  return <button type={type} onClick={onClick} className={`rounded-lg px-3 py-2 text-[11px] font-bold transition ${tones[tone]}`}>{children}</button>
}

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => <section className={`rounded-xl border border-[#e4e0d6] bg-white p-4 shadow-[0_1px_2px_rgba(62,54,42,0.05)] ${className}`}>{children}</section>

export const PageHeader = ({ eyebrow, title, subtitle, actions }: { eyebrow: string; title: string; subtitle: string; actions?: ReactNode }) => <header className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#78736a]">{eyebrow}</p><h1 className="mt-1 text-xl font-extrabold tracking-tight text-[#211f1b]">{title}</h1><p className="mt-1 max-w-3xl text-[12px] text-[#78736a]">{subtitle}</p></div><div className="flex flex-wrap gap-2">{actions}</div></header>

export const SelectPill = ({ children }: { children: ReactNode }) => <button className="rounded-lg border border-[#e4e0d6] bg-white px-3 py-2 text-[11px] font-semibold text-[#78736a] shadow-sm">{children} ▾</button>

export const Drawer = ({ title, children }: { title: string; children: ReactNode }) => <aside className="rounded-xl border border-[#e4e0d6] bg-white p-4 shadow-[0_1px_2px_rgba(62,54,42,0.05)]"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#78736a]">Detail drawer</p><h2 className="mt-1 text-lg font-extrabold text-[#211f1b]">{title}</h2><div className="mt-4 space-y-3">{children}</div></aside>

export const Money = ({ value }: { value: number }) => <span>{`$${value.toLocaleString()}`}</span>
