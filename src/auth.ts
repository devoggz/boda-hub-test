import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import authConfig from "./auth.config";
import { getUserById } from "../actions/user";
import { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.username = token.username as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.bikeNumber = token.bikeNumber as string;
        session.user.stage = token.stage as string;
        session.user.points = token.points as number;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.username = existingUser.username;
      token.phoneNumber = existingUser.phoneNumber;
      token.bikeNumber = existingUser.bikeNumber;
      token.stage = existingUser.stage;
      token.points = existingUser.points;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Using JWT sessions
  },
  ...authConfig,
});
