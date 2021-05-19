import axios from "axios";
import { apiURL } from "../util/misc";

export const fetchPersonTvCredits = async ({ queryKey }) => {
  const personId = queryKey[1] ? queryKey[1] : 1;

  const moviePerson = await axios.get(
    `${apiURL}/person/${personId}/tv_credits`,
    {
      params: { api_key: process.env.REACT_APP_API_KEY },
    }
  );

  return moviePerson?.data;
};
