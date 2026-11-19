import { prisma } from "@/config/database";
import { SwipeAction } from "@prisma/client";

const LOGGED_IN_USER_ID = "logged-user";

export async function getMatches() {
  const likesMade = await prisma.swipe.findMany({
    where: { fromUserId: LOGGED_IN_USER_ID, action: SwipeAction.LIKE },
    select: { toUserId: true },
  });
  const targetIds = likesMade.map((swipe) => swipe.toUserId);

  const mutualIds = await prisma.swipe.findMany({
    where: {
      fromUserId: { in: targetIds },
      toUserId: LOGGED_IN_USER_ID,
      action: SwipeAction.LIKE,
    },
    select: { fromUserId: true },
  });
  const ids = mutualIds.map((swipe) => swipe.fromUserId);

  return prisma.user.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      name: true,
      age: true,
      photo: true,
      bio: true,
      city: true,
      interests: true,
    },
  });
}
