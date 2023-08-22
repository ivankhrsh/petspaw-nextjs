export const BASE_URL = 'https://api.thecatapi.com/v1';

type RequestMethod = 'GET' | 'POST' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const options: RequestInit = { method };

  options.headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'x-api-key': `${token}`,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.message);
      });
    }

    return response.json();
  });
}

export const api = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data?: any) => request<T>(url, 'POST', data),
  delete: (url: string, data: any) => request(url, 'DELETE', data),
};
