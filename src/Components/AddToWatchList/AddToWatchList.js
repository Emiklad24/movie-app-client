import React from "react";
import { Link } from "react-router-dom";
import useAddMovieToWatchList from "../../hooks/useAddMovieToWatchList";
import useGetWatchlistsIds from "../../hooks/useGetWatchlistsIds";

export default function AddToWatchList({ movie }) {
  const { ids } = useGetWatchlistsIds();
  const { addWatchlistsHandler, isLoading } = useAddMovieToWatchList(movie);

  const currentMovieName =
    movie?.title || movie?.original_name || movie?.original_title;
  return (
    <>
      {isLoading ? (
        <Link className="watchlist-btn uk-animation-fade">
          <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
        </Link>
      ) : !ids?.includes(movie?.id?.toString()) ? (
        <div
          className="watchlist-btn uk-animation-fade"
          onClick={() => addWatchlistsHandler()}
          title={`Add "${currentMovieName}" to your watchlist`}
        >
          <i className="fa fa-bookmark"></i>
        </div>
      ) : null}
    </>
  );
}
