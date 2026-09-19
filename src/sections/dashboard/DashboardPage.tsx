const periodTabs = ["Today", "This Week", "This month", "All time", "Custom"]
const moduleTabs = [["Overview", ""], ["Leads", "4"], ["Pipeline", "1"], ["Sourcing", "1"], ["Orders", "1"]]
const funnel = [["50", "Leads in", "in the last week", "h-[86px] bg-[#bed0f5]"], ["32", "Contacted", "64% of previous", "h-[56px] bg-[#91abea]"], ["11", "Qualified", "34% of previous", "h-[20px] bg-[#5d82e8]"], ["5", "Deals won", "45% of previous", "h-[8px] bg-[#3157dd]"], ["4", "Delivered", "80% of previous", "h-[8px] bg-[#1738cf]"]]
const team = {
  sales: [["Tania", "0", "0", "0"], ["Mustafa Naseer", "5", "1", "0"], ["Ali", "5", "1", "2"]],
  sourcing: [["Yousif Aljabara", "1", "1", "2.6d"], ["Mohammed Alwahid", "1", "0", "2.2d"], ["Abdullah Thamer", "0", "0", "1.8d"]],
  ops: [["Mustafa Waiz", "2", "0"], ["Abdullah Abbas", "1", "0"], ["AbdulAzeez Mohammed", "0", "0"]],
}

const Chip = ({ label, count, active = false }: { label: string; count?: string; active?: boolean }) => <button className={`h-9 rounded-xl px-4 text-[12px] font-bold shadow-sm ${active ? "bg-[#204bd8] text-white" : "border border-[#dcd9d0] bg-white text-[#2c312a]"}`}>{label}{count ? <span className="ml-1 text-[11px]">{count}</span> : null}</button>

const TeamCard = ({ title, subtitle, headers, rows }: { title: string; subtitle: string; headers: string[]; rows: string[][] }) => (
  <section className="rounded-xl border border-[#dedbd2] bg-white p-4 shadow-sm">
    <div className="mb-4 flex items-baseline gap-2"><h3 className="text-[13px] font-bold">{title}</h3><p className="text-[11px] text-[#777a70]">{subtitle}</p></div>
    <table className="w-full text-left text-[11px]"><thead><tr className="text-[9px] uppercase tracking-[0.12em] text-[#777a70]"><th className="pb-2">Person</th>{headers.map((h) => <th key={h} className="pb-2 text-right">{h}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}><td className="py-1.5 font-semibold">{row[0]}</td>{row.slice(1).map((cell, index) => <td key={`${row[0]}-${index}`} className={`py-1.5 text-right font-semibold ${index === row.length - 2 ? "text-[#2f8f63]" : ""}`}>{cell}</td>)}</tr>)}</tbody></table>
  </section>
)

export const DashboardPage = () => (
  <div className="max-w-[1240px]">
    <header className="mb-4 flex items-start justify-between gap-4">
      <div><h1 className="text-xl font-extrabold tracking-tight">Good morning, Mustafa</h1><div className="mt-4 flex gap-2">{moduleTabs.map(([label, count], index) => <Chip key={label} label={label} count={count} active={index === 0} />)}</div></div>
      <div className="flex rounded-xl bg-[#ebebe4] p-1">{periodTabs.map((tab, index) => <button key={tab} className={`h-7 rounded-xl px-3 text-[11px] font-semibold ${index === 1 ? "bg-white text-[#11140f] shadow-sm" : "text-[#777a70]"}`}>{tab}</button>)}</div>
    </header>

    <section className="grid gap-3 lg:grid-cols-[360px_1fr]">
      <div className="rounded-xl border border-[#dedbd2] bg-white p-4 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#777a70]">Won this week</p><p className="mt-3 text-4xl font-black tracking-tight">$185</p><p className="mt-1 text-[12px] text-[#777a70]">2 deals closed</p></div>
      <div className="rounded-xl border border-[#dedbd2] bg-white p-4 shadow-sm"><div className="mb-3 flex items-start justify-between"><div><h2 className="text-[13px] font-bold">Deals won per week</h2><p className="text-[11px] text-[#777a70]">last 8 weeks</p></div><p className="text-[12px] font-bold text-[#2f8f63]">+25% vs last week</p></div><div className="grid grid-cols-8 items-end gap-2">{[2,3,2,3,3,4,4,5].map((value, index) => <div key={index} className="text-center"><p className="mb-2 text-[11px] font-semibold">{value}</p><div className={`rounded-t-md ${index === 7 ? "bg-[#2546d8]" : "bg-[#b7c9f3]"}`} style={{ height: `${22 + value * 8}px` }} /><p className="mt-2 text-[10px] text-[#777a70]">{index === 7 ? "Now" : `W${index + 1}`}</p></div>)}</div></div>
    </section>

    <section className="mt-3 rounded-xl border border-[#dedbd2] bg-white p-4 shadow-sm"><div className="mb-8 flex items-baseline gap-2"><h2 className="text-[13px] font-bold">Funnel</h2><p className="text-[11px] text-[#777a70]">lead in → goods delivered</p></div><div className="grid grid-cols-5 items-end gap-2">{funnel.map(([value, label, detail, bar]) => <div key={label} className="text-center"><p className="mb-3 text-lg font-black">{value}</p><div className={`${bar} rounded-md`} /><p className="mt-3 text-[11px] font-bold">{label}</p><p className="text-[10px] text-[#777a70]">{detail}</p></div>)}</div></section>

    <section className="mt-4"><h2 className="mb-3 text-[13px] font-bold">Who is keeping up</h2><div className="grid gap-3 lg:grid-cols-3"><TeamCard title="Sales" subtitle="leads → qualified" headers={["Calls", "Qual.", "Stale"]} rows={team.sales} /><TeamCard title="Sourcing" subtitle="requests → priced" headers={["Open", "Priced", "Avg"]} rows={team.sourcing} /><TeamCard title="Ops" subtitle="orders in transit" headers={["Orders", "Late"]} rows={team.ops} /></div></section>
  </div>
)
