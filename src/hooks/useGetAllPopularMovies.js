import { useQuery } from "react-query";
import { fetchPopularMovies } from "../services/fetchPopularMovies.service";
import { PopularMoviesStore } from "../store/popularMovies.store";
import { fetchPopularMoviesKey } from "../util/appCacheKeys";

export const useGetAllPopularMovies = (param) => {
  const updatePopularMovies = PopularMoviesStore(
    (state) => state?.updatePopularMovies
  );
  const updateCurrentPage = PopularMoviesStore(
    (state) => state?.updatePopularMovies
  );
  const currentPage = PopularMoviesStore((state) => state?.currentPage);
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery([fetchPopularMoviesKey, currentPage], fetchPopularMovies, {
    onSuccess: (result) => {
      updatePopularMovies(result);
      if (param?.fetchMore === true && currentPage < result?.page) {
        const newPage = result?.page + 1;
        updateCurrentPage(newPage);
      }
    },
  });

  return { isError, error, data, isFetching, isPreviousData, isLoading };
};
