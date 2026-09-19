import Link from "next/link"

type Metric = {
  label: string
  value: string
  detail: string
  accent?: string
}

type Department = {
  name: string
  subtitle: string
  icon: string
  tone: string
  href: string
  metrics: Metric[]
}

const topMetrics: Metric[] = [
  { label: "Revenue MTD", value: "$118,600", detail: "+11% vs July", accent: "text-emerald-600" },
  { label: "Open work items", value: "17", detail: "11 import · 6 accounting" },
  { label: "Shipments in transit", value: "6", detail: "1 delayed at Aqaba", accent: "text-amber-700" },
  { label: "Headcount", value: "13", detail: "7 departments" },
]

const departments: Department[] = [
  {
    name: "Importing Service",
    subtitle: "Sourcing · quotes · orders",
    icon: "▣",
    tone: "bg-amber-50 text-amber-700 ring-amber-100",
    href: "/sourcing",
    metrics: [
      { label: "Live deals", value: "5", detail: "" },
      { label: "Orders in transit", value: "6", detail: "" },
      { label: "Order value", value: "$86,500", detail: "" },
    ],
  },
  {
    name: "Legal Service",
    subtitle: "Client services CRM · retainers",
    icon: "⚖",
    tone: "bg-blue-50 text-blue-700 ring-blue-100",
    href: "/legal",
    metrics: [
      { label: "Open enquiries", value: "6", detail: "" },
      { label: "Weighted pipeline", value: "$20,800", detail: "" },
      { label: "Active retainers", value: "4", detail: "" },
    ],
  },
  {
    name: "HR",
    subtitle: "Directory · leave · payroll",
    icon: "♧",
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    href: "/hr",
    metrics: [
      { label: "Leave requests", value: "2", detail: "" },
      { label: "Net payroll (Aug)", value: "$18,045", detail: "" },
      { label: "Docs expiring", value: "2", detail: "" },
    ],
  },
]

const activity = [
  ["bg-amber-500", "Order AQB-4471 cleared customs", "Importing Service · 14 min ago"],
  ["bg-blue-500", "Mansour Group retainer signed", "Legal Service · 2h ago"],
  ["bg-emerald-500", "Leave request from A. Thamer awaiting approval", "HR · 5h ago"],
  ["bg-blue-600", "New enquiry: Salameh & Sons — company formation", "Legal Service · Yesterday"],
]

const branches = [
  ["Amman — Head office", "Legal · HR · Importing", "14 staff"],
  ["Aqaba — Port office", "Importing", "5 staff"],
  ["Dubai — Trade desk", "Importing · Legal", "3 staff"],
]

const MetricCard = ({ metric }: { metric: Metric }) => (
  <section className="rounded-xl border border-[#dedbd2] bg-white p-4 shadow-[0_1px_2px_rgba(20,24,18,0.08)]">
    <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#777a70]">{metric.label}</p>
    <p className="mt-3 text-2xl font-black tracking-tight text-[#11140f]">{metric.value}</p>
    <p className={`mt-1 text-[11px] font-medium ${metric.accent ?? "text-[#6b6f64]"}`}>{metric.detail}</p>
  </section>
)

const DepartmentCard = ({ department }: { department: Department }) => (
  <section className="overflow-hidden rounded-xl border border-[#dedbd2] bg-white shadow-[0_1px_2px_rgba(20,24,18,0.08)]">
    <div className="flex items-center justify-between border-b border-[#e7e4dc] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className={`grid size-9 place-items-center rounded-xl text-sm ring-1 ${department.tone}`}>{department.icon}</span>
        <div>
          <h2 className="text-sm font-bold text-[#171712]">{department.name}</h2>
          <p className="text-[11px] text-[#777a70]">{department.subtitle}</p>
        </div>
      </div>
      <Link href={department.href} className="text-[11px] font-bold text-blue-700">Open →</Link>
    </div>
    <div className="grid grid-cols-3 divide-x divide-[#e7e4dc]">
      {department.metrics.map((metric) => (
        <div key={metric.label} className="px-4 py-3">
          <p className="text-xl font-black text-[#171712]">{metric.value}</p>
          <p className="mt-1 text-[11px] text-[#777a70]">{metric.label}</p>
        </div>
      ))}
    </div>
  </section>
)

export const DashboardPage = () => (
  <div className="max-w-[1080px]">
    <header className="mb-4 flex items-center justify-between">
      <div className="flex items-baseline gap-3">
        <h1 className="text-[15px] font-bold text-[#171712]">Overview</h1>
        <p className="text-xs text-[#777a70]">27 August 2026</p>
      </div>
      <p className="text-xs text-[#55594f]">Mustafa Waiz · Managing Director</p>
    </header>

    <div className="grid gap-3 lg:grid-cols-4">
      {topMetrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
    </div>

    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_292px]">
      <div className="space-y-3">
        {departments.map((department) => <DepartmentCard key={department.name} department={department} />)}
      </div>
      <aside className="space-y-3">
        <section className="overflow-hidden rounded-xl border border-[#dedbd2] bg-white shadow-[0_1px_2px_rgba(20,24,18,0.08)]">
          <h2 className="border-b border-[#e7e4dc] px-4 py-3 text-xs font-bold text-[#171712]">Recent activity</h2>
          {activity.map(([dot, title, detail]) => (
            <div key={title} className="flex gap-3 border-b border-[#eeeae3] px-4 py-3 last:border-b-0">
              <span className={`mt-1 size-2 rounded-full ${dot}`} />
              <div>
                <p className="text-xs font-semibold text-[#2a2d27]">{title}</p>
                <p className="mt-1 text-[11px] text-[#777a70]">{detail}</p>
              </div>
            </div>
          ))}
        </section>
        <section className="overflow-hidden rounded-xl border border-[#dedbd2] bg-white shadow-[0_1px_2px_rgba(20,24,18,0.08)]">
          <h2 className="border-b border-[#e7e4dc] px-4 py-3 text-xs font-bold text-[#171712]">Branches</h2>
          {branches.map(([name, scope, staff]) => (
            <div key={name} className="flex items-center justify-between border-b border-[#eeeae3] px-4 py-3 last:border-b-0">
              <div>
                <p className="text-xs font-bold text-[#2a2d27]">{name}</p>
                <p className="mt-1 text-[11px] text-[#777a70]">{scope}</p>
              </div>
              <span className="text-[11px] text-[#777a70]">{staff}</span>
            </div>
          ))}
        </section>
      </aside>
    </div>
  </div>
)
