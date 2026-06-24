# DevOps y Stack Tecnológico

## Aplicacion de DevOps

| Fase | Aplicacion en el proyecto | Evidencia |
|---|---|---|
| Planificacion | Backlog Scrum en Jira con historias, story points y sprints. | Capturas de Jira. |
| Desarrollo | Monorepo TypeScript con frontend, backend y tipos compartidos. | Codigo en GitHub. |
| Integracion | Pull requests desde ramas feature hacia develop/main. | PRs y commits. |
| Pruebas | Validaciones unitarias para reglas eticas y endpoints. | `pnpm test`. |
| Despliegue | Vercel para frontend, Railway para API y Supabase para datos/Auth. | URLs publicas y logs. |
| Monitoreo | Logs de Vercel/Railway y dashboard Supabase. | Capturas de logs. |
| Mejora | Retrospectiva Scrum y backlog refinado. | Acta de retrospectiva. |

## Justificacion del stack

- Next.js + React + TypeScript: permite crear una web demostrable, desplegar rapido en Vercel y reutilizar tipos/logica para React Native.
- Express + TypeScript: backend pequeno, entendible y reutilizable por una futura app movil.
- Supabase PostgreSQL: base relacional gestionada, ideal para relaciones entre trabajadores, zonas, turnos, donaciones e incidentes.
- Supabase Auth: autenticacion administrada sin construir seguridad desde cero.
- Vercel: hosting frontend con CDN real y despliegue desde GitHub.
- Railway: backend cloud simple con URL publica, logs y variables de entorno.
- GitHub Actions: automatiza lint, pruebas y build.
- Jira: evidencia Scrum formal.
- Draw.io: diagramas editables para la entrega.

## Vinculo con el problema social

El stack prioriza rapidez, trazabilidad y bajo costo. Esto permite demostrar una solucion social sin consumir el tiempo del curso en infraestructura pesada. El backend centraliza reglas de proteccion, especialmente la regla de menores de edad.
