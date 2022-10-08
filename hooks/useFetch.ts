import { baseUrl } from "../apiToUrlMap";

const useFetch = () => {
  let abort: () => void;

  const cancelRequest = () => {
    abort?.();
  };

  const makeRequest = async (
    url: string,
    init?: RequestInit
  ): Promise<[any, string | null]> => {
    const abortController = new AbortController();
    let res: any = null,
      err: string | null = null;
    try {
      res = await fetch(`${baseUrl}${url}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_KEY}`,
        },
        signal: abortController.signal,
      }).then((res) => res.json());
      if (res.error) {
        throw new Error(res.error);
      }
    } catch (error: any) {
      console.error(error);
      res = null;
      err = error.message;
    }
    return [res, err];
  };

  return { makeRequest, cancelRequest };
};

export default useFetch;
