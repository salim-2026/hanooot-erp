import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const routes = ["dashboard","leads","pipeline","sourcing","orders","products","contacts","settings","messages","drive","hr","legal"]
const missing = routes.filter((route) => !existsSync(join("src/app", route, "page.tsx")))
if (missing.length) throw new Error(`Missing routes: ${missing.join(", ")}`)
const allFiles = []
const walk = (dir) => { for (const name of readdirSync(dir, { withFileTypes: true })) { const path = join(dir, name.name); if (name.isDirectory()) walk(path); else allFiles.push(path) } }
walk("src")
const source = allFiles.filter((file) => /\.(tsx|ts)$/.test(file)).map((file) => readFileSync(file, "utf8")).join("\n")
if (/<iframe/i.test(source)) throw new Error("Runtime source must not embed iframe/reference HTML")
if (/Hanooot-standalone|\.dc\.html|checklist substitute/i.test(source)) throw new Error("Runtime source references forbidden standalone/checklist artifacts")
for (const phrase of ["Mark Won", "@tania", "Supabase Storage", "Facebook", "Zoho Books", "WhatsApp", "يرجى"]) {
  if (!source.includes(phrase)) throw new Error(`Missing smoke phrase: ${phrase}`)
}
console.log(`Smoke passed: ${routes.length} routes, no iframe/reference shortcuts, workflows present.`)
