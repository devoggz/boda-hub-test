import prisma from "@/lib/prisma";

// Fetch all users from the database sorted by points in descending order
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        points: "desc", // Sort by points in descending order
      },
      select: {
        username: true, // Select the username
        points: true, // Select the points
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
