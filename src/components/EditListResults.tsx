import { useEffect, useState, Dispatch, SetStateAction } from "react";
import AlbumItem from "./AlbumItem";

interface ListResultsPorps {
  listData: Record<any, any>;
  setAlbum: Dispatch<SetStateAction<Record<any, any> | undefined>>;
  handleDrag: any;
}

const EditListResults = ({
  listData,
  setAlbum,
  handleDrag,
}: ListResultsPorps) => {
  return (
    <div className="album-list">
      <div className="search-results">
        {listData.map((item: Record<any, any>, index: number) => {
          return (
            <div
              key={item.id}
              draggable="true"
              onDrop={(e) => handleDrag.dragDrop(e, index)}
              onDragOver={(e) => handleDrag.dragOver(e)}
              onDragStart={(e) => {
                handleDrag.dragStart(e, index);
              }}
            >
              <AlbumItem editMode={true} setAlbum={setAlbum} albumData={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditListResults;
