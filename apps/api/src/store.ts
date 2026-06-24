import {
  buildDonationUrl,
  type CitizenReport,
  type CitizenReportInput,
  type DashboardStats,
  type Donation,
  type Incident,
  type Intersection,
  type Worker,
  type WorkerInput,
  normalizeWorkerStatus
} from "@manos-en-ruta/shared";

export type CreateDonationInput = Omit<Donation, "id" | "createdAt">;
export type CreateIncidentInput = Omit<Incident, "id" | "createdAt">;
export type CreateCitizenReportInput = CitizenReportInput;

export type Store = {
  listIntersections(): Promise<Intersection[]>;
  createWorker(input: WorkerInput, publicWebUrl: string): Promise<Worker>;
  getWorker(id: string): Promise<Worker | null>;
  listActiveWorkers(intersectionId?: string): Promise<Worker[]>;
  createDonation(input: CreateDonationInput): Promise<Donation>;
  createIncident(input: CreateIncidentInput): Promise<Incident>;
  createCitizenReport(input: CreateCitizenReportInput): Promise<CitizenReport>;
  listCitizenReports(): Promise<CitizenReport[]>;
  getDashboardStats(): Promise<DashboardStats>;
};

const now = () => new Date().toISOString();
const id = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

export function createMemoryStore(): Store {
  const intersections: Intersection[] = [
    { id: "int_miraflores_1", name: "Av. Arequipa con Angamos", district: "Miraflores", riskLevel: "medio", isSafeZone: true },
    { id: "int_lince_1", name: "Av. Javier Prado con Petit Thouars", district: "Lince", riskLevel: "alto", isSafeZone: false },
    { id: "int_surco_1", name: "Av. Primavera con Caminos del Inca", district: "Santiago de Surco", riskLevel: "bajo", isSafeZone: true }
  ];
  const workers: Worker[] = [];
  const donations: Donation[] = [];
  const incidents: Incident[] = [];
  const citizenReports: CitizenReport[] = [];

  return {
    async listIntersections() {
      return intersections;
    },
    async createWorker(input, publicWebUrl) {
      const workerId = id("wrk");
      const worker: Worker = {
        ...input,
        id: workerId,
        status: normalizeWorkerStatus(input.age),
        qrCodeUrl: buildDonationUrl(publicWebUrl, workerId),
        createdAt: now()
      };
      workers.push(worker);
      return worker;
    },
    async getWorker(workerId) {
      return workers.find((worker) => worker.id === workerId) || null;
    },
    async listActiveWorkers(intersectionId) {
      return workers.filter((worker) => worker.status === "activo" && (!intersectionId || worker.intersectionId === intersectionId));
    },
    async createDonation(input) {
      const donation: Donation = { ...input, id: id("don"), createdAt: now() };
      donations.push(donation);
      return donation;
    },
    async createIncident(input) {
      const incident: Incident = { ...input, id: id("inc"), createdAt: now() };
      incidents.push(incident);
      return incident;
    },
    async createCitizenReport(input) {
      const report: CitizenReport = { ...input, id: id("rep"), status: "pendiente", createdAt: now() };
      citizenReports.push(report);
      return report;
    },
    async listCitizenReports() {
      return citizenReports;
    },
    async getDashboardStats() {
      return {
        activeWorkers: workers.filter((worker) => worker.status === "activo").length,
        socialAlerts: workers.filter((worker) => worker.status === "alerta_derivacion").length,
        donationsTotal: donations.reduce((sum, donation) => sum + donation.amount, 0),
        donationsCount: donations.length,
        incidentsCount: incidents.length,
        safeZones: intersections.filter((intersection) => intersection.isSafeZone).length,
        citizenReportsPending: citizenReports.filter((report) => report.status === "pendiente").length
      };
    }
  };
}
