import { api } from "./fetch";

export function getData<T>(endpoint: string) {
  return api.get<T>(`/${endpoint}`);
}