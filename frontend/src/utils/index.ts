import axios, { AxiosResponse, AxiosError } from "axios";

export const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      console.log(err.message);
      throw err;
    });
