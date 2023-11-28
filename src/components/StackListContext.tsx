import { useState, useEffect } from "react";
import { getLocalStorage } from "@/utils/useLocalStorage";
import { IoMdAdd } from "react-icons/io";
import onClickEnter from "@/utils/onClickEnter";
import { chartSingle } from "@/services/charts";

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
    const newLists = chartSingle.createList(name);

    if (newLists) {
      setLists(newLists);
      setListName("");
    }
  };

  const addAlbum = (key: string) => {
    const newCharts = chartSingle.addAlbum(key, albumData);
    setLists(newCharts);
  };

  const removeAlbum = (key: string) => {
    const newCharts = chartSingle.removeAlbum(key, albumData);
    setLists(newCharts);
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
