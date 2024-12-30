"use client";

import Spinner from "../../_components/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../_components/Table";
import Menus from "../../_components/Menus";
import Empty from "../../_components/Empty";
import { useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";

function CabinTable({
  cabins,
}: {
  cabins: Prisma.CabinsGetPayload<object>[] | undefined;
}) {
  const searchParams = useSearchParams();

  if (!cabins) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    // @ts-expect-error: Couldn't fix error, type is first undefined then number, but it reads as any
    (a, b) => (a[field] - b[field]) * modifier,
  );

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
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
