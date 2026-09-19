"use client"
import { useState } from "react"
import { Badge, Button, Card, Drawer, Money, PageHeader, SelectPill } from "@/components/erp/ui"
import { useWorkflow } from "@/components/erp/WorkflowStore"
import { dealStages } from "@/data/erp-data"

export const PipelinePage = () => {
  const { deals, advanceDeal, markDealWon, addDealToSourcing } = useWorkflow()
  const [selectedId, setSelectedId] = useState(deals[0]?.id)
  const selected = deals.find((deal) => deal.id === selectedId) ?? deals[0]
  return <>
    <PageHeader eyebrow="Sales" title="Pipeline" subtitle="Deal cards carry value, CN reference, quote items, activity, Zoho readiness, and won → order workflow behavior." actions={<><SelectPill>This month</SelectPill><SelectPill>Owner: All</SelectPill><Button>+ New deal</Button></>} />
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]"><div className="flex gap-3 overflow-x-auto pb-3">{dealStages.map((stage) => <section key={stage} className="min-w-80 rounded-xl border border-[#e4e0d6] bg-[#f5f3ee] p-3"><div className="mb-3 flex items-center justify-between"><div><h2 className="font-bold">{stage}</h2><p className="text-xs text-[#78736a]"><Money value={deals.filter((deal) => deal.stage === stage).reduce((sum, deal) => sum + deal.value, 0)} /></p></div><Badge tone={stage === "Won" ? "green" : stage === "Lost" ? "red" : "slate"}>{deals.filter((deal) => deal.stage === stage).length}</Badge></div>{deals.filter((deal) => deal.stage === stage).map((deal) => <article key={deal.id} onClick={() => setSelectedId(deal.id)} className="mb-3 cursor-pointer rounded-xl bg-white p-3 shadow-sm ring-1 ring-transparent hover:ring-[#c7d6f7]"><h3 dir="auto" className="font-bold">{deal.customer}</h3><p className="text-sm text-[#3c382f]">{deal.cn} · {deal.name}</p><div className="mt-2 flex items-center justify-between"><Badge>{deal.owner}</Badge><b><Money value={deal.value} /></b></div><div className="mt-3 flex gap-2"><Button tone="secondary" onClick={() => advanceDeal(deal.id)}>Advance →</Button><Button tone="danger">Lost</Button></div></article>)}</section>)}</div>{selected ? <Drawer title={`${selected.customer} · ${selected.cn}`}><p dir="auto" className="text-sm text-[#3c382f]">{selected.name} · <Money value={selected.value} /> · owner {selected.owner}</p><div><b className="text-sm">Quote items</b>{selected.quoteItems.map((item) => <p key={item} className="rounded-xl bg-[#f5f3ee] p-2 text-sm">{item}</p>)}</div><div><b className="text-sm">Activity</b>{selected.activity.map((item) => <p key={item} className="border-b py-2 text-sm last:border-0">{item}</p>)}</div><Button tone="secondary">Generate quote PDF</Button><Button tone="secondary" onClick={() => addDealToSourcing(selected.id)}>Add to sourcing funnel</Button><Button tone="secondary">Open WhatsApp</Button><Button onClick={() => markDealWon(selected.id)}>Mark Won → create order</Button></Drawer> : <Card>No deal selected</Card>}</div>
  </>
}
