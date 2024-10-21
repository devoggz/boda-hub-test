"use server";
import prisma from "@/lib/prisma";

export const getUserPosts = async (category?: string) => {
  try {
    const userposts = await prisma.userPost.findMany({
      where: category ? { category } : {}, // Filter by category if provided
      select: {
        id: true,
        title: true,
        category: true,
        videoURL: true,
        thumbnailURL: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return userposts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
