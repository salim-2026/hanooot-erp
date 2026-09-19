import { existsSync, readFileSync } from 'node:fs'
const routes = ['dashboard','leads','pipeline','sourcing','orders','products','contacts','settings','messages','drive','hr','legal']
for (const route of routes) {
  const pagePath = `src/app/${route}/page.tsx`
  if (!existsSync(pagePath)) throw new Error(`Missing ${route}`)
  const page = readFileSync(pagePath, 'utf8')
  if (page.includes('ErpPage route=')) throw new Error(`${route} still uses generic ErpPage wrapper`)
  if (!page.includes('@/sections/')) throw new Error(`${route} is not route-owned`)
}
const source = ['src/data/erp-data.ts','src/components/erp/WorkflowStore.tsx','src/sections/leads/LeadsPage.tsx','src/sections/pipeline/PipelinePage.tsx','src/sections/orders/OrdersPage.tsx','src/sections/settings/SettingsPage.tsx'].map((p)=>readFileSync(p,'utf8')).join('\n')
for (const label of ['Facebook sync active','Zoho','WhatsApp','RMB','شركة','Arabic','convertLead','markDealWon','advanceOrder','updateSettings']) if (!source.includes(label)) throw new Error(`Missing ${label}`)
if (source.includes('<iframe')) throw new Error('iframe shortcut detected')
console.log(`Smoke test passed for ${routes.length} route-owned workflow pages`)
