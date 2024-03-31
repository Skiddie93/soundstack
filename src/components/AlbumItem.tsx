import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import queryData from "@/utils/querySearch";
import StackListContext from "./StackListContext";
import { IoMdAdd } from "react-icons/io";
import { ToastContext } from "@/app/layout";

interface ListItemProps {
  albumData: Record<string, any>;
  setAlbum: Dispatch<SetStateAction<Record<any, any> | undefined>>;
  editMode?: Boolean;
}

const AlbumItem = ({ albumData, setAlbum, editMode }: ListItemProps) => {
  const [contextState, setContextState] = useState<Boolean>(false);
  const openMenu = useRef<any>(null);
  const contextMenuRef = useRef<any>(null);
  const initToast = useContext(ToastContext) as unknown as (
    message: string,
    success: string
  ) => void;

  const albumName = albumData.name;
  const albumCoverSmall = albumData.images[1]?.url || "";
  const albumYear = albumData.release_date.split("-")[0];
  const artist = albumData.artists
    .map((artist: Record<any, any>) => artist.name)
    .join(" & ");

  const href = albumData.href;

  const closeContextMenu = (e: Event) => {
    if (!openMenu.current || !contextMenuRef.current) return;
    if (
      !openMenu.current.contains(e.target) &&
      !contextMenuRef.current.contains(e.target)
    ) {
      setContextState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeContextMenu);

    return () => {
      document.removeEventListener("click", closeContextMenu);
    };
  }, []);

  const getAlbum = async () => {
    const album = await queryData(href);
    const player = document.querySelector("#player");

    if (player) {
      player.scrollIntoView({ behavior: "smooth" });
    }

    album?.error
      ? initToast(album?.error?.message || "Could not fetch data", "error")
      : setAlbum(album);
  };

  const openContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    setContextState(!contextState);
  };

  return (
    <div className="album">
      <div onClick={getAlbum} className="album-wrapper">
        <div className="album-info-modal">
          <p className="name"> {albumName}</p>
          <p className="artist">{artist}</p>
          <p className="year"> {albumYear}</p>
          {!editMode && (
            <div
              onClick={(e) => openContextMenu(e)}
              ref={openMenu}
              className="add-album"
            >
              <IoMdAdd />
            </div>
          )}
        </div>
        <div className="album">
          <img src={albumCoverSmall} alt={albumName} />
        </div>
      </div>
      {contextState && (
        <StackListContext
          contextMenuRef={contextMenuRef}
          albumData={albumData}
        />
      )}
    </div>
  );
};

export default AlbumItem;
