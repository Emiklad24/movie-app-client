import React from "react";
import "../../Styles/Watchlist.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
import NoMovieList from "../../Components/NoMovieList";
import Loading from "../../Components/Loading";
import Search from "../../Components/Search";
import Overview from "../../Components/Overview/Overview";
import ArchiveMovie from "../../Components/ArchiveMovie/ArchiveMovie";
import shallow from "zustand/shallow";
import useUserCredentialsStore from "../../store/auth.store";
import useGetUsersWatchlists from "../../hooks/useGetUsersWatchlists";

const WatchList = () => {
  const { userDetails } = useUserCredentialsStore(
    (state) => ({
      userDetails: state.userDetails,
    }),
    shallow
  );
  const { data, isLoading } = useGetUsersWatchlists({
    archived: false,
    users_permissions_user: userDetails?.id,
  });

  return (
    <>
      {data?.length > 0 ? (
        <div className="container-fluid card-row uk-animation-fade">
          <div className="row">
            {data.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                RightButton={ArchiveMovie}
                LeftButton={Overview}
              />
            ))}
          </div>
        </div>
      ) : isLoading ? (
        <div className="container card-row">
          <div className="row">
            <Loading />
          </div>
        </div>
      ) : (
        <NoMovieList message={"No movies in your active watchlist."} />
      )}
      <Search />
    </>
  );
};

export default WatchList;
