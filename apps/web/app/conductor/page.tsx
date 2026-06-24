"use client";

import { useEffect, useState } from "react";
import type { Worker } from "@manos-en-ruta/shared";
import { client } from "../../lib/api";

export default function DriverPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    client.activeWorkers()
      .then(setWorkers)
      .catch(() => setMessage("No se pudo conectar con la API publica. Revisa NEXT_PUBLIC_API_URL."));
  }, []);

  async function donate(formData: FormData) {
    await client.createDonation({
      workerId: String(formData.get("workerId") || ""),
      amount: Number(formData.get("amount")),
      donorName: String(formData.get("donorName") || ""),
      message: String(formData.get("message") || "")
    });
    setMessage("Gracias. La donacion simulada fue registrada para seguimiento.");
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <h1>Apoyo por QR</h1>
          <p>Vista publica para conductores o ciudadanos que desean registrar una propina digital simulada.</p>
        </div>
        <span className="pill">Donacion simulada</span>
      </header>

      {message ? <p className="notice">{message}</p> : null}

      <section className="grid">
        <article className="panel span-6">
          <h2>Realizar apoyo</h2>
          <form className="form" action={donate}>
            <label className="field">
              <span>Trabajador adulto registrado</span>
              <select name="workerId" required>
                <option value="">Selecciona una persona</option>
                {workers.map((worker) => <option key={worker.id} value={worker.id}>{worker.fullName}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Nombre del conductor</span>
              <input name="donorName" />
            </label>
            <label className="field">
              <span>Monto S/</span>
              <input name="amount" type="number" required />
            </label>
            <label className="field">
              <span>Mensaje</span>
              <input name="message" />
            </label>
            <button className="button secondary" type="submit">Registrar apoyo</button>
          </form>
        </article>

        <aside className="panel span-6">
          <h2>Alcance publico</h2>
          <p>Esta vista no permite registrar trabajadores ni ver datos sensibles. Solo registra apoyos simulados vinculados a trabajadores adultos activos.</p>
        </aside>
      </section>
    </main>
  );
}
