import { Dispatch, SetStateAction } from "react";
import AlbumItem from "./AlbumItem";

interface ListResultsPorps {
  listData: Record<any, any>;
  setAlbum: Dispatch<SetStateAction<Record<any, any> | undefined>>;
  handleDrag?: any;
  editMode?: boolean;
  extraClass?: string;
}

const EditListResults = ({
  listData,
  setAlbum,
  handleDrag,
  editMode,
  extraClass,
}: ListResultsPorps) => {
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
      </div>
    </div>
  );
};

export default EditListResults;
