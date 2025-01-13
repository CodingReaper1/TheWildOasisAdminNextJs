import TableOperations from "../../_components/TableOperations";
import FilterOrSort from "@/app/_components/FilterOrSort";

function ReservationTableOperations() {
  return (
    <TableOperations>
      <FilterOrSort
        field="status"
        horizontalUntil={1100}
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <FilterOrSort
        field="sortBy"
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default ReservationTableOperations;
