"use client"
import { Card, PageHeader, Badge } from "@/components/erp/ui"
import { useWorkflow } from "@/components/erp/WorkflowStore"
import { leadStages } from "@/data/erp-data"

export const DashboardPage = () => {
  const { leads, deals, orders, events } = useWorkflow()
  const count = (stage: string) => leads.filter((lead) => lead.stage === stage && !lead.archived).length
  return <>
    <PageHeader eyebrow="Hanooot ERP" title="Good morning — daily pulse" subtitle="Native dashboard widgets recreate the reference funnel, source split, team today, insights, and integration status." actions={<Badge tone="green">Facebook sync active</Badge>} />
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-4">
          {["New leads today", "Awaiting first call", "Open deals value", "Orders in transit"].map((label, index) => <Card key={label}><p className="text-xs uppercase text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{[86, count("Synced"), `$${deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}`, orders.filter((order) => order.stage !== "Delivered").length][index]}</p><p className="text-sm text-slate-500">{["↑ from FB sync", "older than 24h flagged", "Zoho-ready", "WhatsApp updates ready"][index]}</p></Card>)}
        </div>
        <Card><div className="flex items-center justify-between"><h2 className="font-bold">Lead funnel — last 30 days</h2><span className="text-xs text-slate-500">where leads leak</span></div><div className="mt-4 grid gap-3 md:grid-cols-5">{leadStages.map((stage) => <div key={stage} className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{stage}</p><p className="text-2xl font-bold">{count(stage)}</p><div className="mt-3 h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${Math.max(18, count(stage) * 22)}%` }} /></div></div>)}</div></Card>
        <Card><h2 className="font-bold">Insights</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{["Campaign “Ramadan-B” leads ghost 2× more than average", "Best call-answer window: 6–9 pm", "Noor closes China-sourcing leads 2.3× faster"].map((item) => <p key={item} className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">↗ {item}</p>)}</div></Card>
      </div>
      <div className="space-y-4"><Card><h2 className="font-bold">Leads by source</h2>{[["Facebook Ads",88],["Website",6],["DM / other",6]].map(([label,val]) => <div key={label.toString()} className="mt-3"><div className="flex justify-between text-sm"><span>{label}</span><b>{val}%</b></div><div className="mt-1 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${val}%` }} /></div></div>)}</Card><Card><h2 className="font-bold">Team today</h2>{["Noor — 34 calls · 6 qualified", "Ali — 28 calls · 4 qualified", "Sara — 19 calls · 5 qualified"].map((t) => <p key={t} className="border-b py-3 text-sm last:border-0">{t}</p>)}</Card><Card><h2 className="font-bold">Activity</h2>{events.slice(0,4).map((event) => <p key={event} className="border-b py-2 text-sm last:border-0">{event}</p>)}</Card></div>
    </div>
  </>
}
