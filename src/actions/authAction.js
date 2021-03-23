//import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ALL_WATCHLIST,
    CLEAR_ALL_RATEDMOVIES

} from './types';
import client from '../FeathersClient'
import { toast } from "react-toastify";




export const loadUser = () => async (dispatch, getState) => {
    try {
        const reAuth = await client.reAuthenticate()
        dispatch({ type: USER_LOADED, payload: reAuth })
    }
    catch (error) {
        console.log(error)
    }
}


export const login = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING });
        const res = await client.authenticate({ ...credentials, strategy: 'local' })
        dispatch({ type: LOGIN_SUCCESS, payload: res })
    }
    catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error })
        toast.error(` ${error.message}`);
    }
}
// // Logout user 
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_SUCCESS, })
        dispatch({ type: CLEAR_ALL_WATCHLIST, })
        dispatch({ type: CLEAR_ALL_RATEDMOVIES, })
        await client.logout()
    }
    catch (error) {
        dispatch({ type: LOGOUT_SUCCESS, })
    }
}

