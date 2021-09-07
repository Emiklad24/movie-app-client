import { axiosInstance } from "../util/axiosInstance";

export const fetchNowPlaying = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let nowPlaying = await axiosInstance.get(`/movie/now_playing`, {
    params: { api_key: "034af975420c91a0afd14fb5ddee1134", page, language: "en-US" },
  });

  return nowPlaying?.data;
};
