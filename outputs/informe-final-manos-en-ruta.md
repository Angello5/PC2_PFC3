# Informe Final - Manos en Ruta

## 1. Portada

Proyecto Final de Carrera III - Practica Calificada 2  
Solucion: Manos en Ruta  
Stack: Next.js, React, TypeScript, Express, Supabase, Vercel, Railway, GitHub Actions, Jira y Draw.io.

## 2. Introduccion del caso

El caso aborda a personas que limpian parabrisas en cruces de alto trafico a cambio de propinas. La situacion implica vulnerabilidad economica, exposicion a accidentes, contaminacion, rechazo de conductores y falta de seguimiento institucional.

## 3. Problema identificado

No existe una herramienta simple que permita registrar a trabajadores adultos, visibilizar zonas de riesgo, facilitar apoyo economico digital simulado y centralizar incidentes para una ONG o municipalidad.

## 4. Solucion propuesta

Manos en Ruta es un MVP web que registra trabajadores adultos, muestra zonas, genera QR para propinas simuladas, registra incidentes y presenta estadisticas basicas. Si se registra un menor, el sistema lo trata como alerta o derivacion social.

## 5. DevOps y stack tecnologico

El proyecto aplica DevOps desde la planificacion Scrum hasta CI/CD y despliegue cloud. El frontend usa Vercel, el backend Railway y la base de datos Supabase PostgreSQL.

## 6. Diagramas

Los archivos editables estan en `diagrams/`:

- `use-cases.drawio`
- `logical-architecture.drawio`
- `cloud-architecture.drawio`

## 7. Scrum

El backlog, sprints, story points, Definition of Done y ceremonias estan documentados en `docs/03-scrum.md`.

## 8. Base de datos

El esquema SQL y seed estan en `supabase/schema.sql` y `supabase/seed.sql`. PostgreSQL fue elegido por relaciones claras e integridad referencial.

## 9. MVP funcional

El sistema incluye registro, regla de proteccion de menores, trabajadores activos, QR, donaciones simuladas, incidentes y dashboard.

## 10. Branching

La estrategia usa `main`, `develop` y ramas `feature/*` con commits en español.

## 11. CI/CD

GitHub Actions ejecuta instalacion, lint, pruebas y build mediante `.github/workflows/ci.yml`.

## 12. Despliegue en nube

Vercel aloja la web, Railway aloja la API y Supabase aloja Auth/PostgreSQL. La API usa Supabase cuando las variables de entorno estan configuradas; en local puede usar memoria para una demostracion rapida.

## 13. Evidencias

Agregar capturas de Jira, GitHub, GitHub Actions, Vercel, Railway, Supabase y pantallas funcionales del MVP.

## 14. Conclusiones

El MVP demuestra una solucion social viable, simple y explicable. Prioriza proteccion, trazabilidad y despliegue real sin incorporar pagos reales ni infraestructura excesiva.
