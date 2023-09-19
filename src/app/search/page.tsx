"use client";
import { useEffect, useState } from "react";

import Search from "@/components/Search";
import ListResults from "@/components/ListResults";
import Player from "@/components/Player";

export default function Page() {
  const [searchData, setSearchData] = useState<undefined | Record<any, any>>(
    undefined
  );

  const [album, setAlbum] = useState<Record<any, any> | undefined>(undefined);

  useEffect(() => {
    setAlbum(undefined);
  }, [searchData]);

  return (
    <>
      <Search setSearchData={setSearchData} />
      <div className={album ? "open" : ""} id="player">
        {album && <Player album={album} />}
      </div>
      {searchData && (
        <ListResults setAlbum={setAlbum} searchData={searchData} />
      )}
    </>
  );
}
