"use client";
import { chartSingle } from "@/services/charts";
import { chartRequest } from "@/services/dbCharts";
import { useState, useContext } from "react";
import ListResults from "@/components/ListResults";
import Player from "@/components/Player";
import { ToastContext } from "@/app/layout";
import EditListNames from "@/components/EditListNames";
import { List } from "@/types/types";
interface PageProps {
  params: { id: string };
}
const Page = ({ params }: PageProps) => {
  const [album, setAlbum] = useState<Record<string, any> | undefined>(
    undefined
  );

  const initToast = useContext(ToastContext) as unknown as (
    message: string,
    type: string
  ) => void;

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
      dragStart(e: React.DragEvent, index: number) {
        e.dataTransfer.setData("fromIndex", index.toString());
      },
      dragDrop(e: React.DragEvent, index: number) {
        const from = parseInt(e.dataTransfer.getData("fromIndex"));
        const to = index;
        handleChartChange(from, to);
      },
      dragOver(e: React.DragEvent) {
        let event = e;
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

    const publish: any = async (chart: Record<string, any>) => {
      const req = await chartRequest.createChart(chart);

      console.log(req.message);
      const success = req.success ? "success" : "error";

      initToast(req.message, success);
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
            onClick={() => {
              publish(chart);
            }}
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
