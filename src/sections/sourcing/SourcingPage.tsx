"use client"
import { FormEvent, useState } from "react"
import { Badge, Button, Card, PageHeader, SelectPill } from "@/components/erp/ui"
import { rmbToUsd, useWorkflow } from "@/components/erp/WorkflowStore"

export const SourcingPage = () => {
  const { sourcing, addSourcing, advanceSourcing, exchangeRate } = useWorkflow()
  const [cn, setCn] = useState("CN-24099")
  const submit = (event: FormEvent) => { event.preventDefault(); addSourcing({ id: `src-${Date.now()}`, item: "Custom branded packaging", customer: "New customer", cn, owner: "Chen", qty: "500 cartons", stage: "New request", priceRmb: 96, candidates: ["Yiwu shortlist pending"] }) }
  const stages = ["New request", "Supplier quote", "Priced", "Ready for product"]
  return <>
    <PageHeader eyebrow="Trade operations" title="Sourcing" subtitle="One card per item; customer items stay findable by CN, with supplier candidates, RMB/USD pricing chips, and team-thread actions." actions={<><SelectPill>Assignee: All</SelectPill><Button>+ New request</Button></>} />
    <Card className="mb-4"><form onSubmit={submit} className="flex flex-wrap items-end gap-3"><label className="text-sm font-semibold">New sourcing request<br/><input value={cn} onChange={(event) => setCn(event.target.value)} className="mt-1 rounded-xl border p-2" /></label><label className="text-sm font-semibold">Qty<br/><input defaultValue="500 cartons" className="mt-1 rounded-xl border p-2" /></label><Button type="submit">Create request</Button><Badge tone="green">✓ matching customer if CN exists</Badge></form></Card>
    <div className="flex gap-3 overflow-x-auto pb-3">{stages.map((stage) => <section key={stage} className="min-w-80 rounded-xl border border-[#e4e0d6] bg-[#f5f3ee] p-3"><div className="mb-3 flex justify-between"><h2 className="font-bold">{stage}</h2><Badge tone="slate">{sourcing.filter((item) => item.stage === stage).length}</Badge></div>{sourcing.filter((item) => item.stage === stage).map((item) => <article key={item.id} className="mb-3 rounded-xl bg-white p-3 shadow-sm"><h3 className="font-bold">{item.item}</h3><p dir="auto" className="text-sm text-[#78736a]">{item.customer} · {item.cn}</p><p className="mt-2 text-xs text-[#78736a]">{item.qty} · {item.candidates.join(" / ")}</p><div className="mt-3 flex gap-2"><Badge tone="amber">¥{item.priceRmb}</Badge><Badge tone="green">{rmbToUsd(item.priceRmb, exchangeRate)}</Badge></div><div className="mt-3"><Button tone="secondary" onClick={() => advanceSourcing(item.id)}>Advance →</Button></div></article>)}</section>)}</div>
  </>
}
