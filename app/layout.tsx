import type { Metadata } from "next";
import "./globals.css";

import { Poppins, Sono } from "next/font/google";
import ClientProviders from "./_utils/ClientProviders";
import { DarkModeProvider } from "./_context/DarkModeContext";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--fontFamily_Poppins",
});

const sono = Sono({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--fontFamily_Sono",
});

export const metadata: Metadata = {
  title: {
    default: "The Wild Oasis admin side | Giorgi Gamgebeli",
    template: "%s | The Wild Oasis",
  },
  icons: {
    icon: "/favicon.png",
  },
  description:
    "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features.",
  keywords: [
    "frontend",
    "giorgi gamgebeli",
    "react",
    "nextjs",
    "the wild oasis",
    "the wild oasis admin",
    "the wild oasis admin side",
  ],
  openGraph: {
    title: {
      default: "The Wild Oasis admin side | Giorgi Gamgebeli",
      template: "%s | The Wild Oasis",
    },
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features.",
    images: [
      {
        url: "/dashboard.png",
        alt: "The Wild Oasis Admin Dashboard",
      },
    ],
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "The Wild Oasis admin side | Giorgi Gamgebeli",
    locale: "en-US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      "max-image-preview": "large",
    },
  },
  category: "web development",

  twitter: {
    card: "summary_large_image",
    title: "The Wild Oasis admin side | Giorgi Gamgebeli",
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features.",
    images: ["/dashboard.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-[62.5%] 2xl:text-[80%]">
      <body
        className={`${poppins.className} ${sono.variable} overflow-x-hidden text-[1.4rem] text-gray-700 dark:text-gray-200`}
      >
        <SessionProvider>
          <DarkModeProvider>
            <ClientProviders>{children}</ClientProviders>
          </DarkModeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
