import { axiosInstance } from "../util/axiosInstance";

export const fetchSingleMovieDetail = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const movieDetail = await axiosInstance.get(`/movie/${id}`, {
    params: { api_key: "034af975420c91a0afd14fb5ddee1134" },
  });

  return movieDetail?.data;
};
