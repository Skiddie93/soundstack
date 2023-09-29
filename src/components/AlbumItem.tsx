import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  MouseEvent,
} from "react";
import queryData from "@/utils/querySearch";
import { setLocalStorage, getLocalStorage } from "@/utils/useLocalStorage";
import { HtmlProps } from "next/dist/shared/lib/html-context";

interface ListItemProps {
  albumData: Record<string, any>;
  setAlbum: Dispatch<SetStateAction<Record<any, any> | undefined>>;
  listData: any[];
}

interface StackListProps {
  listData: any[];
  albumData: Record<string, any>;
  contextMenuRef: any;
}

const AlbumItem = ({ albumData, setAlbum, listData }: ListItemProps) => {
  const [contextState, setContextState] = useState<Boolean>(false);
  const openMenu = useRef<any>(null);
  const contextMenuRef = useRef<any>(null);

  const albumName = albumData.name;
  const albumCoverSmall = albumData.images[1].url;
  const albumYear = albumData.release_date.split("-")[0];
  const artist = albumData.artists
    .map((artist: Record<any, any>) => artist.name)
    .join(" & ");

  const href = albumData.href;

  const getAlbum = async () => {
    const album = await queryData(href);
    const player = document.querySelector("#player");

    if (player) {
      player.scrollIntoView({ behavior: "smooth" });
    }

    setAlbum(album);
  };

  const handleContextMenu = (e: any) => {
    e.stopPropagation();
    setContextState(true);
  };

  document.addEventListener("click", (e: any) => {
    if (!openMenu.current || !contextMenuRef.current) return;
    if (
      !openMenu.current.contains(e.target) &&
      !contextMenuRef.current.contains(e.target)
    ) {
      setContextState(false);
    }
  });

  return (
    <div className="album">
      <div onClick={getAlbum} className="album-wrapper">
        <div className="album-info-modal">
          <p className="name"> {albumName}</p>
          <p className="artist">{artist}</p>
          <p className="year"> {albumYear}</p>
          <div
            onClick={(e) => handleContextMenu(e)}
            ref={openMenu}
            className="add-album"
          >
            +
          </div>
        </div>
        <div className="album">
          <img src={albumCoverSmall} alt={albumName} />
        </div>
      </div>
      {contextState && (
        <StackListContext
          contextMenuRef={contextMenuRef}
          albumData={albumData}
          listData={listData}
        />
      )}
    </div>
  );
};

const StackListContext = ({
  listData,
  contextMenuRef,
  albumData,
}: StackListProps) => {
  interface List {
    id: string;
    name: string;
    albums: any[];
  }

  const [listName, setListName] = useState("");
  const [lists, setLists] = listData;

  const createList = (name: string) => {
    if (!listName) return;

    const newItem: List = {
      id: Math.floor(Math.random() * 100000).toString(),
      name: name,
      albums: [],
    };

    const newLists = [...lists, newItem];

    setLists(newLists);
    setListName("");

    setLocalStorage("albumsList", JSON.stringify(newLists));
  };

  const addAlbum = (key: string) => {
    setLists((prev: []) => {
      const [...clone] = prev;

      const newLists = clone.map((list: List) => {
        if (list.id == key) {
          list.albums = [...list.albums, albumData];
          return list;
        }
        return list;
      });

      setLocalStorage("albumsList", JSON.stringify(newLists));
      return newLists;
    });
  };

  return (
    <div ref={contextMenuRef} className="context-menu">
      <div className="context-menu-wrapper">
        <div className="input new-list">
          <input
            onChange={(e) => setListName(e.currentTarget.value)}
            value={listName}
            placeholder="+ New list"
            type="text"
          />
          <div onClick={() => createList(listName)} className="add">
            +
          </div>
          <div className="lists">
            <ul>
              {lists.map((item: any) => {
                return (
                  <li onClick={() => addAlbum(item.id)} key={item.id}>
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumItem;
