export const BASE_URL = 'https://api.thecatapi.com/v1';

type RequestMethod = 'GET' | 'POST' | 'DELETE';

async function request<T> (
  url: string,
  method: RequestMethod = 'GET',
  data: any = null
): Promise<T> {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const options: RequestInit = { method };

  options.headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'x-api-key': `${token}`
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return await fetch(`${BASE_URL}${url}`, options).then(async (response) => {
    if (!response.ok) {
      return await response.json().then((error) => {
        throw new Error(error.message);
      });
    }

    return await response.json();
  });
}

export const api = {
  get: async <T>(url: string) => await request<T>(url),
  post: async <T>(url: string, data?: any) => await request<T>(url, 'POST', data),
  delete: async (url: string, data?: any) => await request(url, 'DELETE', data)
};
