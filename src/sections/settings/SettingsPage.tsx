"use client"
import { FormEvent, useState } from "react"
import { useWorkflow } from "@/components/erp/WorkflowStore"

export const SettingsPage = () => {
  const { exchangeRate, taxRate, updateSettings } = useWorkflow()
  const [rate, setRate] = useState(String(exchangeRate))
  const [tax, setTax] = useState(String(taxRate))
  const [saved, setSaved] = useState("Base currency and tax are ready for quotes.")
  const submit = (event: FormEvent) => {
    event.preventDefault()
    updateSettings(Number(rate), Number(tax))
    setSaved(`Saved RMB to USD ${rate} and sales tax ${tax}%`)
  }

  return <div><header className="flex h-14 items-center gap-5 border-b border-[#e4e0d6] bg-white px-6"><h1 className="font-black">Organisation</h1><span className="text-[13px] text-[#78736a]">company record and active departments</span></header><main className="max-w-[760px] space-y-4 p-6"><section className="overflow-hidden rounded-xl border border-[#e4e0d6] bg-white shadow-sm"><h2 className="border-b border-[#e4e0d6] p-4 font-black">Organisation</h2>{[["Legal name","Hanooot for Trade & Legal Services LLC"],["Trade name","Hanooot"],["Commercial reg.","JO-AMM-224119"],["Tax number","9013442"],["Head office","Zahran St. 12, Amman, Jordan"]].map(([a,b])=><div key={a} className="grid grid-cols-[180px_1fr] items-center gap-4 p-4 text-[13px]"><b className="text-[#78736a]">{a}</b><div className="rounded-xl border border-[#e4e0d6] bg-[#fbfaf7] px-4 py-3">{b}</div></div>)}</section><section className="overflow-hidden rounded-xl border border-[#e4e0d6] bg-white shadow-sm"><h2 className="border-b border-[#e4e0d6] p-4 font-black">Active departments</h2>{[["▱","Importing Service","sourcing, quotes, orders"],["⚖","Legal Service","client services CRM, retainers"],["♙","HR","directory, leave, payroll"],["□","Drive","shared files, every department"]].map(([i,a,b])=><div key={a} className="flex items-center justify-between border-b border-[#e4e0d6] p-4 last:border-b-0"><div className="flex gap-4"><span>{i}</span><p><b>{a}</b><br/><span className="text-[12px] text-[#78736a]">{b}</span></p></div><span className="h-6 w-11 rounded-full bg-blue-700 p-1"><span className="float-right block size-4 rounded-full bg-white" /></span></div>)}</section><section className="rounded-xl border border-[#e4e0d6] bg-white p-4 shadow-sm"><h2 className="font-black">Base currency & tax</h2><form onSubmit={submit} className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><label className="text-[12px] font-bold text-[#78736a]">RMB to USD rate<input value={rate} onChange={(event) => setRate(event.target.value)} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0d6] px-3" /></label><label className="text-[12px] font-bold text-[#78736a]">Sales tax rate<input value={tax} onChange={(event) => setTax(event.target.value)} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0d6] px-3" /></label><button className="self-end rounded-xl bg-blue-700 px-4 py-3 text-[12px] font-bold text-white" type="submit">Save settings</button></form><p className="mt-3 rounded-xl bg-[#e6f2ea] px-3 py-2 text-[12px] font-bold text-[#2f8f63]">{saved}</p></section></main></div>
}
