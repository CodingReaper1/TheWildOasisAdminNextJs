import { MetadataRoute } from "next";
import { getAllReservations } from "./_lib/reservationActions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reservations = await getAllReservations();

  const urlsForReservations: MetadataRoute.Sitemap = reservations.flatMap(
    (reservation) => [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/${reservation.id}`,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkin/${reservation.id}`,
      },
    ],
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/cabins`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkin`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    },
    ...urlsForReservations,
  ];
}
