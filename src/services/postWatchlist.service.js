import { axiosInstanceAlternate } from "../util/axiosInstance";

export const postWatchlist = async (movie) => {
  const res = await axiosInstanceAlternate.post(`/watchlists`, {
    ...movie,
  });
  return res?.data;
};
