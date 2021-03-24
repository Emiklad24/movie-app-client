import { combineReducers } from "redux";
import authReducer from "./authReducer";
import watchlistReducer from "./watchlistReducer";
import ratedMoviesReducer from "./ratedMoviesReducer";

export default combineReducers({
  auth: authReducer,
  watchlists: watchlistReducer,
  ratedMovies: ratedMoviesReducer,
});
