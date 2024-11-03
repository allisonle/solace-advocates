"use client";

import Advocates from "@/components/advocates/advocates";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-6 mx-auto my-10 max-w-5xl">
        <Header />
        <Advocates />
      </main>
      <Footer />
    </>
  );
}
