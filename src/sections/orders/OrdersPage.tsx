"use client"
import { Badge, Button, PageHeader, SelectPill } from "@/components/erp/ui"
import { useWorkflow } from "@/components/erp/WorkflowStore"
import { orderStages } from "@/data/erp-data"

export const OrdersPage = () => {
  const { orders, advanceOrder } = useWorkflow()
  return <>
    <PageHeader eyebrow="Trade operations" title="Orders" subtitle="Won deals land here automatically; dense kanban cards show customer/CN, invoice, tracking, duration, sender, and WhatsApp update readiness." actions={<><SelectPill>Active</SelectPill><SelectPill>Delivered</SelectPill><Button>+ Manual order</Button></>} />
    <div className="flex gap-3 overflow-x-auto pb-3">{orderStages.map((stage) => <section key={stage} className="min-w-80 rounded-2xl border border-slate-200 bg-slate-50 p-3"><div className="mb-3 flex justify-between"><h2 className="font-bold">{stage}</h2><Badge tone="slate">{orders.filter((order) => order.stage === stage).length}</Badge></div>{orders.filter((order) => order.stage === stage).map((order) => <article key={order.id} className="mb-3 rounded-2xl bg-white p-3 shadow-sm"><div className="flex justify-between"><b>{order.cn}</b><Badge>{order.dn}</Badge></div><h3 dir="auto" className="mt-2 font-bold">{order.customer}</h3><p className="text-sm text-slate-500">{order.invoice} · {order.tracking}</p><div className="mt-3 grid grid-cols-3 gap-2 text-xs"><span className="rounded-lg bg-slate-50 p-2">{order.duration}</span><span className="rounded-lg bg-slate-50 p-2">{order.sender}</span><span className="rounded-lg bg-slate-50 p-2">{order.owner}</span></div><div className="mt-3"><Button tone="secondary" onClick={() => advanceOrder(order.id)}>Advance + WhatsApp</Button></div></article>)}</section>)}</div>
  </>
}
