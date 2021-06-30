import { globalStoreName } from "./storeLocalStorageNames";
import produce from "immer";
// import { version } from "../../package.json";

//store version control
const isRunningInBrowser = () => typeof window !== "undefined";

let _grandStorePersist = JSON.parse(localStorage.getItem(globalStoreName));

const version = "1.0";

if (_grandStorePersist === null) {
  localStorage.setItem(globalStoreName, JSON.stringify({ version }));
  _grandStorePersist = { version };
}
if (version !== _grandStorePersist.version) {
  localStorage.setItem(globalStoreName, JSON.stringify({ version }));
  localStorage.clear();
}
export const persist2 = (namespace, config) => (set, get, api) => {
  const state = config(
    (args) => {
      set(produce(args));
      if (isRunningInBrowser) {
        _grandStorePersist[namespace] = get();
        localStorage.SIMPLE_MOVIE_APP_GLOBAL_STORE =
          JSON.stringify(_grandStorePersist);
      }
    },
    get,
    api
  );

  return {
    ...state,
    ...(isRunningInBrowser() && _grandStorePersist[namespace]),
  };
};
