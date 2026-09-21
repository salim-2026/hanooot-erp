"use client"
import { useState } from "react"
import { Badge, Button, Card, Drawer, Money, PageHeader, SelectPill } from "@/components/erp/ui"
import { useWorkflow } from "@/components/erp/WorkflowStore"
import { dealDrawerStages, dealStages, type DealStage } from "@/data/erp-data"

const stageTone = (stage: DealStage): "green" | "red" | "amber" | "slate" => {
  if (stage === "Closed Won") return "green"
  if (stage === "Closed Lost") return "red"
  if (stage === "Ghosted / Pending") return "amber"
  return "slate"
}

export const PipelinePage = () => {
  const { deals, advanceDeal, markDealWon, addDealToSourcing } = useWorkflow()
  const [selectedId, setSelectedId] = useState(deals[0]?.id)
  const selected = deals.find((deal) => deal.id === selectedId) ?? deals[0]

  return <>
    <PageHeader eyebrow="Sales" title="Pipeline" subtitle="Reference-style importing pipeline with qualification, negotiation, quote, closed, and ghosted lanes plus a detailed deal drawer." actions={<><SelectPill>This month</SelectPill><SelectPill>Owner: All</SelectPill><Button>+ New deal</Button></>} />
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
      <div className="flex gap-3 overflow-x-auto pb-3">
        {dealStages.map((stage) => {
          const stageDeals = deals.filter((deal) => deal.stage === stage)
          return <section key={stage} className="min-w-[285px] rounded-xl border border-[#e4e0d6] bg-[#f5f3ee] p-3">
            <div className="mb-3 flex items-center justify-between">
              <div><h2 className="font-bold">{stage}</h2><p className="text-xs text-[#78736a]"><Money value={stageDeals.reduce((sum, deal) => sum + deal.value, 0)} /></p></div>
              <Badge tone={stageTone(stage)}>{stageDeals.length}</Badge>
            </div>
            {stageDeals.map((deal) => <article key={deal.id} onClick={() => setSelectedId(deal.id)} className="mb-3 cursor-pointer rounded-xl bg-white p-3 shadow-sm ring-1 ring-transparent hover:ring-[#c7d6f7]">
              <div className="flex items-start justify-between gap-2"><h3 className="font-bold">{deal.customer}</h3><Badge>{deal.serviceTag}</Badge></div>
              <p className="mt-1 text-sm text-[#3c382f]">{deal.cn} · {deal.name}</p>
              <p className="mt-1 text-xs text-[#78736a]">Close {deal.closeDate} · owner {deal.owner}</p>
              <div className="mt-2 flex items-center justify-between"><Badge tone="slate">{deal.owner}</Badge><b><Money value={deal.value} /></b></div>
              <div className="mt-3 grid grid-cols-3 gap-2"><Button tone="secondary" onClick={() => advanceDeal(deal.id)}>Advance</Button><Button tone="danger">Lost</Button><Button onClick={() => markDealWon(deal.id)}>Won</Button></div>
            </article>)}
          </section>
        })}
      </div>
      {selected ? <Drawer title={`${selected.customer} · ${selected.cn}`}>
        <div className="rounded-xl bg-[#f5f3ee] p-3 text-sm text-[#3c382f]"><b>{selected.name}</b><br/><Money value={selected.value} /> · owner {selected.owner}<br/><span className="text-[#78736a]">{selected.syncNote}</span></div>
        <div className="flex flex-wrap gap-2">{dealDrawerStages.map((stage, index) => <Badge key={stage} tone={index <= 4 ? "blue" : selected.stage === "Closed Won" ? "green" : "slate"}>{stage}</Badge>)}</div>
        <div><b className="text-sm">Products on deal</b><div className="mt-2 grid gap-2">{selected.products.map((item) => <p key={item} className="rounded-xl border border-[#e4e0d6] bg-white p-2 text-sm">{item}</p>)}</div></div>
        <div><b className="text-sm">Quote items</b><div className="mt-2 space-y-2">{selected.quoteItems.map((item) => <p key={item} className="rounded-xl bg-[#f5f3ee] p-2 text-sm">{item}</p>)}</div></div>
        <div><b className="text-sm">Activity timeline</b>{selected.activity.map((item) => <p key={item} className="border-b border-[#e4e0d6] py-2 text-sm last:border-0">• {item}</p>)}</div>
        <div className="grid grid-cols-2 gap-2"><Button tone="secondary">Generate quote PDF</Button><Button tone="secondary" onClick={() => addDealToSourcing(selected.id)}>Add to sourcing funnel</Button><Button tone="secondary">WhatsApp</Button><Button tone="danger">Lost</Button><Button onClick={() => markDealWon(selected.id)}>Mark Won</Button></div>
      </Drawer> : <Card>No deal selected</Card>}
    </div>
  </>
}
