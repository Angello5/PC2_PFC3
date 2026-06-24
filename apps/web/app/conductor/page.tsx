import Link from "next/link";
import { QrCode } from "lucide-react";

export default function DriverPage() {
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <h1>Apoyo por QR</h1>
          <p>Vista publica para conductores o ciudadanos. El trabajador se identifica automaticamente desde el QR.</p>
        </div>
        <span className="pill">Donacion simulada</span>
      </header>

      <section className="grid">
        <article className="panel span-6 role-card">
          <QrCode size={36} />
          <h2>Escanea el QR del trabajador</h2>
          <p>El enlace del QR abre una pagina unica como /donations/id-del-trabajador. El conductor no necesita buscar ni seleccionar a nadie.</p>
        </article>

        <aside className="panel span-6">
          <h2>Flujo publico</h2>
          <p>Esta vista no registra trabajadores ni muestra datos sensibles. Solo explica el acceso publico; la donacion se realiza desde el QR individual generado por la ONG.</p>
          <Link className="button secondary" href="/">Volver al inicio</Link>
        </aside>
      </section>
    </main>
  );
}
