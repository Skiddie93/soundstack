"use client";
import { setLocalStorage, getLocalStorage } from "@/utils/useLocalStorage";
import { List } from "@/types/types";



export const chartSingle = {
  
  getChart(id: string) {
    const charts: any = JSON.parse(getLocalStorage("albumsList") || "[]");
    const theChart = charts.find((i: Record<string, any>) => i.id == id);
    return theChart;
  },
  addAlbum(id: string, albumData: Record<string, any>) {
    const charts: any = JSON.parse(getLocalStorage("albumsList") || "[]");
    const newLists = charts.map((list: List) => {
      if (list.id == id) {
        list.albums = [...list.albums, albumData];
        return list;
      }
      return list;
    });

    setLocalStorage("albumsList", JSON.stringify(newLists));
    return newLists;
  },
  removeAlbum(id: string, albumData: Record<string, any>) {
    const charts: any = JSON.parse(getLocalStorage("albumsList") || "[]");
    const newLists = charts.map((list: List) => {
      if (list.id == id) {
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
  },
  setSingle(id: string, newState: Record<string, any>) {
    const charts: any = JSON.parse(getLocalStorage("albumsList") || "[]");
    const newCharts = charts.map((item: Record<string, any>) =>
      item.id == id ? newState : item
    );

    setLocalStorage("albumsList", JSON.stringify(newCharts));
  },

  createList(listName: string) {
    const charts: any = JSON.parse(getLocalStorage("albumsList") || "[]");
    if (!listName) return;

    const newItem: List = {
      id: Math.floor(Math.random() * 100000).toString(),
      name: listName,
      albums: [],
    };

    const newLists = [...charts, newItem];

    setLocalStorage("albumsList", JSON.stringify(newLists));

    return newLists;
  },
  moveToPublished(id: string) {
    const charts: any = JSON.parse(getLocalStorage("albumsList") || "[]");
    const toPublish = charts.find((item: List) => item.id == id);
    if (toPublish) {
      let publishedCharts: any[] = JSON.parse(
        getLocalStorage("albumsListPublished") || "[]"
      );
      publishedCharts.push(toPublish);

      setLocalStorage("albumsListPublished", JSON.stringify(publishedCharts));
    }
    const newCharts = charts.filter((item: List) => item.id != id);
    setLocalStorage("albumsList", JSON.stringify(newCharts));
  },
};
