import {
    IS_RATEDMOVIES_FETCHING,
    DELETE_RATEDMOVIES_SUCCESS,
    IS_RATEDMOVIES_ERROR,
    IS_NEW_RATEDMOVIES,
    IS_RATEDMOVIES_SUCCESS,
    CLEAR_ALL_RATEDMOVIES
} from '../actions/types'

const initialState = {
    isLoading: false,
    ratedMovies: [],
    error: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_RATEDMOVIES_FETCHING:
            return {
                ...state,
                isLoading: true
            }
        case IS_RATEDMOVIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                ratedMovies: action.payload
            }
        case IS_RATEDMOVIES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case IS_NEW_RATEDMOVIES:
            return {
                ...state,
                ratedMovies: action.payload,
                isLoading: false,
                error: false,
            }
        case DELETE_RATEDMOVIES_SUCCESS:
            return {
                ...state,
                ratedMovies: state.ratedMovies.filter(ratedMovie => ratedMovie._id !== action.payload)
            }
        case CLEAR_ALL_RATEDMOVIES:
            return {
                ...state,
                ratedMovies: [],
                isLoading: false,
                error: false
            }
        default:
            return state;
    }
}

