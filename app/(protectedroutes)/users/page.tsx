import { Metadata } from "next";
import Heading from "../../_components/Heading";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create a new user",

  icons: {
    icon: "/favicon.png",
  },
  description:
    "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for creating new admin user.",
  keywords: [
    "frontend",
    "giorgi gamgebeli",
    "react",
    "nextjs",
    "the wild oasis users page",
    "the wild oasis admin",
    "the wild oasis admin side",
    "the wild oasis admin side users page",
  ],
  openGraph: {
    title: "Create a new user",
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for creating new admin user.",
    images: [
      {
        url: "/users.png",
        alt: "The Wild Oasis Admin Dashboard",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
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
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for creating new admin user.",
    images: ["/users.png"],
  },
};

function Page() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default Page;
