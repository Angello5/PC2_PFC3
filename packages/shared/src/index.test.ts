import { describe, expect, it } from "vitest";
import { buildDonationUrl, normalizeWorkerStatus, validateDonationAmount, validateWorker } from "./index";

describe("reglas eticas y validaciones", () => {
  it("registra adultos como trabajadores activos", () => {
    expect(normalizeWorkerStatus(18)).toBe("activo");
  });

  it("registra menores solo como alerta o derivacion social", () => {
    expect(normalizeWorkerStatus(17)).toBe("alerta_derivacion");
  });

  it("rechaza donaciones no positivas", () => {
    expect(validateDonationAmount(0)).toContain("El monto de la donacion debe ser mayor a cero.");
  });

  it("valida datos minimos del trabajador", () => {
    expect(validateWorker({ fullName: "", age: -1 })).toHaveLength(2);
  });

  it("genera url de donacion sin doble slash", () => {
    expect(buildDonationUrl("https://app.test/", "w1")).toBe("https://app.test/donations/w1");
  });
});
