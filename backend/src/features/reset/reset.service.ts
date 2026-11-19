import { prisma } from "@/config/database";
import { SwipeAction } from "@prisma/client";

const names = [
  "Aarav", "Maya", "Leo", "Zara", "Noah", "Isha", "Ethan", "Nina",
  "Rohan", "Amara", "Kian", "Sofia", "Arjun", "Mia", "Theo", "Anika",
  "Sam", "Leila", "Kabir", "Elena", "Dev", "Chloe", "Omar", "Tara",
  "Ryan", "Neha", "Liam", "Priya", "Alex", "Jasmine"
];
const cities = ["Mumbai", "New Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad", "London", "New York"];
const interests = [
  ["Coffee", "Travel", "Music"], ["Books", "Hiking", "Art"],
  ["Cooking", "Movies", "Fitness"], ["Startups", "Photography", "Yoga"],
  ["Dance", "Food", "Podcasts"]
];

export async function resetApplication() {
  await prisma.swipe.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      id: "logged-user",
      name: "You",
      age: 25,
      photo: "https://i.pravatar.cc/600?img=12",
      bio: "Ready to meet someone new.",
      city: "Bangalore",
      interests: ["Music", "Travel", "Coffee"]
    }
  });

  await prisma.user.createMany({
    data: names.map((name, index) => ({
      id: `profile-${index + 1}`,
      name,
      age: 21 + (index % 8),
      photo: `https://i.pravatar.cc/600?img=${(index % 69) + 1}`,
      bio: [
        "Always curious, usually planning my next trip.",
        "Looking for someone who loves good conversations.",
        "A warm heart and a slightly competitive board game player.",
        "Food finder, sunset chaser, and amateur baker.",
        "Here for spontaneous plans and honest people."
      ][index % 5],
      city: cities[index % cities.length],
      interests: interests[index % interests.length]
    }))
  });

  const profileIds = Array.from({ length: 30 }, (_, index) => `profile-${index + 1}`);
  let randomSeed = 20261118;
  const random = () => {
    randomSeed = (randomSeed * 1664525 + 1013904223) % 4294967296;
    return randomSeed / 4294967296;
  };

  for (let index = profileIds.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1));
    [profileIds[index], profileIds[randomIndex]] = [profileIds[randomIndex], profileIds[index]];
  }

  await prisma.swipe.createMany({
    data: profileIds.slice(0, 10).map((profileId) => ({
      fromUserId: profileId,
      toUserId: "logged-user",
      action: SwipeAction.LIKE
    }))
  });

  return { reset: true };
}
