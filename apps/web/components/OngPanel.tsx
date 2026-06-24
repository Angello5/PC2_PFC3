"use client";

import { AlertTriangle, HandCoins, MapPinned, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import type { CitizenReport, DashboardStats, Intersection, Worker } from "@manos-en-ruta/shared";
import { normalizeWorkerStatus } from "@manos-en-ruta/shared";
import { client } from "../lib/api";

const emptyStats: DashboardStats = {
  activeWorkers: 0,
  socialAlerts: 0,
  donationsTotal: 0,
  donationsCount: 0,
  incidentsCount: 0,
  safeZones: 0,
  citizenReportsPending: 0
};

export function OngPanel() {
  const [intersections, setIntersections] = useState<Intersection[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>([]);
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [message, setMessage] = useState("");

  async function refresh() {
    const [zones, registeredWorkers, dashboard, reports] = await Promise.all([client.intersections(), client.workers(), client.stats(), client.citizenReports()]);
    setIntersections(zones);
    setWorkers(registeredWorkers);
    setStats(dashboard);
    setCitizenReports(reports);
  }

  useEffect(() => {
    refresh().catch(() => setMessage("Configura NEXT_PUBLIC_API_URL con la URL publica de Railway."));
  }, []);

  async function createWorker(formData: FormData) {
    const age = Number(formData.get("age"));
    const status = normalizeWorkerStatus(age);
    const worker = await client.createWorker({
      fullName: String(formData.get("fullName") || ""),
      age,
      documentNumber: String(formData.get("documentNumber") || ""),
      nationality: String(formData.get("nationality") || ""),
      phone: String(formData.get("phone") || ""),
      intersectionId: String(formData.get("intersectionId") || ""),
      notes: String(formData.get("notes") || "")
    });
    setMessage(status === "alerta_derivacion" ? "Caso registrado como alerta social. No se activo como trabajador." : "Trabajador adulto registrado.");
    await refresh();
  }

  return (
    <>
      {message ? <p className="notice">{message}</p> : null}

      <section className="grid">
        <div className="panel span-12">
          <h2>Panel ONG / Municipalidad</h2>
          <div className="stats">
            <Stat label="Trabajadores activos" value={stats.activeWorkers} icon={<ShieldCheck size={22} />} />
            <Stat label="Alertas sociales" value={stats.socialAlerts} icon={<AlertTriangle size={22} />} />
            <Stat label="Registros totales" value={workers.length} icon={<ShieldCheck size={22} />} />
            <Stat label="Donaciones simuladas" value={`S/ ${stats.donationsTotal}`} icon={<HandCoins size={22} />} />
            <Stat label="Incidentes" value={stats.incidentsCount} icon={<AlertTriangle size={22} />} />
            <Stat label="Zonas seguras" value={stats.safeZones} icon={<MapPinned size={22} />} />
            <Stat label="Reportes en revision" value={stats.citizenReportsPending} icon={<MapPinned size={22} />} />
          </div>
        </div>

        <section className="panel span-6">
          <h2>Registrar trabajador o alerta</h2>
          <form className="form" action={createWorker}>
            <Field name="fullName" label="Nombre completo" required />
            <Field name="age" label="Edad" type="number" required />
            <Field name="documentNumber" label="Documento" />
            <Field name="nationality" label="Nacionalidad" />
            <Field name="phone" label="Telefono" />
            <label className="field">
              <span>Zona de trabajo</span>
              <select name="intersectionId">
                {intersections.map((zone) => <option key={zone.id} value={zone.id}>{zone.name}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Notas sociales</span>
              <textarea name="notes" rows={3} />
            </label>
            <button className="button" type="submit">Guardar registro</button>
          </form>
        </section>

        <section className="panel span-6">
          <h2>Trabajadores registrados</h2>
          <div className="list">
            {workers.length === 0 ? <p>No hay trabajadores ni alertas registradas.</p> : null}
            {workers.map((worker) => (
              <div className="item" key={worker.id}>
                <strong>{worker.fullName}</strong>
                <small>Estado: {worker.status}</small>
                <small>{worker.nationality || "Nacionalidad no registrada"} - {worker.phone || "sin telefono"}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel span-12">
          <h2>En revision: reportes ciudadanos sin QR</h2>
          <div className="list">
            {citizenReports.length === 0 ? <p>No hay reportes ciudadanos pendientes.</p> : null}
            {citizenReports.slice(0, 5).map((report) => (
              <div className="item" key={report.id}>
                <strong>{report.locationText}</strong>
                <small>{report.description}</small>
                <small>Estado: {report.status}</small>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

function Stat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="stat">
      {icon}
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} required={required} />
    </label>
  );
}
