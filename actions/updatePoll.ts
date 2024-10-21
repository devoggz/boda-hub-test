"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { getUserById } from "./user";

export const updatePoll = async () => {
  const user = await currentUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "User not found" };
  }

  // Update user points by incrementing them by 5
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      points: { increment: 1 }, // Increment points by 5
    },
  });

  return { success: "HONGERA! Umeongeza +1 point" };
};
