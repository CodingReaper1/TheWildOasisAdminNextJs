import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "./DataItem";
import { Flag } from "../../_components/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../_utils/helpers";
import { Prisma } from "@prisma/client";
import Spinner from "@/app/_components/Spinner";
import Empty from "@/app/_components/Empty";

type ReservationDataBoxProps = {
  reservation:
    | ({
        cabin: {
          name: string;
        };
        user: {
          name: string;
          email: string;
          nationalID: string | null;
          nationality: string | null;
          countryFlag: string | null;
        };
      } & Prisma.ReservationsGetPayload<object>)
    | null
    | undefined;
};

function ReservationDataBox({ reservation }: ReservationDataBoxProps) {
  if (!reservation) return <Spinner />;
  if (!reservation.id) return <Empty resourceName="reservation" />;
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    user: { name: guestName, email, nationality, countryFlag, nationalID },
    cabin: { name: cabinName },
  } = reservation;

  return (
    <section className="overflow-x-auto overflow-y-hidden rounded-[7px] border border-gray-100 bg-white text-[1.6rem] dark:border-gray-800 dark:bg-gray-0">
      <div className="min-w-[85rem]">
        <header className="flex items-center justify-between bg-indigo-500 px-[4rem] py-[2rem] text-[1.8rem] font-medium text-[#e0e7ff]">
          <div className="flex items-center gap-[1.6rem] text-[1.8rem] font-semibold">
            <HiOutlineHomeModern className="text-[3.2rem]" />
            <p>
              {numNights} nights in Cabin{" "}
              <span className="font-sono text-[2rem]">{cabinName}</span>
            </p>
          </div>

          <p>
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>
        </header>
        <section className="px-[4rem] pb-[1.2rem] pt-[3.2rem]">
          <div className="mb-[1.6rem] flex items-center gap-[1.2rem] text-gray-500 dark:text-gray-400">
            {countryFlag && (
              <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
            )}
            <p className="font-medium text-gray-700 dark:text-gray-200">
              {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
            </p>
            <span>&bull;</span>
            <p>{email}</p>
            <span>&bull;</span>
            <p>National ID {nationalID}</p>
          </div>

          {observations && (
            <DataItem
              icon={<HiOutlineChatBubbleBottomCenterText />}
              label="Observations"
            >
              {observations}
            </DataItem>
          )}

          <DataItem
            icon={
              <HiOutlineCheckCircle className="text-[2rem] text-indigo-600" />
            }
            label="Breakfast included?"
          >
            {hasBreakfast ? "Yes" : "No"}
          </DataItem>

          <div
            className={`mt-[2.4rem] flex items-center justify-between rounded-md px-[3.2rem] py-[1.6rem] ${isPaid ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"} `}
          >
            <DataItem
              icon={
                <HiOutlineCurrencyDollar className="text-[2.4rem] text-green-700 dark:text-green-200" />
              }
              label={`Total price`}
            >
              {formatCurrency(totalPrice || 0)}

              {hasBreakfast &&
                ` (${formatCurrency(cabinPrice || 0)} cabin + ${formatCurrency(
                  extrasPrice || 0,
                )} breakfast)`}
            </DataItem>

            <p className="text-[1.4rem] font-semibold uppercase">
              {isPaid ? "Paid" : "Will pay at property"}
            </p>
          </div>
        </section>

        <footer className="px-[4rem] py-[1.6rem] text-right text-[1.2rem] text-gray-500 dark:text-gray-400">
          <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
        </footer>
      </div>
    </section>
  );
}

export default ReservationDataBox;
