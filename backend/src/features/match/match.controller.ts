import { getMatches } from "@/features/match/match.service";
import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/apiHandler";

export const matchController = asyncHandler(async (_req, res) => {
  const matches = await getMatches();
  return res
    .status(200)
    .json(new ApiResponse(200, "Matches fetched successfully", matches));
});
