import LoadingSuspense from "../Components/FallbackSuspense";
import LoadableVisibility from "react-loadable-visibility/react-loadable";

// All pages to be used in App.js should be configured here (lazy loading suspense etc)
const delay = 500;
const timeout = 20000;
export const Movies = LoadableVisibility({
  loader: () => import("../Pages/Movies/Movies"),
  loading: LoadingSuspense,
  delay: delay,
  timeout: timeout,
});

export const WatchList = LoadableVisibility({
  loader: () => import("../Pages/WatchList/WatchList"),
  loading: LoadingSuspense,
  delay: delay,
  timeout: timeout,
});

export const Signup = LoadableVisibility({
  loader: () => import("../Pages/Signup/Signup"),
  loading: LoadingSuspense,
  delay: delay,
  timeout: timeout,
});

export const RatedMovies = LoadableVisibility({
  loader: () => import("../Pages/RatedMovies/RatedMovies"),
  loading: LoadingSuspense,
  delay: delay,
  timeout: timeout,
});

export const MoviePage = LoadableVisibility({
  loader: () => import("../Pages/MoviePage/MoviePage"),
  loading: LoadingSuspense,
  delay: delay,
  timeout: timeout,
});

export const PersonPage = LoadableVisibility({
  loader: () => import("../Pages/PersonPage/PersonPage"),
  loading: LoadingSuspense,
  delay: delay,
  timeout: timeout,
});

export const Discover = LoadableVisibility({
  loader: () => import("../Pages/Discover/Discover"),
  loading: LoadingSuspense,
  delay: delay,
  timeout: timeout,
});
export const GoogleAuthCallback = LoadableVisibility({
  loader: () => import("../Pages/GoogleAuthCallback/GoogleAuthCallback"),
  loading: LoadingSuspense,
  delay: delay,
  timeout: timeout,
});
