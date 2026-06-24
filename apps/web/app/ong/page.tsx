"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { OngPanel } from "../../components/OngPanel";
import { supabaseAuth } from "../../lib/supabaseAuth";

export default function OngPage() {
  const [user, setUser] = useState<User | null>(null);
  const [demo, setDemo] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabaseAuth?.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function login(formData: FormData) {
    if (!supabaseAuth) {
      setMessage("Supabase Auth no esta configurado. Usa el modo demo para la exposicion.");
      return;
    }
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage("Credenciales no validas o usuario no creado en Supabase Auth.");
      return;
    }
    setUser(data.user);
  }

  async function logout() {
    await supabaseAuth?.auth.signOut();
    setUser(null);
    setDemo(false);
  }

  if (!user && !demo) {
    return (
      <main className="shell auth-shell">
        <header className="topbar">
          <div className="brand">
            <h1>Panel ONG</h1>
            <p>Acceso operativo para registrar adultos, alertas sociales, incidentes y estadisticas.</p>
          </div>
          <span className="pill">Acceso protegido</span>
        </header>

        {message ? <p className="notice">{message}</p> : null}

        <section className="panel auth-card">
          <h2>Iniciar sesion</h2>
          <form className="form" action={login}>
            <label className="field">
              <span>Correo institucional</span>
              <input name="email" type="email" required />
            </label>
            <label className="field">
              <span>Contrasena</span>
              <input name="password" type="password" required />
            </label>
            <button className="button" type="submit">Ingresar con Supabase Auth</button>
          </form>
          <button className="button secondary" type="button" onClick={() => setDemo(true)}>Entrar en modo demo ONG</button>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <h1>Manos en Ruta</h1>
          <p>Panel ONG / Municipalidad para gestion social y seguimiento operativo.</p>
        </div>
        <button className="button compact" type="button" onClick={logout}>Cerrar sesion</button>
      </header>
      <OngPanel />
    </main>
  );
}
