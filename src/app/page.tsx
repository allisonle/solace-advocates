"use client";

import AdvocateTable from "@/components/dashboard/advocate-table";

export default function Home() {
  return (
    <main className="mx-auto my-10 max-w-5xl">
      <h1>Solace Advocates</h1>
      <AdvocateTable />
    </main>
  );
}
