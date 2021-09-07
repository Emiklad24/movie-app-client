import { axiosInstance } from "../util/axiosInstance";

export const fetchTopRatedMovies = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let topRatedMovies = await axiosInstance.get(`/movie/top_rated`, {
    params: { api_key: process.env.REACT_APP_API_KEY, page, language: "en-US" },
  });
  return topRatedMovies?.data;
};
