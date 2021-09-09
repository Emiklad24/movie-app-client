import React, { Component } from "react";
import "../Styles/MoviePageCard.css";
import noImage from "../Assets/Images/noimage.png";
import MovieCard from "./MovieCardLegacy";
import { Link } from "react-router-dom";
import Overview from "./Overview/Overview";
import AddToWatchList from "./AddToWatchList/AddToWatchList";

class SearchResultPeople extends Component {
  render() {
    const { isLoading, error, movieType, searchResults } = this.props;
    return (
      <>
        {!isLoading &&
        !error &&
        movieType === "people" &&
        searchResults &&
        Array.isArray(searchResults) &&
        searchResults.length !== 0
          ? searchResults.map((result, index) => (
              <div key={index}>
                <div>
                  <Link to={`/${result?.name}/${result?.id}`}>
                    <div
                      className="container uk-animation-fade"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w300${result.profile_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        width: "100%",
                      }}
                    >
                      <div className="movie">
                        <img
                          src={
                            result.profile_path
                              ? `https://image.tmdb.org/t/p/w300${result.profile_path}`
                              : noImage
                          }
                          alt={result.name}
                          className="movie-img"
                          title={result.name}
                          width={!result.profile_path ? "300" : null}
                          loading="lazy"
                        />

                        <div className="movie-info d-flex flex-column justify-content-between p-3 align-items-start">
                          <a
                            href={result.homepage ? result.homepage : null}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h2 className="movie-title">{result.name}</h2>
                          </a>

                          <h2 className="movie-title">
                            {" "}
                            {result.known_for_department}
                          </h2>

                          <div className="movie-control">
                            <div title="Popularity" className="movie-rating">
                              {result.popularity || "0.0"}
                            </div>
                            <div className="modal"></div>
                          </div>
                        </div>
                        <div className="movie-stat d-flex justify-content-between align-items-center">
                          <div>
                            <span className="movie-stats-text">Gender:</span>
                            {result.gender ? result.gender : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {searchResults[0].known_for &&
                result &&
                result.known_for.length !== 0 ? (
                  <div className="container">
                    <div className="row">
                      <h2 className="movie-title" style={{ color: "#daa520" }}>
                        {" "}
                        {result.known_for.length > 1 ? "Movies " : "Movie "}
                        {result.known_for_department === "Directing"
                          ? "Directed By "
                          : result.known_for_department === "Production"
                          ? "Produced By "
                          : result.known_for_department === "Writing"
                          ? "Written By "
                          : "Featuring "}
                        {result.name}
                      </h2>
                    </div>
                    <div className="row">
                      {result.known_for.map((movie, index) => (
                        <MovieCard
                          movie={movie}
                          key={index}
                          RightButton={AddToWatchList}
                          LeftButton={Overview}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          : null}
      </>
    );
  }
}

export default SearchResultPeople;
