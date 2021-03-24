// import axios from 'axios';
import {
  IS_WATCHLIST_FETCHING,
  IS_WATCHLIST_SUCCESS,
  IS_WATCHLIST_ERROR,
  IS_NEW_WATCHLIST,
  DELETE_WATCHLIST_SUCCESS,
} from "./types";
import client from "../FeathersClient";

export const fetchWatchlists = (id) => async (dispatch, getState) => {
  dispatch({ type: IS_WATCHLIST_FETCHING });
  try {
    await client.reAuthenticate();
    const watchlist = await client.service("watchlists").find({
      query: {
        archived: false,
        userId: id,
        $populate: "userId",
      },
    });
    dispatch({ type: IS_WATCHLIST_SUCCESS, payload: watchlist.data });
  } catch (error) {
    dispatch({ type: IS_WATCHLIST_ERROR });
  }
};

export const addWatchlist = (addedWatchlist) => async (dispatch, getState) => {
  try {
    let newState = [...getState().watchlists.watchlists, addedWatchlist];

    dispatch({ type: IS_NEW_WATCHLIST, payload: newState });
  } catch (error) {}
};
export const removeWatchlist = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_WATCHLIST_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);
  }
};
