import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const roots = ['src', 'scripts']
const files = []
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path)
    else if (/\.(tsx?|mjs)$/.test(path)) files.push(path)
  }
}
for (const root of roots) walk(root)

const rules = [
  { name: 'debug statement', pattern: new RegExp('debug' + 'ger\\b') },
  { name: 'console log/debug', pattern: /console\.(log|debug)\(/ },
  { name: 'legacy variable declaration', pattern: new RegExp('\\bv' + 'ar\\s+') },
  { name: 'temporary marker', pattern: new RegExp('TO' + 'DO|FIX' + 'ME') },
]
const allowConsole = new Set(['scripts/lint-lite.mjs', 'scripts/smoke-test.mjs'])
const problems = []
for (const file of files) {
  const source = readFileSync(file, 'utf8')
  for (const rule of rules) {
    if (rule.name === 'console log/debug' && allowConsole.has(file)) continue
    if (rule.pattern.test(source)) problems.push(`${file}: ${rule.name}`)
  }
}

if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log(`Lightweight lint passed for ${files.length} TypeScript/React/script files`)
