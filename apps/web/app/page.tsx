import Link from "next/link";
import { HandCoins, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <h1>Manos en Ruta</h1>
          <p>Plataforma social para registrar trabajadores adultos, canalizar propinas digitales simuladas y dar seguimiento a incidentes.</p>
        </div>
        <span className="pill">MVP etico - no promueve trabajo infantil</span>
      </header>

      <section className="grid">
        <article className="panel span-6 role-card">
          <ShieldCheck size={34} />
          <h2>Panel ONG / Municipalidad</h2>
          <p>Registro protegido, alertas sociales, zonas, incidentes, QR y estadisticas de seguimiento.</p>
          <Link className="button" href="/ong">Ingresar al panel</Link>
        </article>

        <article className="panel span-6 role-card">
          <HandCoins size={34} />
          <h2>Vista Conductor</h2>
          <p>Para cualquier persona que escanea un QR y registra una propina digital simulada de apoyo.</p>
          <Link className="button secondary" href="/conductor">Realizar apoyo</Link>
        </article>
      </section>
    </main>
  );
}
