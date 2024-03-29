import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "../../Styles/MovieActorList.css";
import Overview from "../Overview/Overview";
import AddToWatchList from "../AddToWatchList/AddToWatchList";

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
              RightButton={AddToWatchList}
              LeftButton={Overview}
            />
          ))
        : null}
    </>
  );
}

export default PersonMoviesCredits;
