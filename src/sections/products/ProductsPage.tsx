"use client"
import { FormEvent, useState } from "react"
import { Badge, Button, Card, PageHeader } from "@/components/erp/ui"
import { rmbToUsd, useWorkflow } from "@/components/erp/WorkflowStore"

export const ProductsPage = () => {
  const { products, addProduct, removeProduct, exchangeRate } = useWorkflow()
  const [title, setTitle] = useState("Travel spice kit")
  const submit = (event: FormEvent) => { event.preventDefault(); addProduct({ id: `prod-${Date.now()}`, title, cn: "CN-24110", desc: "Pictures / videos attached", media: "▧", priceRmb: 52, moq: "300 pcs", removable: true }) }
  return <>
    <PageHeader eyebrow="Trade operations" title="Products" subtitle="Catalogue grid for the B2B website with image/video placeholders, RMB/USD chips, MOQ, CN traceability, and removable cards." actions={<Button>+ Add product</Button>} />
    <Card className="mb-4"><form onSubmit={submit} className="flex flex-wrap items-end gap-3"><label className="text-sm font-semibold">Product title<br/><input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-1 rounded-xl border p-2" /></label><label className="text-sm font-semibold">Pictures / videos<br/><input defaultValue="2 attachments" className="mt-1 rounded-xl border p-2" /></label><Button type="submit">Add product</Button></form></Card>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{products.map((product) => <Card key={product.id}><div className="grid h-32 place-items-center rounded-xl border border-dashed bg-[#f5f3ee] text-4xl text-[#8d877c]">{product.media}</div><h2 className="mt-3 font-bold">{product.title}</h2><p className="text-sm text-[#78736a]">{product.desc}</p><p className="mt-1 text-xs text-[#8d877c]">{product.cn} · MOQ {product.moq}</p><div className="mt-3 flex gap-2"><Badge tone="amber">¥{product.priceRmb}</Badge><Badge tone="green">{rmbToUsd(product.priceRmb, exchangeRate)}</Badge></div>{product.removable ? <div className="mt-3"><Button tone="danger" onClick={() => removeProduct(product.id)}>✕ Remove</Button></div> : null}</Card>)}</div>
  </>
}
