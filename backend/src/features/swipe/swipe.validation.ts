import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/apiHandler";

export function validateSwipe(req: Request, _res: Response, next: NextFunction) {
  if (!req.body || !["profileId", "targetId"].some((key) => key in req.body)) {
    return next(new ApiError(400, "A profileId is required"));
  }
  const targetId = req.body.profileId ?? req.body.targetId;
  if (typeof targetId !== "string") {
    return next(new ApiError(400, "A valid profileId is required"));
  }
  if (!["like", "pass", "LIKE", "PASS"].includes(req.body.action)) {
    return next(new ApiError(400, "Action must be like or pass"));
  }
  req.body.profileId = targetId;
  next();
}
