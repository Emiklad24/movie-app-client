import {
    IS_WATCHLIST_FETCHING,
    IS_WATCHLIST_SUCCESS,
    IS_WATCHLIST_ERROR,
    IS_NEW_WATCHLIST,
    DELETE_WATCHLIST_SUCCESS,
    CLEAR_ALL_WATCHLIST
} from '../actions/types'

const initialState = {
    isLoading: false,
    watchlists: [],
    error: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_WATCHLIST_FETCHING:
            return {
                ...state,
                isLoading: true
            }
        case IS_WATCHLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                watchlists: action.payload
            }
        case IS_WATCHLIST_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case IS_NEW_WATCHLIST:
            return {
                ...state,
                watchlists: action.payload,
                isLoading: false,
                error: false,
            }
        case DELETE_WATCHLIST_SUCCESS:
            return {
                ...state,
                watchlists: state.watchlists.filter(watchlist => watchlist._id !== action.payload)
            }
        case CLEAR_ALL_WATCHLIST:
            return {
                ...state,
                watchlists: [],
                isLoading: false,
                error: false
            }
        default:
            return state;
    }
}

