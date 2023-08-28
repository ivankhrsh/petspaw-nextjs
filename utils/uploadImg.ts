import { api } from './fetch';

const endpoint = 'images/upload'

export async function uploadImg<T> (data: any) {
  return await api.upload<T>(`/${endpoint}`, data);
}
