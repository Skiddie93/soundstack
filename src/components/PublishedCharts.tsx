import { getLocalStorage, setLocalStorage } from "@/utils/useLocalStorage";
import { useEffect, useState } from "react";
import { List } from "@/types/types";

import Link from "next/link";

export const PublishedCharts = () => {
  const [listData, setListData] = useState<List[]>([]);

  useEffect(() => {
    setListData(JSON.parse(getLocalStorage("albumsListPublished") || "[]"));
  }, []);

  return (
    <>
      {listData.length > 0 && (
        <div className="your-lists">
          <h2 className="section-title">Your published charts</h2>
          {listData.map((item: List) => (
            <div key={item.id} className="list-item">
              <Link href={`/chart/${item.id}`}> {item.name}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
