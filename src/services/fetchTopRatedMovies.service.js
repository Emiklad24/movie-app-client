import { axiosInstance } from "../util/axiosInstance";

export const fetchTopRatedMovies = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let topRatedMovies = await axiosInstance.get(`/movie/top_rated`, {
    params: {
      api_key: "034af975420c91a0afd14fb5ddee1134",
      page,
      language: "en-US",
    },
  });
  return topRatedMovies?.data;
};
