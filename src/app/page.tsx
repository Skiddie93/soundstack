"use client";
import EditListResults from "@/components/EditListResults";
import Player from "@/components/Player";
import { useEffect, useState } from "react";

export default function Page() {
  const [chart, setChart] = useState<any>(undefined);
  const [album, setAlbum] = useState<Record<any, any> | undefined>(undefined);

  const getData = async () => {
    const req = await fetch("./data/albums/2002.json");
    const data = await req.json();

    setChart(data);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(chart);

  return (
    <>
      <div className={album ? "open" : ""} id="player">
        {album && <Player album={album} />}
      </div>

      <div id="chart" className="chart">
        <div className="inner">
          {chart ? (
            <>
              <div className="chart-wrapper">
                <EditListResults setAlbum={setAlbum} listData={chart} />
              </div>
            </>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </>
  );
}
