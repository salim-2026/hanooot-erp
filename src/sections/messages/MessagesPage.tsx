"use client"
import { FormEvent, useState } from "react"

const people = [["Noor", "CRM Manager", "2", "Online"], ["Chen", "Supplier coordinator", "1", "Awaiting video"], ["Sara", "Operations", "", "Shipping docs"], ["Lana", "Legal", "", "Matter review"]]
const seedItems = [["Tania Wells","CRM Manager","25 min ago","@mustafa supplier wants a 20% deposit before production — do we approve?","SOURCING","Noura Trading","CN-7790","Sourcing requested"],["Mustafa Naseer","Account Manager","2 h ago","Tagged you on the short count — @mustafa we need a decision before the balance payment.","ORDERS","Al Noor Hotels","CN-7789 · DN-7","Partially Received"],["Sara Mansour","Operations","Yesterday","Customer is asking for a quote today — can we price without the second candidate?","PIPELINE","Engines World","CN-7716","Proposal / Price Quote"],["Mohammed Waiz","Logistics and Sourcing Manager","2 days ago","Carton size confirmed — @mustafa please review the margin before I push the price.","SOURCING","Ihab Auto Parts","CN-7765","Enquiry priced"]]
const groups = ["Importing War Room", "Sales follow-up", "Operations handoff"]

export const MessagesPage = () => {
  const [items, setItems] = useState(seedItems)
  const [reply, setReply] = useState("Approved. Please attach the supplier video and update the card.")
  const [activeTab, setActiveTab] = useState("Thread")
  const [activePerson, setActivePerson] = useState("Noor")
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!reply.trim()) return
    setItems([["Mustafa Waiz", "Managing Director", "Just now", reply, "THREAD", activePerson, "Reply", "Sent"], ...items])
    setReply("")
  }

  return <div className="grid min-h-screen grid-cols-[245px_1fr_320px] bg-[#fbfaf7]">
    <aside className="border-r border-[#e4e0d6] bg-[#f5f3ee] p-4">
      <div className="flex items-center justify-between"><h1 className="text-xl font-black">Messages</h1><button className="rounded-lg bg-blue-700 px-3 py-2 text-[11px] font-bold text-white">+ Group</button></div>
      <input className="mt-4 h-10 w-full rounded-xl border border-[#e4e0d6] bg-white px-3 text-[12px]" placeholder="Search people" />
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[.14em] text-[#78736a]">People</p>
      <div className="mt-2 space-y-2">{people.map(([name,title,count,status])=><button key={name} onClick={() => setActivePerson(name)} className={`w-full rounded-xl p-3 text-left ${activePerson===name?"bg-white shadow-sm":"hover:bg-[#efede6]"}`}><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-[#e4e0d6] font-bold">{name[0]}</span><span><b className="text-[13px]">{name}</b><br/><span className="text-[11px] text-[#78736a]">{title}</span></span>{count&&<span className="ml-auto rounded-full bg-blue-700 px-2 py-1 text-[10px] font-bold text-white">{count}</span>}</div><p className="mt-2 text-[11px] text-[#78736a]">{status}</p></button>)}</div>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[.14em] text-[#78736a]">Groups</p>
      <div className="mt-2 space-y-1">{groups.map((group)=><p key={group} className="rounded-lg px-3 py-2 text-[12px] font-bold hover:bg-[#efede6]"># {group}</p>)}</div>
    </aside>
    <main className="p-6">
      <header className="mb-4 flex items-center justify-between"><div><h2 className="text-2xl font-black">{activePerson} thread</h2><p className="text-[13px] text-[#78736a]">Team replies, linked records, and decision history in one dense view.</p></div><div className="rounded-full bg-[#e9e7df] p-1 text-[12px]">{["Thread","Activity"].map(tab=><button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-2 font-bold ${activeTab===tab?"bg-white shadow-sm":"text-[#78736a]"}`}>{tab}</button>)}</div></header>
      <form onSubmit={submit} className="mb-4 flex gap-2 rounded-xl border border-[#e4e0d6] bg-white p-3"><input value={reply} onChange={(event) => setReply(event.target.value)} className="h-10 flex-1 rounded-xl border border-[#e4e0d6] px-3" placeholder="Write a team reply" /><button className="rounded-xl bg-blue-700 px-4 text-[12px] font-bold text-white" type="submit">Send</button></form>
      <section className="space-y-3">{items.map(([who,title,time,msg,tag,name,cn,stage],i)=><article key={`${msg}-${i}`} className={`overflow-hidden rounded-xl border ${i<2?"border-blue-200 bg-[#f5f8ff]":"border-[#e4e0d6] bg-white"} shadow-sm`}><div className="flex justify-between p-5"><div className="flex gap-4"><span className="grid size-10 place-items-center rounded-full bg-[#e4e0d6] font-bold">{who[0]}</span><p><b>{who}</b> <span className="ml-2 text-[12px] text-[#78736a]">{title}</span><br/><span className="mt-3 inline-block text-[14px]">{msg}</span></p></div><span className="text-[12px] text-[#78736a]">{time} <span className="ml-3 inline-block size-2 rounded-full bg-blue-700" /></span></div><footer className="flex items-center gap-4 border-t border-[#e4e0d6] bg-[#fbfaf7] px-5 py-3 text-[12px]"><b className="rounded-full bg-[#e7eefb] px-3 py-1 text-blue-700">{tag}</b><b>{name}</b><span>{cn}</span><span className="text-[#78736a]">{stage}</span><a className="ml-auto font-bold text-blue-700">Open →</a></footer></article>)}</section>
    </main>
    <aside className="border-l border-[#e4e0d6] bg-white p-5"><h2 className="font-black">Activity</h2><p className="mt-1 text-[12px] text-[#78736a]">Assigned to you and linked to live records.</p><div className="mt-4 space-y-3">{items.slice(0,4).map(([who,,time,,tag,name,cn])=><article key={`${who}-${time}`} className="rounded-xl border border-[#e4e0d6] p-3 text-[12px]"><b>{tag}</b><p className="mt-1">{name} · {cn}</p><p className="text-[#78736a]">Assigned to Mustafa · {time}</p><button className="mt-2 font-bold text-blue-700">Open →</button></article>)}</div></aside>
  </div>
}
