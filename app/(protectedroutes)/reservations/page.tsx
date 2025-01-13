import { getAllReservationsWithCount } from "@/app/_lib/reservationActions";
import Heading from "../../_components/Heading";
import ReservationTable from "./ReservationTable";
import ReservationTableOperations from "./ReservationTableOperations";
import { Metadata } from "next";
import LayoutRow from "@/app/_components/LayoutRow";

export const revalidate = 6 * 60 * 60;

export const metadata: Metadata = {
  title: "Reservations",

  icons: {
    icon: "/favicon.png",
  },
  description:
    "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to check new reservations.",
  keywords: [
    "frontend",
    "giorgi gamgebeli",
    "react",
    "nextjs",
    "the wild oasis reservations page",
    "the wild oasis admin",
    "the wild oasis admin side",
    "the wild oasis admin side reservations page",
  ],
  openGraph: {
    title: "Reservations",

    images: [
      {
        url: "/reservations.png",
        alt: "The Wild Oasis Admin Dashboard",
      },
    ],
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to check new reservations.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations`,
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
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to check new reservations.",
    images: ["/reservations.png"],
  },
};

async function Page() {
  const { reservations, count } = await getAllReservationsWithCount();

  return (
    <>
      <LayoutRow>
        <Heading as="h1">All reservations</Heading>
        <ReservationTableOperations />
      </LayoutRow>

      <ReservationTable reservations={reservations} count={count} />
    </>
  );
}

export default Page;
