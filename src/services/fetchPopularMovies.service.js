import axios from "axios";
import { apiURL } from "../util/misc";

export const fetchPopularMovies = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let popularMovies = await axios.get(`${apiURL}/trending/all/week`, {
    params: { api_key: process.env.REACT_APP_API_KEY, page },
  });
  return popularMovies?.data;
};
