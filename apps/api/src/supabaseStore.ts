import { createClient } from "@supabase/supabase-js";
import {
  buildDonationUrl,
  type CitizenReport,
  type DashboardStats,
  type Donation,
  type Incident,
  type Intersection,
  type Worker,
  type WorkerInput,
  normalizeWorkerStatus
} from "@manos-en-ruta/shared";
import type { CreateCitizenReportInput, CreateDonationInput, CreateIncidentInput, Store } from "./store.js";

type Row = Record<string, unknown>;

function workerFromRow(row: Row): Worker {
  return {
    id: String(row.id),
    fullName: String(row.full_name),
    age: Number(row.age),
    documentNumber: row.document_number ? String(row.document_number) : undefined,
    nationality: row.nationality ? String(row.nationality) : undefined,
    phone: row.phone ? String(row.phone) : undefined,
    status: row.status as Worker["status"],
    qrCodeUrl: String(row.qr_code_url || ""),
    notes: row.notes ? String(row.notes) : undefined,
    createdAt: String(row.created_at)
  };
}

function intersectionFromRow(row: Row): Intersection {
  return {
    id: String(row.id),
    name: String(row.name),
    district: String(row.district),
    riskLevel: row.risk_level as Intersection["riskLevel"],
    isSafeZone: Boolean(row.is_safe_zone)
  };
}

function citizenReportFromRow(row: Row): CitizenReport {
  return {
    id: String(row.id),
    locationText: String(row.location_text),
    suggestedAmount: row.suggested_amount === null || row.suggested_amount === undefined ? undefined : Number(row.suggested_amount),
    reporterName: row.reporter_name ? String(row.reporter_name) : undefined,
    reporterContact: row.reporter_contact ? String(row.reporter_contact) : undefined,
    description: String(row.description),
    status: row.status as CitizenReport["status"],
    createdAt: String(row.created_at)
  };
}

export function createSupabaseStore(): Store | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  return {
    async listIntersections() {
      const { data, error } = await supabase.from("intersections").select("*").order("name");
      if (error) throw error;
      return (data || []).map(intersectionFromRow);
    },
    async createWorker(input: WorkerInput, publicWebUrl: string) {
      const status = normalizeWorkerStatus(input.age);
      const { data, error } = await supabase
        .from("workers")
        .insert({
          full_name: input.fullName,
          age: input.age,
          document_number: input.documentNumber || null,
          nationality: input.nationality || null,
          phone: input.phone || null,
          status,
          notes: input.notes || null
        })
        .select("*")
        .single();
      if (error) throw error;

      const worker = workerFromRow(data);
      const qrCodeUrl = status === "activo" ? buildDonationUrl(publicWebUrl, worker.id) : "";
      if (qrCodeUrl) {
        await supabase.from("workers").update({ qr_code_url: qrCodeUrl }).eq("id", worker.id);
      }
      return { ...worker, qrCodeUrl };
    },
    async getWorker(id: string) {
      const { data, error } = await supabase.from("workers").select("*").eq("id", id).single();
      if (error) return null;
      return workerFromRow(data);
    },
    async listWorkers() {
      const { data, error } = await supabase.from("workers").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(workerFromRow);
    },
    async listActiveWorkers(intersectionId?: string) {
      let query = supabase.from("workers").select("*").eq("status", "activo").order("created_at", { ascending: false });
      if (intersectionId) {
        query = query.in("id", await workerIdsForIntersection(intersectionId));
      }
      const { data, error } = await query;
      if (error) throw error;
      return (data || []).map(workerFromRow);
    },
    async createDonation(input: CreateDonationInput) {
      const { data, error } = await supabase.from("donations").insert({
        worker_id: input.workerId,
        amount: input.amount,
        donor_name: input.donorName || null,
        message: input.message || null
      }).select("*").single();
      if (error) throw error;
      return {
        id: String(data.id),
        workerId: String(data.worker_id),
        amount: Number(data.amount),
        donorName: data.donor_name || undefined,
        message: data.message || undefined,
        createdAt: String(data.created_at)
      };
    },
    async createIncident(input: CreateIncidentInput) {
      const { data, error } = await supabase.from("incidents").insert({
        worker_id: input.workerId || null,
        intersection_id: input.intersectionId || null,
        type: input.type,
        description: input.description
      }).select("*").single();
      if (error) throw error;
      return {
        id: String(data.id),
        workerId: data.worker_id || undefined,
        intersectionId: data.intersection_id || undefined,
        type: data.type as Incident["type"],
        description: String(data.description),
        createdAt: String(data.created_at)
      };
    },
    async createCitizenReport(input: CreateCitizenReportInput) {
      const { data, error } = await supabase.from("citizen_reports").insert({
        location_text: input.locationText,
        suggested_amount: input.suggestedAmount ?? null,
        reporter_name: input.reporterName || null,
        reporter_contact: input.reporterContact || null,
        description: input.description
      }).select("*").single();
      if (error) throw error;
      return citizenReportFromRow(data);
    },
    async listCitizenReports() {
      const { data, error } = await supabase.from("citizen_reports").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(citizenReportFromRow);
    },
    async getDashboardStats(): Promise<DashboardStats> {
      const [workers, donations, incidents, intersections, citizenReports] = await Promise.all([
        supabase.from("workers").select("status"),
        supabase.from("donations").select("amount"),
        supabase.from("incidents").select("id"),
        supabase.from("intersections").select("is_safe_zone"),
        supabase.from("citizen_reports").select("status")
      ]);
      for (const result of [workers, donations, incidents, intersections, citizenReports]) {
        if (result.error) throw result.error;
      }
      const workerRows = workers.data || [];
      const donationRows = donations.data || [];
      return {
        activeWorkers: workerRows.filter((worker) => worker.status === "activo").length,
        socialAlerts: workerRows.filter((worker) => worker.status === "alerta_derivacion").length,
        donationsTotal: donationRows.reduce((sum, donation) => sum + Number(donation.amount), 0),
        donationsCount: donationRows.length,
        incidentsCount: incidents.data?.length || 0,
        safeZones: (intersections.data || []).filter((intersection) => intersection.is_safe_zone).length,
        citizenReportsPending: (citizenReports.data || []).filter((report) => report.status === "pendiente").length
      };
    }
  };

  async function workerIdsForIntersection(intersectionId: string) {
    const { data, error } = await supabase.from("shifts").select("worker_id").eq("intersection_id", intersectionId);
    if (error) throw error;
    return (data || []).map((row) => row.worker_id);
  }
}
