# Hanooot ERP

Production-oriented Next.js/TypeScript/Tailwind/Redux foundation that recreates the Hanooot ERP desktop shell and workflows from the supplied reference screens. The app includes a native demo sign-in gate, uses English-only LTR labels and demo data, and does not ship iframe or standalone HTML reference artifacts.

## Routes

`/`, `/dashboard`, `/leads`, `/pipeline`, `/sourcing`, `/orders`, `/products`, `/contacts`, `/settings`, `/messages`, `/drive`, `/hr`, `/legal`, plus redirects for `/overview` and `/importing`.

## Commands

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

Supabase env vars are optional until a live backend is connected:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
