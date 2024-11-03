"use client";

import Logo from "@/assets/logo";
import AdvocateTable from "@/components/dashboard/advocate-table";

export default function Home() {
  return (
    <main className="flex flex-col gap-6 mx-auto my-10 max-w-5xl">
      <div className="w-1/4">
        <Logo />
        <div className="text-secondary-foreground font-light">
          Find your care advocate
        </div>
      </div>
      <AdvocateTable />
    </main>
  );
}
