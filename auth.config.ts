import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./app/_schemas/authSchemas";
import prisma from "./app/_lib/db";

export default {
  session: {
    maxAge: 2 * 24 * 60 * 60, // inactive for 2 days = logout
    strategy: "jwt",
    updateAge: 60 * 60,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const result = LoginSchema.safeParse(credentials);

        if (!result.success) return null;

        const { email, password } = result.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.password || user.role !== "ADMIN") return null;

        const isPasswordValid = await compare(
          password as string,
          user.password as string,
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
} satisfies NextAuthConfig;
