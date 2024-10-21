// actions/awardPoints.ts
"use server";
import prisma from "@/lib/prisma";

export const awardPoints = async (userId: string, points: number) => {
  try {
    // Update user points
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        points: { increment: points },
      },
    });

    // Mark the task as completed (you might need to pass taskId as well)
    const task = await prisma.task.updateMany({
      where: { id: userId, completed: false }, // Modify as per your logic
      data: { completed: true },
    });

    return { success: true, user, task };
  } catch (error) {
    console.error("Error awarding points:", error);
    return { success: false, error: "Could not award points." };
  }
};
