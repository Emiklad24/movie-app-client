import React from "react";
import MovieCard from "./../Components/MovieCard/MovieCard";
import "../Styles/MovieActorList.css";
import Overview from "./Overview/Overview";
import AddToWatchList from "./AddToWatchList/AddToWatchList";

const SimilarMovies = ({ similarMovies }) => {
  return (
    <>
      <div style={{ width: "100%" }} className="uk-animation-fade">
        <h3
          className="cast-title mb-4"
          style={{ fontFamily: "Raleway", fontWeight: "bold" }}
        >
          Similar Movies
        </h3>
      </div>{" "}
      {similarMovies
        ? similarMovies?.map((similarMovie) => (
            <MovieCard
              movie={similarMovie}
              key={similarMovie?.id}
              RightButton={AddToWatchList}
              LeftButton={Overview}
            />
          ))
        : null}
    </>
  );
};

export default SimilarMovies;
