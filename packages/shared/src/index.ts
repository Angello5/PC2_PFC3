export type Role = "conductor" | "trabajador" | "organizacion";
export type WorkerStatus = "activo" | "inactivo" | "alerta_derivacion";
export type IncidentType = "accidente" | "rechazo" | "salud" | "contaminacion" | "otro";
export type CitizenReportStatus = "pendiente" | "revisado" | "derivado";

export type WorkerInput = {
  fullName: string;
  age: number;
  documentNumber?: string;
  nationality?: string;
  phone?: string;
  intersectionId?: string;
  notes?: string;
};

export type Worker = WorkerInput & {
  id: string;
  status: WorkerStatus;
  qrCodeUrl: string;
  createdAt: string;
};

export type Intersection = {
  id: string;
  name: string;
  district: string;
  riskLevel: "bajo" | "medio" | "alto";
  isSafeZone: boolean;
};

export type Donation = {
  id: string;
  workerId: string;
  amount: number;
  donorName?: string;
  message?: string;
  createdAt: string;
};

export type Incident = {
  id: string;
  workerId?: string;
  intersectionId?: string;
  type: IncidentType;
  description: string;
  createdAt: string;
};

export type CitizenReportInput = {
  locationText: string;
  suggestedAmount?: number;
  reporterName?: string;
  reporterContact?: string;
  description: string;
};

export type CitizenReport = CitizenReportInput & {
  id: string;
  status: CitizenReportStatus;
  createdAt: string;
};

export type DashboardStats = {
  activeWorkers: number;
  socialAlerts: number;
  donationsTotal: number;
  donationsCount: number;
  incidentsCount: number;
  safeZones: number;
  citizenReportsPending: number;
};

export function normalizeWorkerStatus(age: number): WorkerStatus {
  return age >= 18 ? "activo" : "alerta_derivacion";
}

export function validateWorker(input: WorkerInput): string[] {
  const errors: string[] = [];
  if (!input.fullName.trim()) errors.push("El nombre completo es obligatorio.");
  if (!Number.isInteger(input.age) || input.age <= 0) errors.push("La edad debe ser un numero entero positivo.");
  return errors;
}

export function validateDonationAmount(amount: number): string[] {
  return amount > 0 ? [] : ["El monto de la donacion debe ser mayor a cero."];
}

export function validateCitizenReport(input: CitizenReportInput): string[] {
  const errors: string[] = [];
  if (!input.locationText.trim()) errors.push("La ubicacion es obligatoria.");
  if (!input.description.trim()) errors.push("La descripcion es obligatoria.");
  if (input.suggestedAmount !== undefined && input.suggestedAmount < 0) errors.push("El monto sugerido no puede ser negativo.");
  return errors;
}

export function buildDonationUrl(baseUrl: string, workerId: string): string {
  return `${baseUrl.replace(/\/$/, "")}/donations/${workerId}`;
}
