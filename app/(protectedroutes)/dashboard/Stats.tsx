import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../_utils/helpers";
import { Prisma } from "@prisma/client";

type StatsProps = {
  confirmedStays: ({
    user: { name: string };
  } & Prisma.ReservationsGetPayload<object>)[];

  reservations:
    | {
        createdAt: Date;
        totalPrice: number | null;
        extrasPrice: number | null;
      }[]
    | undefined;

  numDays: number;

  cabinCount: number | undefined;
};

function Stats({
  reservations,
  confirmedStays,
  numDays,
  cabinCount,
}: StatsProps) {
  // 1.
  const numReservations = reservations?.length;

  // 2.
  const sales = reservations?.reduce(
    (acc, cur) => acc + (cur.totalPrice || 0),
    0,
  );

  // 3.
  const checkins = confirmedStays?.length;

  // 4.
  const occupation = confirmedStays
    ? confirmedStays.reduce((acc, cur) => acc + (cur.numNights || 0), 0) /
      (numDays * (cabinCount || 0))
    : 0;

  return (
    <div className="col-start-1 col-end-5 grid grid-cols-[1fr] gap-[2.4rem] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr]">
      <Stat
        title="Reservations"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={String(numReservations)}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales || 0)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={String(checkins)}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </div>
  );
}

export default Stats;
