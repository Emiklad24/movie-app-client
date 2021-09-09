import React from "react";
import { viewMore } from "../../hooks/useAddMovieToWatchList";

export default function Overview({ movie }) {
  const currentMovieName =
    movie?.title || movie?.original_name || movie?.original_title;
  return (
    <>
      {movie?.overview && (
        <div
          className="watchlist-btn peep-view"
          title={`View more Info about "${currentMovieName}"`}
          onClick={() => viewMore?.(movie)}
        >
          <i className="fa fa-eye"></i>
        </div>
      )}
    </>
  );
}
