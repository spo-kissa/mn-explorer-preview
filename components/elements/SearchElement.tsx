"use client";

import SearchBox from "./SearchBox";

export default function SearchElement() {
    const handleSearch = (type: string, query: string) => {
        console.log("Search triggered:", { type, query });
        // ここで検索処理を実装できます
        // 例: API呼び出し、ルーティングなど
    };

    return (
        <div className="w-full mb-10 flex flex-row gap-2 items-center">
            <SearchBox onSearch={handleSearch} />
        </div>
    );
}
