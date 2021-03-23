import {
    IS_INITIAL_TOP_RATED_MOVIES_LOADING,
    IS_INITIAL_TOP_RATED_MOVIES_SUCCESS,
    IS_INITIAL_TOP_RATED_MOVIES_FAIL,
    FETCH_MORE_TOP_RATED_MOVIES_SUCCESS,
    FETCH_MORE_TOP_RATED_MOVIES_LOADING,
    FETCH_MORE_TOP_RATED_MOVIES_ERROR
} from '../actions/types'

const initialState = {
    isInitialLoading: false,
    movies: [],
    error: false,
    page: 2,
    isFetchingMore: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_INITIAL_TOP_RATED_MOVIES_LOADING:
            return {
                ...state,
                isInitialLoading: true,
                page: 2
            }
        case IS_INITIAL_TOP_RATED_MOVIES_SUCCESS:
            return {
                ...state,
                isInitialLoading: false,
                error: false,
                movies: action.payload,
                page: 2
            }
        case IS_INITIAL_TOP_RATED_MOVIES_FAIL:
            return {
                ...state,
                isInitialLoading: false,
                error: true,
                page: 2
            }
        case FETCH_MORE_TOP_RATED_MOVIES_LOADING:
            return {
                ...state,
                isFetchingMore: true
            }
        case FETCH_MORE_TOP_RATED_MOVIES_SUCCESS:
            return {
                ...state,
                isFetchingMore: false,
                movies: action.payload,
                page: state.page + 1,
                error: false
            }
        case FETCH_MORE_TOP_RATED_MOVIES_ERROR:
            return {
                ...state,
                isFetchingMore: false,
                error: true
            }
        default:
            return state;
    }
}

