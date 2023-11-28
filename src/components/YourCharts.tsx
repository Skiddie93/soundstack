import { getLocalStorage, setLocalStorage } from "@/utils/useLocalStorage";
import { useEffect, useState } from "react";
import { List } from "@/types/types";
import { IoMdAdd } from "react-icons/io";
import Chart from "@/components/Chart";
import onClickEnter from "@/utils/onClickEnter";
import { chartSingle } from "@/services/charts";
export const YourCharts = () => {
  const [listData, setListData] = useState<List[]>([]);
  const [listName, setListName] = useState("");

  useEffect(() => {
    setListData(JSON.parse(getLocalStorage("albumsList") || "[]"));
  }, []);

  const addList = (name: string) => {
    const newLists = chartSingle.createList(name);

    if (newLists) {
      setListData(newLists);
      setListName("");
    }
  };

  return (
    <>
      <div className="your-lists">
        <h2 className="section-title">Your charts</h2>
        {listData.length > 0 &&
          listData.map((item: List) => (
            <Chart key={item.id} list={item} setListData={setListData} />
          ))}
        <div className="input-text chart-input">
          <input
            type="text"
            onBlur={() => setListName("")}
            onKeyPress={(e) => onClickEnter(e, () => addList(listName))}
            onChange={(e) => {
              setListName(e.currentTarget.value);
            }}
            value={listName}
          />
          <IoMdAdd onMouseDown={() => addList(listName)} />
        </div>
      </div>
    </>
  );
};
