"use client";

import ReservationRow from "./ReservationRow";
import Table from "../../_components/Table";
import Menus from "../../_components/Menus";
import Empty from "../../_components/Empty";
import Spinner from "../../_components/Spinner";
import Pagination from "./Pagination";
import { Prisma } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/app/_utils/constants";
import { useOptimistic, useTransition } from "react";
import toast from "react-hot-toast";
import { deleteReservation } from "@/app/_lib/reservationActions";

export type ReservationTableProps = {
  reservations: ({
    cabin: {
      name: string;
    };
    user: {
      email: string;
      name: string;
    };
  } & Prisma.ReservationsGetPayload<object>)[];

  count: number;
};

type OptimisticUpdateTypes = {
  reservationId: number;

  action: "delete";
};

function ReservationTable({ reservations, count }: ReservationTableProps) {
  const [optimisticReservations, setOptimisticReservations] = useOptimistic(
    reservations,
    (prevState, { reservationId, action }: OptimisticUpdateTypes) => {
      if (action === "delete")
        return prevState.filter(
          (prevReservation) => prevReservation.id !== reservationId,
        );

      return [...prevState];
    },
  );

  const [, startTransition] = useTransition();

  function handleDelete(reservationId: number) {
    toast.success("Reservation successfully deleted!");

    startTransition(async () => {
      setOptimisticReservations({
        reservationId,
        action: "delete",
      });

      const res = await deleteReservation(reservationId);

      if (res?.error) toast.error(res.error);
    });
  }

  const searchParams = useSearchParams();

  if (!reservations) return <Spinner />;
  if (!reservations.length) return <Empty resourceName="reservations" />;

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");

  // PAGINATION
  const pageFromUrl = searchParams?.get("page");
  const page = !pageFromUrl ? 1 : +pageFromUrl;

  let filteredReservations = optimisticReservations;
  // FILTER
  if (filter) {
    filteredReservations = optimisticReservations.filter(
      (reservation) => reservation.status === filter.value,
    );
  }
  // PAGINATION
  const skip = page ? (page - 1) * PAGE_SIZE : 0;
  const take = PAGE_SIZE;
  const paginatedReservations = filteredReservations.filter(
    (_, i) => i >= skip && i < skip + take,
  );

  // SORTING
  const modifier = direction === "asc" ? 1 : -1;
  const sortedReservations = paginatedReservations.sort(
    // @ts-expect-error: Couldn't fix error, type is first undefined then number, but it reads as any
    (a, b) => (a[field] - b[field]) * modifier,
  );

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedReservations}
          render={(reservation) => (
            <ReservationRow
              key={reservation.id}
              handleDelete={handleDelete}
              reservation={reservation}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ReservationTable;
