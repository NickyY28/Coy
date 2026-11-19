import express from "express";
import cors from "cors";
import { feedRouter } from "@/features/feed/feed.routes";
import { swipeRouter } from "@/features/swipe/swipe.routes";
import { matchRouter } from "@/features/match/match.routes";
import { resetRouter } from "@/features/reset/reset.routes";
import { errorMiddleware } from "@/middlewares/error.middleware";
import { env } from "@/config/env";

export const app = express();

app.use(cors({ origin: env.clientUrls }));
app.use(express.json());

app.get("/", (_req, res) => res.send("Welcome to the Coy backend API!"));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Routers
app.use("/feed", feedRouter);
app.use("/swipe", swipeRouter);
app.use("/matches", matchRouter);
app.use("/reset", resetRouter);

// Error handling middleware
app.use(errorMiddleware);
