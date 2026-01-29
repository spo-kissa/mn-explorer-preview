import Home from "@/components/layouts/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "mn-explorer - (Explorer for Midnight Network Preview)",
  description: "Explorer for Midnight Network Preview",
};

export default async function Page() {

  return (
    <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">

        <Home />

      </div>
    </div>
  );
}
