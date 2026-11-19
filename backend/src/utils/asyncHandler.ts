import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError } from "zod";
import { env } from "@/config/env";

type HandledError = Error & {
  statusCode?: number;
  status?: string;
  errors?: unknown[];
};

const asyncHandler =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<unknown> | unknown
  ): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(fn(req, res, next));
    } catch (error) {
      const handledError = error as HandledError;

      if (env.isDev) {
        console.log("Error caught in asyncHandler:", handledError.message);
      }

      if (error instanceof ZodError) {
        const first = error.issues[0];
        return res.status(400).json({
          status: "fail",
          message: first?.message ?? "Validation failed",
          errors: first?.path ?? []
        });
      }

      return res.status(handledError.statusCode ?? 500).json({
        status: "error",
        message: handledError.message ?? "Something went wrong"
      });
    }
  };

export { asyncHandler };
