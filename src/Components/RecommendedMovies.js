import React from "react";
import MovieCard from "../Components/MovieCard/MovieCard";
import "../Styles/MovieActorList.css";
import Overview from "./Overview/Overview";
import AddToWatchList from "./AddToWatchList/AddToWatchList";

const RecommendedMovies = ({ recommendations }) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <h3
          className="cast-title mb-4 uk-animation-fade"
          style={{ fontFamily: "Raleway", fontWeight: "bold" }}
        >
          Recommendations
        </h3>
      </div>{" "}
      {recommendations
        ? recommendations?.map((recommedation) => (
            <MovieCard
              movie={recommedation}
              key={recommedation?.id}
              RightButton={AddToWatchList}
              LeftButton={Overview}
            />
          ))
        : null}
    </>
  );
};

export default RecommendedMovies;
