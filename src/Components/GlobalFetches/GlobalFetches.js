import { useQuery } from "react-query";
import shallow from "zustand/shallow";
import { loadUser } from "../../actions/authAction";
import useGetUsersWatchlists from "../../hooks/useGetUsersWatchlists";
import { useLoadUserInfo } from "../../hooks/useLoadUserInfo";
import { useRefreshUserDetails } from "../../hooks/useRefreshUserDetails";
import { fetchNowPlaying } from "../../services/fetchNowPlayingMovies.service";
import { fetchPopularMovies } from "../../services/fetchPopularMovies.service";
import { fetchTopRatedMovies } from "../../services/fetchTopRatedMovies.service";
import { fetchUpcomingMovies } from "../../services/fetchUpcomingMovies.service";
import useUserCredentialsStore from "../../store/auth.store";
import { NowPlayingMoviesStore } from "../../store/nowPlayingMovies.store";
import { PopularMoviesStore } from "../../store/popularMovies.store";
import { TopRatedMoviesStore } from "../../store/topRatedMovies.store";
import { upcomingMoviesStore } from "../../store/upcomingMovies.store";
import {
  fetchNowPlayingMoviesKey,
  fetchPopularMoviesKey,
  fetchUpcomingMoviesKey,
  fetchTopRatedMoviesKey,
} from "../../util/appCacheKeys";

export default function GlobalFetches() {
  const { userDetails } = useUserCredentialsStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      userDetails: state.userDetails,
    }),
    shallow
  );
  const popularMovies = PopularMoviesStore((state) => state?.popularMovies);
  const currentPage = PopularMoviesStore((state) => state?.currentPage);
  const updatePopularMovies = PopularMoviesStore(
    (state) => state?.updatePopularMovies
  );
  const updateCurrentPage = PopularMoviesStore(
    (state) => state?.updateCurrentPage
  );

  const nowPlayingMovies = NowPlayingMoviesStore(
    (state) => state?.nowPlayingMovies
  );
  const updateCurrentPageNowPlaying = NowPlayingMoviesStore(
    (state) => state?.updateCurrentPage
  );
  const updateNowPlayingMovies = NowPlayingMoviesStore(
    (state) => state?.updateNowPlayingMovies
  );
  const currentPageNowPlaying = NowPlayingMoviesStore(
    (state) => state?.currentPage
  );

  const upcomingMovies = upcomingMoviesStore((state) => state?.upcomingMovies);

  const updateCurrentPageUpcoming = upcomingMoviesStore(
    (state) => state?.updateCurrentPage
  );
  const updateUpcomingMovies = upcomingMoviesStore(
    (state) => state?.updateUpcomingMovies
  );
  const currentPageUpcoming = upcomingMoviesStore(
    (state) => state?.currentPage
  );

  const topRatedMovies = TopRatedMoviesStore((state) => state?.topRatedMovies);

  const updateCurrentPageTopRated = TopRatedMoviesStore(
    (state) => state?.updateCurrentPage
  );
  const updateTopRatedMovies = TopRatedMoviesStore(
    (state) => state?.updateTopRatedMovies
  );
  const currentPageTopRated = TopRatedMoviesStore(
    (state) => state?.currentPage
  );

  loadUser();

  useGetUsersWatchlists({
    archived: false,
    users_permissions_user: userDetails?.id,
  });

  useRefreshUserDetails();

  useQuery(fetchPopularMoviesKey, fetchPopularMovies, {
    enabled: currentPage === 1 && popularMovies?.length === 0 ? true : false,
    onSuccess: (data) => {
      updatePopularMovies(data);
      updateCurrentPage(data, 2);
    },
  });
  useQuery(fetchNowPlayingMoviesKey, fetchNowPlaying, {
    enabled:
      currentPageNowPlaying === 1 && nowPlayingMovies?.length === 0
        ? true
        : false,
    onSuccess: (data) => {
      updateNowPlayingMovies(data);
      updateCurrentPageNowPlaying(data, 2);
    },
  });

  useQuery(fetchUpcomingMoviesKey, fetchUpcomingMovies, {
    enabled:
      currentPageUpcoming === 1 && upcomingMovies?.length === 0 ? true : false,
    onSuccess: (data) => {
      updateUpcomingMovies(data);
      updateCurrentPageUpcoming(data, 2);
    },
  });

  useQuery(fetchTopRatedMoviesKey, fetchTopRatedMovies, {
    enabled:
      currentPageTopRated === 1 && topRatedMovies?.length === 0 ? true : false,
    onSuccess: (data) => {
      updateTopRatedMovies(data);
      updateCurrentPageTopRated(data, 2);
    },
  });
  useLoadUserInfo();
  return null;
}
