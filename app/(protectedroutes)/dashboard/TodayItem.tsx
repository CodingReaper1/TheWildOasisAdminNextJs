import Tag from "../../_components/Tag";
import { Flag } from "../../_components/Flag";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";
import { Prisma } from "@prisma/client";

type TodayItemProps = {
  activity: {
    user: {
      name: string;
      nationalID: string | null;
      nationality: string | null;
      countryFlag: string | null;
    };
  } & Prisma.ReservationsGetPayload<object>;
};

function TodayItem({ activity }: TodayItemProps) {
  const { id, status, user, numNights } = activity;

  return (
    <li className="grid grid-cols-[9rem_2rem_1fr_auto_9rem] items-center gap-[1.2rem] border-b border-gray-100 px-0 py-[0.8rem] text-[1.4rem] first:border-t dark:border-gray-800">
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={user.countryFlag || ""} alt={`Country flag`} />

      <div className="font-medium">{user.name}</div>
      <div>{numNights}</div>

      {status === "unconfirmed" && (
        <Link
          href={`/checkin/${id}`}
          aria-label="To each checkin"
          className="rounded-md border-none bg-indigo-600 px-[0.8rem] py-[0.4rem] text-center text-[1.2rem] font-semibold uppercase text-indigo-50 hover:bg-indigo-700"
        >
          Check in
        </Link>
      )}
      {status === "checked-in" && <CheckoutButton reservationId={id} />}
    </li>
  );
}

export default TodayItem;
