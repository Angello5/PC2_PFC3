create extension if not exists pgcrypto;

create type worker_status as enum ('activo', 'inactivo', 'alerta_derivacion');
create type risk_level as enum ('bajo', 'medio', 'alto');
create type incident_type as enum ('accidente', 'rechazo', 'salud', 'contaminacion', 'otro');
create type citizen_report_status as enum ('pendiente', 'revisado', 'derivado');

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('ong', 'municipalidad')),
  contact_email text,
  created_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete set null,
  full_name text not null,
  role text not null check (role in ('conductor', 'trabajador', 'organizacion')),
  created_at timestamptz not null default now()
);

create table intersections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  district text not null,
  risk_level risk_level not null default 'medio',
  is_safe_zone boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table workers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  full_name text not null,
  age integer not null check (age > 0),
  document_number text,
  nationality text,
  phone text,
  status worker_status not null,
  qr_code_url text,
  notes text,
  created_at timestamptz not null default now(),
  constraint minors_are_social_alerts check (age >= 18 or status = 'alerta_derivacion')
);

create table shifts (
  id uuid primary key default gen_random_uuid(),
  worker_id uuid not null references workers(id) on delete cascade,
  intersection_id uuid not null references intersections(id) on delete restrict,
  starts_at timestamptz not null,
  ends_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  constraint shift_end_after_start check (ends_at is null or ends_at > starts_at)
);

create table donations (
  id uuid primary key default gen_random_uuid(),
  worker_id uuid not null references workers(id) on delete cascade,
  amount numeric(10,2) not null check (amount > 0),
  donor_name text,
  message text,
  simulated boolean not null default true,
  created_at timestamptz not null default now()
);

create table incidents (
  id uuid primary key default gen_random_uuid(),
  worker_id uuid references workers(id) on delete set null,
  intersection_id uuid references intersections(id) on delete set null,
  type incident_type not null,
  description text not null,
  created_at timestamptz not null default now()
);

create table citizen_reports (
  id uuid primary key default gen_random_uuid(),
  location_text text not null,
  suggested_amount numeric(10,2) check (suggested_amount is null or suggested_amount >= 0),
  reporter_name text,
  reporter_contact text,
  description text not null,
  status citizen_report_status not null default 'pendiente',
  created_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table profiles enable row level security;
alter table intersections enable row level security;
alter table workers enable row level security;
alter table shifts enable row level security;
alter table donations enable row level security;
alter table incidents enable row level security;
alter table citizen_reports enable row level security;

create policy "lectura autenticada organizations" on organizations for select to authenticated using (true);
create policy "lectura autenticada profiles" on profiles for select to authenticated using ((select auth.uid()) = id);
create policy "lectura autenticada intersections" on intersections for select to authenticated using (true);
create policy "lectura autenticada workers" on workers for select to authenticated using (true);
create policy "lectura autenticada shifts" on shifts for select to authenticated using (true);
create policy "lectura autenticada donations" on donations for select to authenticated using (true);
create policy "lectura autenticada incidents" on incidents for select to authenticated using (true);
create policy "lectura autenticada citizen_reports" on citizen_reports for select to authenticated using (true);

create index workers_status_idx on workers(status);
create index shifts_worker_id_idx on shifts(worker_id);
create index donations_worker_id_idx on donations(worker_id);
create index incidents_worker_id_idx on incidents(worker_id);
create index citizen_reports_status_idx on citizen_reports(status);
