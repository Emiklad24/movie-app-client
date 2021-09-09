import React from "react";
import { useQuery } from "react-query";
import AddToWatchList from "../../Components/AddToWatchList/AddToWatchList";
import DiscoverParamSettingsModal from "../../Components/DiscoverParamSettingsModal/DiscoverParamSettingsModal";
import MovieCard from "../../Components/MovieCardLegacy";
import Overview from "../../Components/Overview/Overview";
import { fetchDiscoverMovies } from "../../services/fetchDiscover.service";
import { discoverMoviesKey } from "../../util/appCacheKeys";
// import Search from "../../Components/Search"

export default function Discover() {
  const { data } = useQuery([discoverMoviesKey], fetchDiscoverMovies);
  console.log(data);
  return (
    <>
      <div className="container">
        <div className="row">
          {data?.results?.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie?.id}
              RightButton={AddToWatchList}
              LeftButton={Overview}
            />
          ))}
        </div>
      </div>
      <DiscoverParamSettingsModal />
      {/* <Search /> */}
    </>
  );
}
