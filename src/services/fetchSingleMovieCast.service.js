import axios from "axios";
import { apiURL } from "../util/misc";

export const fetchSingleMovieCast = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const movieCast = await axios.get(`${apiURL}/movie/${id}/credits`, {
    params: { api_key: process.env.REACT_APP_API_KEY },
  });

  return movieCast?.data;
};
