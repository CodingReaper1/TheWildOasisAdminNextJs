"use client";

import ReservationDataBox from "../../reservations/ReservationDataBox";

import Heading from "../../../_components/Heading";
import ButtonGroup from "../../../_components/ButtonGroup";
import Button from "../../../_components/Button";
import ButtonText from "../../../_components/ButtonText";

import Spinner from "../../../_components/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../../_components/Checkbox";
import { formatCurrency } from "../../../_utils/helpers";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { updateCheckin } from "@/app/_lib/reservationActions";
import toast from "react-hot-toast";
import Empty from "@/app/_components/Empty";

type CheckinReservationProps = {
  settings: Prisma.SettingsGetPayload<object> | null | undefined;
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

function CheckinReservation({
  settings,
  reservation,
}: CheckinReservationProps) {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const router = useRouter();

  useEffect(() => setConfirmPaid(reservation?.isPaid ?? false), [reservation]);

  if (!reservation) return <Spinner />;
  if (!reservation.id) return <Empty resourceName="reservation" />;

  const {
    id: reservationId,
    user: guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = reservation;

  const optionalBreakfastPrice =
    (settings?.breakFastPrice || 0) * (numNights || 0) * numGuests;

  async function handleCheckin() {
    setIsCheckingIn((bool) => !bool);
    if (!confirmPaid) return;
    let res;
    if (addBreakfast) {
      res = await updateCheckin({
        id: reservationId,
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: (totalPrice || 0) + optionalBreakfastPrice,
      });
    } else {
      res = await updateCheckin({ id: reservationId });
    }

    if (res?.error) return toast.error(res.error);

    toast.success("Succesfully checked in!");
    router.push("/dashboard");
    setIsCheckingIn((bool) => !bool);
  }

  return (
    <>
      <ButtonText
        ariaLabel="Go back"
        onClick={() => router.back()}
        className="mb-[2rem] ml-auto"
      >
        &larr; Back
      </ButtonText>
      <Heading as="h1">Check in reservation #{reservationId}</Heading>

      <ReservationDataBox reservation={reservation} />

      {!hasBreakfast && (
        <div className="rounded-[7px] border border-gray-100 bg-white px-[4rem] py-[2.4rem] dark:border-gray-800 dark:bg-gray-0">
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </div>
      )}

      <div className="rounded-md border border-gray-100 bg-white px-[2rem] py-[2.4rem] dark:border-gray-800 dark:bg-gray-0 sm:px-[4rem]">
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.name} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice || 0)
            : `${formatCurrency(
                (totalPrice || 0) + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice || 0)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </div>

      <ButtonGroup>
        <Button
          ariaLabel="Check in"
          onClick={handleCheckin}
          disabled={!confirmPaid}
        >
          Check in reservation #{reservationId}
        </Button>
        <Button
          ariaLabel="Go back"
          variation="secondary"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinReservation;
