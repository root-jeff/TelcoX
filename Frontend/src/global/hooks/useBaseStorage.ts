type KeyLocalStorage =
  | "lastPath"
  | "userAuth"
  | "theme"
  | "menuRoutes"
  | "perfilDatos";

export const useBaseLocalStorage = () => {
  const SaveData = <T>(data: T | T[], key: KeyLocalStorage): Promise<boolean> =>
    new Promise((resolve) => {
      try {
        const jsonValue = JSON.stringify(data);
        localStorage.setItem(key, jsonValue);
        resolve(true);
      } catch {
        resolve(false);
      }
    });

  const GetData = <T>(key: KeyLocalStorage): Promise<T> =>
    new Promise((resolve) => {
      let defaultValue: T = {} as T;
      const value = localStorage.getItem(key);
      if (value !== null) {
        resolve(JSON.parse(value));
      } else {
        defaultValue = ("string" === typeof defaultValue
          ? ""
          : "boolean" === typeof defaultValue
          ? false
          : "number" === typeof defaultValue
          ? 0
          : undefined) as unknown as T;
        resolve(defaultValue);
      }
    });

  const CheckData = (key: KeyLocalStorage): Promise<boolean> =>
    new Promise((resolve) => resolve(localStorage.getItem(key) !== null));

  const RemoveData = (keysArray: KeyLocalStorage[]): Promise<void> =>
    new Promise((resolve, reject) => {
      try {
        keysArray.forEach((key) => localStorage.removeItem(key));
        resolve();
      } catch (error) {
        reject(error);
      }
    });

  return { SaveData, GetData, CheckData, RemoveData };
};
