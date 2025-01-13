"use client";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import { subDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";
import Empty from "@/app/_components/Empty";
import { getToday } from "@/app/_utils/helpers";

type DashboardLayoutProps = {
  stays: ({
    user: { name: string };
  } & Prisma.ReservationsGetPayload<object>)[];
  cabins: Prisma.CabinsGetPayload<object>[];
  children: React.ReactNode;
};

function DashboardLayout({ stays, cabins, children }: DashboardLayoutProps) {
  const searchParams = useSearchParams();

  if (!stays.length || !cabins.length) return <Empty resourceName="data" />;

  const lastFromURL = searchParams.get("last");
  const numDays = !lastFromURL ? 7 : +lastFromURL;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { reservationsAfterDate, confirmedStays } = stays.reduce<{
    confirmedStays: DashboardLayoutProps["stays"];
    reservationsAfterDate: Prisma.ReservationsGetPayload<object>[];
  }>(
    (acc, stay) => {
      const { user: _, ...reservation } = stay;
      const reservationDate = new Date(reservation.createdAt);
      const stayDate = new Date(stay.startDate);

      if (
        reservationDate >= new Date(queryDate) &&
        reservationDate <= new Date(getToday({ end: true }))
      ) {
        acc.reservationsAfterDate = [...acc.reservationsAfterDate, reservation];
      }

      if (
        stayDate >= new Date(queryDate) &&
        stayDate <= new Date(getToday({ end: true })) &&
        stay.status !== "unconfirmed"
      ) {
        acc.confirmedStays = [...acc.confirmedStays, stay];
      }

      return acc;
    },
    {
      reservationsAfterDate: [],
      confirmedStays: [],
    },
  );

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-[2.4rem] text-gray-700 dark:text-gray-200">
      <Stats
        reservations={reservationsAfterDate}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      {children}
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart reservations={reservationsAfterDate} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
