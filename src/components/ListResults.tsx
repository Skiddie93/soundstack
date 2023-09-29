import { useEffect, useState, Dispatch, SetStateAction } from "react";
import queryData from "@/utils/querySearch";
import { setLocalStorage, getLocalStorage } from "@/utils/useLocalStorage";
import AlbumItem from "./AlbumItem";

interface ListResultsPorps {
  searchData: Record<any, any>;
  setAlbum: Dispatch<SetStateAction<Record<any, any> | undefined>>;
}

const ListResults = ({ searchData, setAlbum }: ListResultsPorps) => {
  const [items, setItems] = useState(searchData.albums.items);
  const [urlNext, setUrlNext] = useState(searchData.albums.next);
  const [loading, setLodaing] = useState(false);

  const [listData, setListData] = useState(
    JSON.parse(getLocalStorage("albumsList") || "[]")
  );

  useEffect(() => {
    setItems(searchData.albums.items);
    setUrlNext(searchData.albums.next);
  }, [searchData]);

  const fetchNextBatch = async () => {
    setLodaing(true);
    const newBatch = await queryData(urlNext);

    if (!newBatch) return;
    const newItems = newBatch.albums.items;
    const newNextUrl = newBatch.albums.next;
    setItems((prev: []) => [...prev, ...newItems]);

    if (newItems.length > 0) {
      setUrlNext((prev: string) => newNextUrl);
    } else {
      setUrlNext(false);
    }
    setLodaing(false);
  };

  return (
    <div>
      {items.length ? (
        <div className="search-results">
          {items.map((item: Record<any, any>) => {
            return (
              <AlbumItem
                key={item.id}
                listData={[listData, setListData]}
                setAlbum={setAlbum}
                albumData={item}
              />
            );
          })}
          <div className="load-more">
            {!loading && urlNext && (
              <div onClick={fetchNextBatch} className="button">
                Load more
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-results">
          <p> No albums found</p>
        </div>
      )}
    </div>
  );
};

export default ListResults;