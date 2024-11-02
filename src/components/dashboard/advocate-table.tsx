"use client";

import { type FC, useEffect, useState } from "react";

import AdvocateFilter from "@/components/dashboard/advocate-filter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdvocateType } from "@/context/types";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  ColumnDef,
  type FilterFn,
  type FilterFnOption,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const columns: ColumnDef<AdvocateType>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "degree",
    header: "Degree",
  },
  {
    accessorKey: "specialties",
    header: "Specialties",
  },
  {
    accessorKey: "yearsOfExperience",
    header: "Years of Experience",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
];

const AdvocateTable: FC = () => {
  const [advocates, setAdvocates] = useState<AdvocateType[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch("/api/advocates");
        const data = await response.json();
        setAdvocates(data?.data);
      } catch (error) {
        console.error("Error fetching advocate list: ", error);
      }
    };

    fetchAdvocates();
  }, []);

  const table = useReactTable({
    data: advocates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy" as FilterFnOption<AdvocateType>,
    defaultColumn: {
      size: 100,
      minSize: 80,
      maxSize: 200,
    },
  });

  return (
    <>
      <AdvocateFilter
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`w-[${header.getSize()}px]`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AdvocateTable;
