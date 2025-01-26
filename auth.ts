import NextAuth from "next-auth";
import prisma from "./app/_lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { getUserById } from "./app/_lib/authActions";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id as string);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }

    //   return true;
    // },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      console.log(token);

      token.role = existingUser.role;
      token.image = existingUser.image;

      return token;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        session.user.image = token.image as string;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});
