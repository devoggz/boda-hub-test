"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { getUserById } from "./user";

export const updateQuiz = async (quizScore: number) => {
  const user = await currentUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "User not found" };
  }

  // Update user points by incrementing them by the quiz score
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      points: { increment: quizScore }, // Increment points by quizScore
    },
  });

  return { success: "HONGERA!" };
};
