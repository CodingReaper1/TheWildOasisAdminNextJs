import ReservationDataBox from "../ReservationDataBox";
import Heading from "../../../_components/Heading";
import Tag from "../../../_components/Tag";
import ButtonGroup from "../../../_components/ButtonGroup";
import Button from "../../../_components/Button";
import ButtonText from "../../../_components/ButtonText";
import Spinner from "../../../_components/Spinner";
import Empty from "../../../_components/Empty";
import { Prisma } from "@prisma/client";
import ReservationDetailClientButtons from "./ReservationDetailClientButtons";

type ReservationDetailProps = {
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

function ReservationDetail({ reservation }: ReservationDetailProps) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  } as const;

  if (!reservation) return <Spinner />;
  if (!reservation.id) return <Empty resourceName="reservation" />;

  const { status, id: reservationId } = reservation;

  const validStatus =
    status &&
    (status === "unconfirmed" ||
      status === "checked-in" ||
      status === "checked-out")
      ? status
      : "unconfirmed";

  return (
    <>
      <ButtonText
        ariaLabel="Go back"
        href="/reservations"
        className="mb-[2rem] ml-auto"
      >
        &larr; Back
      </ButtonText>

      <div className="mb-[2rem] flex flex-col gap-[1rem] xs:mb-0 xs:flex-row xs:items-center xs:gap-[2.4rem]">
        <Heading as="h1">Reservation #{reservationId}</Heading>
        <Tag type={statusToTagName[validStatus]}>
          {status?.replace("-", " ")}
        </Tag>
      </div>

      <ReservationDataBox reservation={reservation} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button ariaLabel="Check in" href={`/checkin/${reservationId}`}>
            Check in
          </Button>
        )}

        <ReservationDetailClientButtons
          status={status}
          reservationId={reservationId}
        />

        <Button ariaLabel="Go back" variation="secondary" href="/reservations">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ReservationDetail;
