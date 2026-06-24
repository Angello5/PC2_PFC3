insert into organizations (id, name, type, contact_email) values
  ('10000000-0000-0000-0000-000000000001', 'ONG Puente Seguro', 'ong', 'contacto@puenteseguro.org'),
  ('10000000-0000-0000-0000-000000000002', 'Municipalidad Piloto', 'municipalidad', 'social@municipalidad.gob.pe');

insert into intersections (id, name, district, risk_level, is_safe_zone, notes) values
  ('20000000-0000-0000-0000-000000000001', 'Av. Arequipa con Angamos', 'Miraflores', 'medio', true, 'Cruce con berma amplia y visibilidad aceptable.'),
  ('20000000-0000-0000-0000-000000000002', 'Av. Javier Prado con Petit Thouars', 'Lince', 'alto', false, 'Alto flujo vehicular; requiere seguimiento.'),
  ('20000000-0000-0000-0000-000000000003', 'Av. Primavera con Caminos del Inca', 'Santiago de Surco', 'bajo', true, 'Zona priorizada para piloto.');

insert into workers (id, organization_id, full_name, age, document_number, nationality, phone, status, qr_code_url, notes) values
  ('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Carlos Medina', 32, 'DNI-12345678', 'Peruana', '999111222', 'activo', 'https://manos-en-ruta.vercel.app/donations/30000000-0000-0000-0000-000000000001', 'Participante adulto del piloto.'),
  ('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Caso Social Protegido', 16, null, 'Venezolana', null, 'alerta_derivacion', null, 'Menor registrado solo para derivacion social.');

insert into shifts (worker_id, intersection_id, starts_at, ends_at, notes) values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', now() - interval '2 hours', now() - interval '1 hour', 'Turno de prueba.');

insert into donations (worker_id, amount, donor_name, message) values
  ('30000000-0000-0000-0000-000000000001', 5.00, 'Conductor solidario', 'Apoyo registrado como donacion simulada.');

insert into incidents (worker_id, intersection_id, type, description) values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'contaminacion', 'Se reporta exposicion alta a humo vehicular durante hora punta.');

insert into citizen_reports (location_text, suggested_amount, reporter_name, reporter_contact, description, status) values
  ('Av. Canada con Aviacion', 3.00, 'Conductor anonimo', null, 'Persona sin QR solicita orientacion y apoyo; requiere validacion de la ONG.', 'pendiente');
