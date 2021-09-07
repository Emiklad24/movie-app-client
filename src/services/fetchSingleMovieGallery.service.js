import { axiosInstance } from "../util/axiosInstance";

export const fetchSingleMovieGallery = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const moviePosters = await axiosInstance.get(`/movie/${id}/images`, {
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      language: "en-US",
      include_image_language: "en",
    },
  });

  return moviePosters?.data?.posters;
};
