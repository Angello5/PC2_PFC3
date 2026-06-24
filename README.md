# Manos en Ruta

MVP universitario para registrar trabajadores adultos en situacion vulnerable, recibir propinas digitales simuladas por QR, registrar turnos/incidentes y mostrar estadisticas para una ONG o municipalidad.

## Stack

- Frontend: Next.js + React + TypeScript
- Backend: Node.js + Express + TypeScript
- Base de datos/Auth: Supabase PostgreSQL + Supabase Auth
- Cloud: Vercel para web, Railway para API
- CI/CD: GitHub Actions

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Web: `http://localhost:3000`

API: `http://localhost:4000/health`

Si `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` estan configuradas, la API escribe en Supabase. Si faltan, usa almacenamiento en memoria para poder demostrar el MVP localmente.

## Verificacion

```bash
pnpm lint
pnpm test
pnpm build
```
