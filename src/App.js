import React from "react";
import { Route, Switch } from "react-router-dom";
import Error404 from "./Pages/Erro404";
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
// import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import {
  Movies,
  Login,
  WatchList,
  RatedMovies,
  MoviePage,
  PersonPage,
  Discover,
  GoogleAuthCallback,
} from "./util/pagesImport";
import { Header } from "./Components/Header";
import { globalStoreName } from "./store/storeLocalStorageNames";
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

function App() {
  localStorage.removeItem(globalStoreName);
  return (
    <QueryClientProvider client={queryClient}>
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
          <Header />
          <GlobalFetches />
          <Switch>
            <Route exact path="/" component={Movies} />
            <Route exact path="/join" component={Login} />
            <Route
              exact
              path="/auth/google/callback"
              component={GoogleAuthCallback}
            />
            <Route exact path="/discover" component={Discover} />
            <PrivateRoute exact path="/watchlist" component={WatchList} />
            <PrivateRoute exact path="/rated" component={RatedMovies} />
            <Route
              exact
              path="/:personName/:personNameId"
              component={PersonPage}
            />
            <Route exact path="/:moviename" component={MoviePage} />
            <Route component={Error404} />
          </Switch>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
