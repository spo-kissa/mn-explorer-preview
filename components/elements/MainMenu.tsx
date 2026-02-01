import { useI18n } from "@/i18n";
import Link from "next/link";

type MainMenuProps = {
    /** 縦並び（モバイルドロワー用） */
    vertical?: boolean;
    /** 画面遷移時に呼ぶ（オーバーレイを閉じる用） */
    onClose?: () => void;
};

export default function MainMenu({ vertical = false, onClose }: MainMenuProps) {
    const { t } = useI18n();

    const linkClass = "font-medium hover:opacity-80 transition-opacity";
    const items = [
        { label: t("header.blocks"), href: null },
        { label: t("header.transactions"), href: null },
        { label: t("header.contracts"), href: null },
        { label: t("header.addresses"), href: "/address" },
    ] as const;

    if (vertical) {
        return (
            <nav className="flex flex-col gap-3 text-sm">
                {items.map(({ label, href }, i) =>
                    href ? (
                        <Link
                            key={i}
                            href={href}
                            className={linkClass}
                            onClick={onClose}
                        >
                            {label}
                        </Link>
                    ) : (
                        <span key={label} className={linkClass}>
                            {label}
                        </span>
                    )
                )}
            </nav>
        );
    }

    return (
        <nav className="flex justify-end text-xs">
            {items.map((item, i) => (
                <span key={i}>
                    {i > 0 && <>&nbsp;/&nbsp;</>}
                    {item.href ? (
                        <Link href={item.href} className={linkClass}>
                            {item.label}
                        </Link>
                    ) : (
                        <span className={linkClass}>{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
