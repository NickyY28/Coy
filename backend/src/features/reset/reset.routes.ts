import { Router } from "express";
import { resetController } from "@/features/reset/reset.controller";

export const resetRouter = Router();
resetRouter.post("/", resetController);
