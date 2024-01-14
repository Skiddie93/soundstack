"use client";

let target: any = null;
let listeners: any[] = [];

if (typeof window !== "undefined") {
  document.addEventListener("click", (e) => {
    clickTarget.setClickTarget(e);
  });
}

const emitChange = () => {
  listeners.forEach((listener: any) => listener());
};

export const clickTarget = {
  setClickTarget(e: MouseEvent) {
    target = e.target;
    emitChange();
  },
  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners.filter((item) => item != listener);
    };
  },
  getSnapshot() {
    return target;
  },
};
