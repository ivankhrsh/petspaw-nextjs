import { api } from './fetch';

export async function getFav<T> (endpoint: string) {
  return await api.get<T>(`/${endpoint}`);
}

export async function addFav<T> (endpoint: string, data: any) {
  return await api.post<T>(`/${endpoint}`, data);
}

export async function deleteFav (endpoint: string) {
  return await api.delete(`/${endpoint}`);
}
