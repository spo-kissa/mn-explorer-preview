import Image from "next/image";
import SearchElement from "@/components/elements/SearchElement";
import IconCard from "@/components/elements/IconCard";
import GetStats from "@/lib/db/GetStats";
import Stats from "@/components/elements/Stats";

export default async function Home() {

  return (
    <div className="flex min-h-full items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-3xl flex-col items-center justify-between py-32 pt-5 px-4 bg-white dark:bg-black sm:items-start">

        <div className="w-full mb-10 flex flex-row gap-2 items-center">
          <SearchElement />
        </div>
        <Stats />

      </div>
    </div>
  );
}
