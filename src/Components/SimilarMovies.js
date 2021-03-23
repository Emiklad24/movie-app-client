import React, { Component } from 'react';
import MovieCard from './MovieCard';
import '../Styles/MovieActorList.css'

class SimilarMovies extends Component {
    render() {
        const { similarMovies } = this.props
        return (
          <>
            <div style={{ width: "100%" }}>
              <h3
                className="cast-title mb-4"
                style={{ fontFamily: "Raleway", fontWeight: "bold" }}
              >
                Similar Movies
              </h3>
            </div>{" "}
            {similarMovies
              ? similarMovies.map((similarMovie) => (
                  <MovieCard
                    movie={similarMovie}
                    key={similarMovie.id}
                    canDelete={false}
                    onWatchlist={false}
                    forceUpdate={true}
                  />
                ))
              : null}
          </>
        );
    }
}

export default SimilarMovies
