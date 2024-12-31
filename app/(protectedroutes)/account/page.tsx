import { Metadata } from "next";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import UpdateUserDateForm from "./UpdateUserDataForm";

export const metadata: Metadata = {
  title: "Account",

  icons: {
    icon: "/favicon.png",
  },
  description:
    "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to configure your user account.",
  keywords: [
    "frontend",
    "giorgi gamgebeli",
    "react",
    "nextjs",
    "the wild oasis account page",
    "the wild oasis admin",
    "the wild oasis admin side",
    "the wild oasis admin side account page",
  ],
  openGraph: {
    title: "Account",
    images: [
      {
        url: "/account.png",
        alt: "The Wild Oasis Admin Dashboard",
      },
    ],
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to configure your user account.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
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
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to configure your user account.",
    images: ["/account.png"],
  },
};

function Page() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <UpdateUserDateForm />
      </Row>
    </>
  );
}

export default Page;
