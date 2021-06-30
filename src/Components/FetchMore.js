import React from "react";
import "../Styles/Search.css";
import ReactDOM from "react-dom";

function FetchMore({ fetchMore, isLoading, prefetchMore }) {
  return ReactDOM.createPortal(
    <>
      <div
        className="btn-Modal-fetch"
        id="toggle-modal-button"
        onClick={() => fetchMore(true)}
      >
        {isLoading ? (
          <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
        ) : (
          <i className="fa fa-chevron-circle-down uk-animation-fade"></i>
        )}
      </div>
    </>,
    document.getElementById("fetch-more")
  );
}

export default FetchMore;
