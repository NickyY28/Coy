import { Router } from "express";
import { matchController } from "@/features/match/match.controller";

export const matchRouter = Router();
matchRouter.get("/", matchController);
