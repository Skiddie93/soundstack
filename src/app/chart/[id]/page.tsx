"use client";
import { chartRequest } from "@/services/dbCharts";
import { useEffect, useState } from "react";
import EditListResults from "@/components/EditListResults";
import Player from "@/components/Player";
import EditListNames from "@/components/EditListNames";
import { saveDivAsImage } from "@/utils/screenPhoto";
import { IoCamera } from "react-icons/io5";
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
          {chart ? (
            <>
              <div className="title-bar">
                <h1>{chart.name}</h1>
                <div onClick={saveDivAsImage}>
                  <IoCamera />
                </div>
              </div>
              <div className="chart-wrapper">
                <EditListResults setAlbum={setAlbum} listData={chart.albums} />
                <EditListNames setAlbum={setAlbum} albums={chart.albums} />
              </div>
            </>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </>
  );
};

export default page;
