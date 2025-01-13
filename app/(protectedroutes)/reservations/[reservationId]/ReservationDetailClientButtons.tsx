"use client";

import Button from "@/app/_components/Button";
import ConfirmDelete from "../../../_components/ConfirmDelete";
import Modal from "../../../_components/Modal";
import {
  deleteReservation,
  updateCheckout,
} from "@/app/_lib/reservationActions";
import toast from "react-hot-toast";

type ReservationDetailModalProps = {
  reservationId: number;
  status: string | null;
};

// by seperating this from ReservationDetail now ReservationDetail is rendered on server
function ReservationDetailClientButtons({
  reservationId,
  status,
}: ReservationDetailModalProps) {
  return (
    <>
      {status === "checked-in" && (
        <Button
          ariaLabel="Check out"
          onClick={async () => await updateCheckout(reservationId)}
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
            href="/reservations"
            onConfirm={async () => {
              toast.success("Reservation succesfully deleted");

              await deleteReservation(reservationId);
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default ReservationDetailClientButtons;
