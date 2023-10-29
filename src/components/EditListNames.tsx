import { useState } from "react";

interface EditListNamesProps {
  albums: Record<string, any>;
  handleChartChange: any;
  handleDrag: any;
}

interface AlbumProps {
  album: Record<string, any>;
  index: number;
  handleChartChange: any;
  handleDrag: any;
}

const EditListNames = ({ albums, handleDrag }: EditListNamesProps) => {
  return (
    <div className="list-names">
      {albums.map((album: Record<string, any>, index: number) => (
        <Album
          handleDrag={handleDrag}
          index={index}
          key={album.id}
          album={album}
        />
      ))}
    </div>
  );
};

const Album = ({ album, handleDrag, index }: AlbumProps) => {
  const [isOverElement, setIsOverElement] = useState(false);
  const name = album.name;
  const artist = album.artists
    .map((artist: Record<any, any>) => artist.name)
    .join(" & ");

  const handleClassName = () => {
    let base = ["album"];
    isOverElement && base.push("over-album");
    const newClass = base.join(" ");
    return newClass;
  };

  return (
    <div
      className={handleClassName()}
      draggable="true"
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
      {name} - {artist}
    </div>
  );
};

export default EditListNames;
