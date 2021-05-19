import React from "react";
import { useQuery } from "react-query";
import { useHistory, Redirect } from "react-router";
import PersonImage from "../Components/MovieGallery";
import PersonMoviesCredits from "../Components/PersonMoviesCredits/PersonMoviesCredits";
import PersonPageCard from "../Components/PersonPageCard/PersonPageCard";
import PersonTvCredits from "../Components/PersonTvCredits.js/PersonTvCredits";
import Search from "../Components/Search";
import { fetchPersonDetail } from "../services/fetchPersonDetail.service";
import { fetchPersonImages } from "../services/fetchPersonImages.service";
import { fetchPersonMovieCredits } from "../services/fetchPersonMovieCredits.service";
import { fetchPersonTvCredits } from "../services/fetchPersonTvCredits.service";
import {
  fetchPersonDetailKey,
  fetchPersonImagesKey,
  fetchPersonMoviesCreditsKey,
  fetchPersonTvCreditsKey,
} from "../util/appCacheKeys";
import Error from "./Erro404";

export default function PersonPage() {
  const {
    location: { pathname },
  } = useHistory();

  const personId = pathname?.split?.("/")?.[2];

  const personDetail = useQuery(
    [fetchPersonDetailKey, personId],
    fetchPersonDetail
  );

  const personImages = useQuery(
    [fetchPersonImagesKey, personId],
    fetchPersonImages
  );

  const personMoviesCredits = useQuery(
    [fetchPersonMoviesCreditsKey, personId],
    fetchPersonMovieCredits
  );

  const personTvCredits = useQuery(
    [fetchPersonTvCreditsKey, personId],
    fetchPersonTvCredits
  );

  console.log(
    // personDetail?.data,
    personImages?.data
    // personMoviesCredits?.data
    // personTvCredits?.data
  );

  if (!personId || personId === "") {
    return <Redirect to="/" />;
  }

  return (
    <>
      {personDetail && personDetail?.data ? (
        <PersonPageCard detail={personDetail?.data} />
      ) : personDetail?.isLoading ? (
        <div
          className="container uk-animation-fade mt-5"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loading-icon">
            <i className="fa fa-spinner fa-2x fa-pulse fa-fw"></i>
          </div>
        </div>
      ) : null}

      {personMoviesCredits && personMoviesCredits?.data && (
        <div className="container card-row">
          <div className="row">
            <PersonMoviesCredits
              movies={[
                ...personMoviesCredits?.data?.cast,
                ...personMoviesCredits?.data?.crew,
              ]}
            />
          </div>
        </div>
      )}
      {personTvCredits && personTvCredits?.data && (
        <div className="container card-row">
          <div className="row">
            <PersonTvCredits
              movies={[
                ...personTvCredits?.data?.cast,
                ...personTvCredits?.data?.crew,
              ]}
            />
          </div>
        </div>
      )}

      {personImages &&
        personImages?.data &&
        personImages?.data?.profiles?.length !== 0 && (
          <PersonImage posters={personImages?.data?.profiles} />
        )}

      {personDetail.isError &&
      personImages.isError &&
      personMoviesCredits.isError &&
      personTvCredits.isError ? (
        <Error
          message={`No Info Available For This Personality`}
          emoji="😔 😔 😔"
        />
      ) : null}
      <Search />
    </>
  );
}
