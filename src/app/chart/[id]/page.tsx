"use client";
import { chartRequest } from "@/services/dbCharts";
import { useEffect, useState } from "react";
import EditListResults from "@/components/EditListResults";
import Player from "@/components/Player";
import EditListNames from "@/components/EditListNames";
import { saveDivAsImage } from "@/utils/screenPhoto";

interface PageProps {
  params: { id: string };
}

export const page = ({ params }: PageProps) => {
  const [chart, setChart] = useState<any>(undefined);
  const [album, setAlbum] = useState<Record<any, any> | undefined>(undefined);

  const getChart = async () => {
    const req = await chartRequest.getChart(params.id);
    setChart(req);
  };

  useEffect(() => {
    getChart();
  }, []);

  return (
    <>
      <div className={album ? "open" : ""} id="player">
        {album && <Player album={album} />}
      </div>

      <div id="chart" className="chart">
        <div className="inner">
          <h1>{chart ? chart.name : "Loading"}</h1>

          {chart && (
            <div className="chart-wrapper">
              <EditListResults setAlbum={setAlbum} listData={chart.albums} />
              <EditListNames setAlbum={setAlbum} albums={chart.albums} />
            </div>
          )}
        </div>
      </div>
      <button onClick={saveDivAsImage}>Take Photo</button>
    </>
  );
};

export default page;
