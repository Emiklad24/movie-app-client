import { axiosInstanceAlternate } from "../util/axiosInstance";

export const editWatchList = async ({ query, id }) => {
  const res = await axiosInstanceAlternate.put(`/watchlists/${id}`, {
    ...query,
  });
  return res?.data;
};
