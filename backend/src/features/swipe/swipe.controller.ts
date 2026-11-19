import { recordSwipe } from "@/features/swipe/swipe.service";
import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/apiHandler";

export const swipeController = asyncHandler(async (req, res) => {
  const result = await recordSwipe(req.body.profileId, req.body.action);

  return res
    .status(200)
    .json(new ApiResponse(200, "Swipe recorded successfully", result));
});
