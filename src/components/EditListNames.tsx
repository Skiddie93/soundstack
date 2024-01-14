import { useState } from "react";
import queryData from "@/utils/querySearch";
import { IoMdRemove } from "react-icons/io";

interface EditListNamesProps {
  albums: Record<string, any> | undefined;
  handleDrag?: any;
  editMode?: boolean;
  setAlbum?: any;
  removeAlbum?: (id: string) => void;
}

interface AlbumProps {
  album: Record<string, any>;
  index: number;
  handleDrag?: any;
  editMode?: boolean;
  setAlbum?: any;
  removeAlbum?: (id: string) => void;
}

const EditListNames = ({
  albums,
  handleDrag,
  editMode,
  setAlbum,
  removeAlbum,
}: EditListNamesProps) => {
  return (
    <div className="list-names">
      {albums &&
        albums.map((album: Record<string, any>, index: number) => (
          <Album
            handleDrag={handleDrag}
            index={index}
            key={album.id}
            album={album}
            editMode={editMode}
            setAlbum={setAlbum}
            removeAlbum={removeAlbum}
          />
        ))}
    </div>
  );
};

const Album = ({
  album,
  handleDrag,
  index,
  editMode,
  setAlbum,
  removeAlbum,
}: AlbumProps) => {
  const [isOverElement, setIsOverElement] = useState(false);
  const name = album.name;
  const artist = album.artists
    .map((artist: Record<any, any>) => artist.name)
    .join(" & ");

  const href = album.href;

  const handleClassName = () => {
    let base = ["album", "album-edit"];
    isOverElement && base.push("over-album");
    const newClass = base.join(" ");
    return newClass;
  };

  const getAlbum = async () => {
    const album = await queryData(href);
    const player = document.querySelector("#player");

    if (player) {
      player.scrollIntoView({ behavior: "smooth" });
    }

    setAlbum(album);
  };

  return (
    <div
      onClick={() => {
        setAlbum && getAlbum();
      }}
      className={handleClassName()}
      draggable={editMode}
      onDragStart={(e) => handleDrag.dragStart(e, index)}
      onDrop={(e) => {
        handleDrag.dragDrop(e, index);
        setIsOverElement(false);
      }}
      onDragOver={(e) => {
        handleDrag.dragOver(e);
        setIsOverElement(true);
      }}
      onDragLeave={() => setIsOverElement(false)}
    >
      <div className="flex-center-vertical gap-12">
        <div>
          {name} - {artist}
        </div>
        {editMode && (
          <div className="remove">
            <IoMdRemove onClick={() => removeAlbum && removeAlbum(album.id)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditListNames;
