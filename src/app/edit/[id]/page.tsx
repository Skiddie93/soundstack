"use client";
import { chartSingle } from "@/services/charts";
import { chartRequest } from "@/services/dbCharts";
import { useState } from "react";
import ListResults from "@/components/ListResults";
import Player from "@/components/Player";
import EditListNames from "@/components/EditListNames";
import { List } from "@/types/types";
interface PageProps {
  params: { id: string };
}
const Page = ({ params }: PageProps) => {
  const [album, setAlbum] = useState<Record<any, any> | undefined>(undefined);

  const Editor = () => {
    const data = chartSingle.getChart(params.id);
    const [chart, setChart] = useState(data);

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

    const removeAlbum = (id: string) => {
      setChart((prev: List) => {
        const { ...newState } = prev;
        const newAlbums = newState.albums.filter((item) => item.id != id);
        newState.albums = newAlbums;

        chartSingle.setSingle(params.id, newState);
        return newState;
      });
    };

    return (
      <>
        <div className="editor-view">
          <ListResults
            handleDrag={handleDrag}
            listData={albums}
            setAlbum={setAlbum}
            editMode={true}
          />
          <EditListNames
            handleDrag={handleDrag}
            albums={albums}
            editMode={true}
            removeAlbum={removeAlbum}
          />
        </div>
        {chart && albums.length > 0 && (
          <div
            className="button editor-button"
            onClick={() => chartRequest.createChart(chart)}
          >
            PUBLISH
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className={album ? "open" : ""} id="player">
        {album && <Player album={album} />}
      </div>
      <Editor />
    </>
  );
};

export default Page;
