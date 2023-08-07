export function setLocalStorage(key: string, value: any) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
}
