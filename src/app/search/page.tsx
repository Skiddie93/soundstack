"use client";
import { useEffect, useState, useContext } from "react";
import ListResults from "@/components/ListResults";
import Player from "@/components/Player";
import queryData from "@/utils/querySearch";
import { useSearchParams } from "next/navigation";
import { ToastContext } from "@/app/layout";

interface DisplayAlbumGridProps {
  setAlbum: React.Dispatch<
    React.SetStateAction<Record<string, any> | undefined>
  >;
}

export default function Page() {
  const [album, setAlbum] = useState<Record<any, any> | undefined>(undefined);

  return (
    <>
      <div className={album ? "open" : ""} id="player">
        {album && <Player album={album} />}
      </div>
      <DisplayAlbumGrid setAlbum={setAlbum} />
    </>
  );
}

const DisplayAlbumGrid = ({ setAlbum }: DisplayAlbumGridProps) => {
  const [searchData, setSearchData] = useState<Record<any, any> | undefined>(
    undefined
  );
  const [nextUrl, setNextUrl] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");

  const initToast = useContext(ToastContext) as unknown as (
    message: string,
    success: string
  ) => void;

  const searchInit = async (nextUrl: string | undefined = undefined) => {
    const queryString = encodeURIComponent(searchTerm || "");
    const url =
      nextUrl ||
      `https://api.spotify.com/v1/search?q=${queryString}&type=album&limit=12`;

    const searchResults = await queryData(url);

    if (searchResults?.albums) {
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
      const nextUrl =
        usableData.length != 0 ? searchResults.albums.next : undefined;
      setNextUrl(nextUrl);
      setSearchData((prev: []) =>
        prev ? [...prev, ...usableData] : usableData
      );
    } else {
      initToast(
        searchResults?.error?.message || "Could not fetch data",
        "error"
      );
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchInit();
      setNextUrl(undefined);
      setSearchData(undefined);
      setAlbum(undefined);
    }
  }, [searchTerm]);

  const hasResults = searchData?.length == 0 ? false : true;

  return (
    <>
      {searchData && (
        <ListResults
          urlNext={nextUrl}
          setAlbum={setAlbum}
          searchInit={searchInit}
          listData={searchData}
        />
      )}
      {hasResults === false && <div> No albums found</div>}
    </>
  );
};
