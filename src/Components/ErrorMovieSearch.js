import React, { Component } from "react";

export class ErrorMovieSearch extends Component {
  render() {
    const { message, searchTerm, retry, searchMovies } = this.props;
    return (
      <>
        <div
          style={{ width: "100%", flexDirection: "column" }}
          className="mt-3 uk-animation-fade d-flex align-items-center justify-content-center"
        >
          <h4 className="cast-title mb-4 text-center">
            {message} {searchTerm !== "" ? ` "${searchTerm}"` : null}
          </h4>
          <h2 className="cast-title mb-4 text-center">
            <span role="img" aria-label="img">
              😔 😔 😔
            </span>
          </h2>
          {retry && (
            <div className="mx-auto">
              <button
                className="btn btn-secondary"
                onClick={() => searchMovies(searchTerm)}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default ErrorMovieSearch;
