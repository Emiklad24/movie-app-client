import axios from "axios";
import { apiURL } from "../util/misc";

export const fetchUpcomingMovies = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let upcomingMovies = await axios.get(`${apiURL}/movie/upcoming`, {
    params: { api_key: process.env.REACT_APP_API_KEY, page },
  });
  return upcomingMovies?.data;
};
