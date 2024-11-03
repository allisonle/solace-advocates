"use client";

import Advocates from "@/components/advocates/advocates";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-dvh max-w-dvh">
        <main className="flex flex-grow flex-col gap-6 mx-auto my-10 w-full max-w-5xl">
          <Header />
          <Advocates />
        </main>
        <Footer />
      </div>
    </>
  );
}
