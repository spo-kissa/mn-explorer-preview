import BlockDetail from "./BlockDetail";

interface PageProps {
    params: Promise<{
        hash: string;
    }> | {
        hash: string;
    };
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await Promise.resolve(params);
    const hash = resolvedParams.hash;

    if (!hash) {
        return (
            <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
                <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">
                    <div>
            <h1 className="text-2xl font-bold mb-4">Block Details</h1>
            <div>Error: Hash is required</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
            <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">
                <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">Block Details</h1>
                    <BlockDetail hash={hash} />
                </div>
            </div>
        </div>
    );
}
