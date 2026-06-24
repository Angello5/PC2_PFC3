# Base de Datos

## Modelo

El modelo usa PostgreSQL normalizado con entidades separadas para organizaciones, perfiles, trabajadores, intersecciones, turnos, donaciones e incidentes.

## Tablas

- `organizations`: ONG o municipalidad responsable.
- `profiles`: usuarios autenticados mediante Supabase Auth.
- `workers`: trabajadores adultos o casos de alerta social.
- `intersections`: cruces y zonas de trabajo.
- `shifts`: turnos por trabajador y cruce.
- `donations`: donaciones simuladas asociadas a trabajador.
- `incidents`: eventos de accidente, rechazo, salud, contaminacion u otro.

## Regla ética

La restriccion `minors_are_social_alerts` impide que un menor de edad quede como trabajador activo. Si `age < 18`, el estado permitido es `alerta_derivacion`.

## Relacional vs NoSQL

Se usa PostgreSQL porque el dominio tiene relaciones claras y necesita integridad referencial: trabajadores con turnos, turnos con intersecciones, donaciones con trabajadores e incidentes con zonas. NoSQL no aporta ventaja para este MVP y debilitaria la consistencia de datos.

## Evidencia

- Ejecutar `supabase/schema.sql`.
- Ejecutar `supabase/seed.sql`.
- Capturar tablas creadas en Supabase.
- Capturar relaciones y datos de prueba.
