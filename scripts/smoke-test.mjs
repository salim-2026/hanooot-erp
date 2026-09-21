import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const importRoutes = ['dashboard','leads','pipeline','sourcing','orders','products','contacts']
const standaloneRoutes = ['settings','messages','drive','hr','legal']

for (const route of importRoutes) {
  const pagePath = `src/app/importing/${route}/page.tsx`
  if (!existsSync(pagePath)) throw new Error(`Missing importing/${route}`)
  const page = readFileSync(pagePath, 'utf8')
  if (page.includes('ErpPage route=')) throw new Error(`importing/${route} still uses generic ErpPage wrapper`)
  if (!page.includes('@/sections/')) throw new Error(`importing/${route} is not route-owned`)
}

for (const route of standaloneRoutes) {
  const pagePath = `src/app/${route}/page.tsx`
  if (!existsSync(pagePath)) throw new Error(`Missing ${route}`)
  const page = readFileSync(pagePath, 'utf8')
  if (page.includes('ErpPage route=')) throw new Error(`${route} still uses generic ErpPage wrapper`)
  if (!page.includes('@/sections/')) throw new Error(`${route} is not route-owned`)
}

for (const route of importRoutes) {
  const pagePath = `src/app/${route}/page.tsx`
  if (!existsSync(pagePath)) throw new Error(`Missing legacy redirect ${route}`)
  const page = readFileSync(pagePath, 'utf8')
  if (!page.includes(`redirect("/importing/${route}")`)) throw new Error(`${route} does not redirect to importing/${route}`)
}

const files = []
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path)
    else files.push(path)
  }
}
walk('src')
const source = files.filter((path) => /\.(tsx?|mjs)$/.test(path)).map((path) => readFileSync(path, 'utf8')).join('\n')
for (const label of ['Work email','Password','Sign in','Sign out','Facebook sync active','Zoho','WhatsApp','RMB','English-only','convertLead','markDealWon','advanceOrder','updateSettings','/importing/dashboard','M3 8.5 12 4l9 4.5v7L12 20l-9-4.5z','M3 4h18l-7 8v6l-4 2v-8L3 4z']) if (!source.includes(label)) throw new Error(`Missing ${label}`)
if (source.includes('<iframe') || source.includes('reference-frame') || source.includes('Hanooot-' + 'standalone.html') || source.includes('.dc' + '.html')) throw new Error('reference shortcut detected')
if (/[\u0600-\u06FF]|rtl-content|dir="auto"|Noto Sans Arabic/.test(source)) throw new Error('Arabic/RTL implementation detected in source')
console.log(`Smoke test passed for ${importRoutes.length} importing sub-routes, ${standaloneRoutes.length} standalone pages, legacy redirects, reference sidebar icons, auth gate, and English-only guards`)
