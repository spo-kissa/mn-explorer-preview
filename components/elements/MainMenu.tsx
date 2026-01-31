import { useI18n } from "@/i18n";
import Link from "next/link";

export default function MainMenu() {
    const { t } = useI18n();

    return (
        <nav className="flex flex-justify-end text-sm">
            <span className="text-medium">
                {t("header.blocks")}
            </span>
            &nbsp;/&nbsp;
            <span className="text-medium">
                {t("header.transactions")}
            </span>
            &nbsp;/&nbsp;
            <span className="text-medium">
                {t("header.contracts")}
            </span>
            &nbsp;/&nbsp;
            <span className="text-medium">
                <Link href="/address" className="hover:opacity-80 transition-opacity">{t("header.addresses")}</Link>
            </span>
        </nav>
    );
}
