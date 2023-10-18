import { useState, useEffect } from "react";
import { setLocalStorage } from "@/utils/useLocalStorage";
import { IoMdAdd } from "react-icons/io";
import { List } from "@/types/types";
import onClickEnter from "@/utils/onClickEnter";
import { getLocalStorage } from "@/utils/useLocalStorage";

interface StackListProps {
  albumData: Record<string, any>;
  contextMenuRef: any;
}

const StackListContext = ({ contextMenuRef, albumData }: StackListProps) => {
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState(
    JSON.parse(getLocalStorage("albumsList") || "[]")
  );
  const [inLists, setInLists] = useState<string[]>([]);

  const isInList = (key: string, inLists: string[]) => inLists.includes(key);

  useEffect(() => {
    setInLists((prev) => {
      const findAlbums = lists.filter((list: Record<string, any>) => {
        const isInList = list.albums.find(
          (album: Record<string, any>) => albumData.id == album.id
        );
        if (isInList) {
          return true;
        } else {
          return false;
        }
      });

      const newState = findAlbums.map((item: Record<string, any>) => item.id);

      return newState;
    });
  }, [lists]);

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
      const newLists = prev.map((list: List) => {
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

  const removeAlbum = (key: string) => {
    setLists((prev: []) => {
      const newLists = prev.map((list: List) => {
        if (list.id == key) {
          const removeAlbum = list.albums.filter(
            (album) => album.id != albumData.id
          );
          list.albums = removeAlbum;
          return list;
        } else {
          return list;
        }
      });
      setLocalStorage("albumsList", JSON.stringify(newLists));
      return newLists;
    });
  };

  return (
    <div ref={contextMenuRef} className="context-menu">
      <div className="context-menu-wrapper">
        <div className="lists">
          <ul>
            {lists.map((item: any) => {
              const occupied = isInList(item.id, inLists);
              return (
                <li
                  className={occupied ? "occupied" : ""}
                  onClick={() =>
                    occupied ? removeAlbum(item.id) : addAlbum(item.id)
                  }
                  key={item.id}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="input-text new-list">
          <input
            onChange={(e) => setListName(e.currentTarget.value)}
            onKeyPress={(e) => onClickEnter(e, () => createList(listName))}
            value={listName}
            placeholder=""
            type="text"
          />
          <IoMdAdd onMouseDown={() => createList(listName)} />
        </div>
      </div>
    </div>
  );
};

export default StackListContext;
