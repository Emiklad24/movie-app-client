import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";
import { authCallback } from "../../services/authCallback.service";
import "../../Styles/FallBackSuspense.css";
import { useLocation } from "react-router-dom";
import useUserCredentialsStore from "../../store/auth.store";
import { fetchUserWatchList } from "../../services/fetchUserWatchlist.service";
import shallow from "zustand/shallow";

export default function GoogleAuthCallback() {
  const { isAuthenticated, populateUserInfoAndJwt } = useUserCredentialsStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      populateUserInfoAndJwt: state.populateUserInfoAndJwt,
    }),
    shallow
  );

  const { search } = useLocation();
  const { isLoading, mutate } = useMutation({
    mutationKey: "CONFIRM_GOOGLE_AUTH",
    mutationFn: authCallback,
    retry: 5,
    onSuccess: (response) => {
      populateUserInfoAndJwt(response);
      window.location.replace("/");
    },
  });

  useEffect(() => {
    mutate(search);
    fetchUserWatchList();
  }, [mutate, search]);

  if (!search || isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {isLoading && (
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
      )}
    </>
  );
}
