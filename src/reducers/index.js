import { combineReducers } from 'redux'
import authReducer from './authReducer';
import popularMoviesReducer from './popularMoviesReducer';
import nowPlayingMoviesReducer from './nowPlayingMoviesReducer'
import topRatedMoviesReducer from './topRatedMoviesReducer'
import upcomingMoviesReducer from './upcomingMoviesReducer'
import watchlistReducer from './watchlistReducer'
import ratedMoviesReducer from './ratedMoviesReducer'

export default combineReducers({
    auth: authReducer,
    popularMovies: popularMoviesReducer,
    nowPlayingMovies: nowPlayingMoviesReducer,
    topRatedMovies: topRatedMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    watchlists: watchlistReducer,
    ratedMovies: ratedMoviesReducer
})