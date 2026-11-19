import { getFeed } from "@/features/feed/feed.service";
import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/apiHandler";

export const feedController = asyncHandler(async (_req, res) => {
  const feed = await getFeed();
  const response = new ApiResponse(200, "Feed fetched successfully", feed);
  return res.status(response.statusCode).json(response);
});
