import axios from "axios";
import { apiURL } from "../util/misc";

export const fetchTopRatedMovies = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let topRatedMovies = await axios.get(`${apiURL}/movie/top_rated`, {
    params: { api_key: process.env.REACT_APP_API_KEY, page, language: "en-US" },
  });
  return topRatedMovies?.data;
};
