const useFetch = () => {
  let lastFetchedRequest: [url: string, init?: RequestInit] | undefined;
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
    lastFetchedRequest = [url, init];
    try {
      res = await fetch(url, { ...init, signal: abortController.signal }).then(
        (res) => res.json()
      );
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

  const repeatRequest = async (): Promise<[any, string | null]> => {
    if (!lastFetchedRequest) return [null, "No Last request found"];
    return await makeRequest(lastFetchedRequest[0], lastFetchedRequest[1]);
  };

  return { makeRequest, cancelRequest, repeatRequest };
};

export default useFetch;
