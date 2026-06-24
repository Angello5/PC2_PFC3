import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manos en Ruta",
  description: "MVP social para propinas digitales, zonas seguras e incidentes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
