import { axiosInstance } from "../util/axiosInstance";

export const fetchPopularMovies = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let popularMovies = await axiosInstance.get(`/trending/all/week`, {
    params: { api_key: process.env.REACT_APP_API_KEY, page },
  });
  return popularMovies?.data;
};
