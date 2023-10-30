"use client";
import { chartSingle } from "@/services/charts";
import { chartRequest } from "@/services/dbCharts";
import { useState } from "react";
import EditListResults from "@/components/EditListResults";
import Player from "@/components/Player";
import EditListNames from "@/components/EditListNames";
interface PageProps {
  params: { id: string };
}
const Page = ({ params }: PageProps) => {
  const data = chartSingle.getSnapshot(params.id);
  const [chart, setChart] = useState(data);
  const [album, setAlbum] = useState<Record<any, any> | undefined>(undefined);
  const albums = chart ? chart.albums : undefined;

  const handleChartChange = (from: number, to: number) => {
    setChart((prev: Record<string, any>) => {
      if (from === to) return prev;

      const { ...newState }: Record<string, any> = prev;
      const element = newState.albums[from];
      newState.albums.splice(from, 1);
      newState.albums.splice(to, 0, element);

      chartSingle.setSingle(params.id, newState);
      return newState;
    });
  };

  const handleDrag = {
    dragStart(e: any, index: number) {
      e.dataTransfer.setData("fromIndex", index);
    },
    dragDrop(e: any, index: number) {
      const from = parseInt(e.dataTransfer.getData("fromIndex"));
      const to = index;
      handleChartChange(from, to);
    },
    dragOver(e: any) {
      let event = e as Event;
      event.stopPropagation();
      event.preventDefault();
    },
  };

  return (
    <>
      <div className={album ? "open" : ""} id="player">
        {album && <Player album={album} />}
      </div>
      <div className="editor-view">
       
        <EditListResults
          handleDrag={handleDrag}
          listData={albums}
          setAlbum={setAlbum}
          editMode={true}
        />
        <EditListNames
          handleDrag={handleDrag}
          albums={albums}
          editMode={true}
        />
      </div>
      <h1 onClick={() => chartRequest.createChart(chart)}>WRITE DOC</h1>
    </>
  );
};

export default Page;
