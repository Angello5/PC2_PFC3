"use client";

import Link from "next/link";
import { MapPinned, QrCode } from "lucide-react";
import { useState } from "react";
import { client } from "../../lib/api";

export default function DriverPage() {
  const [message, setMessage] = useState("");

  async function createReport(formData: FormData) {
    await client.createCitizenReport({
      locationText: String(formData.get("locationText") || ""),
      suggestedAmount: Number(formData.get("suggestedAmount") || 0) || undefined,
      reporterName: String(formData.get("reporterName") || ""),
      reporterContact: String(formData.get("reporterContact") || ""),
      description: String(formData.get("description") || "")
    });
    setMessage("Reporte ciudadano registrado. La ONG lo revisara antes de crear cualquier registro.");
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <h1>Apoyo ciudadano</h1>
          <p>Si hay QR, el apoyo va directo al trabajador validado. Si no hay QR, puedes registrar un caso para revision social.</p>
        </div>
        <span className="pill">Vista publica</span>
      </header>

      {message ? <p className="notice">{message}</p> : null}

      <section className="grid">
        <article className="panel span-6 role-card">
          <QrCode size={36} />
          <h2>Tengo QR</h2>
          <p>Escanea el QR de la persona. El enlace abre su pagina de donacion simulada y no necesitas elegir a nadie manualmente.</p>
        </article>

        <article className="panel span-6">
          <MapPinned size={36} />
          <h2>No tengo QR</h2>
          <p>Registra un reporte ciudadano. Esto no crea un trabajador ni habilita donaciones directas; queda pendiente para la ONG.</p>
          <form className="form" action={createReport}>
            <label className="field">
              <span>Ubicacion aproximada</span>
              <input name="locationText" required placeholder="Ej. Av. Javier Prado con Petit Thouars" />
            </label>
            <label className="field">
              <span>Monto que deseas apoyar S/</span>
              <input name="suggestedAmount" type="number" min="0" />
            </label>
            <label className="field">
              <span>Tu nombre</span>
              <input name="reporterName" />
            </label>
            <label className="field">
              <span>Contacto opcional</span>
              <input name="reporterContact" />
            </label>
            <label className="field">
              <span>Descripcion</span>
              <textarea name="description" rows={3} required placeholder="Describe la situacion sin exponer datos sensibles." />
            </label>
            <button className="button secondary" type="submit">Enviar reporte ciudadano</button>
          </form>
        </article>

        <aside className="panel span-12">
          <h2>Proteccion social</h2>
          <p>La ONG valida cada reporte. Si la persona es adulta, puede registrarse como trabajador activo; si es menor de edad, solo se registra como alerta o derivacion social.</p>
          <Link className="button compact" href="/">Volver al inicio</Link>
        </aside>
      </section>
    </main>
  );
}
