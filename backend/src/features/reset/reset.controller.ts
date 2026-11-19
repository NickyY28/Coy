import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/apiHandler";
import { resetApplication } from "@/features/reset/reset.service";

export const resetController = asyncHandler(async (_req, res) => {
  const result = await resetApplication();
  const response = new ApiResponse(200, "Application reset successfully", result);
  return res.status(response.statusCode).json(response);
});
