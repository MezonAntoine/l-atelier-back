import axios, { Method } from 'axios';

export const fetchCats = async (baseUrl: string, method: Method, route: string) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  const headers = {
    ...defaultHeaders,
  };

  try {
    const res = await axios.request({
      method,
      baseURL: baseUrl,
      url: route,
      headers,
      validateStatus: (status: number) => {
        return status < 500;
      },
    });

    return {
      status: res.status,
      content: res.data,
    };
  } catch (err: any) {
    if (err.response) {
      return {
        status: err.response.status,
      };
    }
    return {};
  }
}