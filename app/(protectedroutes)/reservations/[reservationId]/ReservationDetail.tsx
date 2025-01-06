"use client";

import ReservationDataBox from "../ReservationDataBox";
import Row from "../../../_components/Row";
import Heading from "../../../_components/Heading";
import Tag from "../../../_components/Tag";
import ButtonGroup from "../../../_components/ButtonGroup";
import Button from "../../../_components/Button";
import ButtonText from "../../../_components/ButtonText";
import Spinner from "../../../_components/Spinner";
import ConfirmDelete from "../../../_components/ConfirmDelete";
import Modal from "../../../_components/Modal";
import Empty from "../../../_components/Empty";
import { useRouter } from "next/navigation";
import {
  deleteReservation,
  updateCheckout,
} from "@/app/_lib/reservationActions";
import { Prisma } from "@prisma/client";
import toast from "react-hot-toast";

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
  const router = useRouter();

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
      <Row type="horizontal">
        <div className="flex items-center gap-[2.4rem]">
          <Heading as="h1">Reservation #{reservationId}</Heading>
          <Tag type={statusToTagName[validStatus]}>
            {status?.replace("-", " ")}
          </Tag>
        </div>
        <ButtonText ariaLabel="Go back" onClick={() => router.back()}>
          &larr; Back
        </ButtonText>
      </Row>

      <ReservationDataBox reservation={reservation} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button ariaLabel="Check in" href={`/checkin/${reservationId}`}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            ariaLabel="Check out"
            onClick={() => updateCheckout(reservationId)}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button ariaLabel="Delete reservation" variation="danger">
              Delete reservation
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="reservation"
              onConfirm={async () => {
                toast.success("Reservation succesfully deleted");
                router.back();

                await deleteReservation(reservationId);
              }}
            />
          </Modal.Window>
        </Modal>

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

export default ReservationDetail;
