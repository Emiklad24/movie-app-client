import { axiosInstance } from "../util/axiosInstance";

export const fetchSingleMovieTrailers = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const movieTrailers = await axiosInstance.get(`/movie/${id}/videos`, {
    params: {
      api_key: "034af975420c91a0afd14fb5ddee1134",
      language: "en-US",
      page: 1,
    },
  });
  return movieTrailers?.data?.results;
};
