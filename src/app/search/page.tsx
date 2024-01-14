"use client";
import { useEffect, useState } from "react";
import ListResults from "@/components/ListResults";
import Player from "@/components/Player";
import queryData from "@/utils/querySearch";
import { useSearchParams } from "next/navigation";


export default function Page() {
  const [searchData, setSearchData] = useState<undefined | Record<any, any>>(
    undefined
  );

  const [album, setAlbum] = useState<Record<any, any> | undefined>(undefined);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");

  const searchInit = async () => {
    const queryString = encodeURIComponent(searchTerm || "");
    const url = `https://api.spotify.com/v1/search?q=${queryString}&type=album&limit=12`;
    const searchResults = await queryData(url);
    if (setSearchData) {
      setSearchData(searchResults);
    }
  };

  useEffect(() => {
    setAlbum(undefined);
  }, [searchData]);

  useEffect(() => {
    if (searchTerm) {
      searchInit();
    }
  }, [searchTerm]);

  console.log(searchData);

  return (
    <>
      <div className={album ? "open" : ""} id="player">
        {album && <Player album={album} />}
      </div>
      {searchData && (
        <ListResults setAlbum={setAlbum} searchData={searchData} />
      )}
    </>
  );
}
