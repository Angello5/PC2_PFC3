# Despliegue en Nube

## Frontend en Vercel

1. Conectar el repositorio GitHub.
2. Configurar proyecto con framework Next.js.
3. Agregar variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Desplegar y capturar URL publica, build exitoso y logs.

## Backend en Railway

1. Crear servicio desde el repositorio GitHub.
2. Configurar root o comando para `apps/api`.
3. Agregar variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_ANON_KEY`
   - `PUBLIC_WEB_URL`
   - `PORT`
4. Desplegar y capturar URL publica, logs y health check.
5. Probar `/health` y luego una creacion de trabajador desde la web.

## Supabase

1. Crear proyecto.
2. Ejecutar `supabase/schema.sql`.
3. Ejecutar `supabase/seed.sql`.
4. Configurar Auth.
5. Capturar tablas, SQL editor y datos seed.

## Prueba final

- Abrir URL de Vercel.
- Registrar trabajador adulto.
- Registrar menor y verificar alerta social.
- Ver QR.
- Registrar donacion simulada.
- Registrar incidente.
- Revisar dashboard.
