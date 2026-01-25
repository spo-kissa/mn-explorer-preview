export default async function Page({ 
    params 
}: { 
    params: Promise<{ hash: string }> 
}) {
    const { hash } = await params;

    return (
        <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
            <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Block Details</h1>
                    <p className="font-mono text-sm">Hash: {hash}</p>
                </div>
            </div>
        </div>
    );
}
