import CopyToClipboard from "@/components/elements/CopyToClipboard";

interface HashProps {
    hash: string;
    short?: boolean;
    length?: number;
    className?: string;
}

/**
 * Hash component
 * If short is true, display the hash in short form, otherwise display the full hash
 * @param hash - The hash to display
 * @param short - Whether to display the hash in short form
 * @param length - The length of the hash to display (default is 6)
 * @param className - The class name to apply to the component
 * @returns The Hash component
 */
export default function Hash({ hash, short = true, length = 4, className = "" }: HashProps) {

    if (short) {
        return (
            <span className={`font-mono text-xs ${className}`}>
                {hash.slice(0, length + 2)}...{hash.slice(-length)}
                <CopyToClipboard text={hash} />
            </span>
        );
    }

    return (
        <span className={`font-mono text-xs ${className}`}>
            {hash}
            <CopyToClipboard text={hash} />
        </span>
    );
}
