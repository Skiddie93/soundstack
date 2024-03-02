"use client";
import { useEffect, useState } from "react";
import EditListResults from "@/components/EditListResults";
import Player from "@/components/Player";
import queryData from "@/utils/querySearch";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [searchData, setSearchData] = useState<Record<any, any>>([]);

  const [album, setAlbum] = useState<Record<any, any> | undefined>(undefined);
  const [nextUrl, setNextUrl] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");

  const searchInit = async (nextUrl: string | undefined = undefined) => {
    const queryString = encodeURIComponent(searchTerm || "");
    const url =
      nextUrl ??
      `https://api.spotify.com/v1/search?q=${queryString}&type=album&limit=12`;
    const searchResults = await queryData(url);
    if (searchResults) {
      const usableData = searchResults.albums.items.map(
        (item: Record<string, any>) => {
          return {
            id: item.id,
            external_urls: { spotify: item.external_urls.spotify },
            name: item.name,
            images: item.images,
            release_date: item.release_date,
            artists: item.artists,
            href: item.href,
          };
        }
      );
      const nextUrl = usableData.length ? searchResults.albums.next : undefined;
      setNextUrl(nextUrl);
      setSearchData((prev: []) => [...prev, ...usableData]);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setSearchData([]);
      setNextUrl(undefined);
      searchInit();
    }
  }, [searchTerm]);

  const fetchNextBatch = async () => {
    if (!nextUrl) return;
    const newBatch = await queryData(nextUrl);

    if (!newBatch) return;
    const newItems = newBatch.albums.items;
    setSearchData((prev: []) => [...prev, ...newItems]);
  };

  return (
    <>
      <div className={album ? "open" : ""} id="player">
        {album && <Player album={album} />}
      </div>
      {searchData && (
        <EditListResults
          urlNext={nextUrl}
          setAlbum={setAlbum}
          searchInit={searchInit}
          listData={searchData}
        />
      )}
    </>
  );
}
