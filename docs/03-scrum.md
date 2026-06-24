# Plan Scrum

## Product Backlog

| ID | Historia | Prioridad | Puntos | Criterios de aceptacion |
|---|---|---:|---:|---|
| HU-01 | Como ONG quiero registrar trabajadores adultos para tener trazabilidad basica. | Alta | 5 | Guarda datos minimos y estado activo. |
| HU-02 | Como ONG quiero registrar menores como alerta para activar derivacion social. | Alta | 5 | Edad menor a 18 nunca queda activa. |
| HU-03 | Como conductor quiero escanear un QR para apoyar con una propina simulada. | Alta | 3 | El QR abre una ruta de donacion. |
| HU-04 | Como ONG quiero ver trabajadores activos por zona para monitorear cruces. | Alta | 3 | Lista trabajadores filtrables por zona. |
| HU-05 | Como ONG quiero registrar incidentes para dar seguimiento. | Media | 3 | Guarda tipo, descripcion y zona. |
| HU-06 | Como municipalidad quiero ver estadisticas para tomar decisiones. | Media | 5 | Dashboard muestra totales principales. |
| HU-07 | Como equipo quiero CI/CD para evidenciar calidad y despliegue. | Media | 3 | GitHub Actions ejecuta lint, test y build. |

## Sprints

Velocidad esperada: 12 a 16 puntos por sprint.

| Sprint | Objetivo | Historias |
|---|---|---|
| Sprint 1 | Construir base tecnica y registro protegido. | HU-01, HU-02 |
| Sprint 2 | Habilitar apoyo por QR, zonas e incidentes. | HU-03, HU-04, HU-05 |
| Sprint 3 | Cerrar dashboard, CI/CD, despliegue e informe. | HU-06, HU-07 |

## Ceremonias

- Planning: seleccionar historias segun prioridad y capacidad.
- Daily: revisar avance, bloqueos y siguiente accion.
- Review: demostrar flujo funcional al final de cada sprint.
- Retrospective: registrar mejoras para el siguiente sprint.

## Definition of Done

- Codigo en rama feature.
- Validaciones basicas implementadas.
- Pruebas minimas pasando.
- Pull request revisado.
- Evidencia capturada para el informe.
- Funcionalidad demostrable localmente o en nube.

## Evidencia en Jira

Tomar capturas de backlog, tablero To Do/In Progress/Done, sprint activo, burndown si esta disponible, historia con criterios de aceptacion y pantalla de cierre de sprint.
