"use client";

import AdvocateTable from "@/components/dashboard/advocate-table";

export default function Home() {
  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} />
      </div>
      <br />
      <br />
      <AdvocateTable />
    </main>
  );
}
