import { prisma } from "@/config/database";
import { ApiError } from "@/utils/apiHandler";
import { SwipeAction } from "@prisma/client";

const LOGGED_IN_USER_ID = "logged-user";

export async function recordSwipe(profileId: string, action: "like" | "pass" | "LIKE" | "PASS") {
  if (profileId === LOGGED_IN_USER_ID) {
    throw new ApiError(400, "Cannot swipe on the logged-in user");
  }

  const profile = await prisma.user.findUnique({ where: { id: profileId } });
  if (!profile) throw new ApiError(404, "Profile not found");

  const normalizedAction = action.toUpperCase() === "LIKE" ? SwipeAction.LIKE : SwipeAction.PASS;
  await prisma.swipe.upsert({
    where: { fromUserId_toUserId: { fromUserId: LOGGED_IN_USER_ID, toUserId: profileId } },
    update: { action: normalizedAction },
    create: { fromUserId: LOGGED_IN_USER_ID, toUserId: profileId, action: normalizedAction }
  });

  if (normalizedAction === SwipeAction.PASS) return { matched: false };

  const mutualLike = await prisma.swipe.findUnique({
    where: { fromUserId_toUserId: { fromUserId: profileId, toUserId: LOGGED_IN_USER_ID } }
  });

  return { matched: mutualLike?.action === SwipeAction.LIKE };
}
