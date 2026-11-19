import { ErrorRequestHandler } from "express";
import { ApiError } from "@/utils/apiHandler";

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  res.status(statusCode).json({
    status: "error",
    message: error instanceof Error ? error.message : "Internal server error",
    data: null,
    success: false,
    errors: error instanceof ApiError ? error.errors : []
  });
};
