"use client";
import { setLocalStorage, getLocalStorage } from "@/utils/useLocalStorage";

let chart: any = JSON.parse(getLocalStorage("albumsList") || "[]");
let listeners: any[] = [];

const emitChange = (listeners: any[]) => {
  listeners.forEach((listener: any) => listener());
};

export const charts = {
  setClickTarget() {
    emitChange(listeners);
  },
  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners.filter((item) => item != listener);
    };
  },
  getSnapshot() {
    return chart;
  },
  getOne(id: string) {
    const theChart = chart.find((i: Record<string, any>) => i.id == id);
    return theChart;
  },
};

export const chartSingle = {
  setClickTarget() {},
  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners.filter((item) => item != listener);
    };
  },
  getSnapshot(id: string) {
    const theChart = chart.find((i: Record<string, any>) => i.id == id);
    return theChart;
  },
  setSingle(id: string, newState: Record<string, any>) {
    const newCharts = chart.map((item: Record<string, any>) =>
      item.id == id ? newState : item
    );

    setLocalStorage("albumsList", JSON.stringify(newCharts));
  },
};
