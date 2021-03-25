/*global google*/
import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import FallbackSuspense from "./Components/FallbackSuspense";
import Error404 from "./Pages/Erro404";
import ErrorBoundary from "./Pages/ErrorBoundary";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import "./Styles/App.css";
import PrivateRoute from "./Components/PrivateRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./util/misc";
import { ReactQueryDevtools } from "react-query/devtools";
import GlobalFetches from "./Components/GlobalFetches/GlobalFetches";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import client, { socketURL } from "./FeathersClient";
import { authCallback } from "./services/authCallback.service";
const middleware = [thunk];

const persistConfig = {
  key: "movie-app",
  storage,
  version: 2,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  {},
  compose(
    applyMiddleware(...middleware)

    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

let persistor = persistStore(store);

const Movies = lazy(() => import("./Pages/Movies.js"));
const Login = lazy(() => import("./Pages/Login"));
const WatchList = lazy(() => import("./Pages/WatchList"));
const RatedMovies = lazy(() => import("./Pages/RatedMovies"));
const MoviePage = lazy(() => import("./Pages/MoviePage"));

function App() {
  // React.useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id:
  //       "439002703401-m4c6p240qnpfi7np4ksfhd9dfss2nt21.apps.googleusercontent.com",
  //     callback: authCallback,
  //   });
  //   google.accounts.id.prompt();
  // }, []);

  useGoogleOneTapLogin({
    onError: (error) => console.log(error),
    onSuccess: (response) => console.log(response),
    googleAccountConfigs: {
      client_id:
        "439002703401-m4c6p240qnpfi7np4ksfhd9dfss2nt21.apps.googleusercontent.com",
      // callback: checkObject,
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {/* <div
        id="g_id_onload"
        data-client_id="439002703401-m4c6p240qnpfi7np4ksfhd9dfss2nt21.apps.googleusercontent.com"
        data-login_uri={`${socketURL}/oauth/google`}
        data-your_own_param_1_to_login="any_value"
        data-your_own_param_2_to_login="any_value"
      ></div> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            limit={1}
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            progress={undefined}
          />
          <ErrorBoundary>
            <Suspense fallback={<FallbackSuspense />}>
              <Switch>
                <Route exact path="/" component={Movies} />
                <Route exact path="/join" component={Login} />
                <PrivateRoute exact path="/watchlist" component={WatchList} />
                <PrivateRoute exact path="/rated" component={RatedMovies} />
                <Route exact path="/:moviename" component={MoviePage} />
                <Route component={Error404} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalFetches />
    </QueryClientProvider>
  );
}

export default App;
