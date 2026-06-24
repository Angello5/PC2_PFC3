"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Worker } from "@manos-en-ruta/shared";
import { client } from "../../../lib/api";

export default function DonationPage() {
  const params = useParams<{ workerId: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [message, setMessage] = useState("");
  const workerId = params.workerId;

  useEffect(() => {
    client.worker(workerId)
      .then(setWorker)
      .catch(() => setMessage("QR no valido o trabajador no activo."));
  }, [workerId]);

  async function donate(formData: FormData) {
    await client.createDonation({
      workerId,
      amount: Number(formData.get("amount")),
      donorName: String(formData.get("donorName") || ""),
      message: String(formData.get("message") || "")
    });
    setMessage("Gracias. La donacion simulada fue registrada para seguimiento.");
  }

  return (
    <main className="shell auth-shell">
      <header className="topbar">
        <div className="brand">
          <h1>Apoyo por QR</h1>
          <p>Propina digital simulada vinculada al trabajador adulto registrado.</p>
        </div>
        <span className="pill">Vista conductor</span>
      </header>

      {message ? <p className="notice">{message}</p> : null}

      <section className="panel auth-card">
        <h2>{worker ? `Apoyar a ${worker.fullName}` : "Validando QR"}</h2>
        <p>El QR identifica a la persona registrada. No necesitas seleccionar trabajadores manualmente.</p>
        <form className="form" action={donate}>
          <label className="field">
            <span>Nombre del conductor</span>
            <input name="donorName" />
          </label>
          <label className="field">
            <span>Monto S/</span>
            <input name="amount" type="number" required disabled={!worker} />
          </label>
          <label className="field">
            <span>Mensaje</span>
            <input name="message" disabled={!worker} />
          </label>
          <button className="button secondary" type="submit" disabled={!worker}>Registrar apoyo</button>
        </form>
      </section>
    </main>
  );
}
