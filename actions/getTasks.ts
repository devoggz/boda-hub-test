"use server";
import prisma from "@/lib/prisma";

export const getTasks = async (category?: string) => {
  try {
    const tasks = await prisma.task.findMany({
      where: category ? { category } : {},
      select: {
        id: true,
        category: true,
        videoURL: true,
        thumbnailURL: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
