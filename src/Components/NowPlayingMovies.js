import React from "react";
import FetchMore from "./FetchMore";
import { NowPlayingMoviesStore } from "../store/nowPlayingMovies.store";
import { useQuery } from "react-query";
import { fetchNowPlayingMoviesKey } from "../util/appCacheKeys";
import { fetchNowPlaying } from "../services/fetchNowPlayingMovies.service";
import MovieCard from "./MovieCard/MovieCard";
import Overview from "./Overview/Overview";
import AddToWatchList from "./AddToWatchList/AddToWatchList";

function NowPlaying() {
  const [runQuery, setRunQuery] = React.useState(false);

  const nowPlayingMovies = NowPlayingMoviesStore(
    (state) => state?.nowPlayingMovies
  );

  const updateCurrentPage = NowPlayingMoviesStore(
    (state) => state?.updateCurrentPage
  );

  const updateNowPlayingMovies = NowPlayingMoviesStore(
    (state) => state?.updateNowPlayingMovies
  );

  const currentPage = NowPlayingMoviesStore((state) => state?.currentPage);

  const { isLoading } = useQuery(
    [fetchNowPlayingMoviesKey, currentPage],
    fetchNowPlaying,
    {
      onSuccess: (result) => {
        setRunQuery(false);
        updateCurrentPage(result, currentPage + 1);
        updateNowPlayingMovies(result);
      },
      enabled: runQuery,
    }
  );

  return (
    <>
      {nowPlayingMovies?.map?.((movie) => {
        return (
          <MovieCard
            movie={movie}
            key={movie?.id}
            LeftButton={Overview}
            RightButton={AddToWatchList}
          />
        );
      })}
      <FetchMore fetchMore={setRunQuery} isLoading={isLoading} />
    </>
  );
}

export default NowPlaying;
