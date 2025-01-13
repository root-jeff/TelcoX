import { useBaseLocalStorage } from "./useBaseStorage";
import { UserAuthInterface } from "../../security/interfaces";

export const useAuthStorage = () => {
  const { SaveData, GetData, CheckData, RemoveData } = useBaseLocalStorage();

  const SaveJWTInfo = async (data: UserAuthInterface) =>
    await SaveData(data, "userAuth");

  const GetJWTInfo = async (): Promise<UserAuthInterface> =>
    await GetData<UserAuthInterface>("userAuth");

  const CheckJWTInfo = async (): Promise<boolean> =>
    await CheckData("userAuth");

  const DeleteJWTInfo = async (): Promise<void> =>
    await RemoveData(["userAuth"]);

  const SaveLastPath = async (path: string) => await SaveData(path, "lastPath");

  const GetTheLastPath = async (): Promise<string> =>
    await GetData<string>("lastPath");

  const DeleteLastPath = async (): Promise<void> =>
    await RemoveData(["lastPath"]);

  return {
    SaveJWTInfo,
    SaveLastPath,
    GetJWTInfo,
    GetTheLastPath,
    CheckJWTInfo,
    DeleteJWTInfo,
    DeleteLastPath,
  };
};
