import { Router } from "express";
import { feedController } from "@/features/feed/feed.controller";
import { validateFeed } from "@/features/feed/feed.validation";

export const feedRouter = Router();
feedRouter.get("/", validateFeed, feedController);
