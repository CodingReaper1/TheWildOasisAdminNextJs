/*
const googleBotIps = [
  "66.249.64.0/19",
  "64.233.160.0/19",
  "72.14.192.0/18",
  "74.125.0.0/16",
  "209.85.128.0/17",
];

const bingBotIps = ["13.64.0.0/11", "40.77.0.0/16", "204.79.197.0/24"];

const yandexBotIps = ["5.255.255.0/24", "77.88.0.0/16", "95.108.0.0/16"];

const ip = req.headers.get("x-forwarded-for");

const response = NextResponse.next();
response.cookies.set("client-ip", ip || "unkown", {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  path: "/",
});

const isGoogleBot = ipRangeCheck(ip, googleBotIps);
const isBingBot = ipRangeCheck(ip, bingBotIps);
const isYandexBot = ipRangeCheck(ip, yandexBotIps);

if (isGoogleBot || isBingBot || isYandexBot) return;
import ipRangeCheck from "ip-range-check";
import requestIp from "request-ip";
const isCrawler =
  /Googlebot|Bingbot|Slurp|DuckDuckBot|YandexBot|Baiduspider|Sogou|Exabot|facebot|ia_archiver/.test(
    userAgent,
  );
*/

import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { NextRequest } from "next/server";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const userAgent = req.headers.get("user-agent") || "";
    const isCrawler = /Googlebot|Bingbot|YandexBot/.test(userAgent);

    if (isCrawler) return;

    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) return;

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
    }

    if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL("/", nextUrl));
    }

    return;
  },
);

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
