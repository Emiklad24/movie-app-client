import React from "react";
import "../Styles/FallBackSuspense.css";

function FallBackSuspense({ error, timedOut, pastDelay, retry }) {
  if (error) {
    return (
      <div className="wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="errorBoundary">
                <h1>An error occurred. </h1>
                <h1 className="text-center">
                  <span role="img" aria-label="sad emoji">
                    😔 😔 😔
                  </span>
                </h1>
                <button
                  className="retry-button"
                  onClick={window.location.reload()}
                >
                  Reload afresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (timedOut && !error) {
    return (
      <div className="container uk-animation-fade">
        <div className="row">
          <div className="col">
            <div className="loading">
              <div className="loading-icon">
                <i className="fa fa-spinner fa-4x fa-pulse fa-fw"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (pastDelay && !error) {
    return (
      <div className="container uk-animation-fade">
        <div className="loading">
          <div className="loading-icon">
            <i className="fa fa-spinner fa-4x fa-pulse fa-fw"></i>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default FallBackSuspense;
