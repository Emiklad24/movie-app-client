import React from "react";
import MovieCard from "./MovieCard";
import FetchMore from "./FetchMore";
import { PopularMoviesStore } from "../store/popularMovies.store";
import { useQuery } from "react-query";
import { fetchPopularMovies } from "../services/fetchPopularMovies.service";
import { fetchPopularMoviesKey } from "../util/appCacheKeys";

function PopularMovies() {
  const [runQuery, setRunQuery] = React.useState(false);
  const popularMovies = PopularMoviesStore((state) => state?.popularMovies);
  const updateCurrentPage = PopularMoviesStore(
    (state) => state?.updateCurrentPage
  );
  const updatePopularMovies = PopularMoviesStore(
    (state) => state?.updatePopularMovies
  );
  const currentPage = PopularMoviesStore((state) => state?.currentPage);
  const { isLoading } = useQuery(
    [fetchPopularMoviesKey, currentPage],
    fetchPopularMovies,
    {
      onSuccess: (result) => {
        setRunQuery(false);
        updateCurrentPage(result, currentPage + 1);
        updatePopularMovies(result);
      },
      enabled: runQuery,
    }
  );

  return (
    <>
      {popularMovies &&
      Array.isArray(popularMovies) &&
      popularMovies?.length !== 0
        ? popularMovies?.map?.((movie) => {
            return (
              <MovieCard
                movie={movie}
                key={movie?.id}
                canDelete={false}
                onWatchlist={false}
                forceUpdate={true}
              />
            );
          })
        : null}
      <FetchMore fetchMore={setRunQuery} isLoading={isLoading} />
    </>
  );
}

export default PopularMovies;
