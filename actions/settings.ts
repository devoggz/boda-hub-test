"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";
import { settingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { getUserById } from "./user";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "User not authenticated" };
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated successfully" };
};
