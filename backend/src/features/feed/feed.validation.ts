import { Request, Response, NextFunction } from "express";

export function validateFeed(_req: Request, _res: Response, next: NextFunction) {
  next();
}
