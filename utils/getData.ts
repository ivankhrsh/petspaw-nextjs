import { api } from './fetch';

export async function getData<T> (endpoint: string) {
  return await api.get<T>(`/${endpoint}`);
}
