import { describe, expect, it } from "vitest";
import { validateDonationAmount } from "@manos-en-ruta/shared";
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

  it("rechaza donacion con monto invalido", async () => {
    expect(validateDonationAmount(0)).toHaveLength(1);
  });
});
