import TableOperations from "../../_components/TableOperations";
import FilterOrSort from "@/app/_components/FilterOrSort";

function CabinTableOperations() {
  return (
    <TableOperations>
      <FilterOrSort
        field="discount"
        horizontalUntil={900}
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "no-discount",
            label: "No discount",
          },
          {
            value: "with-discount",
            label: "With discount",
          },
        ]}
      />

      <FilterOrSort
        field="sortBy"
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
