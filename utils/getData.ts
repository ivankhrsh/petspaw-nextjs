import { api } from "./fetch";

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export function getData<T>(endpoint: string) {
  return api.get<T>(`/${endpoint}`);
}