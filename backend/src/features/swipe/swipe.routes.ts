import { Router } from "express";
import { swipeController } from "@/features/swipe/swipe.controller";
import { validateSwipe } from "@/features/swipe/swipe.validation";

export const swipeRouter = Router();
swipeRouter.post("/", validateSwipe, swipeController);
