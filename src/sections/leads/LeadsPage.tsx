"use client"
import { Badge, Button, Card, PageHeader, SelectPill } from "@/components/erp/ui"
import { useWorkflow } from "@/components/erp/WorkflowStore"
import { leadStages } from "@/data/erp-data"

export const LeadsPage = () => {
  const { leads, addLeadToBoard, archiveLead, logCall, convertLead } = useWorkflow()
  const activeLeads = leads.filter((lead) => !lead.archived)
  const intake = activeLeads.filter((lead) => lead.stage === "Synced")
  return <>
    <PageHeader eyebrow="CRM" title="Leads" subtitle="Facebook intake queue, board/list controls, quick call logging, WhatsApp actions, archive, and conversion into real pipeline deals." actions={<><SelectPill>Source: All</SelectPill><SelectPill>Owner: All</SelectPill><SelectPill>Campaign</SelectPill><Button>+ New lead</Button></>} />
    <Card className="mb-4"><div className="flex items-start justify-between gap-4"><div><h2 className="font-bold">Intake queue · {intake.length} new from Facebook</h2><p className="text-sm text-slate-500">Synced 12 min ago — triage before they hit the board so FB volume never floods active stages.</p></div><Badge tone="green">Facebook sync active</Badge></div><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{intake.map((lead) => <article key={lead.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><h3 dir="auto" className="font-bold">{lead.name}</h3><p className="text-sm text-slate-500">{lead.phone} · FB · {lead.campaign}</p><p dir="auto" className="mt-2 text-sm">{lead.note}</p><div className="mt-3 flex flex-wrap gap-2"><Button onClick={() => addLeadToBoard(lead.id)}>Add to board</Button><Button tone="secondary" onClick={() => logCall(lead.id)}>Log call</Button><Button tone="secondary">Open WhatsApp</Button><Button tone="danger" onClick={() => archiveLead(lead.id)}>Archive</Button></div></article>)}</div></Card>
    <div className="flex gap-3 overflow-x-auto pb-3">{leadStages.map((stage) => <section key={stage} className="min-w-80 rounded-2xl border border-slate-200 bg-slate-50 p-3"><div className="mb-3 flex items-center justify-between"><h2 className="font-bold">{stage}</h2><Badge tone="slate">{activeLeads.filter((lead) => lead.stage === stage).length}</Badge></div>{activeLeads.filter((lead) => lead.stage === stage).map((lead) => <article key={lead.id} className="mb-3 rounded-2xl bg-white p-3 shadow-sm"><div className="flex items-start justify-between"><h3 dir="auto" className="font-bold">{lead.name}</h3><Badge>{lead.source}</Badge></div><p className="text-sm text-slate-500">{lead.owner} · {lead.campaign} · ${lead.value.toLocaleString()}</p><p className="mt-2 text-xs text-slate-500">called ×{lead.attempts} · {lead.note}</p><div className="mt-3 flex flex-wrap gap-2"><Button tone="secondary" onClick={() => logCall(lead.id)}>Log call</Button><Button tone="secondary">WhatsApp</Button><Button onClick={() => convertLead(lead.id)}>Convert to deal</Button></div></article>)}</section>)}</div>
  </>
}
