import { describe, expect, it } from "vitest";
import { validateCitizenReport, validateDonationAmount } from "@manos-en-ruta/shared";
import { createMemoryStore } from "../src/store";

describe("API Manos en Ruta", () => {
  it("lista zonas iniciales para el MVP", async () => {
    const store = createMemoryStore();
    await expect(store.listIntersections()).resolves.toHaveLength(3);
  });

  it("crea menor como alerta y no como trabajador activo", async () => {
    const store = createMemoryStore();
    const worker = await store.createWorker({ fullName: "Caso Proteccion", age: 16 }, "https://app.test");
    expect(worker.status).toBe("alerta_derivacion");
    await expect(store.listActiveWorkers()).resolves.toHaveLength(0);
  });

  it("obtiene trabajador adulto por id para QR", async () => {
    const store = createMemoryStore();
    const worker = await store.createWorker({ fullName: "Adulto Activo", age: 30 }, "https://app.test");
    await expect(store.getWorker(worker.id)).resolves.toMatchObject({ id: worker.id, status: "activo" });
  });

  it("rechaza donacion con monto invalido", async () => {
    expect(validateDonationAmount(0)).toHaveLength(1);
  });

  it("registra reporte ciudadano sin crear trabajador", async () => {
    const store = createMemoryStore();
    await store.createCitizenReport({ locationText: "Av. Arequipa", description: "Persona sin QR solicita orientacion." });
    await expect(store.listCitizenReports()).resolves.toHaveLength(1);
    await expect(store.listActiveWorkers()).resolves.toHaveLength(0);
  });

  it("valida reporte ciudadano minimo", async () => {
    expect(validateCitizenReport({ locationText: "", description: "" })).toHaveLength(2);
  });
});
