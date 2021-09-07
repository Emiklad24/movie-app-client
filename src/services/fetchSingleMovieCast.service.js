import { axiosInstance } from "../util/axiosInstance";

export const fetchSingleMovieCast = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const movieCast = await axiosInstance.get(`/movie/${id}/credits`, {
    params: { api_key: "034af975420c91a0afd14fb5ddee1134" },
  });

  return movieCast?.data;
};
