import { Dispatch, SetStateAction } from "react";
import AlbumItem from "./AlbumItem";

interface ListResultsPorps {
  listData: Record<any, any>;
  setAlbum: Dispatch<SetStateAction<Record<any, any> | undefined>>;
  handleDrag?: any;
  editMode?: boolean;
}

const EditListResults = ({
  listData,
  setAlbum,
  handleDrag,
  editMode,
}: ListResultsPorps) => {
  return (
    <div className="album-list">
      <div className="search-results">
        {listData &&
          listData.map((item: Record<any, any>, index: number) => {
            return (
              <div
                className="album-envelope"
                key={item.id}
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
