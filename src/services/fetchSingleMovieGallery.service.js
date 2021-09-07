import { axiosInstance } from "../util/axiosInstance";

export const fetchSingleMovieGallery = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const moviePosters = await axiosInstance.get(`/movie/${id}/images`, {
    params: {
      api_key: "034af975420c91a0afd14fb5ddee1134",
      language: "en-US",
      include_image_language: "en",
    },
  });

  return moviePosters?.data?.posters;
};
