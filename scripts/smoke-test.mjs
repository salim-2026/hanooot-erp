import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const routes = ['dashboard','leads','pipeline','sourcing','orders','products','contacts','settings','messages','drive','hr','legal']
for (const route of routes) {
  const pagePath = `src/app/${route}/page.tsx`
  if (!existsSync(pagePath)) throw new Error(`Missing ${route}`)
  const page = readFileSync(pagePath, 'utf8')
  if (page.includes('ErpPage route=')) throw new Error(`${route} still uses generic ErpPage wrapper`)
  if (!page.includes('@/sections/')) throw new Error(`${route} is not route-owned`)
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
for (const label of ['Work email','Password','Sign in','Sign out','Facebook sync active','Zoho','WhatsApp','RMB','English-only','convertLead','markDealWon','advanceOrder','updateSettings']) if (!source.includes(label)) throw new Error(`Missing ${label}`)
if (source.includes('<iframe') || source.includes('reference-frame') || source.includes('Hanooot-' + 'standalone.html') || source.includes('.dc' + '.html')) throw new Error('reference shortcut detected')
if (/[\u0600-\u06FF]|rtl-content|dir="auto"|Noto Sans Arabic/.test(source)) throw new Error('Arabic/RTL implementation detected in source')
console.log(`Smoke test passed for ${routes.length} route-owned workflow pages plus auth gate and English-only guards`)
