import { prisma } from "@/config/database";

const LOGGED_IN_USER_ID = "logged-user";

export async function getFeed() {
  return prisma.user.findMany({
    where: {
      id: { not: LOGGED_IN_USER_ID },
      swipesReceived: {
        none: { fromUserId: LOGGED_IN_USER_ID }
      }
    },
    select: {
      id: true,
      name: true,
      age: true,
      photo: true,
      bio: true,
      city: true,
      interests: true
    },
    orderBy: { createdAt: "asc" }
  });
}
