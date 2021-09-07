import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";
import { authCallback } from "../../services/authCallback.service";
import "../../Styles/FallBackSuspense.css";

export default function GoogleAuthCallback() {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    mutate,
    reset,
    status,
  } = useMutation({
    mutationKey: "CONFIRM_GOOGLE_AUTH",
    mutationFn: authCallback,
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id_tokenx = urlParams.get("id_token");
  const id_token = id_tokenx;

  authCallback(id_token);

  //   if (!id_token) {
  //     return <Redirect to="/" />;
  //   }

  return (
    <div className="container uk-animation-fade">
      <div className="row">
        <div className="col">
          <div className="loading">
            <div className="loading-icon">
              <i className="fa fa-spinner fa-4x fa-pulse fa-fw"></i>
            </div>

            <span className="text-center status-message">
              Checking your auth status ...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
