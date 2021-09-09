import React from "react";
import MovieCard from "../MovieCardLegacy";
import "../../Styles/MovieActorList.css";
import Overview from "../Overview/Overview";
import AddToWatchList from "../AddToWatchList/AddToWatchList";

function PersonTvCredits({ movies }) {
  return (
    <>
      <div style={{ width: "100%" }}>
        <h3
          className="cast-title mb-4 uk-animation-fade"
          style={{ fontFamily: "Raleway", fontWeight: "bold" }}
        >
          Tv show credits
        </h3>
      </div>{" "}
      {movies && Array.isArray(movies) && movies?.length !== 0
        ? movies.map((movie, index) => (
            <MovieCard
              movie={movie}
              key={index}
              RightButton={AddToWatchList}
              canDelete={false}
              onWatchlist={false}
              forceUpdate={true}
              LeftButton={Overview}
            />
          ))
        : null}
    </>
  );
}

export default PersonTvCredits;
