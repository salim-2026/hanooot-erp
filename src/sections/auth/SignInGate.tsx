"use client"
import { FormEvent, useState } from "react"
import { useAuth } from "@/components/erp/AuthStore"

export const SignInGate = () => {
  const { error, signIn } = useAuth()
  const [email, setEmail] = useState("mustafa@hanooot.com")
  const [password, setPassword] = useState("demo-password")

  const submit = (event: FormEvent) => {
    event.preventDefault()
    signIn(email, password)
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f3ee] px-4 text-[#211f1b]">
      <section className="w-full max-w-[420px] rounded-2xl border border-[#e4e0d6] bg-white p-6 shadow-[0_24px_80px_rgba(31,30,27,0.12)]">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#1f1e1b] text-sm font-black text-white">HN</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#78736a]">Hanooot ERP</p>
            <h1 className="text-2xl font-black tracking-tight">Sign in</h1>
          </div>
        </div>
        <p className="mb-5 text-sm text-[#6b665d]">Use the native demo gate to preview the full operations workspace.</p>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-[12px] font-bold text-[#3c382f]">
            Work email
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#dedbd2] bg-[#fbfaf7] px-3 outline-none focus:border-blue-500" type="email" autoComplete="email" />
          </label>
          <label className="block text-[12px] font-bold text-[#3c382f]">
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#dedbd2] bg-[#fbfaf7] px-3 outline-none focus:border-blue-500" type="password" autoComplete="current-password" />
          </label>
          {error ? <p className="rounded-xl bg-[#f4e3e1] px-3 py-2 text-[12px] font-semibold text-[#a8453f]">{error}</p> : null}
          <button className="h-11 w-full rounded-xl bg-blue-700 text-[13px] font-black text-white shadow-sm hover:bg-blue-800" type="submit">Sign in</button>
        </form>
      </section>
    </main>
  )
}
