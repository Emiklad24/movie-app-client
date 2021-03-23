// import axios from 'axios';
import {
  IS_RATEDMOVIES_FETCHING,
  DELETE_RATEDMOVIES_SUCCESS,
  IS_RATEDMOVIES_ERROR,
  IS_NEW_RATEDMOVIES,
  IS_RATEDMOVIES_SUCCESS,
} from "./types";
import client from "../FeathersClient";

export const fetchRatedMovies = (id) => async (dispatch, getState) => {
  dispatch({ type: IS_RATEDMOVIES_FETCHING });
  try {
    await client.reAuthenticate();
    const ratedMovie = await client.service("ratedmovies").find({
      query: {
        userId: id,
      },
    });
    dispatch({ type: IS_RATEDMOVIES_SUCCESS, payload: ratedMovie.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: IS_RATEDMOVIES_ERROR });
  }
};

export const addRatedMovies = (addedRatedMovies) => async (
  dispatch,
  getState
) => {
  try {
    let newState = [...getState().ratedMovies.ratedMovies, addedRatedMovies];

    dispatch({ type: IS_NEW_RATEDMOVIES, payload: newState });
  } catch (error) {
    console.log(error);
  }
};
export const removeRatedMovies = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_RATEDMOVIES_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);
  }
};
