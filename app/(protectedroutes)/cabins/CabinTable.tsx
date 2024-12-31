"use client";

import Spinner from "../../_components/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../_components/Table";
import Menus from "../../_components/Menus";
import Empty from "../../_components/Empty";
import { useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";
import { useOptimistic, useTransition } from "react";
import toast from "react-hot-toast";
import { deleteCabin, duplicateCabin } from "@/app/_lib/cabinActions";

type OptimisticUpdateTypes = {
  cabin: Prisma.CabinsGetPayload<object>;
  action: "duplicate" | "delete";
};

function CabinTable({ cabins }: { cabins: Prisma.CabinsGetPayload<object>[] }) {
  const [, startTransition] = useTransition();

  const [optimisticCabins, setOptimisticCabins] = useOptimistic(
    cabins,
    (prevState, { cabin, action }: OptimisticUpdateTypes) => {
      if (action === "duplicate") return [...prevState, cabin];

      if (action === "delete")
        return prevState.filter((prevCabin) => prevCabin.id !== cabin.id);

      return [...prevState];
    },
  );

  function handleDuplicate(cabin: Prisma.CabinsGetPayload<object>) {
    toast.success("Cabin successfully duplicated!");

    startTransition(async () => {
      setOptimisticCabins({
        cabin: { ...cabin, name: `Copy of ${cabin.name}` },
        action: "duplicate",
      });

      const res = await duplicateCabin(cabin.id);

      if (res?.error) toast.error(res.error);
    });
  }

  function handleDelete(cabin: Prisma.CabinsGetPayload<object>) {
    toast.success("Cabin successfully deleted!");

    startTransition(async () => {
      setOptimisticCabins({
        cabin: { ...cabin, name: `Copy of ${cabin.name}` },
        action: "delete",
      });

      const res = await deleteCabin(cabin.id);

      if (res?.error) toast.error(res.error);
    });
  }
  const searchParams = useSearchParams();

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = optimisticCabins;
  if (filterValue === "no-discount")
    filteredCabins = optimisticCabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = optimisticCabins?.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    // @ts-expect-error: Couldn't fix error, type is first undefined then number, but it reads as any
    (a, b) => (a[field] - b[field]) * modifier,
  );

  if (!cabins) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin, i) => (
            <CabinRow
              handleDuplicate={handleDuplicate}
              handleDelete={handleDelete}
              cabin={cabin}
              key={i}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
