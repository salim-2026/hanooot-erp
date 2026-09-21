"use client"
import { Badge, Button, PageHeader, SelectPill } from "@/components/erp/ui"
import { useWorkflow } from "@/components/erp/WorkflowStore"
import { orderStages, type OrderStage } from "@/data/erp-data"

const stageTone = (stage: OrderStage): "blue" | "green" | "amber" | "slate" => {
  if (stage === "Received by Client") return "green"
  if (stage.includes("Partial")) return "amber"
  if (stage === "Reached Iraq") return "blue"
  return "slate"
}

export const OrdersPage = () => {
  const { orders, advanceOrder } = useWorkflow()
  return <>
    <PageHeader eyebrow="Trade operations" title="Orders" subtitle="Reference order board using Confirmed, Purchased, Partially Shipped, Shipped, Partially Received, Reached Iraq, and Received by Client stages." actions={<><SelectPill>Active</SelectPill><SelectPill>Received</SelectPill><SelectPill>All</SelectPill><Button>+ Manual order</Button></>} />
    <div className="mb-4 grid gap-3 md:grid-cols-4">
      {[["Active orders", orders.filter((order) => order.stage !== "Received by Client").length], ["Received", orders.filter((order) => order.stage === "Received by Client").length], ["Invoices", orders.length], ["WhatsApp updates", orders.filter((order) => order.channel.includes("ready") || order.channel.includes("Client")).length]].map(([label, value]) => <div key={label} className="rounded-xl border border-[#e4e0d6] bg-white p-4 shadow-sm"><p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#78736a]">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>)}
    </div>
    <div className="flex gap-3 overflow-x-auto pb-3">{orderStages.map((stage) => {
      const stageOrders = orders.filter((order) => order.stage === stage)
      return <section key={stage} className="min-w-[300px] rounded-xl border border-[#e4e0d6] bg-[#f5f3ee] p-3">
        <div className="mb-3 flex justify-between"><h2 className="font-bold">{stage}</h2><Badge tone={stageTone(stage)}>{stageOrders.length}</Badge></div>
        {stageOrders.map((order) => <article key={order.id} className="mb-3 rounded-xl bg-white p-3 shadow-sm">
          <div className="flex justify-between"><b>{order.cn}</b><Badge>{order.dn}</Badge></div>
          <h3 className="mt-2 font-bold">{order.customer}</h3>
          <p className="text-sm text-[#78736a]">Invoice {order.invoice} · Tracking {order.tracking}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs"><span className="rounded-lg bg-[#f5f3ee] p-2">Duration: {order.duration}</span><span className="rounded-lg bg-[#f5f3ee] p-2">Sender: {order.sender}</span><span className="rounded-lg bg-[#f5f3ee] p-2">Owner: {order.owner}</span><span className="rounded-lg bg-[#f5f3ee] p-2">{order.channel}</span></div>
          <div className="mt-3 flex items-center justify-between"><span className="grid size-8 place-items-center rounded-full bg-[#e7eefb] text-[11px] font-black text-blue-700">{order.assignee}</span><Button tone="secondary" onClick={() => advanceOrder(order.id)}>Advance + WhatsApp</Button></div>
        </article>)}
      </section>
    })}</div>
  </>
}
