import { getSettings } from "@/app/_lib/settingsActions";

import {
  getAllReservations,
  getReservation,
} from "@/app/_lib/reservationActions";
import CheckinReservation from "./CheckinReservation";
import { Metadata } from "next";

export const revalidate = 12 * 60 * 60;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const reservation = await getReservation(+params.reservationId);

  return {
    title: `Check in reservation ${params.reservationId}`,
    icons: {
      icon: "/favicon.png",
    },
    description: `Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. To check in guest ${reservation?.user.name} in cabin ${reservation?.cabin.name}`,

    openGraph: {
      title: `Check in reservation ${params.reservationId}`,
      images: [
        {
          url: "/reservations.png",
          alt: "The Wild Oasis Admin Dashboard",
        },
      ],
      description: `Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. To check in guest ${reservation?.user.name} in cabin ${reservation?.cabin.name}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkin/${reservation?.id}`,
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
      description: `Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. To check in guest ${reservation?.user.name} in cabin ${reservation?.cabin.name}`,
      images: ["/reservations.png"],
    },
  };
}

type Params = {
  reservationId: string;
};

export async function generateStaticParams() {
  const reservations = await getAllReservations();

  const ids =
    reservations?.map((reservation) => ({
      reservationId: String(reservation.id),
    })) || [];

  return ids;
}

async function Page({ params }: { params: Params }) {
  const settings = await getSettings();
  const reservation = await getReservation(+params.reservationId);

  return <CheckinReservation settings={settings} reservation={reservation} />;
}

export default Page;
