const kpis = [["Synced", "50", "from Facebook sync"], ["Contacted", "32", "64% reached"], ["Qualified", "11", "ready to quote"], ["Won", "5", "$185 this week"]]
const sourceRows = [["Facebook Ads", "88%", "bg-[#1d4ed8]"], ["Website", "6%", "bg-[#2f8f63]"], ["DM / other", "6%", "bg-[#8a5a12]"]]
const insights = ["Campaign “Ramadan-B” leads ghost 2× more than average", "Best call-answer window: 6–9 pm", "Noor closes China-sourcing leads 2.3× faster"]
const team = ["Noor — 34 calls · 6 qualified", "Ali — 28 calls · 4 qualified", "Sara — 19 calls · 5 qualified"]
const navTabs = [["Overview", ""], ["Leads", "4"], ["Pipeline", "1"], ["Sourcing", "1"], ["Orders", "1"]]

const Chip = ({ label, count, active = false }: { label: string; count?: string; active?: boolean }) => <button className={`h-9 rounded-xl px-4 text-[12px] font-bold shadow-sm ${active ? "bg-[#1d4ed8] text-white" : "border border-[#e4e0d6] bg-white text-[#211f1b]"}`}>{label}{count ? <span className="ml-1 text-[11px]">{count}</span> : null}</button>

export const DashboardPage = () => (
  <div className="max-w-[1240px]">
    <header className="mb-4 flex items-start justify-between gap-4">
      <div><h1 className="text-xl font-extrabold tracking-tight">Good morning</h1><div className="mt-4 flex gap-2">{navTabs.map(([label, count], index) => <Chip key={label} label={label} count={count} active={index === 0} />)}</div></div>
      <button className="h-8 rounded-xl border border-[#e4e0d6] bg-white px-3 text-[11px] font-bold text-[#78736a]">Today ▾</button>
    </header>

    <section className="grid gap-3 lg:grid-cols-4">
      {kpis.map(([label, value, sub]) => <div key={label} className="rounded-xl border border-[#e4e0d6] bg-white p-4 shadow-[0_1px_2px_rgba(62,54,42,0.05)]"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78736a]">{label}</p><p className="mt-3 text-3xl font-black tracking-tight">{value}</p><p className="mt-1 text-[11px] text-[#78736a]">{sub}</p></div>)}
    </section>

    <section className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
      <div className="rounded-xl border border-[#e4e0d6] bg-white p-4 shadow-sm"><div className="mb-6"><h2 className="text-[13px] font-bold">Lead funnel — last 30 days</h2><p className="text-[11px] text-[#78736a]">from Facebook sync to won deals</p></div><div className="grid grid-cols-4 items-end gap-2">{[["Synced",50,"h-[92px] bg-[#c7d6f7]"],["Contacted",32,"h-[66px] bg-[#8fb0f3]"],["Qualified",11,"h-[34px] bg-[#4f76df]"],["Won",5,"h-[18px] bg-[#1d4ed8]"]].map(([label,value,bar]) => <div key={String(label)} className="text-center"><p className="mb-2 text-xl font-black">{value}</p><div className={`${bar} rounded-md`} /><p className="mt-2 text-[11px] font-bold">{label}</p></div>)}</div></div>
      <div className="space-y-4"><div className="rounded-xl border border-[#e4e0d6] bg-white p-4 shadow-sm"><h2 className="text-[13px] font-bold">Leads by source</h2><div className="mt-4 space-y-3">{sourceRows.map(([label,val,color]) => <div key={label}><div className="mb-1 flex justify-between text-[11px] font-bold"><span>{label}</span><span>{val}</span></div><div className="h-2 rounded-full bg-[#efede6]"><div className={`h-2 rounded-full ${color}`} style={{ width: val }} /></div></div>)}</div></div><div className="rounded-xl border border-[#e4e0d6] bg-white p-4 shadow-sm"><h2 className="text-[13px] font-bold">Insights</h2>{insights.map((x) => <p key={x} className="mt-2 rounded-lg bg-[#fbf4e4] px-3 py-2 text-[11px] text-[#8a5a12]">↗ {x}</p>)}</div></div>
    </section>

    <section className="mt-4 rounded-xl border border-[#e4e0d6] bg-white p-4 shadow-sm"><h2 className="text-[13px] font-bold">Team today</h2><div className="mt-3 grid gap-3 lg:grid-cols-3">{team.map((x) => <p key={x} className="rounded-lg bg-[#f5f3ee] px-3 py-3 text-[12px] font-bold">{x}</p>)}</div></section>
  </div>
)
