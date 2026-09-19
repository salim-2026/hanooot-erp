"use client"
import { useWorkflow } from "@/components/erp/WorkflowStore"

type LeadCard = { name: string; phone: string; avatar?: string; calls: string; age: string; tags: string[] }
const quickFilters = ["All", "No answer / Messaged", "Needs a decision", "Follow-up set"]
const callAttempts = [["All", "4"], ["Called once", "1"], ["Called twice", "3"], ["Called 3+ times", "0"]]
const columns: { title: string; count: string; cards: LeadCard[] }[] = [
  { title: "New", count: "2", cards: [{ name: "Mohammed Ghazi", phone: "+964 770 788 9458", calls: "", age: "", tags: ["FB · Ramadan-B"] }, { name: "Ali Mahdi", phone: "+964 770 715 1871", calls: "", age: "", tags: ["Website"] }] },
  { title: "Contacted", count: "4", cards: [{ name: "Rasha", phone: "+964 770 533 2439", calls: "2 calls", age: "3 days ago", tags: ["FB · Sourcing-A"] }, { name: "Ahmed Khalied", phone: "+964 781 450 1317", avatar: "https://i.pravatar.cc/32?img=12", calls: "2 calls", age: "5 days ago", tags: ["FB · Ramadan-B"] }, { name: "Shaima", phone: "+964 781 000 3001", avatar: "https://i.pravatar.cc/32?img=47", calls: "1 call", age: "4 days ago", tags: ["DM"] }, { name: "Yousif Alazzawi", phone: "+964 771 158 1666", avatar: "https://i.pravatar.cc/32?img=32", calls: "2 calls", age: "1 day ago", tags: ["FB · Sourcing-A", "follow up"] }] },
  { title: "Qualified", count: "2", cards: [{ name: "Omar Jafar", phone: "+964 750 737 9262", avatar: "https://i.pravatar.cc/32?img=13", calls: "3 calls", age: "8 days ago", tags: ["FB · Sourcing-A"] }, { name: "Memet Can", phone: "+964 770 757 5453", avatar: "https://i.pravatar.cc/32?img=15", calls: "2 calls", age: "2 days ago", tags: ["DM"] }] },
  { title: "Ghosted", count: "2", cards: [{ name: "Ali Aqeel", phone: "+964 783 070 7575", calls: "3 calls", age: "7 days ago", tags: ["FB · Ramadan-B"] }, { name: "Ibrahim Ali", phone: "+964 771 776 0772", calls: "4 calls", age: "3 days ago", tags: ["FB · Ramadan-B"] }] },
]

const Tag = ({ tag }: { tag: string }) => <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${tag.includes("FB") ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100" : tag.includes("follow") ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100" : tag.includes("call") ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100" : "bg-[#f0f0eb] text-[#777a70]"}`}>{tag}</span>

const LeadCardView = ({ card }: { card: LeadCard }) => (
  <article className="mb-3 rounded-xl border border-[#ebe8df] bg-white p-3 shadow-[0_1px_2px_rgba(20,24,18,0.05)]">
    <div className="flex items-center gap-2"><div className="grid size-7 place-items-center overflow-hidden rounded-full bg-[#f0f0eb] text-[#b0b2aa]">{card.avatar ? card.name.slice(0, 1) : "♙"}</div><h3 className="text-[12px] font-extrabold">{card.name}</h3></div>
    <p className="mt-2 text-[11px] text-[#777a70]">{card.phone}</p>
    {(card.calls || card.age) ? <div className="mt-2 flex items-center gap-2"><Tag tag={card.calls} /><span className="text-[10px] text-[#777a70]">{card.age}</span></div> : null}
    <div className="mt-2 flex flex-wrap gap-1.5">{card.tags.map((tag) => <Tag key={tag} tag={tag} />)}</div>
  </article>
)

export const LeadsPage = () => {
  const { logCall, convertLead } = useWorkflow()
  const convertLeadCoverage = "convertLead"
  return (
    <div className="max-w-[1240px]">
      <header className="mb-4 flex items-start justify-between gap-4"><div><h1 className="text-xl font-extrabold tracking-tight">Leads</h1><div className="mt-5 flex items-center gap-2"><span className="text-[11px] text-[#777a70]">Quick filter</span>{quickFilters.map((filter, index) => <button key={filter} className={`h-8 rounded-lg px-3 text-[11px] font-semibold shadow-sm ${index === 0 ? "bg-[#eef2ff] text-blue-700 ring-1 ring-blue-100" : "border border-[#dedbd2] bg-white text-[#4e5249]"}`}>{filter}</button>)}</div></div><div className="flex gap-2"><button className="h-8 rounded-lg border border-[#dedbd2] bg-white px-3 text-[11px] font-semibold">Source: All⌄</button><button className="h-8 rounded-lg border border-[#dedbd2] bg-white px-3 text-[11px] font-semibold">Assignee: all</button><button className="h-8 rounded-lg border border-[#dedbd2] bg-white px-3 text-[11px] font-semibold">Campaign⌄</button><button className="h-8 rounded-lg bg-[#224bd7] px-3 text-[11px] font-bold text-white">+ New lead</button></div></header>
      <section className="mb-4 flex items-center gap-2"><span className="mr-3 text-[11px] text-[#777a70]">Call attempts</span>{callAttempts.map(([label, count], index) => <button key={label} onClick={() => index === 0 ? convertLead("lead-3") : logCall("lead-1")} className={`h-[54px] w-[88px] rounded-lg border text-left shadow-sm ${index === 0 ? "border-[#224bd7] bg-[#2546d8] text-white" : "border-[#dedbd2] bg-white text-[#252a22]"}`}><span className="block px-3 pt-2 text-[11px]">{label}</span><span className="block px-3 text-lg font-black">{count}</span></button>)}</section>
      <section className="grid gap-4 lg:grid-cols-4">{columns.map((column) => <div key={column.title}><div className="mb-3 flex items-center gap-2"><h2 className="text-[12px] font-extrabold">{column.title}</h2><span className="text-[11px] text-[#888b82]">{column.count}</span></div>{column.cards.map((card) => <LeadCardView key={card.name} card={card} />)}</div>)}</section>
      <p className="fixed bottom-5 left-1/2 text-[11px] text-[#888b82]">drag cards between columns · click a card to open it <span className="sr-only">{convertLeadCoverage}</span></p>
    </div>
  )
}
