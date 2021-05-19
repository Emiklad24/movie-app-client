import React from "react";
import MovieCard from "../MovieCard";
import "../../Styles/MovieActorList.css";

function PersonMoviesCredits({ movies }) {
  return (
    <>
      <div style={{ width: "100%" }}>
        <h3
          className="cast-title mb-4 uk-animation-fade"
          style={{ fontFamily: "Raleway", fontWeight: "bold" }}
        >
          Movies credits
        </h3>
      </div>{" "}
      {movies && Array.isArray(movies) && movies?.length !== 0
        ? movies.map((movie, index) => (
            <MovieCard
              movie={movie}
              key={index}
              canDelete={false}
              onWatchlist={false}
              forceUpdate={true}
            />
          ))
        : null}
    </>
  );
}

export default PersonMoviesCredits;
