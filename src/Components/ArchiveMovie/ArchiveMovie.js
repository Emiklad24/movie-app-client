import React from "react";
import { Link } from "react-router-dom";
import useArchiveMovieWatchlist from "../../hooks/useArchiveWatchlist";

export default function ArchiveMovie({ movie }) {
  const { deleteWatchlistHandler, isLoadingDelete } = useArchiveMovieWatchlist(
    movie,
    { archived: true }
  );
  const archiveMovieHandler = (e) => {
    if (e) e.preventDefault();
    deleteWatchlistHandler();
  };
  return (
    <>
      {isLoadingDelete ? (
        <Link className="watchlist-btn">
          <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
        </Link>
      ) : (
        <Link className="watchlist-btn" onClick={archiveMovieHandler}>
          <i className="fa fa-trash"></i>
        </Link>
      )}
    </>
  );
}
