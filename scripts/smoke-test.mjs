import { existsSync, readFileSync } from 'node:fs'
const routes = ['dashboard','leads','pipeline','sourcing','orders','products','contacts','settings','messages','drive','hr','legal']
for (const route of routes) if (!existsSync(`src/app/${route}/page.tsx`)) throw new Error(`Missing ${route}`)
const source = readFileSync('src/components/erp/ErpPage.tsx','utf8') + readFileSync('src/data/erp-data.ts','utf8')
for (const label of ['Facebook sync active','Zoho','WhatsApp','RMB','شركة','Arabic']) if (!source.includes(label)) throw new Error(`Missing ${label}`)
if (source.includes('<iframe')) throw new Error('iframe shortcut detected')
console.log(`Smoke test passed for ${routes.length} routes`)
