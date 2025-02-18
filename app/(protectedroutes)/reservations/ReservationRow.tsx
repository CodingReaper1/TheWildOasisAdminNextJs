"use client";

import { format, isToday } from "date-fns";

import Tag from "../../_components/Tag";
import Table from "../../_components/Table";

import { formatCurrency } from "../../_utils/helpers";
import { formatDistanceFromNow } from "../../_utils/helpers";
import Menus from "../../_components/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import Modal from "../../_components/Modal";
import ConfirmDelete from "../../_components/ConfirmDelete";
import { Prisma } from "@prisma/client";

type ReservationRowProps = {
  reservation: {
    cabin: {
      name: string;
    };
    user: {
      email: string;
      name: string;
    };
  } & Prisma.ReservationsGetPayload<object>;
  handleDelete: (reservationId: number) => void;
  handleCheckOut: (reservationId: number) => void;
};

function ReservationRow({
  reservation: {
    id: reservationId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    user: { name: guestName, email },
    cabin: { name: cabinName },
  },
  handleDelete,
  handleCheckOut,
}: ReservationRowProps) {
  const statusToTagName = {
    unconfirmed: "blue",
    checked_in: "green",
    checked_out: "silver",
  } as const;

  return (
    <Table.Row>
      <div
        className={`font-sono text-[1.6rem] font-semibold text-gray-600 dark:text-gray-300`}
      >
        {cabinName}
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <span className="font-medium text-gray-700 dark:text-gray-200">
          {guestName}
        </span>
        <span className="text-[1.2rem] text-gray-500 dark:text-gray-400">
          {email}
        </span>
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span className="text-[1.2rem] text-gray-500 dark:text-gray-400">
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>

      <Tag type={statusToTagName[status]}>{status?.replace("_", " ")}</Tag>

      <div className="font-sono font-medium text-gray-600 dark:text-gray-300">
        {formatCurrency(totalPrice || 0)}
      </div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={reservationId} />
          <Menus.List id={reservationId}>
            <Menus.MenusLink
              icon={<HiEye />}
              href={`/reservations/${reservationId}`}
            >
              See details
            </Menus.MenusLink>

            {status === "unconfirmed" && (
              <Menus.MenusLink
                icon={<HiArrowDownOnSquare />}
                href={`/checkin/${reservationId}`}
              >
                Check in
              </Menus.MenusLink>
            )}

            {status === "checked_in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => handleCheckOut(reservationId)}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="reservation"
            onConfirm={() => handleDelete(reservationId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ReservationRow;
