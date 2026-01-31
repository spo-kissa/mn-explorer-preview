import Home from "@/components/layouts/Home";
import type { Metadata } from "next";

/**
 * メタデータを生成する関数
 */
export const metadata: Metadata = {
  title: "mn-explorer - (Explorer for Midnight Network Preview)",
  description: "Explorer for Midnight Network Preview",
  openGraph: {
    title: "mn-explorer - (Explorer for Midnight Network Preview)",
    description: "Midnight Explorer for Midnight Preview Network",
    images: [],
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    siteName: "mn-explorer",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
  }
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
