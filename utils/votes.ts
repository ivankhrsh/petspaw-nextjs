import { api } from './fetch';

const endpoint = 'votes'

export async function addPositiveVote (id: number) {
  return await api.post(`/${endpoint}`, { image_id: id, value: 1 });
}

export async function addNegativeVote (id: number) {
  return await api.post(`/${endpoint}`, { image_id: id, value: -1 });
}

export async function deleteVote (id: number) {
  return await api.delete(`/${endpoint}/${id}`);
}
