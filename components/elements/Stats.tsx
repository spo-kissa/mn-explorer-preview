"use client";

import type { Stats } from "@/types/stats";
import IconCard from "./IconCard";
import { useI18n } from "@/i18n";
import * as Icons from "@/components/icons";

export default function Stats({ stats }: { stats?: Stats | undefined }) {

    const { t } = useI18n();
    const na = t("stats.notAvailable");

    return (
        <div className="w-full flex flex-row flex-wrap gap-2 items-stretch justify-stretch mb-10">
            <IconCard 
                title={t("stats.latestBlock")}
                value={(stats?.latestBlockHeight?.toLocaleString() ?? na)} 
                icon={Icons.Block}
            />
            <IconCard 
                title={t("stats.indexedBlocks")}
                value={(stats?.indexedBlocks?.toLocaleString() ?? na)} 
                icon={Icons.Blocks}
            />
            <IconCard
                title={t("stats.totalExtrinsics")}
                value={(stats?.totalExtrinsics?.toLocaleString() ?? na)}
                icon={Icons.Extrinsic}
            />
            <IconCard 
                title={t("stats.totalTransactions")}
                value={(stats?.totalTransactions?.toLocaleString() ?? na)} 
                icon={Icons.Transaction}
            />
            <IconCard 
                title={t("stats.totalContracts")}
                value={(stats?.totalContracts?.toLocaleString() ?? na)} 
                icon={Icons.Contract}
            />
            <IconCard
                title={t("stats.totalAddresses")}
                value={(stats?.totalAddresses?.toLocaleString() ?? na)}
                icon={Icons.Address}
                href="/address"
            />
        </div>
    );
}
