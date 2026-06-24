"use client";

import { AlertTriangle, HandCoins, MapPinned, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import type { DashboardStats, IncidentType, Intersection, Worker } from "@manos-en-ruta/shared";
import { normalizeWorkerStatus } from "@manos-en-ruta/shared";
import { client } from "../lib/api";

const emptyStats: DashboardStats = {
  activeWorkers: 0,
  socialAlerts: 0,
  donationsTotal: 0,
  donationsCount: 0,
  incidentsCount: 0,
  safeZones: 0
};

export default function HomePage() {
  const [intersections, setIntersections] = useState<Intersection[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [message, setMessage] = useState("");

  async function refresh() {
    const [zones, activeWorkers, dashboard] = await Promise.all([client.intersections(), client.activeWorkers(), client.stats()]);
    setIntersections(zones);
    setWorkers(activeWorkers);
    setStats(dashboard);
    setSelectedWorker((current) => current ?? activeWorkers[0] ?? null);
  }

  useEffect(() => {
    refresh().catch(() => setMessage("Inicia la API local en el puerto 4000 o configura NEXT_PUBLIC_API_URL."));
  }, []);

  const selectedDonationUrl = useMemo(() => selectedWorker?.qrCodeUrl || "https://manos-en-ruta.example/donations/demo", [selectedWorker]);

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
    setSelectedWorker(worker.status === "activo" ? worker : selectedWorker);
  }

  async function createDonation(formData: FormData) {
    const workerId = String(formData.get("workerId") || selectedWorker?.id || "");
    await client.createDonation({
      workerId,
      amount: Number(formData.get("amount")),
      donorName: String(formData.get("donorName") || ""),
      message: String(formData.get("message") || "")
    });
    setMessage("Donacion simulada registrada.");
    await refresh();
  }

  async function createIncident(formData: FormData) {
    await client.createIncident({
      workerId: String(formData.get("workerId") || ""),
      intersectionId: String(formData.get("intersectionId") || ""),
      type: String(formData.get("type") || "otro") as IncidentType,
      description: String(formData.get("description") || "")
    });
    setMessage("Incidente registrado para seguimiento.");
    await refresh();
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <h1>Manos en Ruta</h1>
          <p>Registro protegido, propinas digitales simuladas y seguimiento basico para trabajadores adultos en cruces de alto trafico.</p>
        </div>
        <span className="pill">MVP etico - no promueve trabajo infantil</span>
      </header>

      {message ? <p className="notice">{message}</p> : null}

      <section className="grid">
        <div className="panel span-12">
          <h2>Panel ONG / Municipalidad</h2>
          <div className="stats">
            <Stat label="Trabajadores activos" value={stats.activeWorkers} icon={<ShieldCheck size={22} />} />
            <Stat label="Alertas sociales" value={stats.socialAlerts} icon={<AlertTriangle size={22} />} />
            <Stat label="Donaciones simuladas" value={`S/ ${stats.donationsTotal}`} icon={<HandCoins size={22} />} />
            <Stat label="Incidentes" value={stats.incidentsCount} icon={<AlertTriangle size={22} />} />
            <Stat label="Zonas seguras" value={stats.safeZones} icon={<MapPinned size={22} />} />
            <Stat label="Operaciones QR" value={stats.donationsCount} icon={<HandCoins size={22} />} />
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
          <h2>Trabajadores activos por zona</h2>
          <div className="list">
            {workers.length === 0 ? <p>No hay trabajadores activos registrados.</p> : null}
            {workers.map((worker) => (
              <button className="item" key={worker.id} type="button" onClick={() => setSelectedWorker(worker)}>
                <strong>{worker.fullName}</strong>
                <small>{worker.nationality || "Nacionalidad no registrada"} - {worker.phone || "sin telefono"}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="panel span-4">
          <h2>QR de propina</h2>
          <div className="qr">
            <QRCodeSVG value={selectedDonationUrl} size={180} />
            <strong>{selectedWorker?.fullName || "Selecciona un trabajador"}</strong>
            <small>{selectedDonationUrl}</small>
          </div>
        </section>

        <section className="panel span-4">
          <h2>Registrar donacion simulada</h2>
          <form className="form" action={createDonation}>
            <input type="hidden" name="workerId" value={selectedWorker?.id || ""} />
            <Field name="donorName" label="Nombre del conductor" />
            <Field name="amount" label="Monto S/" type="number" required />
            <Field name="message" label="Mensaje" />
            <button className="button secondary" type="submit">Registrar donacion</button>
          </form>
        </section>

        <section className="panel span-4">
          <h2>Reportar incidente</h2>
          <form className="form" action={createIncident}>
            <input type="hidden" name="workerId" value={selectedWorker?.id || ""} />
            <label className="field">
              <span>Zona</span>
              <select name="intersectionId">
                {intersections.map((zone) => <option key={zone.id} value={zone.id}>{zone.name}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Tipo</span>
              <select name="type">
                <option value="accidente">Accidente</option>
                <option value="rechazo">Rechazo</option>
                <option value="salud">Salud</option>
                <option value="contaminacion">Contaminacion</option>
                <option value="otro">Otro</option>
              </select>
            </label>
            <label className="field">
              <span>Descripcion</span>
              <textarea name="description" rows={3} required />
            </label>
            <button className="button" type="submit">Registrar incidente</button>
          </form>
        </section>
      </section>
    </main>
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
