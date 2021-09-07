import { axiosInstance } from "../util/axiosInstance";

export const fetchPopularMovies = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let popularMovies = await axiosInstance.get(`/trending/all/week`, {
    params: { api_key: "034af975420c91a0afd14fb5ddee1134", page },
  });
  return popularMovies?.data;
};
