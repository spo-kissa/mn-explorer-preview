'use client';

import { useI18n} from "@/i18n";
import AddressSummary from "./AddressSummary";
import AddressTransaction from "./AddressTransaction";

export default function AddressDetail({ address, transactions }: { address: any; transactions: any[] })
{
    const { t } = useI18n();

    return (
        <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
            <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">
                <div className="w-full mb-4">
                    <h1 className="text-2xl font-bold mb-4">{t("addressDetail.title")}</h1>

                    <AddressSummary address={address} />

                </div>
                <div className="w-full">
                    <div className="">
                        <h2 className="text-lg font-bold mb-2">
                            {t("addressDetail.transactions")}
                        </h2>
                        <div>
                            <div className="grid grid-cols-12 w-full border rounded-t-md border-gray-200 dark:border-gray-700 p-3 px-4">
                                <h3 className="text-sm font-bold col-span-1 text-center">
                                    {t("addressDetail.no")}
                                </h3>
                                <h3 className="text-sm font-bold col-span-8 text-center">
                                    {t("addressDetail.hash")}
                                </h3>
                                <h3 className="text-sm font-bold col-span-3 text-center">
                                    {t("addressDetail.timestamp")}
                                </h3>
                            </div>
                            {transactions.length > 0 ? (
                                transactions.map((tx, index) => (
                                    <AddressTransaction key={tx.id} index={index} transaction={tx} />
                                ))
                            ) : (
                                <div className="text-center text-gray-500 dark:text-gray-400 border border-t-0 rounded-b-md border-gray-200 dark:border-gray-700 p-3 px-4">
                                    {t("addressDetail.noTransactionsFound")}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
