import type { AxiosError, AxiosResponse } from 'axios';
import { axiosGet } from '../lib/axios';

export const fetcher = (url: string, token: string | undefined) =>
  axiosGet(`${url}`, token)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      throw err;
    });
