import type { CitizenReport, CitizenReportInput, DashboardStats, Donation, Incident, Intersection, Worker, WorkerInput } from "@manos-en-ruta/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "content-type": "application/json" },
    ...init
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(JSON.stringify(body));
  }
  return response.json() as Promise<T>;
}

export const client = {
  intersections: () => api<Intersection[]>("/intersections"),
  workers: () => api<Worker[]>("/workers"),
  activeWorkers: () => api<Worker[]>("/workers/active"),
  worker: (id: string) => api<Worker>(`/workers/${id}`),
  stats: () => api<DashboardStats>("/dashboard/stats"),
  createWorker: (payload: WorkerInput) => api<Worker>("/workers", { method: "POST", body: JSON.stringify(payload) }),
  createDonation: (payload: Omit<Donation, "id" | "createdAt">) => api<Donation>("/donations", { method: "POST", body: JSON.stringify(payload) }),
  createIncident: (payload: Omit<Incident, "id" | "createdAt">) => api<Incident>("/incidents", { method: "POST", body: JSON.stringify(payload) }),
  createCitizenReport: (payload: CitizenReportInput) => api<CitizenReport>("/citizen-reports", { method: "POST", body: JSON.stringify(payload) }),
  citizenReports: () => api<CitizenReport[]>("/citizen-reports")
};
