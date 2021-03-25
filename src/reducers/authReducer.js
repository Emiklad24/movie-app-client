import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  // REGISTER_SUCCESS,
  REGISTER_FAIL,
  // REGISTER_LOADING,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("feathers-jwt"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token:
          localStorage.getItem("feathers-jwt") === "" ||
          localStorage.getItem("feathers-jwt") === null ||
          localStorage.getItem("feathers-jwt") === undefined
            ? action.payload.accessToken
            : localStorage.getItem("feathers-jwt"),
        user: action.payload.user,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("feathers-jwt", action.payload.accessToken);
      return {
        ...state,
        ...action.payload,
        token: localStorage.getItem("feathers-jwt", action.payload.accessToken),
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
      localStorage.removeItem("feathers-jwt");
      localStorage.removeItem("appState");
      localStorage.removeItem("persist:movie-app");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("feathers-jwt");
      localStorage.removeItem("appState");
      localStorage.removeItem("persist:movie-app");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("feathers-jwt");
      localStorage.removeItem("appState");
      localStorage.removeItem("persist:movie-app");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
}
