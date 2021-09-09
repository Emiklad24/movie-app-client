import { axiosInstanceAlternate } from "../util/axiosInstance";

export const fetchUserWatchList = async (param) => {
  const res = await axiosInstanceAlternate.get(`/watchlists`, {
    params: param?.queryKey?.[1],
  });
  return res?.data;
};
