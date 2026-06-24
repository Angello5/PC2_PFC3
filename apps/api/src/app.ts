import cors from "cors";
import express from "express";
import { z } from "zod";
import { validateCitizenReport, validateDonationAmount, validateWorker } from "@manos-en-ruta/shared";
import { createMemoryStore, type Store } from "./store.js";

const workerSchema = z.object({
  fullName: z.string().min(1),
  age: z.coerce.number().int().positive(),
  documentNumber: z.string().optional(),
  nationality: z.string().optional(),
  phone: z.string().optional(),
  intersectionId: z.string().optional(),
  notes: z.string().optional()
});

const donationSchema = z.object({
  workerId: z.string().min(1),
  amount: z.coerce.number().positive(),
  donorName: z.string().optional(),
  message: z.string().optional()
});

const incidentSchema = z.object({
  workerId: z.string().optional(),
  intersectionId: z.string().optional(),
  type: z.enum(["accidente", "rechazo", "salud", "contaminacion", "otro"]),
  description: z.string().min(3)
});

const citizenReportSchema = z.object({
  locationText: z.string().min(1),
  suggestedAmount: z.coerce.number().nonnegative().optional(),
  reporterName: z.string().optional(),
  reporterContact: z.string().optional(),
  description: z.string().min(1)
});

export function createApp(store: Store = createMemoryStore()) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "manos-en-ruta-api" });
  });

  app.get("/intersections", async (_req, res) => {
    res.json(await store.listIntersections());
  });

  app.post("/workers", async (req, res) => {
    const parsed = workerSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    const errors = validateWorker(parsed.data);
    if (errors.length) return res.status(400).json({ errors });

    const publicWebUrl = process.env.PUBLIC_WEB_URL || "http://localhost:3000";
    const worker = await store.createWorker(parsed.data, publicWebUrl);
    return res.status(201).json(worker);
  });

  app.get("/workers/active", async (req, res) => {
    const intersectionId = typeof req.query.intersectionId === "string" ? req.query.intersectionId : undefined;
    res.json(await store.listActiveWorkers(intersectionId));
  });

  app.get("/workers", async (_req, res) => {
    res.json(await store.listWorkers());
  });

  app.get("/workers/:id", async (req, res) => {
    const worker = await store.getWorker(req.params.id);
    if (!worker || worker.status !== "activo") return res.status(404).json({ error: "Trabajador activo no encontrado." });
    res.json(worker);
  });

  app.post("/donations", async (req, res) => {
    const parsed = donationSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    const errors = validateDonationAmount(parsed.data.amount);
    if (errors.length) return res.status(400).json({ errors });
    res.status(201).json(await store.createDonation(parsed.data));
  });

  app.post("/incidents", async (req, res) => {
    const parsed = incidentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    res.status(201).json(await store.createIncident(parsed.data));
  });

  app.post("/citizen-reports", async (req, res) => {
    const parsed = citizenReportSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    const errors = validateCitizenReport(parsed.data);
    if (errors.length) return res.status(400).json({ errors });
    res.status(201).json(await store.createCitizenReport(parsed.data));
  });

  app.get("/citizen-reports", async (_req, res) => {
    res.json(await store.listCitizenReports());
  });

  app.get("/dashboard/stats", async (_req, res) => {
    res.json(await store.getDashboardStats());
  });

  return app;
}
