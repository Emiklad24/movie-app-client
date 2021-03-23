import axios from 'axios';
import {
    IS_INITIAL_NOW_PLAYING_MOVIES_LOADING,
    IS_INITIAL_NOW_PLAYING_MOVIES_SUCCESS,
    IS_INITIAL_NOW_PLAYING_MOVIES_FAIL,
    FETCH_MORE_NOW_PLAYING_MOVIES_SUCCESS,
    FETCH_MORE_NOW_PLAYING_MOVIES_LOADING,
    FETCH_MORE_NOW_PLAYING_MOVIES_ERROR
} from './types';





export const fetchInitialNowPlayingMovies = () => async (dispatch, getState) => {
    dispatch({ type: IS_INITIAL_NOW_PLAYING_MOVIES_LOADING, })
    try {
        let nowPlayingMovies = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
            params: { api_key: process.env.REACT_APP_API_KEY, page: 1, language: "en-US" }
        });

        dispatch({ type: IS_INITIAL_NOW_PLAYING_MOVIES_SUCCESS, payload: nowPlayingMovies.data.results })

    } catch (error) {
        console.log(error)
        dispatch({ type: IS_INITIAL_NOW_PLAYING_MOVIES_FAIL, })
    }
}


export const fetchMoreNowPlayingMovies = () => async (dispatch, getState) => {
    const newPage = getState().nowPlayingMovies.page


    try {
        dispatch({ type: FETCH_MORE_NOW_PLAYING_MOVIES_LOADING });

        let nowPlayingMovies = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
            params: { api_key: process.env.REACT_APP_API_KEY, page: newPage, language: "en-US" }
        });

        const updatedPopularMovies = [...getState().nowPlayingMovies.movies, ...nowPlayingMovies.data.results];
        dispatch({ type: FETCH_MORE_NOW_PLAYING_MOVIES_SUCCESS, payload: updatedPopularMovies })

    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_MORE_NOW_PLAYING_MOVIES_ERROR })
    }
}