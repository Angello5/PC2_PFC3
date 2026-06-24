# Checklist DevOps, despliegue y evidencias

## Lo que ya queda en el repositorio

- Codigo fuente del MVP en TypeScript.
- Frontend Next.js + React.
- Backend Express.
- Tipos y validaciones compartidas.
- SQL de Supabase y datos seed.
- CI/CD con GitHub Actions.
- Diagramas Draw.io.
- Documentacion para informe.
- Informe final base en `outputs/`.

## Lo que falta conectar con tus cuentas

### GitHub

- Crear repositorio remoto.
- Subir ramas `main`, `develop` y `feature/*`.
- Crear pull requests reales desde cada rama feature hacia `develop`.
- Hacer merge final de `develop` hacia `main`.
- Tomar capturas de ramas, commits, PRs, checks y merges.

### Jira

- Crear proyecto Scrum.
- Crear historias del backlog desde `docs/03-scrum.md`.
- Asignar story points Fibonacci.
- Crear 3 sprints.
- Mover tarjetas por To Do, In Progress y Done.
- Capturar backlog, tablero, sprint backlog, burndown si esta disponible, DoD y criterios de aceptacion.

### Supabase

- Crear proyecto Supabase.
- Ejecutar `supabase/schema.sql`.
- Ejecutar `supabase/seed.sql`.
- Copiar `SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`.
- Capturar SQL editor, tablas, relaciones y datos seed.

### Railway

- Crear servicio backend desde GitHub.
- Configurar variables:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_ANON_KEY`
  - `PUBLIC_WEB_URL`
  - `PORT`
- Desplegar API.
- Probar `/health`.
- Capturar URL publica, logs y variables sin mostrar secretos.

### Vercel

- Crear proyecto frontend desde GitHub.
- Configurar variables:
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Desplegar frontend.
- Capturar URL publica, build exitoso y logs.

## Prueba final para la sustentacion

1. Abrir URL de Vercel.
2. Ver dashboard.
3. Registrar trabajador adulto.
4. Registrar menor y demostrar que queda como alerta social.
5. Ver QR de propina simulada.
6. Registrar donacion simulada.
7. Registrar incidente.
8. Confirmar estadisticas actualizadas.
9. Mostrar logs de Railway.
10. Mostrar tablas Supabase.

## Capturas obligatorias sugeridas

- GitHub: ramas, commits, PRs, Actions exitoso.
- Jira: backlog, tablero, sprint, criterios de aceptacion.
- Supabase: tablas, seed, SQL ejecutado.
- Railway: deploy backend, URL, logs.
- Vercel: deploy frontend, URL, logs.
- Aplicacion: dashboard, registro adulto, alerta menor, QR, donacion, incidente.
