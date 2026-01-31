import type { Metadata } from "next";
import AddressList from "@/components/elements/AddressList";


export const metadata: Metadata = {
    title: "Addresses - mn-explorer - (Explorer for Midnight Network Preview)",
    description: "Addresses list",
    openGraph: {
        title: "Addresses - mn-explorer - (Explorer for Midnight Network Preview)",
        description: "Addresses list",
        images: [],
        url: `${process.env.NEXT_PUBLIC_APP_URL}/address`,
        siteName: "mn-explorer",
        type: "website",
        locale: "en_US",
        alternateLocale: ["ja_JP"],
    },
};

export default function Page() {

    return (
        <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
            <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">

                <div className="w-full alert alert-warning mb-4 border border-yellow-200/50 dark:border-yellow-800/50 rounded-md p-4">
                    <p className="text-sm text-yellow-500 dark:text-yellow-400 text-center">
                        This is a preview of the addresses list. It is not yet fully implemented.
                        There is a problem with the aggregation process.
                    </p>
                </div>

                <div className="w-full alert alert-info mb-4 border border-blue-200/50 dark:border-blue-800/50 rounded-md p-4">
                    <p className="text-sm text-blue-500 dark:text-blue-400 text-center">
                        This list includes only unshielded addresses that were detected in transactions or related events.
                    </p>
                </div>

                <h1 className="text-2xl font-bold mb-4">Addresses</h1>

                <AddressList />

            </div>
        </div>
    );
}
