'use client';

import Link from "next/link";
import useGetExtrinsic from "@/app/hooks/useGetExtrinsic";
import { useI18n } from "@/i18n";
import { Suspense } from "react";
import JsonViewer from "./JsonViewer";
import Hash from "./client/Hash";
import { ExtrinsicColor } from "./ExtrinsicColor";

export default function ExtrinsicDetail({ block_hash, hash } : { block_hash: string; hash: string; })
{
    const { t } = useI18n();
    const { extrinsic, isLoading, error } = useGetExtrinsic(block_hash, hash, true);

    const ext = extrinsic;

    const content = () => {
        if (isLoading) {
            return <div>{t("common.loading")}</div>;
        }
        if (error) {
            return (
                <div>
                    {t("common.error")}
                </div>
            );
        }
        if (!ext) {
            return (
                <div>
                    {t("extrinsicDetail.notFound")}
                </div>
            );
        }

        return (
            <div className="max-w-7xl space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                    <h3 className="text-2xl font-bold mb-4 ml-2">
                        {t("extrinsicDetail.summary")}
                    </h3>

                    <div className="grid grid-cols-12 m-4 gap-4">
                        <div className="col-span-12">
                            <section className="mb-2">
                                <div>{t("extrinsicDetail.blockHash")}:</div>
                                <Link href={`/block/${ext.block_hash}`}>
                                    <Hash hash={ext.block_hash} short={false} />
                                </Link>
                            </section>
                            <section className="mb-2">
                                <div>{t("extrinsicDetail.hash")}:</div>
                                <Hash hash={ext.hash} short={false} />
                            </section>
                            <section className="mb-2">
                                <div>{t("extrinsicDetail.indexInBlock")}:</div>
                                <span className="font-mono text-sm">
                                    {ext.index_in_block.toLocaleString()}
                                </span>
                            </section>
                            <section className="mb-2">
                                <div>{t("extrinsicDetail.section")}:</div>
                                <ExtrinsicColor section={ext.section} method={ext.method} showMethod={false} />
                            </section>
                            <section className="mb-2">
                                <div>{t("extrinsicDetail.method")}:</div>
                                <ExtrinsicColor section={ext.section} method={ext.method} showSection={false} />
                            </section>
                            <section className="mb-2">
                                <div>{t("extrinsicDetail.signer")}:</div>
                                <span className="font-mono text-sm">
                                    {ext.signer}
                                </span>
                            </section>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 ml-2">
                        {t("extrinsicDetail.args")}
                    </h3>
                    <div className="text-sm font-mono m-4">
                        <JsonViewer data={ext.args} defaultExpanded={true} />
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 ml-2">
                        {t("extrinsicDetail.rawData")}
                    </h3>
                    <div className="text-sm font-mono m-4">
                        <JsonViewer data={ext.raw} defaultExpanded={true} />
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 ml-2">
                        {t("extrinsicDetail.data")}
                    </h3>
                    <div className="text-xs font-mono break-all m-4">
                        {ext.data ? ext.data : t("extrinsicDetail.noData")}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{t("extrinsicDetail.title")}</h1>

            <Suspense fallback={<div>{t("common.loading")}</div>}>
                {content()}
            </Suspense>
        </div>
    )
}
