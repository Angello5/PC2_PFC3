import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";

async function request(path: string, init?: RequestInit) {
  const app = createApp();
  const server = app.listen(0);
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("No se pudo iniciar servidor de prueba");
  try {
    return await fetch(`http://127.0.0.1:${address.port}${path}`, {
      headers: { "content-type": "application/json" },
      ...init
    });
  } finally {
    server.close();
  }
}

describe("API Manos en Ruta", () => {
  it("responde health check", async () => {
    const res = await request("/health");
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ status: "ok" });
  });

  it("crea menor como alerta y no como trabajador activo", async () => {
    const res = await request("/workers", {
      method: "POST",
      body: JSON.stringify({ fullName: "Caso Proteccion", age: 16 })
    });
    expect(res.status).toBe(201);
    await expect(res.json()).resolves.toMatchObject({ status: "alerta_derivacion" });
  });

  it("rechaza donacion con monto invalido", async () => {
    const res = await request("/donations", {
      method: "POST",
      body: JSON.stringify({ workerId: "wrk_demo", amount: 0 })
    });
    expect(res.status).toBe(400);
  });
});
