import { axiosInstance } from "../util/axiosInstance";

export const fetchNowPlaying = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let nowPlaying = await axiosInstance.get(`/movie/now_playing`, {
    params: { api_key: process.env.REACT_APP_API_KEY, page, language: "en-US" },
  });

  return nowPlaying?.data;
};
