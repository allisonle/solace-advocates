"use client";

import { type FC, useEffect, useState } from "react";

import AdvocateFilter from "@/components/advocates/advocate-filter";
import { Loader } from "@/components/ui/loader";
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
  type ColumnDef,
  type FilterFn,
  type FilterFnOption,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value, { threshold: 3 });
  addMeta({ itemRank });
  return itemRank.passed;
};

const Advocates: FC = () => {
  const [advocates, setAdvocates] = useState<AdvocateType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>("");

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch("/api/advocates");
        const data = await response.json();
        setAdvocates(data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching advocate list: ", error);
      }
    };

    fetchAdvocates();
  }, []);

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
      size: 50,
    },
    {
      accessorKey: "specialties",
      header: "Specialties",
      size: 360,
      accessorFn: row => row.specialties.join(";"),
      cell: cell => (
        <button className="justify-content-start text-start leading-3">
          {(cell.getValue() as string).split(";").map((specialty: string) => (
            <div
              className="inline-block bg-accent hover:bg-accent/60 rounded-full px-2 py-1 mb-1 mr-1 font-medium text-[11px]"
              onClick={() => {
                setSearchFilter(specialty);
              }}
            >
              {specialty}
            </div>
          ))}
        </button>
      ),
    },
    {
      accessorKey: "yearsOfExperience",
      header: "YoE",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone #",
    },
  ];

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
      maxSize: 360,
    },
  });

  return (
    <div className="rounded-xl bg-card py-4 shadow-xl">
      <AdvocateFilter
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <Table>
        <TableHeader className="font-bold">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.column.getSize() }}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {isLoading ? <Loader /> : "No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Advocates;
