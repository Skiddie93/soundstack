export const setLocalStorage = (key: string, value: string) => {
  if (typeof window != "undefined") {
    console.log('set with ', key, value);
    
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window != "undefined") {
    console.log(localStorage.getItem(key));

    return localStorage.getItem(key);
  }
};
