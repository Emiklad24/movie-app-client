import React, { Component } from 'react'

export class SearchTitle extends Component {
    render() {
        return (
          <>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label
                className="btn btn-secondary"
                onClick={() => this.props.setMovieType("movie")}
                style={{
                  backgroundColor:
                    this.props.movieType === "movie"
                      ? "#daa520"
                      : "rgba(0, 0, 0, 0.8)",
                }}
              >
                <input type="radio" name="options" id="option1" /> Movies
              </label>
              <label
                className="btn btn-secondary"
                onClick={() => this.props.setMovieType("tv")}
                style={{
                  backgroundColor:
                    this.props.movieType === "tv"
                      ? "#daa520"
                      : "rgba(0, 0, 0, 0.8)",
                }}
              >
                <input type="radio" name="options" id="option2" /> Tv Shows
              </label>
              <label
                className="btn btn-secondary"
                onClick={() => this.props.setMovieType("people")}
                style={{
                  backgroundColor:
                    this.props.movieType === "people"
                      ? "#daa520"
                      : "rgba(0, 0, 0, 0.8)",
                }}
              >
                <input type="radio" name="options" id="option3" /> People
              </label>
            </div>
            <div style={{ width: "100%" }} className="mt-3">
              <h2
                className="cast-title mb-4 text-uppercase"
                style={{ fontFamily: "Raleway", fontWeight: "bold" }}
              >
                {this.props.searchTerm}
              </h2>
            </div>
          </>
        );
    }
}

export default SearchTitle
