import express from "express";
import cors from "cors";

import { env } from "@/config/env";

export const app = express();

app.use(cors({ origin: env.clientUrls }));
app.use(express.json());

app.get("/", (_req, res) => res.send("Welcome to the Coy backend API!"));
app.get("/health", (_req, res) => res.json({ status: "ok" }));
