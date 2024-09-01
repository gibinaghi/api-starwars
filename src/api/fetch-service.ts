import axios from 'axios';

const headers: {
  'Content-Type'?: string;
  'Cache-Control'?: string;
  Authorization?: string;
} = {
  'Content-Type': 'application/json',
  'Cache-Control':
    'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
};

export default async function fetchData(method: string, url: string) {
  try {
    const instance = axios.create({
      headers,
      baseURL: 'https://swapi.dev/api',
      //withCredentials: true,
    });
    const response = await instance({
      method,
      url,
    });
    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        isValid: true,
        data: response?.data || {},
      };
    }
    return {
      isValid: false,
      status: response.status,
    };
  } catch (e: any) {
    return {
      isValid: false,
      status: e.message,
    };
  }
}
