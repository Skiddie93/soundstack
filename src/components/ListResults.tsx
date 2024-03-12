import { Dispatch, SetStateAction, useState } from "react";
import AlbumItem from "./AlbumItem";

interface LoadingPorps {
  urlNext: string;
  searchInit: (urlNext: string) => void;
}

interface ListResultsPorps {
  listData: Record<any, any>;
  searchInit?: (urlNext: string) => void;
  setAlbum: Dispatch<SetStateAction<Record<any, any> | undefined>>;
  handleDrag?: any;
  editMode?: boolean;
  extraClass?: string;
  urlNext?: string;
}

const ListResults = ({
  listData,
  searchInit,
  setAlbum,
  handleDrag,
  editMode,
  extraClass,
  urlNext,
}: ListResultsPorps) => {
  const Loading = ({ urlNext, searchInit }: LoadingPorps) => {
    return (
      <div className="load-more">
        <div onClick={() => searchInit(urlNext)} className="button">
          Load more
        </div>
      </div>
    );
  };

  return (
    <div className={extraClass ? extraClass + " album-list" : "album-list"}>
      <div className="search-results">
        {listData &&
          listData.map((item: Record<any, any>, index: number) => {
            const key = item.id + index.toString();
            return (
              <div
                className="album-envelope"
                key={key}
                draggable={editMode}
                onDrop={(e) => {
                  handleDrag && handleDrag.dragDrop(e, index);
                }}
                onDragOver={(e) => {
                  handleDrag && handleDrag.dragOver(e);
                }}
                onDragStart={(e) => {
                  handleDrag && handleDrag.dragStart(e, index);
                }}
              >
                <AlbumItem
                  editMode={editMode}
                  setAlbum={setAlbum}
                  albumData={item}
                />
              </div>
            );
          })}

        {searchInit && urlNext && (
          <Loading searchInit={searchInit} urlNext={urlNext} />
        )}
      </div>
    </div>
  );
};

export default ListResults;
