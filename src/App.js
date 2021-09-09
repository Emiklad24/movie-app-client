import React from "react";
import { Route, Switch } from "react-router-dom";
import Error404 from "./Pages/Erro404";
import "./Styles/App.css";
import PrivateRoute from "./Components/PrivateRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./util/misc";
import { ReactQueryDevtools } from "react-query/devtools";
import GlobalFetches from "./Components/GlobalFetches/GlobalFetches";

import {
  Movies,
  WatchList,
  RatedMovies,
  MoviePage,
  PersonPage,
  Discover,
  GoogleAuthCallback,
} from "./util/pagesImport";
import Header from "./Components/Header/Header";

function App() {
  localStorage.removeItem("persist:movie-app");
  return (
    <QueryClientProvider client={queryClient}>
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

        <Route
          exact
          path="/auth/google/callback"
          component={GoogleAuthCallback}
        />
        <Route exact path="/discover" component={Discover} />
        <PrivateRoute exact path="/watchlist" component={WatchList} />
        <PrivateRoute exact path="/rated" component={RatedMovies} />
        <Route exact path="/:personName/:personNameId" component={PersonPage} />
        <Route exact path="/:moviename" component={MoviePage} />
        <Route component={Error404} />
      </Switch>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
