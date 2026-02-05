'use client';

import { useI18n } from "@/i18n";
import { RecentExtrinsic as RecentExtrinsicType } from "@/types/stats";
import RecentExtrinsic from "./RecentExtrinsic";

export default function RecentExtrinsics({extrinsics}: { extrinsics: RecentExtrinsicType[] })
{
    const { t } = useI18n();

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            <h2 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                {t("recentExtrinsics.title")}
            </h2>
            <ul className="w-full flex flex-col gap-2 items-center">
                {extrinsics.map((extrinsic, index) => (
                    <RecentExtrinsic key={index} ext={extrinsic} />
                ))}
            </ul>
        </div>
    );
}
