import {
  getAllReservations,
  getReservation,
} from "@/app/_lib/reservationActions";
import ReservationDetail from "../ReservationDetail";
import { Metadata } from "next";

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

export const revalidate = 12 * 60 * 60;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const reservation = await getReservation(+params.reservationId);

  return {
    title: `Reservation ${params.reservationId}`,
    icons: {
      icon: "/favicon.png",
    },
    description: `Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. ${reservation?.user.name}'s reservation in cabin ${reservation?.cabin.name}`,

    openGraph: {
      title: `Reservation ${params.reservationId}`,
      description: `Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. ${reservation?.user.name}'s reservation in cabin ${reservation?.cabin.name}`,
      images: [
        {
          url: "/reservations.png",
          alt: "The Wild Oasis Admin Dashboard",
        },
      ],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/${reservation?.id}`,
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
      description: `Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. ${reservation?.user.name}'s reservation in cabin ${reservation?.cabin.name}`,
      images: ["/reservations.png"],
    },
  };
}

async function Page({ params }: { params: Params }) {
  const reservation = await getReservation(+params.reservationId);

  return <ReservationDetail reservation={reservation} />;
}

export default Page;
