import { IoMdRemove } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { setLocalStorage } from "@/utils/useLocalStorage";
import { List } from "@/types/types";
import { useState, useEffect } from "react";
import isVisible from "@/utils/useIsVisible";
import Link from "next/link";

interface ChartProps {
  list: Record<string, any>;
  setListData: any;
}

export const Chart = ({ list, setListData }: ChartProps) => {
  const [inputValue, setInputValue] = useState(list.name);
  const visibility = isVisible();

  const editorPath = `/edit/${list.id}`;

  const LinkData = {};

  useEffect(() => {
    if (!visibility.visible) setInputValue(list.name);
  }, [visibility.visible]);

  const editListName = (id: string, newName: string) => {
    setListData((prev: Record<string, any>) => {
      const newList = prev.map((item: List) => {
        if (item.id == id) {
          item.name = newName;
          return item;
        } else {
          return item;
        }
      });
      setLocalStorage("albumsList", JSON.stringify(newList));
      return newList;
    });
  };

  const removeList = (id: string) => {
    setListData((prev: Record<string, any>) => {
      const newList = prev.filter((item: List) => item.id != id);
      setLocalStorage("albumsList", JSON.stringify(newList));
      return newList;
    });
  };

  return (
    <div ref={visibility.element} className="list-item" key={list.id}>
      {!visibility.visible ? (
        <>
          <Link href={editorPath}>{list.name}</Link>{" "}
          <small>({list.albums.length})</small>
        </>
      ) : (
        <>
          <input
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="input"
            type="text"
            value={inputValue}
          />
        </>
      )}

      <div className="tools">
        <div>
          <AiOutlineCheck
            onClick={() => {
              editListName(list.id, inputValue);
              visibility.setVisible(false);
            }}
            className={visibility.visible ? "" : "hide"}
          />
          <MdModeEditOutline
            onClick={() => visibility.setVisible(true)}
            className={visibility.visible ? "hide" : ""}
          />
        </div>
        <div>
          {!visibility.visible && (
            <IoMdRemove onClick={() => removeList(list.id)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
